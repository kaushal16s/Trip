import React, { useState } from 'react';
import { Calendar, MapPin, Users, Wallet, ArrowRight, Sparkles } from 'lucide-react';

const TripForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        travelType: 'Solo',
        budget: 'Moderate'
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            setLoading(false);
            onSubmit(formData);
        }, 1500);
    };

    return (
        <div className="glass p-8 md:p-10 rounded-3xl shadow-2xl border border-white/5 relative overflow-hidden backdrop-blur-xl bg-black/40">

            <h2 className="text-2xl font-heading font-bold text-white mb-8 text-center">
                Tell us your preferences
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Destination */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Destination</label>
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-accent)] w-5 h-5 pointer-events-none" />
                        <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            placeholder="Dream destination..."
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-medium placeholder:text-gray-500 focus:bg-white/10 focus:border-[var(--color-accent)] transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">From</label>
                        <div className="relative group">
                            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)] w-5 h-5 pointer-events-none" />
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-medium focus:bg-white/10 focus:border-[var(--color-secondary)] transition-all outline-none [color-scheme:dark]"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">To</label>
                        <div className="relative group">
                            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)] w-5 h-5 pointer-events-none" />
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-medium focus:bg-white/10 focus:border-[var(--color-secondary)] transition-all outline-none [color-scheme:dark]"
                            />
                        </div>
                    </div>
                </div>

                {/* Travel Type & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Travelers</label>
                        <div className="relative group">
                            <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 pointer-events-none" />
                            <select
                                name="travelType"
                                value={formData.travelType}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-medium focus:bg-white/10 focus:border-blue-400 transition-all outline-none appearance-none cursor-pointer"
                            >
                                <option className="bg-gray-900" value="Solo">Solo Traveler</option>
                                <option className="bg-gray-900" value="Couple">Couple</option>
                                <option className="bg-gray-900" value="Friends">Friends</option>
                                <option className="bg-gray-900" value="Family">Family</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Budget</label>
                        <div className="relative group">
                            <Wallet className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5 pointer-events-none" />
                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-medium focus:bg-white/10 focus:border-green-400 transition-all outline-none appearance-none cursor-pointer"
                            >
                                <option className="bg-gray-900" value="Low">Economic</option>
                                <option className="bg-gray-900" value="Moderate">Standard</option>
                                <option className="bg-gray-900" value="Premium">Luxury</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[var(--color-primary)] to-emerald-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Curating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Generate Itinerary
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TripForm;
