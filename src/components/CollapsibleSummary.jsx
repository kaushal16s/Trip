import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

const CollapsibleSummary = ({ packingList }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Fallback items if no dynamic list provided
    const defaultItems = [
        { item: "Comfortable Shoes", reason: "Walking" },
        { item: "Power Bank", reason: "Photos" },
        { item: "Water Bottle", reason: "Hydration" },
    ];

    const itemsToRender = packingList && packingList.length > 0 ? packingList : defaultItems;

    return (
        <div className="glass-card mt-8 overflow-hidden hover:border-white/20 transition-all border border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-[var(--color-accent)]/10 to-transparent hover:bg-[var(--color-accent)]/20 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center font-bold text-xl border border-[var(--color-accent)]/30">
                        🎒
                    </div>
                    <div className="text-left">
                        <h3 className="text-xl font-heading font-bold text-white">Smart Packing Checklist</h3>
                        <p className="text-sm text-[var(--color-text-muted)] font-medium">
                            {itemsToRender.length} essentials for your trip
                        </p>
                    </div>
                </div>
                <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-white/10 bg-black/20">
                    {itemsToRender.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--color-accent)]/50 transition-colors group">
                            <CheckCircle2 className="w-5 h-5 text-gray-500 group-hover:text-[var(--color-accent)] shrink-0 mt-0.5" />
                            <div>
                                <div className="text-sm font-bold text-gray-200">{item.item}</div>
                                {item.reason && <div className="text-xs text-gray-500">{item.reason}</div>}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-6 pb-6 pt-2 bg-black/20">
                    <p className="text-xs text-center text-[var(--color-text-muted)] font-medium">
                        Customized based on your destination's weather & activities.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CollapsibleSummary;
