import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../../../../design-system/icons';
import { renderText, cardVariants } from '../../BriefingUtils';
import './QueriesCard-Briefing.css';

// Queries Card - Quick navigation links
const QueriesCard = ({ queries, onNavigate }) => {
    return (
        <motion.section className="br19-card br19-queries" variants={cardVariants}>
            <header className="br19-card-head">
                <div className="br19-ico"><ICONS.Help.Info size={16} /></div>
                <div>
                    <span className="br19-tag">{renderText(queries?.tag)}</span>
                    <h4>{renderText(queries?.title)}</h4>
                </div>
            </header>
            <div className="br19-q-stack">
                {queries?.links?.map((link, i) => (
                    <button key={i} className="br19-q-tile" onClick={() => onNavigate('navigate', 'overview', link.target)}>
                        <span>{renderText(link.label)}</span>
                        <ICONS.Core.ArrowRight size={14} />
                    </button>
                ))}
            </div>
        </motion.section>
    );
};

export default QueriesCard;
