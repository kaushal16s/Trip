import React from 'react';
import { Camera, Utensils, Mountain, Palmtree, Landmark, Waves, Tent, Footprints } from 'lucide-react';

const ActivityTag = ({ activityName }) => {
    const activityLower = activityName?.toLowerCase() || '';

    let Icon = Footprints;
    let label = 'Activity';
    let color = 'text-gray-300';

    if (activityLower.includes('photo') || activityLower.includes('view') || activityLower.includes('sight')) {
        Icon = Camera;
        label = 'Photo Spot';
        color = 'text-purple-300';
    } else if (activityLower.includes('food') || activityLower.includes('eat') || activityLower.includes('dinner') || activityLower.includes('lunch')) {
        Icon = Utensils;
        label = 'Food';
        color = 'text-orange-300';
    } else if (activityLower.includes('hike') || activityLower.includes('trek') || activityLower.includes('mountain')) {
        Icon = Mountain;
        label = 'Adventure';
        color = 'text-emerald-300';
    } else if (activityLower.includes('beach') || activityLower.includes('sea')) {
        Icon = Palmtree;
        label = 'Beach';
        color = 'text-cyan-300';
    } else if (activityLower.includes('temple') || activityLower.includes('museum') || activityLower.includes('history')) {
        Icon = Landmark;
        label = 'Culture';
        color = 'text-amber-300';
    } else if (activityLower.includes('water') || activityLower.includes('boat')) {
        Icon = Waves;
        label = 'Water';
        color = 'text-blue-300';
    } else if (activityLower.includes('camp')) {
        Icon = Tent;
        label = 'Camping';
        color = 'text-green-300';
    }

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 ${color} text-xs font-medium`}>
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
        </div>
    );
};

export default ActivityTag;
