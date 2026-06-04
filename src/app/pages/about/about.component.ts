import { Component, ElementRef, Renderer2, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy, AfterViewInit {

  // ── 3D View Queries ────────────────────────────────────────────────────────
  @ViewChild('cyberCoreCanvas') cyberCoreCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChildren('hobbyCanvas') hobbyCanvases?: QueryList<ElementRef<HTMLCanvasElement>>;

  // ── 3D Cyber Core Fields ───────────────────────────────────────────────────
  private cyberRenderer?: THREE.WebGLRenderer;
  private cyberScene?: THREE.Scene;
  private cyberCamera?: THREE.PerspectiveCamera;
  private cyberGroup?: THREE.Group;
  private cyberAnimId?: number;
  private cyberResizeHandler?: () => void;
  
  private coreTiltTargetX = 0;
  private coreTiltTargetY = 0;
  private coreTiltCurrentX = 0;
  private coreTiltCurrentY = 0;
  private isHoveringCore = false;

  // ── 3D Hobbies Fields ──────────────────────────────────────────────────────
  private hobbyContexts: {
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    mesh?: THREE.Object3D;
    animId?: number;
    speed: number;
    targetSpeed: number;
  }[] = [];

  // ── Nav ───────────────────────────────────────────────────────────────────
  navItems = [
    { id: 'about',      icon: 'fas fa-user',           label: 'About'      },
    { id: 'education',  icon: 'fas fa-graduation-cap', label: 'Education'  },
    { id: 'experience', icon: 'fas fa-briefcase',      label: 'Experience' },
    { id: 'hobbies',    icon: 'fas fa-guitar',         label: 'Hobbies'    },
    { id: 'contact',    icon: 'fas fa-envelope',       label: 'Contact'    },
  ];

  quickNav = [
    { id: 'education',  label: 'Education'  },
    { id: 'experience', label: 'Experience' },
    { id: 'hobbies',    label: 'Hobbies'    },
    { id: 'contact',    label: 'Contact'    },
  ];

  activeSection = 'about';

  // ── About content ─────────────────────────────────────────────────────────
  chips = ['AI / ML', 'Cybersecurity', 'Full Stack', 'Angular', 'Python', 'LLMs', 'Pen Testing'];

  skills = [
    { name: 'Python',                      pct: 88 },
    { name: 'Angular / TypeScript',        pct: 82 },
    { name: 'AI / ML (sklearn, LangChain)',pct: 75 },
    { name: 'Cybersecurity & Pen Testing', pct: 70 },
    { name: 'React / JavaScript',          pct: 65 },
  ];

  stats = [
    { value: '5', suffix: '+', label: 'Projects shipped' },
    { value: '3', suffix: '+', label: 'Years coding'     },
    { value: '2', suffix: 'x', label: 'Hackathons'       },
    { value: '∞', suffix: '',  label: 'Curiosity'        },
  ];

  currently = [
    { active: true,  title: 'MSc AI & Cybersecurity',  body: 'Christ University, Bangalore — 2025 to present' },
    { active: true,  title: 'Building',                body: 'Local RAG systems, web vulnerability scanners, and ML classifiers' },
    { active: false, title: 'Learning',                body: 'Advanced cryptography, adversarial ML & red-team methodologies' },
    { active: false, title: 'Listening to',            body: 'Blues guitar jams — anything with a good riff' },
  ];

  // ── Skill bar trigger ─────────────────────────────────────────────────────
  skillsVisible = false;
  private skillsObserver!: IntersectionObserver;

  // ── Timeline data ─────────────────────────────────────────────────────────
  education = [
    {
      year: '2025 – Present',
      title: 'MSc AI & Cybersecurity — Christ University, Bangalore',
      body: 'Exploring network security, cryptography, and AI algorithms. Actively involved in club activities and ongoing research.',
      tags: ['Cryptography', 'Network Security', 'AI Algorithms'],
    },
    {
      year: '2022 – 2025',
      title: 'BCA — Kristu Jayanti College',
      body: 'Deepened skills in C, Java, Python, DSA, OS, Software Engineering, and Git through hands-on projects and club involvement.',
      tags: ['Java', 'Python', 'DSA', 'Git'],
    },
    {
      year: '2022',
      title: "2nd PUC CEBA — St. Joseph's Pre-University College",
      body: 'Studied C++, HTML, SQL basics alongside Accounts, Economics, and Business Studies.',
      tags: ['C++', 'HTML', 'SQL'],
    },
    {
      year: '2020',
      title: '10th Grade — ICSE',
      body: "St. Germain's Academy. Built strong interpersonal and communication foundations.",
      tags: ['Communication', 'Academics'],
    },
  ];

  experience = [
    {
      year: 'Jun 2024 – Jul 2024',
      title: 'Front-End Developer — Kristu Jayanti SDC',
      body: 'Built scalable layouts with Angular routing, implemented authentication guards, and established an efficient Git workflow and version control system for the team.',
      tags: ['Angular', 'Auth Guards', 'Git', 'UI Design'],
    },
    {
      year: 'Nov 2023 – Jun 2024',
      title: 'Google Developer Student Club — Member',
      body: "Participated in Blitz Code, Angular Study Jam, and React Study Jam. Part of the organizing team for Velocity — a national-level coding competition. Joined Google's Generative AI Jam program.",
      tags: ['Angular', 'React', 'Gen AI', 'Event Org'],
    },
  ];

  hobbies = [
    {
      index: '01', chip: 'Creative', icon: 'fas fa-music', title: 'Music',
      statusLabel: 'Practice streak', statusPct: 85,
      items: ['Electric guitar — rock & blues', 'Keyboard & music theory', 'Singing & vocal training', 'DAW production & sound design'],
      tags: ['Guitar', 'Keyboard', 'Singing', 'DAW']
    },
    {
      index: '02', chip: 'Active', icon: 'fas fa-gamepad', title: 'Gaming',
      statusLabel: 'Weekly hrs', statusPct: 75,
      items: ['Open-world RPG exploration', 'Indie puzzle & strategy games', 'Casual FPS & battle royale', 'Game modding & community builds'],
      tags: ['Open World', 'RPG', 'Indie', 'FPS']
    },
    {
      index: '03', chip: 'Outdoor', icon: 'fas fa-person-biking', title: 'Biking',
      statusLabel: 'Rides / month', statusPct: 55,
      items: ['Mountain trail riding', 'Road cycling & long routes', 'Urban commute & city rides', 'Bike maintenance & upgrades'],
      tags: ['Bike', 'Road', 'Urban']
    }
  ];

  // ── Internals ─────────────────────────────────────────────────────────────
  private revealObserver!: IntersectionObserver;
  private readonly sectionIds = ['about', 'education', 'experience', 'hobbies', 'contact'];

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.loadAssets();
    setTimeout(() => {
      this.initReveal();
      this.initSectionTracker();
      this.initSkillsObserver();
    }, 150);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initCyberCore3D();
        this.initHobbies3D();
        
        this.hobbyCanvases?.changes.subscribe(() => {
          this.initHobbies3D();
        });
      }, 50);
    }
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.skillsObserver?.disconnect();
    window.removeEventListener('scroll', this.onScroll);

    if (isPlatformBrowser(this.platformId)) {
      if (this.cyberAnimId) {
        cancelAnimationFrame(this.cyberAnimId);
      }
      if (this.cyberResizeHandler) {
        window.removeEventListener('resize', this.cyberResizeHandler);
      }
      if (this.cyberScene) {
        this.disposeScene(this.cyberScene);
      }
      this.cyberRenderer?.dispose();

      this.hobbyContexts.forEach(ctx => {
        if (ctx.animId) cancelAnimationFrame(ctx.animId);
        if (ctx.scene) this.disposeScene(ctx.scene);
        if (ctx.renderer) ctx.renderer.dispose();
      });
      this.hobbyContexts = [];
    }
  }

  // Scroll-based section tracker — works regardless of section height
  private onScroll = (): void => {
    const offsets = this.sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return { id, top: Infinity };
      return { id, top: Math.abs(el.getBoundingClientRect().top) };
    });
    offsets.sort((a, b) => a.top - b.top);
    if (offsets[0]) this.activeSection = offsets[0].id;
  };

  private initSectionTracker(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  private initReveal(): void {
    const els = this.el.nativeElement.querySelectorAll('.reveal') as NodeListOf<HTMLElement>;
    this.revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.remove('opacity-0', 'translate-y-8');
        } else {
          (e.target as HTMLElement).classList.add('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => this.revealObserver.observe(el));
  }

  // Trigger skill bars when the skills card scrolls into view
  private initSkillsObserver(): void {
    const skillCard = this.el.nativeElement.querySelector('.skill-row')?.closest('.ab-skill-card')
      ?? this.el.nativeElement.querySelectorAll('.reveal')[2]; // skills card is 3rd reveal
    if (!skillCard) { this.skillsVisible = true; return; }
    this.skillsObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.skillsVisible = true;
        this.skillsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    this.skillsObserver.observe(skillCard);
  }

  private loadAssets(): void {
    const assets = [
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
    ];
    assets.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = this.renderer.createElement('link');
        this.renderer.setAttribute(link, 'rel', 'stylesheet');
        this.renderer.setAttribute(link, 'href', href);
        this.renderer.appendChild(document.head, link);
      }
    });
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  downloadResume(): void {
    window.location.href = 'assets/resume.pdf';
  }

  // ── 3D Core Implementation ───────────────────────────────────────────────
  private initCyberCore3D(): void {
    if (!this.cyberCoreCanvas) return;
    const canvas = this.cyberCoreCanvas.nativeElement;

    const width = canvas.clientWidth || 300;
    const height = canvas.clientHeight || 240;

    const scene = new THREE.Scene();
    this.cyberScene = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 110;
    this.cyberCamera = camera;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.cyberRenderer = renderer;

    const group = new THREE.Group();
    scene.add(group);
    this.cyberGroup = group;

    // 1. Outer protective Cryptoshield (Icosahedron wireframe)
    const outerGeo = new THREE.IcosahedronGeometry(26, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // 2. Central Server Database Stack (3 stacked wireframe database containers)
    const serverGroup = new THREE.Group();
    group.add(serverGroup);

    const boxGeo = new THREE.BoxGeometry(9, 4.5, 9);
    const serverMat1 = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const serverMat2 = new THREE.MeshBasicMaterial({
      color: 0x888888,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });

    const server1 = new THREE.Mesh(boxGeo, serverMat1);
    server1.position.y = 6.5;
    const server2 = new THREE.Mesh(boxGeo, serverMat2);
    server2.position.y = 0;
    const server3 = new THREE.Mesh(boxGeo, serverMat1);
    server3.position.y = -6.5;

    serverGroup.add(server1);
    serverGroup.add(server2);
    serverGroup.add(server3);

    // Vertical connecting data line (central axis core)
    const axisGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -12, 0),
      new THREE.Vector3(0, 12, 0)
    ]);
    const axisMat = new THREE.LineBasicMaterial({
      color: 0xdc2626,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const axisLine = new THREE.Line(axisGeo, axisMat);
    serverGroup.add(axisLine);

    // 3. Vertical Scanning Firewall Laser Ring
    const scannerRadius = 29;
    const scannerGeo = new THREE.BufferGeometry();
    const scannerPoints = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      scannerPoints.push(Math.cos(theta) * scannerRadius, 0, Math.sin(theta) * scannerRadius);
    }
    scannerGeo.setAttribute('position', new THREE.Float32BufferAttribute(scannerPoints, 3));
    const scannerMat = new THREE.LineBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const scannerRing = new THREE.Line(scannerGeo, scannerMat);
    scannerRing.rotation.x = Math.PI / 18;
    group.add(scannerRing);

    // 4. Orbiting network packet particles
    const packetCount = 80;
    const packetGeo = new THREE.BufferGeometry();
    const packetPositions = [];
    const packetSpeeds: number[] = [];
    const packetRadii: number[] = [];
    const packetAngles: number[] = [];
    const packetYOffs: number[] = [];

    for (let i = 0; i < packetCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 12 + Math.random() * 11;
      const y = (Math.random() - 0.5) * 22;

      packetPositions.push(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      packetSpeeds.push(0.005 + Math.random() * 0.015);
      packetRadii.push(radius);
      packetAngles.push(angle);
      packetYOffs.push(y);
    }
    packetGeo.setAttribute('position', new THREE.Float32BufferAttribute(packetPositions, 3));
    
    const packetMat = new THREE.PointsMaterial({
      color: 0xff0000,
      size: 1.8,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const packetSystem = new THREE.Points(packetGeo, packetMat);
    group.add(packetSystem);

    // Resize listener
    const resizeHandler = () => {
      const w = canvas.clientWidth || 300;
      const h = canvas.clientHeight || 240;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', resizeHandler);
    this.cyberResizeHandler = resizeHandler;

    let time = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      const isHover = this.isHoveringCore;
      const baseRotationSpeed = isHover ? 0.015 : 0.004;

      // 1. Rotate outer shield on multiple axes
      outerMesh.rotation.y += baseRotationSpeed;
      outerMesh.rotation.x += baseRotationSpeed * 0.3;

      // 2. Rotate server database containers in opposite directions/phases
      server1.rotation.y += baseRotationSpeed * 1.5;
      server2.rotation.y -= baseRotationSpeed * 1.0;
      server3.rotation.y += baseRotationSpeed * 1.3;

      // 3. Vertical laser sweep animation
      time += isHover ? 0.05 : 0.018;
      scannerRing.position.y = Math.sin(time) * 17.5;
      scannerMat.opacity = 0.5 + Math.abs(Math.cos(time * 2)) * 0.45;

      // 4. Update packet particles positions in 3D orbit
      const posAttr = packetGeo.attributes['position'] as THREE.BufferAttribute;
      for (let i = 0; i < packetCount; i++) {
        const speedMultiplier = isHover ? 3.0 : 1.0;
        packetAngles[i] += packetSpeeds[i] * speedMultiplier;
        
        const angle = packetAngles[i];
        const radius = packetRadii[i];
        const y = packetYOffs[i];
        
        posAttr.setXYZ(
          i,
          Math.cos(angle) * radius,
          y + Math.sin(time + radius) * 0.5,
          Math.sin(angle) * radius
        );
      }
      posAttr.needsUpdate = true;
      packetSystem.rotation.y += 0.002;

      // Mouse Parallax Tilt
      this.coreTiltCurrentX = lerp(this.coreTiltCurrentX, this.coreTiltTargetX, 0.05);
      this.coreTiltCurrentY = lerp(this.coreTiltCurrentY, this.coreTiltTargetY, 0.05);
      group.rotation.x = this.coreTiltCurrentX;
      group.rotation.y = this.coreTiltCurrentY;

      renderer.render(scene, camera);
      this.cyberAnimId = requestAnimationFrame(animate);
    };

    animate();
  }

  onCoreMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const r = card.getBoundingClientRect();
    const x = (event.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const y = (event.clientY - (r.top + r.height / 2)) / (r.height / 2);
    this.coreTiltTargetX = -y * 0.22;
    this.coreTiltTargetY = x * 0.22;
    this.isHoveringCore = true;
  }

  onCoreMouseLeave(): void {
    this.coreTiltTargetX = 0;
    this.coreTiltTargetY = 0;
    this.isHoveringCore = false;
  }

  // ── 3D Hobbies Implementation ─────────────────────────────────────────────
  private initHobbies3D(): void {
    if (!this.hobbyCanvases) return;

    this.hobbyContexts.forEach(ctx => {
      if (ctx.animId) cancelAnimationFrame(ctx.animId);
      if (ctx.scene) this.disposeScene(ctx.scene);
      if (ctx.renderer) ctx.renderer.dispose();
    });
    this.hobbyContexts = [];

    const canvases = this.hobbyCanvases.toArray();
    canvases.forEach((canvasRef, index) => {
      const canvas = canvasRef.nativeElement;
      const width = 64;
      const height = 64;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 1, 100);
      camera.position.z = 32;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      let mesh: THREE.Object3D;

      if (index === 0) {
        // Music: Torus Knot Geometry
        const geo = new THREE.TorusKnotGeometry(5.8, 1.4, 64, 8, 2, 3);
        const mat = new THREE.MeshBasicMaterial({
          color: 0xdc2626,
          wireframe: true,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending
        });
        mesh = new THREE.Mesh(geo, mat);
      } else if (index === 1) {
        // Gaming: Icosahedron (d20)
        const geo = new THREE.IcosahedronGeometry(7.2, 0);
        const mat = new THREE.MeshBasicMaterial({
          color: 0xdc2626,
          wireframe: true,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending
        });
        mesh = new THREE.Mesh(geo, mat);
      } else {
        // Biking: concentric spinning rings
        const group = new THREE.Group();
        const matRed = new THREE.MeshBasicMaterial({
          color: 0xdc2626,
          wireframe: true,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending
        });
        const matGrey = new THREE.MeshBasicMaterial({
          color: 0x888888,
          wireframe: true,
          transparent: true,
          opacity: 0.35,
          blending: THREE.AdditiveBlending
        });

        const geo1 = new THREE.TorusGeometry(7.2, 0.7, 8, 24);
        const ring1 = new THREE.Mesh(geo1, matRed);
        group.add(ring1);

        const geo2 = new THREE.TorusGeometry(4.8, 0.5, 8, 20);
        const ring2 = new THREE.Mesh(geo2, matGrey);
        ring2.rotation.x = Math.PI / 2;
        group.add(ring2);

        mesh = group;
      }

      scene.add(mesh);

      const ctx: any = {
        renderer,
        scene,
        camera,
        mesh,
        speed: 0.012,
        targetSpeed: 0.012,
        animId: 0
      };

      const animateHobby = () => {
        ctx.speed += (ctx.targetSpeed - ctx.speed) * 0.1;

        if (index === 0) {
          ctx.mesh.rotation.y += ctx.speed;
          ctx.mesh.rotation.z += ctx.speed * 0.4;
        } else if (index === 1) {
          ctx.mesh.rotation.y += ctx.speed;
          ctx.mesh.rotation.x += ctx.speed * 0.7;
        } else {
          const children = ctx.mesh.children;
          if (children.length >= 2) {
            children[0].rotation.z += ctx.speed;
            children[1].rotation.y -= ctx.speed * 1.4;
          }
          ctx.mesh.rotation.x += 0.003;
        }

        renderer.render(scene, camera);
        ctx.animId = requestAnimationFrame(animateHobby);
      };

      animateHobby();
      this.hobbyContexts.push(ctx);
    });
  }

  onHobbyMouseEnter(index: number): void {
    if (this.hobbyContexts[index]) {
      this.hobbyContexts[index].targetSpeed = 0.06;
    }
  }

  onHobbyMouseLeave(index: number): void {
    if (this.hobbyContexts[index]) {
      this.hobbyContexts[index].targetSpeed = 0.012;
    }
  }

  // Recursive scene disposal helper
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
}