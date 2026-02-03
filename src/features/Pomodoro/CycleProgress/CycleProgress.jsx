import React, { memo } from 'react';
import { motion } from 'framer-motion';
import './CycleProgress.css';

/**
 * Visualizes the session progress using crystalline structures
 * Optimized with memoization to prevent unnecessary re-renders during timer ticks
 */
const CycleProgress = memo(function CycleProgress({
    completedZones,
    completedDrifts,
    zoneQualities = [],
    driftQualities = [],
    cycleSettings,
    modesConfig
}) {
    const zoneCol = modesConfig.ZONE.color;
    const driftCol = modesConfig.DRIFT.color;

    const getCrystalHeight = (ratio) => {
        if (ratio < 0.33) return 0.35;
        if (ratio < 0.66) return 0.65;
        return 1.0;
    };

    const renderTrack = (total, currentCount, label, rgb, direction, qualities) => (
        <div className={`horizon-block ${direction}`}>
            <div className="horizon-meta-strip">
                <span className="horizon-tag">{label}</span>
                <span className="horizon-digit">
                    <span className="val" style={{ color: `rgb(${rgb})` }}>{currentCount}</span>
                    <span className="slash">/</span>
                    <span className="tot">{total}</span>
                </span>
            </div>

            <div className="spike-field">
                {Array.from({ length: total }).map((_, i) => {
                    const isActive = i < currentCount;
                    const isNext = i === currentCount;
                    const sessionRatio = qualities[i] !== undefined ? qualities[i] : 1;
                    const heightTier = isActive ? getCrystalHeight(sessionRatio) : 0.05;
                    const organicHeight = isActive ? (heightTier * (0.94 + ((i * 2) % 3) * 0.04)) : 0.1;

                    return (
                        <div key={`${direction}-${i}`} className="spike-anchor">
                            <motion.div
                                className={`crystal-spike ${isActive ? 'active' : ''} ${isNext ? 'next' : ''}`}
                                initial={false}
                                animate={{
                                    height: isActive ? `${organicHeight * 100}%` : '2px',
                                    opacity: isActive ? 1 : (isNext ? 0.4 : 0.08),
                                    backgroundColor: isActive ? `rgb(${rgb})` : 'rgba(255,255,255,0.9)',
                                    boxShadow: isActive ? `0 0 20px rgba(${rgb}, 0.5)` : 'none',
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />

                            {isNext && (
                                <motion.div
                                    className="next-pulse"
                                    animate={{ opacity: [0, 0.5, 0], scale: [0.6, 1.4, 0.6] }}
                                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                                    style={{ backgroundColor: `rgb(${rgb})` }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="crystal-evo-container">
            <div className="evo-inner">
                {renderTrack(cycleSettings.zonesUntilDrift, completedZones, 'Zoned Performance', zoneCol, 'up', zoneQualities)}

                <div className="evo-axis">
                    <div className="axis-glow"></div>
                    <motion.div
                        className="axis-scanner"
                        animate={{ left: ['-20%', '120%'] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {renderTrack(cycleSettings.driftsUntilFinish, completedDrifts, 'Drifted Quality', driftCol, 'down', driftQualities)}
            </div>
        </div>
    );
});

export default CycleProgress;
