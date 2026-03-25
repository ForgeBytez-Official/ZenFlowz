import React from 'react';
import { ICONS } from '../../../design-system/icons';

// Briefing Utilities - Shared icons, text rendering, and animation variants
export const getIcon = (name) => {
    try {
        switch (name) {
            case 'Synthesis': return <ICONS.Pomodoro.Zone size={14} />;
            case 'Audio': return <ICONS.Core.Sound size={14} />;
            case 'Crystals': return <ICONS.Pomodoro.Cheat size={14} />;
            case 'Discord': return <ICONS.Social.Discord size={20} />;
            case 'GitHub': return <ICONS.Social.GitHub size={20} />;
            case 'Twitter': return <ICONS.Social.Twitter size={20} />;
            case 'Instagram': return <ICONS.Social.Instagram size={20} />;
            case 'Facebook': return <ICONS.Social.Facebook size={20} />;
            case 'YouTube': return <ICONS.Social.YouTube size={20} />;
            case 'LinkedIn': return <ICONS.Social.LinkedIn size={20} />;
            case 'Reddit': return <ICONS.Social.Reddit size={20} />;
            case 'Rain': return <ICONS.Ambience.Rain size={18} />;
            case 'Train': return <ICONS.Ambience.Train size={18} />;
            case 'Library': return <ICONS.Ambience.Library size={18} />;
            case 'Forest': return <ICONS.Ambience.Forest size={18} />;
            case 'Ocean': return <ICONS.Ambience.Ocean size={18} />;
            default: return <ICONS.Help.Info size={14} />;
        }
    } catch (e) {
        return <ICONS.Help.Info size={14} />;
    }
};

export const renderText = (str) => {
    if (!str) return "";
    const parts = str.split(/(\[\[.*?\]\]|\{\{.*?\}\}|\(\(.*?\)\))/g);
    return parts.map((part, i) => {
        if (part.startsWith('[[')) return <span key={i} className="br19-acc-1">{part.slice(2, -2)}</span>;
        if (part.startsWith('((')) return <span key={i} className="br19-acc-2">{part.slice(2, -2)}</span>;
        if (part.startsWith('{{')) return <span key={i} className="br19-acc-3">{part.slice(2, -2)}</span>;
        return part;
    });
};

export const cardVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 20 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { type: "spring", stiffness: 350, damping: 25 }
    }
};
