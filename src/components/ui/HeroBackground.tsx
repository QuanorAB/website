"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Interactive 3D Space Grid Background
 * 
 * Dramatic perspective grid that extends into space with rolling waves.
 * Mouse-responsive with strong depth perception and glowing effects.
 * Uses brand colors #006A55 (primary teal) -> #D2F7F0 (light mint)
 */

export function HeroBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Grid settings - larger cells for more dramatic perspective
        const gridSize = 60;

        let time = 0;

        const setSize = () => {
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
        };
        setSize();
        window.addEventListener("resize", setSize);

        // Mouse movement handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.targetX = e.clientX / width;
            mouseRef.current.targetY = e.clientY / height;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Touch handler for mobile
        const handleTouch = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouseRef.current.targetX = e.touches[0].clientX / width;
                mouseRef.current.targetY = e.touches[0].clientY / height;
            }
        };
        window.addEventListener("touchmove", handleTouch);

        // Strong wave function - creates dramatic rolling waves
        const getWaveHeight = (x: number, y: number, t: number): number => {
            // Primary rolling wave moving forward
            const wave1 = Math.sin(y * 0.008 - t * 1.5) * 60;
            // Secondary cross wave
            const wave2 = Math.sin(x * 0.012 + t * 0.8) * Math.cos(y * 0.01 - t * 0.5) * 35;
            // Tertiary ripple
            const wave3 = Math.sin(x * 0.02 - y * 0.015 + t * 1.2) * 20;
            // Small detail waves
            const wave4 = Math.sin(x * 0.04 + y * 0.03 + t * 2) * 8;

            return wave1 + wave2 + wave3 + wave4;
        };

        const animate = (timestamp: number) => {
            time = timestamp * 0.001;

            // Smooth mouse interpolation
            mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.03;
            mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.03;

            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height * 0.6; // Lower center for better perspective

            // Calculate perspective based on mouse
            const mouseOffsetX = (mouseRef.current.x - 0.5) * 0.4;
            const mouseOffsetY = (mouseRef.current.y - 0.5) * 0.3;

            // Perspective settings
            const horizon = height * 0.2; // Where the grid converges
            const fov = 600; // Field of view

            // Grid extends from viewer into distance
            const gridLinesZ = 40; // Lines going into distance
            const gridLinesX = 50; // Lines going left-right

            // Project 3D point to screen with strong perspective
            const project = (worldX: number, worldZ: number, waveY: number) => {
                // Apply mouse rotation to world coordinates
                const rotatedX = worldX + worldZ * mouseOffsetX * 2;
                const rotatedZ = worldZ;

                // Prevent division by zero
                const z = Math.max(0.1, rotatedZ);

                // Perspective projection
                const scale = fov / (fov + z * 3);

                // Screen position
                const screenX = centerX + rotatedX * scale + (mouseOffsetX * z * 0.5);
                const screenY = centerY - (waveY * scale * 0.8) - (z * scale * 1.2) + (mouseOffsetY * z * 0.3);

                // Depth-based opacity - closer = brighter
                const depthFade = Math.max(0, 1 - z / 800);

                return { x: screenX, y: screenY, scale, depth: z, opacity: depthFade };
            };

            // Draw the grid - horizontal lines (constant Z, varying X)
            for (let zi = 0; zi < gridLinesZ; zi++) {
                const z = zi * 25 + 50; // Distance from viewer

                ctx.beginPath();

                for (let xi = -gridLinesX; xi <= gridLinesX; xi++) {
                    const x = xi * gridSize;
                    const wave = getWaveHeight(x, z, time);
                    const point = project(x, z, wave);

                    if (xi === -gridLinesX) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                }

                // Fade with distance
                const zNorm = zi / gridLinesZ;
                const opacity = (0.15 - zNorm * 0.12) * (1 - zNorm * 0.5);

                ctx.strokeStyle = `rgba(0, 106, 85, ${Math.max(0.02, opacity)})`;
                ctx.lineWidth = Math.max(0.3, 1.5 - zNorm);
                ctx.stroke();
            }

            // Draw the grid - vertical lines (constant X, varying Z)
            for (let xi = -gridLinesX / 2; xi <= gridLinesX / 2; xi++) {
                const x = xi * gridSize * 2;

                ctx.beginPath();

                for (let zi = 0; zi < gridLinesZ; zi++) {
                    const z = zi * 25 + 50;
                    const wave = getWaveHeight(x, z, time);
                    const point = project(x, z, wave);

                    if (zi === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                }

                // Edge fade
                const xNorm = Math.abs(xi) / (gridLinesX / 2);
                const edgeFade = 1 - xNorm * 0.7;
                const opacity = 0.1 * edgeFade;

                ctx.strokeStyle = `rgba(0, 106, 85, ${Math.max(0.02, opacity)})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            // Draw glowing nodes at wave peaks
            const nodeSpacing = 4;
            for (let zi = 0; zi < gridLinesZ; zi += nodeSpacing) {
                const z = zi * 25 + 50;

                for (let xi = -gridLinesX / 2; xi <= gridLinesX / 2; xi += nodeSpacing) {
                    const x = xi * gridSize * 2;
                    const wave = getWaveHeight(x, z, time);
                    const point = project(x, z, wave);

                    // Only draw if on screen and wave is high (peak)
                    if (point.x > -50 && point.x < width + 50 &&
                        point.y > -50 && point.y < height + 50 &&
                        wave > 10) {

                        const waveNorm = Math.min(1, (wave - 10) / 80);
                        const baseOpacity = 0.3 * point.opacity * waveNorm;
                        const radius = (2 + waveNorm * 3) * Math.max(0.3, point.scale);

                        // Outer glow
                        const gradient = ctx.createRadialGradient(
                            point.x, point.y, 0,
                            point.x, point.y, radius * 4
                        );
                        gradient.addColorStop(0, `rgba(210, 247, 240, ${baseOpacity})`);
                        gradient.addColorStop(0.3, `rgba(0, 106, 85, ${baseOpacity * 0.5})`);
                        gradient.addColorStop(1, `rgba(0, 106, 85, 0)`);

                        ctx.beginPath();
                        ctx.arc(point.x, point.y, radius * 4, 0, Math.PI * 2);
                        ctx.fillStyle = gradient;
                        ctx.fill();

                        // Core dot
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(210, 247, 240, ${baseOpacity * 1.5})`;
                        ctx.fill();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", setSize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouch);
            cancelAnimationFrame(animationRef.current);
        };
    }, [isClient]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Deep space gradient background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse 100% 50% at 50% 80%, rgba(0, 106, 85, 0.15) 0%, transparent 60%),
                        radial-gradient(ellipse 80% 40% at 30% 70%, rgba(0, 106, 85, 0.08) 0%, transparent 50%),
                        radial-gradient(ellipse 60% 30% at 70% 60%, rgba(210, 247, 240, 0.05) 0%, transparent 50%)
                    `,
                }}
            />

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
}
