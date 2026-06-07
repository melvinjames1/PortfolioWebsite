import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { GothicCursorComponent } from "./components/gothic-cursor/gothic-cursor.component";
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, GothicCursorComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('geoCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private animId!: number;
  private resizeHandler!: () => void;
  private mouseHandler!: (e: MouseEvent) => void;

  // Three.js references for clean resource disposal
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private pointsGeometry?: THREE.BufferGeometry;
  private pointsMaterial?: THREE.PointsMaterial;
  private lineGeometry?: THREE.BufferGeometry;
  private lineMaterial?: THREE.LineBasicMaterial;
  private holoGeometry?: THREE.PlaneGeometry;
  private holoMaterial?: THREE.ShaderMaterial;
  private holoPlane?: THREE.Mesh;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initGeoCanvas();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    cancelAnimationFrame(this.animId);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    if (this.mouseHandler) window.removeEventListener('mousemove', this.mouseHandler);

    // Dispose Three.js WebGL objects
    this.pointsGeometry?.dispose();
    this.pointsMaterial?.dispose();
    this.lineGeometry?.dispose();
    this.lineMaterial?.dispose();
    this.holoGeometry?.dispose();
    this.holoMaterial?.dispose();
    this.renderer?.dispose();
  }

  private initGeoCanvas(): void {
    const canvas = this.canvasRef.nativeElement;

    // 1. Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    this.scene = scene;

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 500;
    this.camera = camera;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer = renderer;

    // Holographic Plane Setup using custom GLSL shaders
    const holoGeometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);
    this.holoGeometry = holoGeometry;

    const holoMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float uTime;
        varying vec3 vPosition;
        void main() {
          vec3 pos = position;
          float dist = length(pos.xy);
          
          // Cyber wave displacement
          float wave = sin(pos.x * 0.005 + uTime * 1.5) * cos(pos.y * 0.005 + uTime * 1.5) * 50.0;
          wave += sin(pos.x * 0.01 - uTime * 2.0) * 15.0;
          
          // Dampen waves near center and outer edges to prevent harsh boundaries
          float damping = smoothstep(0.0, 200.0, dist) * (1.0 - smoothstep(800.0, 1500.0, dist));
          pos.z += wave * damping;
          
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec3 vPosition;
        void main() {
          float dist = length(vPosition.xy);
          
          // 1. Grid lines calculation
          vec2 gridCoord = vPosition.xy / 40.0;
          vec2 gridDist = abs(fract(gridCoord - 0.5) - 0.5);
          float lineWidth = 0.06;
          vec2 gridLineVec = smoothstep(lineWidth, 0.0, gridDist);
          float gridLine = max(gridLineVec.x, gridLineVec.y);
          
          // 2. Pulse wave propagating outwards
          float pulse = sin(dist * 0.003 - uTime * 2.0) * 0.5 + 0.5;
          pulse = pow(pulse, 8.0);
          
          // 3. Scanline overlay
          float scanline = sin(vPosition.y * 0.2 + uTime * 6.0) * 0.1 + 0.9;
          
          // 4. Smooth outer fade
          float fade = 1.0 - smoothstep(300.0, 1300.0, dist);
          
          // Combine final transparency and color
          float alpha = (gridLine * 0.25 + pulse * 0.4) * fade;
          vec3 color = uColor;
          color += vec3(0.5, 0.1, 0.1) * pulse; // Extra glow on pulse wave
          color *= scanline;
          
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xdc2626) }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    this.holoMaterial = holoMaterial;

    const holoPlane = new THREE.Mesh(holoGeometry, holoMaterial);
    holoPlane.rotation.x = -Math.PI / 2;
    holoPlane.position.y = -350;
    scene.add(holoPlane);
    this.holoPlane = holoPlane;

    // 2. Constants and boundaries
    const NODE_COUNT = 90;
    const maxDistance = 140;
    const maxConnections = 400;

    const bounds = {
      x: 650,
      y: 480,
      z: 350
    };

    // Generate node data with position and velocity in 3D
    const nodes: { x: number; y: number; z: number; vx: number; vy: number; vz: number }[] = [];
    const particlePositions = new Float32Array(NODE_COUNT * 3);

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * bounds.x * 2;
      const y = (Math.random() - 0.5) * bounds.y * 2;
      const z = (Math.random() - 0.5) * bounds.z * 2;

      nodes.push({
        x, y, z,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        vz: (Math.random() - 0.5) * 0.7,
      });

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
    }

    // 3. Point Cloud Setup
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    this.pointsGeometry = pointsGeometry;

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xdc2626, // Crimson red matching the brand style
      size: 3.5,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.pointsMaterial = pointsMaterial;

    const particleSystem = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(particleSystem);

    // 4. Connective Lines Setup
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    this.lineGeometry = lineGeometry;

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.lineMaterial = lineMaterial;

    const connectionLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(connectionLines);

    // 5. Interactive Mouse-tracking Parallax
    let mouseX = 0;
    let mouseY = 0;

    this.mouseHandler = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.35;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.35;
    };
    window.addEventListener('mousemove', this.mouseHandler);

    this.resizeHandler = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', this.resizeHandler);

    // 6. Draw Loop
    const draw = () => {
      // Smoothly interpolate camera position for organic parallax
      camera.position.x += (mouseX - camera.position.x) * 0.025;
      camera.position.y += (-mouseY - camera.position.y) * 0.025;
      camera.lookAt(scene.position);

      const posAttr = pointsGeometry.attributes['position'] as THREE.BufferAttribute;
      const linePosAttr = lineGeometry.attributes['position'] as THREE.BufferAttribute;
      const lineColorAttr = lineGeometry.attributes['color'] as THREE.BufferAttribute;

      // Update particles
      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Soft bounce at virtual boundaries
        if (Math.abs(node.x) > bounds.x) node.vx *= -1;
        if (Math.abs(node.y) > bounds.y) node.vy *= -1;
        if (Math.abs(node.z) > bounds.z) node.vz *= -1;

        posAttr.setXYZ(i, node.x, node.y, node.z);
      }
      posAttr.needsUpdate = true;

      // Calculate connections and vertex alpha
      let vertexIdx = 0;
      let colorIdx = 0;
      let numConnections = 0;

      for (let i = 0; i < NODE_COUNT; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dz = n1.z - n2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance && numConnections < maxConnections) {
            linePosAttr.setXYZ(vertexIdx, n1.x, n1.y, n1.z);
            linePosAttr.setXYZ(vertexIdx + 1, n2.x, n2.y, n2.z);
            vertexIdx += 2;

            const alpha = (1 - dist / maxDistance) * 0.3;
            const r = (220 / 255) * alpha;
            const g = (38 / 255) * alpha;
            const b = (38 / 255) * alpha;

            lineColorAttr.setXYZ(colorIdx, r, g, b);
            lineColorAttr.setXYZ(colorIdx + 1, r, g, b);
            colorIdx += 2;

            numConnections++;
          }
        }
      }

      lineGeometry.setDrawRange(0, numConnections * 2);
      linePosAttr.needsUpdate = true;
      lineColorAttr.needsUpdate = true;

      // Slow constant orbital rotation
      particleSystem.rotation.y += 0.0002;
      connectionLines.rotation.y += 0.0002;

      // Update holographic plane time uniform
      if (holoMaterial) {
        holoMaterial.uniforms['uTime'].value += 0.016;
      }

      renderer.render(scene, camera);
      this.animId = requestAnimationFrame(draw);
    };

    draw();
  }
}