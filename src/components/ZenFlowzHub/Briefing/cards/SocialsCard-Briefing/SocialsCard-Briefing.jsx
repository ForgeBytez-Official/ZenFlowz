import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../../../../design-system/icons';
import { getIcon, renderText, cardVariants } from '../../BriefingUtils';
import './SocialsCard-Briefing.css';

// Socials Card - Social media links and connectivity hub
const SocialsCard = ({ socials }) => {
    return (
        <motion.section className="br19-card br19-social-anchor" variants={cardVariants}>
            <header className="br19-card-head">
                <div className="br19-ico"><ICONS.Core.Link size={16} /></div>
                <div>
                    <span className="br19-tag">{renderText(socials?.tag)}</span>
                    <h4>{renderText(socials?.title)}</h4>
                </div>
            </header>
             <div className="br19-soc-grid">
                {socials?.links?.map((s, i) => (
                    <motion.a
                        key={i} 
                        href={s.active ? s.link : undefined} 
                        target={s.active ? "_blank" : undefined}
                        className={`br19-soc-node ${s.active ? 'is-active' : 'is-inactive'}`}
                        style={{ '--node-color': s.color }}
                        whileHover={s.active ? { y: -3 } : {}}
                    >
                        <div className="br19-node-main">
                            <div className="br19-node-ico">{getIcon(s.platform)}</div>
                            <div className="br19-node-meta">
                                <strong>{s.platform}</strong>
                                <span>{s.handle}</span>
                                <p className="br19-node-desc">{s.desc}</p>
                            </div>
                        </div>
                        <div className="br19-node-stats">{s.stats}</div>
                    </motion.a>
                ))}
            </div>
        </motion.section>
    );
};

export default SocialsCard;
