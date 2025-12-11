import React from 'react';
import { Calendar, Cloud, Wallet, Download } from 'lucide-react';
import WeatherBadge from './WeatherBadge';

const TripSidebar = ({ destination, dates, budget, weather }) => {
    return (
        <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8 flex flex-col gap-6">
                {/* Main Summary Card */}
                <div className="glass-card p-6 border-l-4 border-[var(--color-accent)] bg-gradient-to-b from-white/5 to-transparent">
                    <h3 className="text-[var(--color-text-muted)] text-sm uppercase tracking-widest font-bold mb-4">Trip Summary</h3>

                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-white mb-1 leading-tight">{destination}</h2>
                        <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{dates}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <WeatherBadge temp={weather?.temp || 24} condition={weather?.condition} />

                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                                    <Wallet className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--color-text-muted)]">Est. Cost</p>
                                    <p className="font-bold text-lg text-white">₹ {budget || "12,000"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-[var(--color-accent)] transition-colors flex items-center justify-center gap-2 shadow-lg">
                        <Download className="w-4 h-4" />
                        Download PDF
                    </button>
                </div>

                {/* Mini Tips Card (Optional, purely visual for now) */}
                <div className="glass p-4 rounded-xl border-dashed border-2 border-white/10">
                    <p className="text-xs text-[var(--color-text-muted)] italic text-center">
                        "Don't forget to check local visa requirements!"
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TripSidebar;
