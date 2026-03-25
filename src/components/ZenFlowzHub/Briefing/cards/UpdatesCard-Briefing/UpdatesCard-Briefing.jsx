import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../../../../design-system/icons';
import { renderText, cardVariants } from '../../BriefingUtils';
import './UpdatesCard-Briefing.css';

// Updates Card - Recent changelog list
const UpdatesCard = ({ updates }) => {
    return (
        <motion.section className="br19-card br19-updates" variants={cardVariants}>
            <header className="br19-card-head">
                <div className="br19-ico"><ICONS.Help.Info size={16} /></div>
                <div>
                    <span className="br19-tag">{renderText(updates?.tag)}</span>
                    <h4>{renderText(updates?.title)}</h4>
                </div>
            </header>
            <div className="br19-updates-list">
                {updates?.changelog?.map((change, i) => (
                    <div key={i} className="br19-change-node">
                        <div className="br19-change-dot" />
                        <span>{renderText(change)}</span>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};

export default UpdatesCard;
