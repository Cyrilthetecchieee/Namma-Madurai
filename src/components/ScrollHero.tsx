import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const ScrollHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const frameCount = 192; // 0 to 191

    useEffect(() => {
        // Preload images
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            const indexStr = i.toString().padStart(3, '0');
            img.src = `/hero-sequence/frame_${indexStr}_delay-0.04s.png`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                    // Draw first frame
                    if (canvasRef.current) {
                        const ctx = canvasRef.current.getContext('2d');
                        if (ctx) {
                            ctx.drawImage(loadedImages[0], 0, 0, canvasRef.current.width, canvasRef.current.height);
                        }
                    }
                }
            };
            loadedImages.push(img);
        }
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (images.length === frameCount && canvasRef.current) {
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(latest * frameCount)
            );

            const ctx = canvasRef.current.getContext('2d');
            if (ctx && images[frameIndex]) {
                // Clear and draw
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.drawImage(
                    images[frameIndex],
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
            }
        }
    });

    // Parallax effects to create a deep, futuristic illusion
    const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
    const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    // Foreground pulling away feeling
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
    const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.5, 0]);

    return (
        <div ref={containerRef} className="relative h-[250vh] bg-[#050510]">
            {/* Sticky container for the hero content */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Canvas Background with Floating World properties */}
                <motion.div
                    className="absolute inset-0 z-0 flex items-center justify-center opacity-80 mix-blend-screen"
                    style={{ scale: canvasScale, y: canvasY }}
                >
                    <canvas
                        ref={canvasRef}
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover select-none"
                    />
                    {/* Subtle gradient overlays for deeper integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050510_100%)] opacity-60" />
                </motion.div>

                {/* Foreground Content anchored visually but pulling away technically */}
                <motion.div
                    className="container relative z-10 flex flex-col items-center text-center px-4"
                    style={{ y: textY, scale: textScale, opacity: textOpacity }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-black/50 px-5 py-2 text-sm font-medium text-primary-foreground backdrop-blur-xl shadow-[0_0_20px_rgba(76,175,80,0.2)]"
                    >
                        <Sparkles className="h-4 w-4 text-accent" />
                        <span className="text-white">Smart Civic Intelligence Platform</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                        className="mb-6 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-2xl"
                    >
                        Building a Cleaner,{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(76,175,80,0.5)]">Smarter</span>{" "}
                        <br className="hidden sm:block" />
                        <span className="text-white">Madurai</span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="mb-10 max-w-2xl text-lg text-white/70 sm:text-xl font-light"
                    >
                        Locate public utilities, report cleanliness issues, and support your city using real-time civic intelligence powered by Google technologies.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <Link to="/select-role?mode=signin">
                            <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_-5px_var(--tw-shadow-color)] shadow-primary/50 transition-all border border-primary-foreground/20">
                                Sign In
                            </Button>
                        </Link>
                        <Link to="/select-role?mode=signup">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold border-white/20 text-white bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-md transition-all">
                                Create Account
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};
