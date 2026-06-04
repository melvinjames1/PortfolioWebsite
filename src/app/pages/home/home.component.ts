import {
  Component, ElementRef, Renderer2,
  OnInit, OnDestroy, AfterViewInit,
  Inject, PLATFORM_ID, HostListener,
  ViewChild
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import Typed from 'typed.js';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, RouterModule],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private typed!: Typed;
  private skillObserver!: IntersectionObserver;
  private revealObserver!: IntersectionObserver;
  private tiltAnimId!: number;

  private tiltTargetX = 0;
  private tiltTargetY = 0;
  public tiltCurrentX = 0;
  public tiltCurrentY = 0;
  private isHoveringAvatar = false;

  @ViewChild('hero3dCanvas') heroCanvasRef!: ElementRef<HTMLCanvasElement>;

  // Three.js instances for cleanup
  private heroRenderer?: THREE.WebGLRenderer;
  private heroScene?: THREE.Scene;
  private heroCamera?: THREE.PerspectiveCamera;
  private heroPivot?: THREE.Group;
  private heroGroup1?: THREE.Group;
  private heroGroup2?: THREE.Group;
  private heroGroup3?: THREE.Group;
  private heroRingGeo?: THREE.BufferGeometry;
  private heroRingMat?: THREE.PointsMaterial;
  private heroRing2Geo?: THREE.BufferGeometry;
  private heroRing2Mat?: THREE.PointsMaterial;
  private heroSphereGeo?: THREE.BufferGeometry;
  private heroSphereMat?: THREE.PointsMaterial;
  private heroCircleGeom?: THREE.BufferGeometry;
  private heroCircleMat?: THREE.LineBasicMaterial;
  private heroCircle2Geom?: THREE.BufferGeometry;
  private heroCircle2Mat?: THREE.LineBasicMaterial;
  private heroResizeHandler!: () => void;
  private heroAnimId!: number;

  activeSection: string = 'home';

  marqueeSkills = [
    'Angular','React','Python','Node.js','Cybersecurity',
    'AI/ML','JavaScript','TypeScript','Java','Tailwind CSS',
    'MongoDB','Git','Figma','Firebase','Arduino',
  ];

  skills = [
    {
      title: 'AI & Machine Learning',
      skills: [
        { name: 'Python',       icon: 'assets/icons/ai-ml/python.svg',      url: 'https://docs.python.org/3/' },
        { name: 'PyTorch',      icon: 'assets/icons/ai-ml/pytorch.svg',     url: 'https://pytorch.org' },
        { name: 'TensorFlow',   icon: 'assets/icons/ai-ml/tensorflow.svg',  url: 'https://www.tensorflow.org' },
        { name: 'NumPy',        icon: 'assets/icons/ai-ml/numpy.svg',       url: 'https://numpy.org' },
        { name: 'Scikit-Learn', icon: 'assets/icons/ai-ml/scikitlearn.svg', url: 'https://scikit-learn.org' },
        { name: 'Pandas',       icon: 'assets/icons/ai-ml/pandas.svg',      url: 'https://pandas.pydata.org' },
      ],
    },
    {
      title: 'Cybersecurity',
      skills: [
        { name: 'Kali Linux', icon: 'assets/icons/cybersecurity/kalilinux.svg',  url: 'https://www.kali.org/docs/' },
        { name: 'Wireshark',  icon: 'assets/icons/cybersecurity/wireshark.svg',  url: 'https://www.wireshark.org' },
        { name: 'Metasploit', icon: 'assets/icons/cybersecurity/metasploit.svg', url: 'https://www.metasploit.com' },
        { name: 'Burp Suite', icon: 'assets/icons/cybersecurity/burpsuite.svg',  url: 'https://portswigger.net/burp' },
        { name: 'Nmap',       icon: 'assets/icons/cybersecurity/nmap.svg',       url: 'https://nmap.org' },
        { name: 'OWASP',      icon: 'assets/icons/cybersecurity/owasp.svg',      url: 'https://owasp.org' },
      ],
    },
    {
      title: 'Web Development',
      skills: [
        { name: 'Angular',    icon: 'assets/icons/web-dev/angular.svg',     url: 'https://angular.dev' },
        { name: 'React',      icon: 'assets/icons/web-dev/react.svg',       url: 'https://react.dev' },
        { name: 'Node.js',    icon: 'assets/icons/web-dev/nodedotjs.svg',   url: 'https://nodejs.org' },
        { name: 'Tailwind',   icon: 'assets/icons/web-dev/tailwindcss.svg', url: 'https://tailwindcss.com' },
        { name: 'JavaScript', icon: 'assets/icons/web-dev/javascript.svg',  url: 'https://developer.mozilla.org/docs/Web/JavaScript' },
        { name: 'TypeScript', icon: 'assets/icons/web-dev/typescript.svg',  url: 'https://www.typescriptlang.org' },
      ],
    },
    {
      title: 'Languages & DB',
      skills: [
        { name: 'C',        icon: 'assets/icons/languages/c.svg',         url: 'https://en.cppreference.com/w/c' },
        { name: 'C++',      icon: 'assets/icons/languages/cplusplus.svg', url: 'https://isocpp.org' },
        { name: 'Java',     icon: 'assets/icons/languages/java.svg',      url: 'https://dev.java' },
        { name: 'MySQL',    icon: 'assets/icons/languages/mysql.svg',     url: 'https://dev.mysql.com/doc/' },
        { name: 'MongoDB',  icon: 'assets/icons/languages/mongodb.svg',   url: 'https://www.mongodb.com/docs/' },
        { name: 'Firebase', icon: 'assets/icons/languages/firebase.svg',  url: 'https://firebase.google.com/docs' },
      ],
    },
    {
      title: 'Tools & Workflow',
      skills: [
        { name: 'VS Code', icon: 'assets/icons/tools-workflow/vscode.svg',  url: 'https://code.visualstudio.com/docs' },
        { name: 'Git',     icon: 'assets/icons/tools-workflow/git.svg',     url: 'https://git-scm.com/doc' },
        { name: 'GitHub',  icon: 'assets/icons/tools-workflow/github.svg',  url: 'https://docs.github.com' },
        { name: 'Postman', icon: 'assets/icons/tools-workflow/postman.svg', url: 'https://learning.postman.com' },
        { name: 'Linux',   icon: 'assets/icons/tools-workflow/linux.svg',   url: 'https://docs.kernel.org' },
        { name: 'Docker',  icon: 'assets/icons/tools-workflow/docker.svg',  url: 'https://docs.docker.com' },
      ],
    },
    {
      title: 'Design & Editing',
      skills: [
        { name: 'Figma',   icon: 'assets/icons/design-editing/figma.svg',          url: 'https://help.figma.com' },
        { name: 'Canva',   icon: 'assets/icons/design-editing/canva.png',          url: 'https://www.canva.com' },
        { name: 'DaVinci', icon: 'assets/icons/design-editing/davinciresolve.svg', url: 'https://www.blackmagicdesign.com/products/davinciresolve' },
        { name: 'Arduino', icon: 'assets/icons/design-editing/arduino.svg',        url: 'https://www.arduino.cc/en/Guide' },
      ],
    },
  ];

  openDocs(url?: string): void {
    if (url) window.open(url, '_blank', 'noopener noreferrer');
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    const sections = ['home', 'skills'];
    const scrollPos = window.pageYOffset + window.innerHeight / 3;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
        this.activeSection = id;
      }
    }
  }

  ngOnInit(): void { this.loadAssets(); }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.typed = new Typed('.type', {
      strings: ['AI Researcher','Cybersecurity Student','Full-Stack Developer','UI Designer','Tech Enthusiast'],
      typeSpeed: 110, backSpeed: 55, loop: true,
    });

    setTimeout(() => {
      (this.el.nativeElement.querySelectorAll('.hero-item') as NodeListOf<HTMLElement>)
        .forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 130));
    }, 80);

    this.initAvatarTiltLoop();
    this.initHero3DAnimation();
    this.initSkillObserver();
    this.initRevealObserver();
  }

  ngOnDestroy(): void {
    this.typed?.destroy();
    this.skillObserver?.disconnect();
    this.revealObserver?.disconnect();
    cancelAnimationFrame(this.tiltAnimId);

    if (isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.heroAnimId);
      if (this.heroResizeHandler) window.removeEventListener('resize', this.heroResizeHandler);

      if (this.heroScene) {
        this.disposeScene(this.heroScene);
      }
      this.heroRenderer?.dispose();
    }
  }

  // ── Avatar mouse handlers ────────────────────────────────────────────────

  onAvatarMouseMove(event: MouseEvent): void {
    const rig = event.currentTarget as HTMLElement;
    const r   = rig.getBoundingClientRect();
    const dx  = (event.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy  = (event.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    this.tiltTargetX = -dy * 22;
    this.tiltTargetY =  dx * 22;
    this.isHoveringAvatar = true;
  }

  onAvatarMouseLeave(): void {
    this.tiltTargetX = 0;
    this.tiltTargetY = 0;
    this.isHoveringAvatar = false;
  }

  private initAvatarTiltLoop(): void {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      this.tiltCurrentX = lerp(this.tiltCurrentX, this.tiltTargetX, 0.05);
      this.tiltCurrentY = lerp(this.tiltCurrentY, this.tiltTargetY, 0.05);
      this.tiltAnimId = requestAnimationFrame(tick);
    };
    tick();
  }

  // ── Skill card glow ──────────────────────────────────────────────────────

  onCardMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const glow = card.querySelector('.card-glow') as HTMLElement;
    if (!glow) return;
    const r = card.getBoundingClientRect();
    glow.style.setProperty('--mx', ((event.clientX - r.left) / r.width  * 100) + '%');
    glow.style.setProperty('--my', ((event.clientY - r.top)  / r.height * 100) + '%');
  }

  // ── Observers ────────────────────────────────────────────────────────────

  private initSkillObserver(): void {
    this.skillObserver = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    (this.el.nativeElement.querySelectorAll('.skill-card') as NodeListOf<HTMLElement>)
      .forEach(c => this.skillObserver.observe(c));
  }

  private initRevealObserver(): void {
    this.revealObserver = new IntersectionObserver(
      entries => entries.forEach(e => {
        (e.target as HTMLElement).classList.toggle('visible', e.isIntersecting);
      }),
      { threshold: 0.1 }
    );
    (this.el.nativeElement.querySelectorAll('.reveal-left') as NodeListOf<HTMLElement>)
      .forEach(el => this.revealObserver.observe(el));
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  private loadAssets(): void {
    ['https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap',
     'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css']
      .forEach(href => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = this.renderer.createElement('link');
          this.renderer.setAttribute(link, 'rel', 'stylesheet');
          this.renderer.setAttribute(link, 'href', href);
          this.renderer.appendChild(document.head, link);
        }
      });
  }

  scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeSection = id;
  }

  private initHero3DAnimation(): void {
    if (!this.heroCanvasRef) return;
    const canvas = this.heroCanvasRef.nativeElement;

    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    this.heroScene = scene;

    const width = canvas.clientWidth || 400;
    const height = canvas.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    camera.position.z = 370;
    this.heroCamera = camera;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.heroRenderer = renderer;

    const pivot = new THREE.Group();
    scene.add(pivot);
    this.heroPivot = pivot;

    // --- Inner Core rings (remains for visual depth) ---
    const group1 = new THREE.Group();
    const group2 = new THREE.Group();
    const group3 = new THREE.Group();
    pivot.add(group1);
    pivot.add(group2);
    pivot.add(group3);
    this.heroGroup1 = group1;
    this.heroGroup2 = group2;
    this.heroGroup3 = group3;

    const ringRadius = 120;
    const ringGeo = new THREE.BufferGeometry();
    const ringPos = [];
    const count = 80;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      ringPos.push(Math.cos(angle) * ringRadius, Math.sin(angle) * ringRadius, (Math.random() - 0.5) * 6);
    }
    ringGeo.setAttribute('position', new THREE.Float32BufferAttribute(ringPos, 3));
    this.heroRingGeo = ringGeo;

    const ringMat = new THREE.PointsMaterial({
      color: 0xdc2626,
      size: 3,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    this.heroRingMat = ringMat;

    const ringPoints = new THREE.Points(ringGeo, ringMat);
    group1.add(ringPoints);

    const circleGeom = new THREE.BufferGeometry();
    const circlePointsArr = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      circlePointsArr.push(Math.cos(theta) * ringRadius, Math.sin(theta) * ringRadius, 0);
    }
    circleGeom.setAttribute('position', new THREE.Float32BufferAttribute(circlePointsArr, 3));
    this.heroCircleGeom = circleGeom;

    const circleMat = new THREE.LineBasicMaterial({
      color: 0xdc2626,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    this.heroCircleMat = circleMat;

    const circleLine = new THREE.Line(circleGeom, circleMat);
    group1.add(circleLine);

    const ring2Geo = new THREE.BufferGeometry();
    const ring2Pos = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      ring2Pos.push(Math.cos(angle) * ringRadius, (Math.random() - 0.5) * 6, Math.sin(angle) * ringRadius);
    }
    ring2Geo.setAttribute('position', new THREE.Float32BufferAttribute(ring2Pos, 3));
    this.heroRing2Geo = ring2Geo;

    const ring2Mat = new THREE.PointsMaterial({
      color: 0xdc2626,
      size: 3,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    this.heroRing2Mat = ring2Mat;

    const ring2Points = new THREE.Points(ring2Geo, ring2Mat);
    group2.add(ring2Points);

    const circle2Geom = new THREE.BufferGeometry();
    const circle2PointsArr = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      circle2PointsArr.push(Math.cos(theta) * ringRadius, 0, Math.sin(theta) * ringRadius);
    }
    circle2Geom.setAttribute('position', new THREE.Float32BufferAttribute(circle2PointsArr, 3));
    this.heroCircle2Geom = circle2Geom;

    const circle2Mat = new THREE.LineBasicMaterial({
      color: 0xdc2626,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    this.heroCircle2Mat = circle2Mat;

    const circle2Line = new THREE.Line(circle2Geom, circle2Mat);
    group2.add(circle2Line);

    group1.rotation.x = Math.PI / 4;
    group2.rotation.z = Math.PI / 4;

    const sphereGeo = new THREE.BufferGeometry();
    const spherePos = [];
    const sphereCount = 80;
    const sphereRadius = 105;
    for (let i = 0; i < sphereCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);
      spherePos.push(x, y, z);
    }
    sphereGeo.setAttribute('position', new THREE.Float32BufferAttribute(spherePos, 3));
    this.heroSphereGeo = sphereGeo;

    const sphereMat = new THREE.PointsMaterial({
      color: 0xdc2626,
      size: 2,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    this.heroSphereMat = sphereMat;

    const spherePoints = new THREE.Points(sphereGeo, sphereMat);
    group3.add(spherePoints);

    // --- Create Tilted Cyber Grid Helper inside the rig (Neutral Grey) ---
    const localGrid = new THREE.GridHelper(300, 10, 0x444444, 0x444444);
    localGrid.position.y = -130;
    if (Array.isArray(localGrid.material)) {
      localGrid.material.forEach(m => {
        m.transparent = true;
        m.opacity = 0.12;
        m.depthWrite = false;
      });
    } else {
      localGrid.material.transparent = true;
      localGrid.material.opacity = 0.12;
      localGrid.material.depthWrite = false;
    }
    pivot.add(localGrid);

    // --- 4 Orbiting Cyber Modules (Red / Black / Grey Theme) ---
    const mColors = [
      { core: 0xff0000, shell: 0xdc2626, type: 'ai' },
      { core: 0xff0000, shell: 0xdc2626, type: 'docker' },
      { core: 0xff0000, shell: 0xdc2626, type: 'cloud' },
      { core: 0xff0000, shell: 0xdc2626, type: 'sec' }
    ];

    const mGroups: THREE.Group[] = [];
    mColors.forEach(colorInfo => {
      const moduleGroup = this.createCyberSphere(colorInfo.core, colorInfo.shell, 13, colorInfo.type as any);
      pivot.add(moduleGroup);
      mGroups.push(moduleGroup);
    });

    // --- Stream connection lines & Traveling pulse spheres ---
    const streams: THREE.Line[] = [];
    const pulses: { t: number; mesh: THREE.Mesh }[] = [];

    mGroups.forEach((m, idx) => {
      const colorInfo = mColors[idx];
      const streamGeo = new THREE.BufferGeometry();
      const streamPos = new Float32Array(6); // [0,0,0, 0,0,0]
      streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPos, 3));
      const streamMat = new THREE.LineBasicMaterial({
        color: colorInfo.shell,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending
      });
      const streamLine = new THREE.Line(streamGeo, streamMat);
      pivot.add(streamLine);
      streams.push(streamLine);

      const pulseGeo = new THREE.SphereGeometry(2, 6, 6);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: colorInfo.core,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pivot.add(pulseMesh);
      pulses.push({
        t: Math.random(),
        mesh: pulseMesh
      });
    });

    // Initial resize
    const resizeHero = () => {
      const w = canvas.clientWidth || 400;
      const h = canvas.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resizeHero();

    // Listen to resize
    this.heroResizeHandler = () => {
      resizeHero();
    };
    window.addEventListener('resize', this.heroResizeHandler);

    // Animation speed controls
    let currentSpeed = 0.004;
    let orbitAngle = 0;

    const animateHero = () => {
      if (!this.heroRenderer) return;

      // Increase speed when hovering
      const targetSpeed = this.isHoveringAvatar ? 0.014 : 0.004;
      const lerpFactor = this.isHoveringAvatar ? 0.08 : 0.03; // slower slowdown for cinematic ease
      currentSpeed += (targetSpeed - currentSpeed) * lerpFactor;

      orbitAngle += currentSpeed;

      // Spin rings
      group1.rotation.y += (this.isHoveringAvatar ? 0.022 : 0.004);
      group2.rotation.y -= (this.isHoveringAvatar ? 0.018 : 0.003);
      group3.rotation.y += 0.002;
      group3.rotation.x += 0.001;

      // Orbit and spin modules (scaled down to fit comfortably in viewport)
      const orbitRadiusX = 145;
      const orbitRadiusY = 48;
      const orbitRadiusZ = 110;

      const time = Date.now() * 0.001;

      mGroups.forEach((m, idx) => {
        const angle = orbitAngle + (idx * Math.PI / 2);
        m.position.x = Math.cos(angle) * orbitRadiusX;
        m.position.y = Math.sin(angle) * orbitRadiusY;
        m.position.z = Math.sin(angle) * orbitRadiusZ;

        // Individual spins
        m.rotation.x += 0.008;
        m.rotation.y += 0.012;

        // Animate local satellites inside this cybersphere
        const satellites = m.userData['satellites'];
        const ringRadius = m.userData['ringRadius'];
        if (satellites && ringRadius) {
          // Satellite 1 orbits XZ
          const angle1 = time * 2.0;
          satellites[0].position.set(
            Math.cos(angle1) * ringRadius,
            0,
            Math.sin(angle1) * ringRadius
          ).applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 6);

          // Satellite 2 orbits XY
          const angle2 = time * -1.8;
          satellites[1].position.set(
            Math.cos(angle2) * ringRadius,
            Math.sin(angle2) * ringRadius,
            0
          ).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 6);
        }

        // Spin local gyroscope rings
        const localRings = m.userData['localRings'];
        if (localRings) {
          localRings[0].rotation.y += 0.01;
          localRings[1].rotation.z -= 0.008;
        }

        // Update connecting stream line vertices
        const streamLine = streams[idx];
        const streamPosAttr = streamLine.geometry.attributes['position'] as THREE.BufferAttribute;
        streamPosAttr.setXYZ(0, 0, 0, 0); // Core center
        streamPosAttr.setXYZ(1, m.position.x, m.position.y, m.position.z); // Module position
        streamPosAttr.needsUpdate = true;

        // Update traveling pulse position
        const pulse = pulses[idx];
        pulse.t += this.isHoveringAvatar ? 0.012 : 0.005;
        if (pulse.t > 1.0) pulse.t = 0;
        pulse.mesh.position.set(0, 0, 0).lerp(m.position, pulse.t);

        // Smoothly fade out planets when they go behind the avatar (z < 0)
        const zPos = m.position.z;
        let depthOpacity = 1.0;
        if (zPos < 0) {
          depthOpacity = THREE.MathUtils.lerp(1.0, 0.15, Math.min(1.0, -zPos / 110));
        }

        m.traverse(child => {
          if ((child as any).material) {
            const mat = (child as any).material;
            if (mat.userData['baseOpacity'] === undefined) {
              mat.userData['baseOpacity'] = mat.opacity || 1.0;
            }
            mat.opacity = mat.userData['baseOpacity'] * depthOpacity;
          }
        });

        const streamMat = streamLine.material as THREE.LineBasicMaterial;
        if (streamMat.userData['baseOpacity'] === undefined) {
          streamMat.userData['baseOpacity'] = streamMat.opacity || 1.0;
        }
        streamMat.opacity = streamMat.userData['baseOpacity'] * depthOpacity;

        const pulseMat = pulse.mesh.material as THREE.MeshBasicMaterial;
        if (pulseMat.userData['baseOpacity'] === undefined) {
          pulseMat.userData['baseOpacity'] = pulseMat.opacity || 1.0;
        }
        pulseMat.opacity = pulseMat.userData['baseOpacity'] * depthOpacity;
      });

      // Local grid slide
      localGrid.position.z += 0.4;
      if (localGrid.position.z >= 30) {
        localGrid.position.z = 0;
      }

      // Tilt entire system with the avatar's 3D tilt
      pivot.rotation.x = THREE.MathUtils.lerp(pivot.rotation.x, THREE.MathUtils.degToRad(-this.tiltCurrentX * 0.6), 0.1);
      pivot.rotation.y = THREE.MathUtils.lerp(pivot.rotation.y, THREE.MathUtils.degToRad(this.tiltCurrentY * 0.6), 0.1);

      renderer.render(scene, camera);
      this.heroAnimId = requestAnimationFrame(animateHero);
    };

    this.heroAnimId = requestAnimationFrame(animateHero);
  }

  // Recursive scene disposal to prevent WebGL leaks
  private disposeScene(obj: THREE.Object3D): void {
    while (obj.children.length > 0) {
      const child = obj.children[0];
      obj.remove(child);
      this.disposeScene(child);
    }

    if ((obj as any).geometry) {
      (obj as any).geometry.dispose();
    }

    if ((obj as any).material) {
      if (Array.isArray((obj as any).material)) {
        (obj as any).material.forEach((m: any) => m.dispose());
      } else {
        (obj as any).material.dispose();
      }
    }
  }

  // Helper method to procedurally construct high-fidelity cybersphere modules
  private createCyberSphere(colorCore: number, colorShell: number, size: number, type: 'ai' | 'docker' | 'cloud' | 'sec'): THREE.Group {
    const group = new THREE.Group();

    // 1. Geodesic Outer Shell (glowing digital cage)
    const shellGeo = new THREE.IcosahedronGeometry(size, 1);
    const shellMat = new THREE.LineBasicMaterial({
      color: colorShell,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const shellWire = new THREE.LineSegments(shellGeo, shellMat);
    group.add(shellWire);

    // Vertex nodes
    const pointsMat = new THREE.PointsMaterial({
      color: colorShell,
      size: 3.5,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(shellGeo, pointsMat);
    group.add(points);

    // 2. Custom internal core representing the tech division
    if (type === 'ai') {
      // AI: Neural cluster sphere
      const coreGeo = new THREE.IcosahedronGeometry(size * 0.5, 0);
      const coreMat = new THREE.MeshBasicMaterial({
        color: colorCore,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);
    } else if (type === 'docker') {
      // Docker: Subdivided container cube
      const coreGeo = new THREE.BoxGeometry(size * 0.8, size * 0.8, size * 0.8, 2, 2, 2);
      const coreMat = new THREE.LineBasicMaterial({
        color: colorCore,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });
      const core = new THREE.LineSegments(coreGeo, coreMat);
      group.add(core);
    } else if (type === 'cloud') {
      // Cloud: Stacked database nodes
      const cylGeo = new THREE.CylinderGeometry(size * 0.5, size * 0.5, size * 0.25, 8, 1, true);
      const cylMat = new THREE.LineBasicMaterial({
        color: colorCore,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });
      const hOffset = size * 0.35;
      [-hOffset, 0, hOffset].forEach(h => {
        const cyl = new THREE.LineSegments(cylGeo, cylMat);
        cyl.position.y = h;
        group.add(cyl);
      });
    } else if (type === 'sec') {
      // Security: Octahedron cryptocore
      const coreGeo = new THREE.OctahedronGeometry(size * 0.65, 0);
      const coreMat = new THREE.MeshBasicMaterial({
        color: colorCore,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);
    }

    // 3. Local Gyroscope Shield Rings
    const localRings: THREE.Line[] = [];
    const ringRadius = size * 1.35;

    // Ring 1 (XZ)
    const ringGeo1 = new THREE.BufferGeometry();
    const ringPoints1 = [];
    for (let i = 0; i <= 32; i++) {
      const theta = (i / 32) * Math.PI * 2;
      ringPoints1.push(new THREE.Vector3(Math.cos(theta) * ringRadius, 0, Math.sin(theta) * ringRadius));
    }
    ringGeo1.setFromPoints(ringPoints1);
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x666666,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const ring1 = new THREE.Line(ringGeo1, ringMat);
    ring1.rotation.x = Math.PI / 6;
    group.add(ring1);
    localRings.push(ring1);

    // Ring 2 (XY)
    const ringGeo2 = new THREE.BufferGeometry();
    const ringPoints2 = [];
    for (let i = 0; i <= 32; i++) {
      const theta = (i / 32) * Math.PI * 2;
      ringPoints2.push(new THREE.Vector3(Math.cos(theta) * ringRadius, Math.sin(theta) * ringRadius, 0));
    }
    ringGeo2.setFromPoints(ringPoints2);
    const ring2 = new THREE.Line(ringGeo2, ringMat);
    ring2.rotation.y = Math.PI / 6;
    group.add(ring2);
    localRings.push(ring2);

    // 4. Local satellites (particles orbiting the cybersphere Locally)
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.SphereGeometry(1.5, 4, 4);
    const satMat = new THREE.MeshBasicMaterial({
      color: colorCore,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < 2; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      group.add(sat);
      satellites.push(sat);
    }

    group.userData = { localRings, satellites, ringRadius };

    return group;
  }
}