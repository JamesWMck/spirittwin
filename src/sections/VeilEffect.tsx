import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function generateVeilTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(240, 162, 2, 1)');
  gradient.addColorStop(1, 'rgba(240, 162, 2, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

export default function VeilEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Avoid re-creating if already mounted
    if (cleanupRef.current) return;

    const particleCount = 2000;
    const clock = new THREE.Clock();
    const mouse = { x: 0, y: 0 };

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0908, 0.02);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.SphereGeometry(0.05, 8, 8);
    const material = new THREE.MeshBasicMaterial({
      color: 0xF0A202,
      transparent: true,
      opacity: 0.6,
      map: generateVeilTexture(),
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, particleCount);
    group.add(instancedMesh);

    const dummy = new THREE.Object3D();
    const velocities = new Float32Array(particleCount * 3);

    // Simplex noise approximation for movement
    const noise = (x: number, y: number, z: number) => {
      return Math.sin(x * 3.7 + z) * Math.cos(y * 2.3 + z) * 0.5 +
             Math.sin(x * 1.1 + y * 2.9 + z * 0.7) * 0.5;
    };

    for (let i = 0; i < particleCount; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 - 1;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    container.appendChild(renderer.domElement);

    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      group.rotation.y = Math.sin(time * 0.05) * 0.1;
      group.rotation.x = Math.cos(time * 0.03) * 0.05;

      for (let i = 0; i < particleCount; i++) {
        instancedMesh.getMatrixAt(i, dummy.matrix);
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);

        const noiseVal = noise(
          dummy.position.x * 0.5,
          dummy.position.y * 0.5,
          time * 0.2
        ) * 0.02;

        dummy.position.x += velocities[i * 3] + noiseVal;
        dummy.position.y += velocities[i * 3 + 1] + noiseVal;
        dummy.position.z += velocities[i * 3 + 2] + noiseVal;

        if (mouse.x !== 0 || mouse.y !== 0) {
          const mouseForceX = mouse.x * 0.02;
          const mouseForceY = mouse.y * 0.02;
          dummy.position.x -= mouseForceX;
          dummy.position.y -= mouseForceY;
        }

        if (Math.abs(dummy.position.x) > 8) velocities[i * 3] *= -1;
        if (Math.abs(dummy.position.y) > 8) velocities[i * 3 + 1] *= -1;
        if (Math.abs(dummy.position.z) > 5) velocities[i * 3 + 2] *= -1;

        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    cleanupRef.current = () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
