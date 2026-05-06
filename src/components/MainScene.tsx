'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useState, useEffect } from 'react';
import { ShaderMaterial, PlaneGeometry, Mesh } from 'three';
import { MetalDistortionShader } from '@/shaders/MetalDistortionShader';
import { Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Glitch } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { audioData } from '@/components/AudioEngine';

function MetalDistortionPlane() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rippleStrength, setRippleStrength] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
      });
    };

    const handleClick = () => {
      setRippleStrength(1);
      setTimeout(() => setRippleStrength(0), 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
      materialRef.current.uniforms.distortion.value = 0.1 + audioData.frequency * 0.5;
      materialRef.current.uniforms.chromaticAberration.value = 0.01 + audioData.frequency * 0.1;
      materialRef.current.uniforms.mouseX.value = mousePos.x;
      materialRef.current.uniforms.mouseY.value = mousePos.y;
      materialRef.current.uniforms.rippleStrength.value = rippleStrength;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        {...MetalDistortionShader}
        transparent
      />
    </mesh>
  );
}

export default function MainScene() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <Suspense fallback={null}>
          <MetalDistortionPlane />
          <EffectComposer>
            <Bloom intensity={0.5} kernelSize={3} luminanceThreshold={0.9} luminanceSmoothing={0.025} />
          </EffectComposer>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}