'use client';

import { motion } from 'framer-motion';
import { atom, useAtom } from 'jotai';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const fragmentShader = `
varying vec2 v_texcoord;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;
uniform float u_hoverStrength;
uniform bool u_invertMouse;
uniform bool u_isDarkMode;

#define PI 3.1415926535897932384626433832795
#define TWO_PI 6.2831853071795864769252867665590

vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}

#define st0 coord(gl_FragCoord.xy)
#define mx coord(u_mouse)

float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

float sdCircle(in vec2 st, in vec2 center) {
    return length(st - center) * 2.0;
}

float sdPoly(in vec2 p, in float w, in int sides) {
    float a = atan(p.x, p.y) + PI;
    float r = TWO_PI / float(sides);
    float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));
    return d * 2.0 - w;
}

float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
}

float fill(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}

float stroke(float x, float size, float w, float edge) {
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

void main() {
    vec2 st = st0 + 0.5;
    vec2 posMouse = vec2(0.5, 0.5); // Set to middle of the screen
    
    float size = 1.2 + sin(u_time) * 0.1;
    float roundness = 0.4 + sin(u_time * 0.5) * 0.1;
    float borderSize = 0.05 + sin(u_time * 0.7) * 0.02;
    float circleSize = 0.3 + sin(u_time * 0.8) * 0.05;
    float circleEdge = 0.5 + sin(u_time * 0.6) * 0.1;
    
    float sdfCircle = fill(
        sdCircle(st, posMouse),
        circleSize,
        circleEdge
    );
    
    float sdf;
    if (VAR == 0) {
        sdf = sdRoundRect(st, vec2(size), roundness);
        sdf = stroke(sdf, 0.0, borderSize, sdfCircle) * 4.0;
    } else if (VAR == 1) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = fill(sdf, 0.6, sdfCircle) * 1.2;
    } else if (VAR == 2) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = stroke(sdf, 0.58, 0.02, sdfCircle) * 4.0;
    } else if (VAR == 3) {
        sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);
        sdf = fill(sdf, 0.05, sdfCircle) * 1.4;
    }
    
    vec3 gradient = mix(
        mix(u_color1, u_color2, 0.5 + 0.5 * cos(u_time + st.x + 0.0)),
        mix(u_color3, u_color4, 0.5 + 0.5 * cos(u_time + st.y + 2.0)),
        0.5 + 0.5 * cos(u_time + st.x + st.y + 4.0)
    );
    
    vec3 shapeColor = sdf * gradient;
    
    float mouseEffect = u_invertMouse ? 1.0 - sdfCircle : sdfCircle;
    shapeColor = mix(shapeColor, vec3(1.0) - shapeColor, u_hoverStrength * mouseEffect);
    
    if (u_isDarkMode) {
        shapeColor = mix(shapeColor, vec3(1.0), 0.2);
    } else {
        shapeColor = mix(shapeColor, vec3(0.0), 0.1);
    }
    
    gl_FragColor = vec4(shapeColor, sdf);
}
`;

interface ShaderConfig {
    variation: number;
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    enableHover: boolean;
    invertMouse: boolean;
    width: string;
    height: string;
}

const initialState: ShaderConfig = {
    variation: 2, // Set to 3 for CircleOff
    color1: '#D5F981',
    color2: '#A1BBE7',
    color3: '#F2BAE2',
    color4: '#68E8FA',
    enableHover: true,
    invertMouse: false,
    width: '100%',
    height: '100%',
};

export const configAtom = atom<ShaderConfig>(initialState);

export function ShaderLensBlur() {
    const [config] = useAtom(configAtom);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const rafRef = useRef<number | null>(null);
    const [isInteracting, setIsInteracting] = useState(false);
    const { theme } = useTheme();

    const updateSize = useCallback(() => {
        if (
            !containerRef.current ||
            !canvasRef.current ||
            !rendererRef.current ||
            !cameraRef.current ||
            !materialRef.current
        )
            return;

        const { clientWidth: w, clientHeight: h } = containerRef.current;
        const aspect = w / h;

        cameraRef.current.left = -aspect;
        cameraRef.current.right = aspect;
        cameraRef.current.top = 1;
        cameraRef.current.bottom = -1;
        cameraRef.current.updateProjectionMatrix();

        rendererRef.current.setSize(w, h);
        materialRef.current.uniforms.u_resolution.value.set(w, h);
    }, []);

    const animate = useCallback(
        (time: number) => {
            if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !materialRef.current) return;

            materialRef.current.uniforms.u_time.value = time * 0.001;
            materialRef.current.uniforms.u_hoverStrength.value = isInteracting || config.enableHover ? 0.3 : 0;

            rendererRef.current.render(sceneRef.current, cameraRef.current);
            rafRef.current = requestAnimationFrame(animate);
        },
        [config.enableHover, isInteracting]
    );

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
        camera.position.z = 1;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            vertexShader: `
        varying vec2 v_texcoord;
        void main() {
          gl_Position = vec4(position, 1.0);
          v_texcoord = uv;
        }
      `,
            fragmentShader,
            uniforms: {
                u_mouse: { value: new THREE.Vector2(0.5, 0.5) }, // Set to middle of the screen
                u_resolution: { value: new THREE.Vector2() },
                u_pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                u_time: { value: 0 },
                u_color1: { value: new THREE.Color(config.color1) },
                u_color2: { value: new THREE.Color(config.color2) },
                u_color3: { value: new THREE.Color(config.color3) },
                u_color4: { value: new THREE.Color(config.color4) },
                u_hoverStrength: { value: 0 },
                u_invertMouse: { value: config.invertMouse },
                u_isDarkMode: { value: theme === 'dark' },
            },
            defines: {
                VAR: config.variation,
            },
            transparent: true,
            blending: THREE.NormalBlending,
        });
        materialRef.current = material;

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        updateSize();
        rafRef.current = requestAnimationFrame(animate);

        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(containerRef.current);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (rendererRef.current) rendererRef.current.dispose();
            if (containerRef.current) resizeObserver.unobserve(containerRef.current);
        };
    }, [config, updateSize, animate, theme]);

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.u_color1.value.set(config.color1);
            materialRef.current.uniforms.u_color2.value.set(config.color2);
            materialRef.current.uniforms.u_color3.value.set(config.color3);
            materialRef.current.uniforms.u_color4.value.set(config.color4);
            materialRef.current.uniforms.u_invertMouse.value = config.invertMouse;
            materialRef.current.uniforms.u_isDarkMode.value = theme === 'dark';
            materialRef.current.defines.VAR = config.variation;
            materialRef.current.needsUpdate = true;
        }
    }, [config, theme]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='relative touch-none'
            style={{
                width: config.width,
                height: config.height,
                backgroundColor: 'transparent',
                borderRadius: '8px',
            }}
        >
            <canvas ref={canvasRef} className='h-full w-full touch-none' />
        </motion.div>
    );
}

export default ShaderLensBlur;
