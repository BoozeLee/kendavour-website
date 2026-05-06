import * as THREE from 'three';

export const MetalDistortionShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0.0 },
    distortion: { value: 0.1 },
    chromaticAberration: { value: 0.01 },
    mouseX: { value: 0.0 },
    mouseY: { value: 0.0 },
    rippleStrength: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float distortion;
    uniform float chromaticAberration;
    varying vec2 vUv;

    // Noise function for film grain and digital grit
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    // Liquid chrome warp
    vec2 warp(vec2 uv, float t) {
      vec2 offset = vec2(
        sin(uv.y * 10.0 + t * 2.0) * distortion,
        cos(uv.x * 10.0 + t * 2.0) * distortion
      );
      return uv + offset * 0.1;
    }

    void main() {
      vec2 uv = vUv;

      // Mouse ripple distortion
      vec2 mousePos = vec2(mouseX, mouseY);
      float dist = distance(uv, mousePos);
      float ripple = sin(dist * 20.0 - time * 5.0) * exp(-dist * 10.0) * rippleStrength;

      // Apply metallic distortion with ripple
      vec2 warpedUv = warp(uv + vec2(ripple * 0.1), time);

      // Chromatic aberration
      vec2 redOffset = vec2(chromaticAberration, 0.0);
      vec2 blueOffset = vec2(-chromaticAberration, 0.0);

      float r = texture2D(tDiffuse, warpedUv + redOffset).r;
      float g = texture2D(tDiffuse, warpedUv).g;
      float b = texture2D(tDiffuse, warpedUv + blueOffset).b;

      // Add procedural noise for film grain
      float n1 = noise(uv * 200.0 + time * 0.5) * 0.05;
      float n2 = noise(uv * 50.0 - time * 0.2) * 0.02;
      vec3 color = vec3(r, g, b) + n1 + n2;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
};