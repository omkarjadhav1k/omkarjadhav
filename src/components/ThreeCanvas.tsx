import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const ThreeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 20;

    // Create WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Particle Field (Stars/Dust)
    const particleCount = 150;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 45;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    // Particle texture canvas (soft glow)
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(249, 115, 22, 0.6)"); // Signal Orange
      grad.addColorStop(0.3, "rgba(249, 115, 22, 0.3)");
      grad.addColorStop(1, "rgba(249, 115, 22, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 2. 3D Wireframe Objects
    // Shape 1: Torus Knot (Upper Right)
    const shape1Geo = new THREE.TorusKnotGeometry(2.5, 0.7, 100, 16);
    const shape1Mat = new THREE.MeshBasicMaterial({
      color: 0xf97316, // Orange signal
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const shape1 = new THREE.Mesh(shape1Geo, shape1Mat);
    shape1.position.set(7, 4, -5);
    scene.add(shape1);

    // Shape 2: Octahedron (Middle Left)
    const shape2Geo = new THREE.OctahedronGeometry(2.2, 2);
    const shape2Mat = new THREE.MeshBasicMaterial({
      color: 0x0d9488, // Teal/Mint
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const shape2 = new THREE.Mesh(shape2Geo, shape2Mat);
    shape2.position.set(-8, -6, -2);
    scene.add(shape2);

    // Shape 3: Icosahedron (Lower Right)
    const shape3Geo = new THREE.IcosahedronGeometry(2.4, 1);
    const shape3Mat = new THREE.MeshBasicMaterial({
      color: 0xf97316, // Orange signal
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const shape3 = new THREE.Mesh(shape3Geo, shape3Mat);
    shape3.position.set(6, -18, -4);
    scene.add(shape3);

    // Track scroll & mouse coords
    const tracker = {
      mouseY: 0,
      mouseX: 0,
      targetMouseY: 0,
      targetMouseX: 0,
      scrollY: window.scrollY,
      targetScrollY: window.scrollY,
      scrollVelocity: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      tracker.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 5;
      tracker.targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 5;
    };

    const handleScroll = () => {
      const newScrollY = window.scrollY;
      tracker.scrollVelocity = Math.abs(newScrollY - tracker.targetScrollY);
      tracker.targetScrollY = newScrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation variables
    let animFrameId: number;

    const tick = () => {
      animFrameId = requestAnimationFrame(tick);

      // Damp mouse coordinates
      tracker.mouseX += (tracker.targetMouseX - tracker.mouseX) * 0.05;
      tracker.mouseY += (tracker.targetMouseY - tracker.mouseY) * 0.05;

      // Damp scroll value
      tracker.scrollY += (tracker.targetScrollY - tracker.scrollY) * 0.06;

      // Scroll speed decay
      tracker.scrollVelocity *= 0.95;

      // Camera sway based on mouse
      camera.position.x = tracker.mouseX * 0.8;
      camera.position.y = tracker.mouseY * 0.8;
      camera.lookAt(0, 0, 0);

      // Parallax layout mapping scroll -> physical 3D y positions
      // When user scrolls down, shape y values move up relative to camera view
      shape1.position.y = 4 + (tracker.scrollY * 0.015);
      shape2.position.y = -6 + (tracker.scrollY * 0.012);
      shape3.position.y = -18 + (tracker.scrollY * 0.014);

      // Continual rotations, accelerated by scroll speed velocity
      const speedMult = 1 + tracker.scrollVelocity * 0.1;
      
      shape1.rotation.y += 0.003 * speedMult;
      shape1.rotation.x += 0.002 * speedMult;

      shape2.rotation.y += 0.004 * speedMult;
      shape2.rotation.z += 0.002 * speedMult;

      shape3.rotation.x += 0.003 * speedMult;
      shape3.rotation.y += 0.001 * speedMult;

      // Drift background particles slowly
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;

      renderer.render(scene, camera);
    };

    tick();

    // Clean up WebGL resources
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);

      shape1Geo.dispose();
      shape1Mat.dispose();
      shape2Geo.dispose();
      shape2Mat.dispose();
      shape3Geo.dispose();
      shape3Mat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 bg-transparent opacity-75"
    />
  );
};
