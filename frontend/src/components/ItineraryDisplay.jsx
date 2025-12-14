import React, { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin, Grid, List, Utensils, Camera, Mountain, Landmark, Store, Waves, ArrowRight, Share2, Download, Moon, Sun, Image as ImageIcon } from 'lucide-react';
import TripSidebar from './TripSidebar';
import CollapsibleSummary from './CollapsibleSummary';
import ImageCarousel from './ImageCarousel';
import AiTips from './AiTips';
import ActionButtons from './ActionButtons';
import PhotoAlbum from './PhotoAlbum';

// Filters - Dark Mode
const Filters = [
    { id: 'all', label: 'All', icon: null },
    { id: 'adventure', label: 'Adventure', icon: Mountain },
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'culture', label: 'Heritage', icon: Landmark },
    { id: 'nature', label: 'Nature', icon: Waves },
    { id: 'shopping', label: 'Shopping', icon: Store },
    { id: 'photo', label: 'Photography', icon: Camera },
];

const PoiIcons = {
    'Adventure': Mountain,
    'Food': Utensils,
    'Culture': Landmark,
    'Nature': Waves,
    'Shopping': Store,
    'Viewpoint': Camera,
    'Water': Waves,
    'Religion': Landmark,
};

const ItineraryDisplay = ({ data }) => {
    const [viewMode, setViewMode] = useState('timeline'); // 'timeline', 'grid', 'album', 'moodboard'
    const [activeFilter, setActiveFilter] = useState('all');

    if (!data) return null;

    // Filter Logic
    const filteredDays = useMemo(() => {
        if (activeFilter === 'all') return data.days;
        return data.days.map(day => ({
            ...day,
            activities: day.activities.filter(act => {
                const type = act.poi_type || '';
                return type.toLowerCase().includes(activeFilter) ||
                    act.description.toLowerCase().includes(activeFilter) ||
                    act.place.toLowerCase().includes(activeFilter);
            })
        })).filter(day => day.activities.length > 0);
    }, [data, activeFilter]);

    const allTips = data.days?.flatMap(d => d.activities?.map(a => `Try to visit ${a.place} around ${a.time} for the best experience.`)) || [];

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start animate-fade-in-up max-w-[1400px] mx-auto p-4 md:p-8 mt-10">

            {/* Left Sidebar - Dark */}
            <div className="w-full lg:w-80 shrink-0">
                <TripSidebar
                    destination={data.destination}
                    dates={`${data.days?.[0]?.date} - ${data.days?.[data.days.length - 1]?.date}`}
                    budget={data.budget_breakdown?.total?.toLocaleString()}
                    weather={{ temp: 24, condition: data.days?.[0]?.weather }}
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 space-y-10 min-w-0 w-full">

                {/* Header */}
                <div className="flex flex-col gap-6 ">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] md:text-xs font-bold tracking-widest text-[var(--color-accent)] uppercase px-3 py-1 bg-[var(--color-accent)]/10 rounded-full border border-[var(--color-accent)]/20">
                            Generated Itinerary
                        </span>
                        <ActionButtons tripData={data} />
                    </div>

                    <div>
                        <h1 className="text-3xl md:text-6xl font-heading font-bold text-white tracking-tight mb-4 drop-shadow-lg">
                            {data.destination}
                        </h1>
                        <p className="text-base md:text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
                            {data.summary}
                        </p>
                    </div>

                    <div className="h-px w-full bg-white/10"></div>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Filters */}
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {Filters.map(f => {
                                const Icon = f.icon;
                                const isActive = activeFilter === f.id;
                                return (
                                    <button
                                        key={f.id}
                                        onClick={() => setActiveFilter(f.id)}
                                        className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${isActive ? 'bg-[var(--color-primary)] text-black shadow-glow' : 'glass text-gray-300 hover:bg-white/10'}`}
                                    >
                                        {Icon && <Icon className="w-3 md:w-3.5 h-3 md:h-3.5" />}
                                        {f.label}
                                    </button>
                                )
                            })}
                        </div>

                        {/* View Toggle */}
                        <div className="flex bg-black/30 p-1 rounded-xl border border-white/10">
                            <button
                                onClick={() => setViewMode('timeline')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'timeline' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                title="Timeline"
                            >
                                <List className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                title="Grid"
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('album')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'album' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                title="Photo Album"
                            >
                                <ImageIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content View */}

                {viewMode === 'album' ? (
                    <PhotoAlbum destination={data.destination} />
                ) : (
                    <>
                        {/* Cost Dashboard key={idx} */}
                        {data.budget_breakdown && (
                            <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-white/5 to-transparent">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Estimated Cost Breakdown</h3>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                                    <CostItem label="Transport" amount={data.budget_breakdown.transport} />
                                    <CostItem label="Accommodation" amount={data.budget_breakdown.stay_estimate} />
                                    <CostItem label="Food" amount={data.budget_breakdown.food} />
                                    <CostItem label="Activities" amount={data.budget_breakdown.activities} />
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                                        <span className="text-gray-400 font-medium">Rec. Budget:</span>
                                        <span className="text-xl md:text-2xl font-bold text-[var(--color-accent)]">{data.budget_breakdown.recommended_budget_range}</span>
                                    </div>
                                    {data.budget_breakdown.split_cost_per_person && (
                                        <div className="bg-[var(--color-primary)]/20 px-4 py-1.5 rounded-full text-white text-xs md:text-sm font-bold border border-[var(--color-primary)]/30">
                                            Split: {data.budget_breakdown.split_cost_per_person}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {viewMode === 'timeline' ? (
                            <TimelineView days={filteredDays} />
                        ) : (
                            <GridView days={filteredDays} />
                        )}

                        {/* Footer Section */}
                        <CollapsibleSummary packingList={data.packing_checklist} />
                    </>
                )}

            </div>

            {/* Floating Helpers */}
            <AiTips tips={allTips} />
        </div>
    );
};

const CostItem = ({ label, amount }) => (
    <div>
        <div className="text-[10px] md:text-xs text-gray-500 mb-1 uppercase tracking-wide">{label}</div>
        <div className="text-lg md:text-xl font-bold text-white">₹{(amount || 0).toLocaleString()}</div>
    </div>
);

// --- Sub-Components ---

const TimelineView = ({ days }) => {
    return (
        <div className="space-y-12 md:space-y-16">
            {days?.map((day, idx) => (
                <div key={idx} className="relative">
                    {/* Day Header */}
                    <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 sticky top-4 z-20 backdrop-blur-md py-2 rounded-lg px-2 -ml-2">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white drop-shadow-md">Day {day.day}</h2>
                        <span className="text-base md:text-lg text-[var(--color-accent)] font-medium font-heading">{day.theme}</span>
                    </div>

                    <div className="space-y-6 md:space-y-8 relative pl-6 md:pl-8 border-l border-white/10 ml-2 md:ml-4">
                        {day.activities?.map((activity, actIdx) => {
                            const PoiIcon = PoiIcons[activity.poi_type] || MapPin;
                            return (
                                <div key={actIdx} className="relative group">
                                    {/* Time Dot */}
                                    <div className="absolute -left-[33px] md:-left-[41px] top-6 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[var(--color-bg-dark)] border-[2px] border-[var(--color-primary)] z-10 group-hover:bg-[var(--color-primary)] transition-colors"></div>

                                    <div className="glass-card p-0 overflow-hidden hover:scale-[1.01] transition-transform">
                                        <div className="grid md:grid-cols-[320px_1fr] gap-0">
                                            {/* Image */}
                                            <div className="h-64 md:h-auto relative">
                                                <ImageCarousel
                                                    images={activity.images || [activity.imageUrl]}
                                                    title={activity.place}
                                                    price={activity.cost}
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="p-8 flex flex-col justify-center bg-black/20">
                                                <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-wider text-amber-400">
                                                    <Clock className="w-4 h-4 text-amber-400" />
                                                    {activity.time}
                                                    <span className="text-white/20">•</span>
                                                    <span>{activity.poi_type || 'Activity'}</span>
                                                </div>

                                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">{activity.place}</h3>
                                                <p className="text-gray-400 leading-relaxed mb-8">
                                                    {activity.description}
                                                </p>

                                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                                                    <div className="flex items-center gap-2 text-white font-medium">
                                                        <span>₹{activity.cost}</span>
                                                    </div>
                                                    <button className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline">
                                                        Details <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        {/* Food Recommendations */}
                        {day.food_recommendations && (
                            <div className="mt-8 pt-8">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6 flex items-center gap-2">
                                    <Utensils className="w-4 h-4" /> Recommended Dining
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <FoodCard label="Casual" data={day.food_recommendations.low} />
                                    <FoodCard label="Standard" data={day.food_recommendations.moderate} />
                                    <FoodCard label="Fine Dining" data={day.food_recommendations.premium} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

const FoodCard = ({ label, data }) => (
    <div className="glass-card p-5 border-l-4 border-l-[var(--color-accent)] hover:bg-white/5">
        <span className="block text-xs text-gray-400 mb-2 uppercase">{label}</span>
        <div className="font-bold text-white mb-1 leading-snug">{data?.name || 'Local Spot'}</div>
        <div className="text-sm text-emerald-300 font-medium font-mono">₹{data?.cost}</div>
    </div>
);

const GridView = ({ days }) => {
    const allActivities = days?.flatMap(day =>
        day.activities.map(act => ({ ...act, day: day.day }))
    ) || [];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allActivities.map((activity, idx) => (
                <div key={idx} className="glass-card overflow-hidden group">
                    <div className="h-56 relative overflow-hidden">
                        <img
                            src={activity.imageUrl}
                            alt={activity.place}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-white/20">
                            Day {activity.day}
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-white group-hover:text-[var(--color-primary)] transition-colors">{activity.place}</h4>
                            <span className="text-sm font-medium text-[var(--color-accent)]">₹{activity.cost}</span>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{activity.description}</p>
                        <hr className="border-white/10 mb-4" />
                        <div className="flex justify-between items-center text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wide">
                            {activity.poi_type}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItineraryDisplay;
