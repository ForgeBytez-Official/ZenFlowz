import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../../../../design-system/icons';
import { renderText, cardVariants } from '../../BriefingUtils';
import './DiagnosticsCard-Briefing.css';

// Diagnostics Card - System status metrics
const DiagnosticsCard = ({ system }) => {
    return (
        <motion.section className="br19-card br19-diagnostics is-compact" variants={cardVariants}>
            <header className="br19-card-head">
                <div className="br19-ico"><ICONS.Core.Shield size={16} /></div>
                <div>
                    <span className="br19-tag">{renderText(system?.tag)}</span>
                    <h4>{renderText(system?.title)}</h4>
                </div>
            </header>
            <div className="br19-sys-readout">
                {system?.metrics?.map((m, i) => (
                    <div key={i} className="br19-sys-node">
                        <div className="br19-sys-meta">
                            <span className="br19-sys-label">{renderText(m.label)}</span>
                            <span className="br19-sys-val">{renderText(m.value)}</span>
                        </div>
                        <div className="br19-sys-status">
                            <div className="br19-sys-dot" data-status={m.status} />
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};

export default DiagnosticsCard;
