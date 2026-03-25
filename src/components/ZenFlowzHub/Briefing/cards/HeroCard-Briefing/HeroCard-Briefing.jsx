import React from 'react';
import { motion } from 'framer-motion';
import { getIcon, renderText, cardVariants } from '../../BriefingUtils';
import './HeroCard-Briefing.css';

/**
 * Hero Card: The Aero-Cognitive Manifesto
 */
const HeroCard = ({ intro }) => {
    return (
        <motion.section className="br19-hero-aero" variants={cardVariants}>
            <div className="br19-aero-ambient" />
            <div className="br19-aero-content">
                <header className="br19-aero-head">
                    <span className="br19-tag">{renderText(intro.tag)}</span>
                    <h3 className="br19-aero-title">{renderText(intro.title)}</h3>
                    <p className="br19-aero-desc">{renderText(intro.desc)}</p>
                </header>
                <div className="br19-aero-grid">
                    {intro.manifest?.map((item, i) => (
                        <div key={i} className="br19-aero-tile">
                            <div className="br19-aero-ico">{getIcon(item.icon)}</div>
                            <div className="br19-aero-info">
                                <strong>{renderText(item.label)}</strong>
                                <p>{renderText(item.info)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="br19-aero-principles">
                    <div className="br19-prin-grid">
                        {intro.principles?.map((p, i) => (
                            <div key={i} className="br19-prin-node">
                                <strong>{renderText(p.title)}</strong>
                                <p>{renderText(p.desc)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default HeroCard;
