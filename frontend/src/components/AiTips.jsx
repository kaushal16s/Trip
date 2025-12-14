import React, { useState } from 'react';
import { Sparkles, X, Lightbulb } from 'lucide-react';

const AiTips = ({ tips }) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!tips || tips.length === 0 || !isVisible) return null;

    // Just take the first tip for now randomly or rotate
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-float">
            <div className="relative glass border-gradient-to-r from-gold/50 to-accent/50 p-4 rounded-2xl shadow-[0_0_20px_rgba(233,69,96,0.3)] max-w-xs transition-all hover:scale-105">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute -top-2 -right-2 bg-[var(--color-bg-dark)] rounded-full p-1 border border-white/10 text-white/50 hover:text-white"
                >
                    <X className="w-3 h-3" />
                </button>

                <div className="flex gap-3">
                    <div className="bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] p-2 rounded-xl h-fit shadow-lg">
                        <Lightbulb className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-1">
                            AI Travel Tip
                        </h4>
                        <p className="text-xs text-gray-300 leading-relaxed">
                            {randomTip}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiTips;
