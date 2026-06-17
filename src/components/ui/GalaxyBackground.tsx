import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GalaxyParameters {
  count: number;
  size: number;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  insideColor: string;
  outsideColor: string;
}

const GALAXY_PARAMS: GalaxyParameters = {
  count: 60000,
  size: 0.012,
  radius: 2.15,
  branches: 3,
  spin: 5,
  randomness: 5,
  randomnessPower: 4,
  insideColor: '#9146ff',
  outsideColor: '#651fff',
};

const createGalaxy = (scene: THREE.Scene, params: GalaxyParameters) => {
  const material = new THREE.PointsMaterial({
    size: params.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);
  const colorInside = new THREE.Color(params.insideColor);
  const colorOutside = new THREE.Color(params.outsideColor);

  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3;
    const radius = Math.pow(Math.random() * params.randomness, Math.random() * params.radius);
    const spinAngle = radius * params.spin;
    const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2;

    const negPos = [1, -1];
    const randomX =
      Math.pow(Math.random(), params.randomnessPower) *
      negPos[Math.floor(Math.random() * negPos.length)];
    const randomY =
      Math.pow(Math.random(), params.randomnessPower) *
      negPos[Math.floor(Math.random() * negPos.length)];
    const randomZ =
      Math.pow(Math.random(), params.randomnessPower) *
      negPos[Math.floor(Math.random() * negPos.length)];

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, (Math.random() * radius) / params.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  return { geometry, material, points };
};

export const GalaxyBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 w-full h-full pointer-events-none';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const galaxy = createGalaxy(scene, GALAXY_PARAMS);

    const sizes = {
      width: container.clientWidth,
      height: container.clientHeight,
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(3, 3, 3);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const clock = new THREE.Clock();
    let animationId = 0;

    const resize = () => {
      sizes.width = container.clientWidth;
      sizes.height = container.clientHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      camera.position.x = Math.cos(elapsedTime * 0.05) * 3;
      camera.position.z = Math.sin(elapsedTime * 0.05) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.cancelAnimationFrame(animationId);
      resizeObserver.disconnect();

      galaxy.geometry.dispose();
      galaxy.material.dispose();
      scene.remove(galaxy.points);

      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-dark-950/60 to-dark-950/90 pointer-events-none z-[1]" />
    </div>
  );
};
