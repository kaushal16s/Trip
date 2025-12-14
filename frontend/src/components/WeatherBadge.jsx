import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer } from 'lucide-react';

const WeatherBadge = ({ temp, condition, description, className = '' }) => {
    const getIcon = (cond) => {
        const c = cond?.toLowerCase();
        if (c?.includes('rain')) return <CloudRain className="w-5 h-5 text-blue-400" />;
        if (c?.includes('snow')) return <CloudSnow className="w-5 h-5 text-white" />;
        if (c?.includes('cloud')) return <Cloud className="w-5 h-5 text-gray-400" />;
        if (c?.includes('clear') || c?.includes('sun')) return <Sun className="w-5 h-5 text-yellow-400" />;
        return <Wind className="w-5 h-5 text-gray-300" />;
    };

    const getColor = (t) => {
        if (t < 15) return 'from-blue-500/20 to-cyan-500/20 border-cyan-500/30 text-cyan-200';
        if (t < 25) return 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-200';
        return 'from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-200';
    };

    return (
        <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl glass border border-white/10 bg-gradient-to-r ${getColor(temp)} ${className}`}>
            <div className="p-2 bg-white/10 rounded-full shadow-lg backdrop-blur-md">
                {getIcon(condition)}
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold flex items-center gap-1">
                    {temp}°C <Thermometer className="w-3 h-3 opacity-50" />
                </span>
                <span className="text-xs uppercase tracking-wider opacity-70 font-medium">
                    {description || condition}
                </span>
            </div>
        </div>
    );
};

export default WeatherBadge;
