import React, { useEffect, useState } from 'react';
import { Camera, X, ZoomIn, Loader2 } from 'lucide-react';
import { fetchDestinationGallery } from '../services/images';

const PhotoAlbum = ({ destination }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        if (destination) {
            setLoading(true);
            fetchDestinationGallery(destination).then(imgs => {
                setPhotos(imgs);
                setLoading(false);
            });
        }
    }, [destination]);

    const filteredPhotos = filter === 'All' ? photos : photos.filter(p => p.type === filter);
    const categories = ['All', 'Scenic', 'Food', 'Culture', 'Landmark'];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-white/50 space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-[var(--color-accent)]" />
                <p>Curating visual story...</p>
            </div>
        );
    }

    if (photos.length === 0) {
        return <div className="text-center text-gray-500 py-20">No gallery images found for this destination.</div>;
    }

    return (
        <div className="animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
                        <Camera className="w-6 h-6 text-[var(--color-primary)]" />
                        Visual Story
                    </h2>
                    <p className="text-sm text-gray-400">Curated shots from {destination}</p>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${filter === cat
                                    ? 'bg-[var(--color-accent)] text-black'
                                    : 'glass text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry-ish Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredPhotos.map((photo, idx) => (
                    <div
                        key={idx}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-zoom-in border border-white/5 bg-black/50"
                        onClick={() => setSelectedPhoto(photo)}
                    >
                        <img
                            src={photo.url}
                            alt={photo.description}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <span className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-widest mb-1">
                                {photo.type}
                            </span>
                            <p className="text-white text-sm line-clamp-1 font-medium">{photo.description}</p>
                            <p className="text-gray-400 text-xs mt-1">By {photo.photographer}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedPhoto && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
                    <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                        <X className="w-8 h-8" />
                    </button>

                    <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
                        <img
                            src={selectedPhoto.url}
                            alt={selectedPhoto.description}
                            className="max-h-[80vh] w-auto rounded-lg shadow-2xl border border-white/10"
                        />
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-heading font-bold text-white mb-1">{selectedPhoto.description}</h3>
                            <p className="text-sm text-gray-400">Photo by <span className="text-[var(--color-primary)]">{selectedPhoto.photographer}</span> on Unsplash</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoAlbum;
