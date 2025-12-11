export const themes = {
    default: {
        '--color-primary': '#1a1a2e', // Deep Blue
        '--color-secondary': '#16213e', // Dark Blue
        '--color-accent': '#e94560', // Pinkish Red
        '--color-gold': '#ffd700', // Gold
        '--bg-gradient': 'radial-gradient(circle at 10% 20%, rgba(233, 69, 96, 0.1) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.05) 0%, transparent 40%)',
    },
    kashmir: {
        '--color-primary': '#2c3e50',
        '--color-secondary': '#34495e',
        '--color-accent': '#00d2ff', // Icy Blue
        '--color-gold': '#ecf0f1', // Snow White
        '--bg-gradient': 'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)', // Mist
        '--bg-gradient': 'radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.15) 0%, transparent 50%)',
    },
    goa: {
        '--color-primary': '#2c1205', // Deep brown/orange base
        '--color-secondary': '#5d2e0e',
        '--color-accent': '#00fff0', // Turquoise
        '--color-gold': '#ff9900', // Sunset Orange
        '--bg-gradient': 'linear-gradient(120deg, rgba(255, 153, 0, 0.1) 0%, rgba(0, 255, 240, 0.1) 100%)',
    },
    japan: {
        '--color-primary': '#2b2b2b', // Minimalist Black/Grey
        '--color-secondary': '#404040',
        '--color-accent': '#ff0033', // Japan Red
        '--color-gold': '#ffffff', // White
        '--bg-gradient': 'radial-gradient(circle at 70% 20%, rgba(255, 0, 51, 0.15) 0%, transparent 40%)',
    },
    kerala: {
        '--color-primary': '#002613', // Deep Green
        '--color-secondary': '#044223',
        '--color-accent': '#00ff88', // Bright Green
        '--color-gold': '#f1c40f', // Sun yellow
        '--bg-gradient': 'linear-gradient(0deg, rgba(0, 38, 19, 0.9) 0%, rgba(0, 0, 0, 0) 100%)',
    }
};

export const getThemeForDestination = (destination) => {
    if (!destination) return themes.default;

    const lowerDest = destination.toLowerCase();

    if (lowerDest.includes('kashmir') || lowerDest.includes('manali') || lowerDest.includes('snow') || lowerDest.includes('swiss')) {
        return themes.kashmir;
    }
    if (lowerDest.includes('goa') || lowerDest.includes('beach') || lowerDest.includes('ocean') || lowerDest.includes('bali')) {
        return themes.goa;
    }
    if (lowerDest.includes('japan') || lowerDest.includes('tokyo') || lowerDest.includes('china')) {
        return themes.japan;
    }
    if (lowerDest.includes('kerala') || lowerDest.includes('forest') || lowerDest.includes('nature') || lowerDest.includes('munnar')) {
        return themes.kerala;
    }

    return themes.default;
};

export const applyTheme = (theme) => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });
};
