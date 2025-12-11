import React from 'react';

const BudgetTag = ({ cost }) => {
    // Helper to parse numeric cost if it comes as string "₹ 1200" or number
    const numericCost = typeof cost === 'string'
        ? parseInt(cost.replace(/[^0-9]/g, ''), 10)
        : cost;

    if (!numericCost && numericCost !== 0) return null;

    let label = 'Moderate';
    let colorClass = 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20';

    // Thresholds: < 2000 = Budget, > 5000 = Premium
    if (numericCost < 2000) {
        label = 'Budget';
        colorClass = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
    } else if (numericCost > 5000) {
        label = 'Premium';
        colorClass = 'bg-rose-500/10 text-rose-300 border-rose-500/20';
    }

    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${colorClass}`}>
            <span className={`w-2 h-2 rounded-full ${colorClass.replace('bg-', 'bg-').replace('/10', '')} shadow-[0_0_8px_currentColor]`}></span>
            {label} • ₹{numericCost}
        </span>
    );
};

export default BudgetTag;
