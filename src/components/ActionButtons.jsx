import React, { useState } from 'react';
import { Save, Share2, Download, Check } from 'lucide-react';

const ActionButtons = ({ tripData }) => {
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSave = () => {
        if (!tripData) return;
        try {
            // Get existing trips
            const existing = JSON.parse(localStorage.getItem('savedTrips') || '[]');
            // Add new trip
            const newTrip = {
                id: Date.now(),
                destination: tripData.destination,
                date: new Date().toISOString().split('T')[0],
                data: tripData
            };

            localStorage.setItem('savedTrips', JSON.stringify([newTrip, ...existing]));
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            console.error('Failed to save trip:', err);
            alert('Could not save trip. Storage might be full.');
        }
    };

    const handleShare = () => {
        // For now, copy a dummy link or the trip summary
        const textToShare = `Check out my trip to ${tripData.destination}! \n${tripData.summary}`;
        navigator.clipboard.writeText(textToShare);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="flex gap-3 justify-center md:justify-end print:hidden">
            <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${saved ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
                {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved ? 'Saved!' : 'Save Trip'}
            </button>

            <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-white/10 text-white hover:bg-white/20 transition-all"
            >
                <Download className="w-4 h-4" />
                PDF
            </button>

            {/* <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-[var(--color-accent)] text-white hover:opacity-90 transition-all shadow-glow"
            >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Share'}
            </button> */}
        </div>
    );
};

export default ActionButtons;
