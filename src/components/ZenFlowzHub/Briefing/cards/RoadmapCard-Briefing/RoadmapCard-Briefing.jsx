import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../../../../design-system/icons';
import { VERSION_INFO } from '../../../../../versions/versions';
import { renderText, cardVariants } from '../../BriefingUtils';
import './RoadmapCard-Briefing.css';

// Roadmap Card - Project version timeline
const RoadmapCard = ({ onNavigate }) => {
    return (
        <motion.section className="br19-card br19-roadmap" variants={cardVariants}>
            <header className="br19-card-head">
                <div className="br19-ico"><ICONS.Help.Calendar size={16} /></div>
                <div>
                    <span className="br19-tag">Roadmap</span>
                    <h4>{renderText("Project {{Timeline}}")}</h4>
                </div>
            </header>
            <div className="br19-road-stream">
                <div
                    className={`br19-stream-node v2-node-past ${!VERSION_INFO.roadmap.past ? 'is-empty' : 'is-clickable'}`}
                    onClick={() => VERSION_INFO.roadmap.past && onNavigate('patchNotes', VERSION_INFO.roadmap.past.version)}
                >
                    <div className="v2-node-ico"><ICONS.Core.Success size={12} weight="fill" /></div>
                    <div className="v2-node-body">
                        <div className="v2-node-head">
                            <span className="v2-node-v">v{VERSION_INFO.roadmap.past?.version || "X.X"}</span>
                            <span className="v2-node-stat">{VERSION_INFO.roadmap.past?.type || "ARCHIVE"}</span>
                        </div>
                        <h5 className="v2-node-title">{VERSION_INFO.roadmap.past?.title || "Legacy State"}</h5>
                        {VERSION_INFO.roadmap.past?.summary && (
                            <p className="v2-node-summary">{VERSION_INFO.roadmap.past.summary.substring(0, 45)}...</p>
                        )}
                    </div>
                </div>

                <div className="v2-road-arrow">
                    <ICONS.Core.CaretDown size={14} style={{ opacity: 0.2 }} />
                </div>

                <div
                    className="br19-stream-node v2-node-active is-current is-clickable"
                    onClick={() => onNavigate('patchNotes', VERSION_INFO.roadmap.current.version)}
                >
                    <div className="v2-node-ico is-pulse"><ICONS.Pomodoro.Zone size={12} weight="fill" /></div>
                    <div className="v2-node-body">
                        <div className="v2-node-head">
                            <span className="v2-node-v">v{VERSION_INFO.roadmap.current.version}</span>
                            <span className="v2-node-stat is-bright">{VERSION_INFO.roadmap.current.type} SYSTEM</span>
                        </div>
                        <h5 className="v2-node-title is-bright">{VERSION_INFO.roadmap.current.title}</h5>
                        {VERSION_INFO.roadmap.current?.summary && (
                            <p className="v2-node-summary">{VERSION_INFO.roadmap.current.summary.substring(0, 50)}...</p>
                        )}
                    </div>
                </div>

                <div className="v2-road-arrow">
                    <ICONS.Core.CaretDown size={14} style={{ opacity: 0.2 }} />
                </div>

                <div className={`br19-stream-node v2-node-future ${!VERSION_INFO.roadmap.next ? 'is-empty' : ''}`}>
                    <div className="v2-node-ico"><ICONS.Core.Lock size={12} /></div>
                    <div className="v2-node-body">
                        <div className="v2-node-head">
                            <span className="v2-node-v">VERSION NEXT</span>
                            <span className="v2-node-stat">PLAN</span>
                        </div>
                        <h5 className="v2-node-title">{VERSION_INFO.roadmap.next || "Future Updates"}</h5>
                        <p className="v2-node-summary">Planned feature and system improvements.</p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default RoadmapCard;
