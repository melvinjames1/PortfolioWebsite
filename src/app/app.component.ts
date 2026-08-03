import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
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

  private coreMesh?: THREE.Mesh;
  private coreGeometry?: THREE.BufferGeometry;
  private coreMaterial?: THREE.MeshBasicMaterial;

  private currentLookAt = new THREE.Vector3(0, 0, 0);
  activeSection = 'home';

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    const sections = [
      'home', 'skills', 'projects', 'about', 'contact',
      'education', 'experience', 'certifications', 'hobbies',
      'aiml', 'cybersec', 'websites'
    ];
    const scrollPos = window.scrollY + window.innerHeight / 3;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
        this.activeSection = id;
        break;
      }
    }
  }

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
    this.coreGeometry?.dispose();
    this.coreMaterial?.dispose();
    this.renderer?.dispose();
  }

  private initGeoCanvas(): void {
    const canvas = this.canvasRef.nativeElement;

    // 1. Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    this.scene = scene;

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 500;
    this.camera = camera;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer = renderer;

    // Expanded Holographic Plane Setup (6000x6000 with updated vertex/fragment shader bounds)
    const holoGeometry = new THREE.PlaneGeometry(6000, 6000, 120, 120);
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
          
          // Expanded damping limits so waves remain visible over a larger area
          float damping = smoothstep(0.0, 300.0, dist) * (1.0 - smoothstep(1600.0, 2800.0, dist));
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
          
          // 4. Smooth outer fade extended from 1300 to 2800 units
          float fade = 1.0 - smoothstep(400.0, 2800.0, dist);
          
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
    holoPlane.position.y = -450; // Lowered slightly to account for the larger surface area
    scene.add(holoPlane);
    this.holoPlane = holoPlane;

    // Central Morphing Core — Scaled up Torus Knot
    const coreGeometry = new THREE.TorusKnotGeometry(100, 26, 120, 16);
    this.coreGeometry = coreGeometry;

    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    this.coreMaterial = coreMaterial;

    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);
    this.coreMesh = coreMesh;

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
      color: 0xdc2626,
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

    // Camera targets based on activeSection
    const targetCam = new THREE.Vector3(0, 0, 500);
    const targetLook = new THREE.Vector3(0, 0, 0);
    let targetCoreScale = 1.0;
    let targetCoreOpacity = 0.35;
    let speedMult = 1.0;

    // 6. Draw Loop
    const draw = () => {
      if (this.activeSection === 'home') {
        targetCam.set(0, 0, 500);
        targetLook.set(0, 0, 0);
        targetCoreScale = 1.0;
        targetCoreOpacity = 0.35;
        speedMult = 0.8;
      } else if (this.activeSection === 'skills') {
        targetCam.set(220, 100, 420);
        targetLook.set(100, 0, 0);
        targetCoreScale = 1.25;
        targetCoreOpacity = 0.45;
        speedMult = 1.3;
      } else if (this.activeSection === 'projects') {
        targetCam.set(-300, -180, 250);
        targetLook.set(0, -50, 0);
        targetCoreScale = 2.2;
        targetCoreOpacity = 0.12;
        speedMult = 0.6;
      } else if (this.activeSection === 'about') {
        targetCam.set(0, 420, 300);
        targetLook.set(0, 0, 0);
        targetCoreScale = 0.75;
        targetCoreOpacity = 0.4;
        speedMult = 0.5;
      } else if (this.activeSection === 'contact') {
        targetCam.set(0, 0, 180);
        targetLook.set(0, 0, 0);
        targetCoreScale = 0.55;
        targetCoreOpacity = 0.75;
        speedMult = 2.2;
      } else if (this.activeSection === 'education') {
        targetCam.set(-260, 180, 360);
        targetLook.set(-90, 60, 0);
        targetCoreScale = 1.0;
        targetCoreOpacity = 0.3;
        speedMult = 0.5;
      } else if (this.activeSection === 'experience') {
        targetCam.set(280, -60, 320);
        targetLook.set(110, -20, 0);
        targetCoreScale = 1.45;
        targetCoreOpacity = 0.5;
        speedMult = 0.9;
      } else if (this.activeSection === 'certifications') {
        targetCam.set(-220, -100, 300);
        targetLook.set(-70, -30, 0);
        targetCoreScale = 1.3;
        targetCoreOpacity = 0.45;
        speedMult = 0.7;
      } else if (this.activeSection === 'hobbies') {
        targetCam.set(0, -260, 260);
        targetLook.set(0, -60, 0);
        targetCoreScale = 1.85;
        targetCoreOpacity = 0.55;
        speedMult = 1.6;
      } else if (this.activeSection === 'aiml') {
        targetCam.set(-320, 140, 300);
        targetLook.set(-100, 30, 0);
        targetCoreScale = 1.6;
        targetCoreOpacity = 0.4;
        speedMult = 0.9;
      } else if (this.activeSection === 'cybersec') {
        targetCam.set(300, 40, 260);
        targetLook.set(110, 0, 0);
        targetCoreScale = 2.4;
        targetCoreOpacity = 0.55;
        speedMult = 1.4;
      } else if (this.activeSection === 'websites') {
        targetCam.set(0, -220, 320);
        targetLook.set(0, -40, 0);
        targetCoreScale = 1.15;
        targetCoreOpacity = 0.25;
        speedMult = 0.7;
      }

      // Smooth camera interpolation
      camera.position.lerp(targetCam, 0.04);
      this.currentLookAt.lerp(targetLook, 0.04);
      camera.lookAt(this.currentLookAt);

      // Add mouse parallax on top of camera position
      camera.position.x += (mouseX - camera.position.x) * 0.02;
      camera.position.y += (-mouseY - camera.position.y) * 0.02;

      // Animate morphing core
      if (this.coreMesh) {
        this.coreMesh.rotation.x += 0.005;
        this.coreMesh.rotation.y += 0.007;
        const currentScale = this.coreMesh.scale.x;
        const nextScale = THREE.MathUtils.lerp(currentScale, targetCoreScale, 0.04);
        this.coreMesh.scale.setScalar(nextScale);
        if (this.coreMaterial) {
          this.coreMaterial.opacity = THREE.MathUtils.lerp(this.coreMaterial.opacity, targetCoreOpacity, 0.04);
        }
      }

      const posAttr = pointsGeometry.attributes['position'] as THREE.BufferAttribute;
      const linePosAttr = lineGeometry.attributes['position'] as THREE.BufferAttribute;
      const lineColorAttr = lineGeometry.attributes['color'] as THREE.BufferAttribute;

      // Update particles
      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];
        node.x += node.vx * speedMult;
        node.y += node.vy * speedMult;
        node.z += node.vz * speedMult;

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
            let r = (220 / 255) * alpha;
            let g = (38 / 255) * alpha;
            let b = (38 / 255) * alpha;

            if (this.activeSection === 'contact') {
              r = (255 / 255) * alpha;
              g = (60 / 255) * alpha;
              b = (60 / 255) * alpha;
            }

            lineColorAttr.setXYZ(colorIdx, r, g, b);
            lineColorAttr.setXYZ(colorIdx + 1, r, g, b);
            colorIdx++;
            colorIdx++;

            numConnections++;
          }
        }
      }

      lineGeometry.setDrawRange(0, numConnections * 2);
      linePosAttr.needsUpdate = true;
      lineColorAttr.needsUpdate = true;

      // Slow constant orbital rotation
      particleSystem.rotation.y += 0.00015;
      connectionLines.rotation.y += 0.00015;

      // Update holographic plane time uniform
      if (this.holoMaterial) {
        this.holoMaterial.uniforms['uTime'].value += 0.016;
      }

      renderer.render(scene, camera);
      this.animId = requestAnimationFrame(draw);
    };

    draw();
  }
}