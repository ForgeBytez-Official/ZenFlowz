import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../../../../design-system/icons';
import { renderText, cardVariants } from '../../BriefingUtils';
import './HotkeysCard-Briefing.css';

// Hotkeys Card - Keyboard shortcuts summary
const HotkeysCard = ({ hotkeys, onHighlight }) => {
    return (
        <motion.section
            className="br19-card br19-hotkeys is-clickable"
            variants={cardVariants}
            onClick={() => onHighlight('highlight', 'hotkeys')}
        >
            <header className="br19-card-head">
                <div className="br19-ico"><ICONS.Help.Keyboard size={16} /></div>
                <div>
                    <span className="br19-tag">{renderText(hotkeys?.tag)}</span>
                    <h4>{renderText(hotkeys?.title)}</h4>
                </div>
            </header>
            <div className="br19-hk-flow">
                {hotkeys?.items?.map((hk, i) => (
                    <div key={i} className="br19-hk-node">
                        <kbd>{renderText(hk.key)}</kbd>
                        <span>{renderText(hk.label)}</span>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};

export default HotkeysCard;
