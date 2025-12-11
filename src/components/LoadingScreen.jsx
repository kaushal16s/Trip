import React, { useEffect, useState } from 'react';
import { Plane, Map, Compass, Sparkles } from 'lucide-react';

const LoadingScreen = () => {
    const [text, setText] = useState('Curating your perfect trip...');

    const messages = [
        "Analyzing destination vibes...",
        "Scouting best-rated hotels...",
        "Finding hidden gems...",
        "Optimizing travel routes...",
        "Generating smart packing list..."
    ];

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(messages[i]);
            i = (i + 1) % messages.length;
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-[#0f172a]/95 backdrop-blur-xl flex flex-col items-center justify-center text-white p-4">

            <div className="relative mb-12">
                {/* Pulsing Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--color-primary)]/20 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--color-primary)]/10 rounded-full animate-pulse"></div>

                {/* Central Icon */}
                <div className="relative z-10 p-6 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-bounce">
                    <Plane className="w-12 h-12 text-white" />
                </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
                Crafting Your Journey
            </h2>

            <div className="h-8 overflow-hidden">
                <p className="text-[var(--color-text-muted)] animate-pulse flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
                    {text}
                </p>
            </div>

            {/* Progress Bar (Fake) */}
            <div className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
                <div className="h-full bg-[var(--color-primary)] w-1/2 animate-[shimmer_2s_infinite_linear] origin-left-right"></div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
