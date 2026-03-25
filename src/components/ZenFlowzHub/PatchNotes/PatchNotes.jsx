import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VERSION_INFO } from '../../../versions/versions';
import { ICONS } from '../../../design-system/icons';
import './PatchNotes.css';

// Patch Notes tab - Version history with hierarchical nesting
const cardVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 20 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { type: "spring", stiffness: 350, damping: 25 }
    }
};

const GithubBtn = ({ link }) => {
    if (!link) return null;
    return (
        <motion.a
            href={link} target="_blank" rel="noreferrer"
            className="pn28-github-btn"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.9 }}
            title="View on GitHub"
        >
            <ICONS.Social.GitHub size={14} />
        </motion.a>
    );
};

const hasTarget = (node, target) => {
    if (!target) return false;
    if (node.version === target) return true;
    return node.children?.some(child => hasTarget(child, target));
};

const PatchNode = ({ patch, level = 0, isLast = false, isRoot = false, targetPatch }) => {
    const hasChildren = patch.children && patch.children.length > 0;
    const hasContent = (patch.summary || (patch.details && patch.details.length > 0) || (patch.noticeableInfo && patch.noticeableInfo.length > 0));
    const canToggle = hasChildren || hasContent;
    const [isExpanded, setIsExpanded] = useState(false); // Default to collapsed for a cleaner initial view

    useEffect(() => {
        if (targetPatch && hasTarget(patch, targetPatch)) {
            setIsExpanded(true);
        }
    }, [targetPatch, patch]);

    return (
        <div 
            className={`pn28-node level-${level} ${isExpanded ? 'is-expanded' : 'is-collapsed'} ${isLast ? 'is-last' : ''} ${isRoot ? 'is-root' : ''}`}
            data-version={patch.version}
        >
            <div 
                className={`pn28-row ${canToggle ? 'is-clickable' : ''} is-${patch.type.toLowerCase()}`}
                onClick={(e) => {
                    // Prevent toggle if the click was targeted at an action (GitHub btn)
                    if (e.target.closest('.pn28-github-btn') || e.target.closest('.pn28-anchor-wrap')) return;
                    if (canToggle) setIsExpanded(!isExpanded);
                }}
            >
                {/* Date/Gutter area */}
                <div className="pn28-date-gutter">
                    {isRoot && <span className="pn28-date">{patch.date}</span>}
                </div>

                {/* Connection lines and toggle arrows */}
                <div className="pn28-icon-gutter">
                    <div className="pn28-topology-line" />
                    
                    <motion.div
                        className={`pn28-anchor-wrap ${!canToggle ? 'is-disabled' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (canToggle) setIsExpanded(!isExpanded);
                        }}
                    >
                        <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            className="pn28-arrow"
                        >
                            <ICONS.Core.CaretRight
                                size={12}
                                weight="bold"
                                style={{ 
                                    opacity: canToggle ? 1 : 0.2,
                                    color: canToggle ? 'var(--color-accent-1-hex)' : 'rgba(255,255,255,0.1)'
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Patch content and details */}
                <div className="pn28-main">
                    <header className={`pn28-node-header ${canToggle ? 'is-toggleable' : ''}`}>
                        <div className="pn28-node-meta">
                            <span className="pn28-status-tag">{patch.status}</span>
                            <span className="pn28-v">v{patch.version}</span>
                            <h4 className="pn28-node-title">{patch.title}</h4>
                            <span className={`v-type-tag v-${patch.type.toLowerCase()}`}>
                                {patch.type.toUpperCase()}
                            </span>
                        </div>
                        {canToggle && !isExpanded && (
                            <span className="pn28-hint">Manifest Details</span>
                        )}
                    </header>

                    <AnimatePresence initial={false}>
                        {isExpanded && (
                            <motion.div
                                className="pn28-node-body"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                    height: 'auto', 
                                    opacity: 1,
                                    transition: {
                                        height: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
                                        opacity: { duration: 0.3, delay: 0.1 }
                                    }
                                }}
                                exit={{ 
                                    height: 0, 
                                    opacity: 0,
                                    transition: {
                                        height: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
                                        opacity: { duration: 0.2 }
                                    }
                                }}
                                style={{ overflow: 'hidden', willChange: 'height, opacity' }}
                            >
                                <div className="pn28-content-wrapper" style={{ paddingBottom: '24px' }}>
                                    <motion.p 
                                        className="pn28-summary"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                    >
                                        {patch.summary}
                                    </motion.p>

                                    {/* Patched Info */}
                                    {patch.noticeableInfo && (
                                        <motion.div 
                                            className="pn28-noticeable-box"
                                            initial={{ opacity: 0, scale: 0.97, y: 15 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.97, y: 10 }}
                                            transition={{ 
                                                duration: 0.5, 
                                                ease: [0.33, 1, 0.68, 1],
                                                delay: 0.25 
                                            }}
                                        >
                                            <div className="pn28-noticeable-label">Patched Info</div>
                                            <div className="pn28-noticeable-grid">
                                                {patch.noticeableInfo.map((info, idx) => (
                                                    <motion.div 
                                                        key={idx} 
                                                        className="pn28-noticeable-item"
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 + (idx * 0.05) }}
                                                    >
                                                        <div className="pn28-ni-content">
                                                            <span className="pn28-ni-key">{info.label}</span>
                                                            <span className="pn28-ni-val">{info.value}</span>
                                                            {info.desc && (
                                                                <p className="pn28-ni-desc">{info.desc}</p>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {patch.details && (
                                        <motion.ul 
                                            className="pn28-details-list"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.35, duration: 0.4 }}
                                        >
                                            {patch.details.map((d, i) => (
                                                <motion.li 
                                                    key={i}
                                                    initial={{ opacity: 0, x: -5 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.4 + (i * 0.05) }}
                                                >
                                                    {d}
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    )}



                                    {hasChildren && (
                                        <motion.div 
                                            className={`pn28-nested level-${level + 1}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.45 }}
                                        >
                                            {patch.children.map((child, i) => (
                                                <PatchNode
                                                    key={i}
                                                    patch={child}
                                                    level={level + 1}
                                                    isLast={i === patch.children.length - 1}
                                                    targetPatch={targetPatch}
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>



                </div>

                {/* GitHub link button */}
                <div className="pn28-action-gutter">
                    <GithubBtn link={patch.githubLink} />
                </div>
            </div>
        </div>
    );
};



const MajorPatchCard = ({ major, targetPatch }) => {
    return (
        <motion.div
            className="pn28-major-card"
            variants={cardVariants}
        >
            <PatchNode patch={major} level={0} isRoot={true} targetPatch={targetPatch} />
            <div className="pn28-card-texture" />
        </motion.div>
    );
};

export default function PatchNotes({ targetPatch }) {
    const { history, githubRepo } = VERSION_INFO;
    const listRef = useRef(null);

    useEffect(() => {
        if (targetPatch && listRef.current) {
            // Delay scrolling slightly to allow auto-expansion of target nodes
            const timer = setTimeout(() => {
                const el = listRef.current.querySelector(`[data-version="${targetPatch}"]`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.classList.add('pn28-highlight-pulse');
                    setTimeout(() => el.classList.remove('pn28-highlight-pulse'), 3000);
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [targetPatch]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.12, 
                delayChildren: 0.15 
            }
        }
    };

    return (
        <motion.div 
            className="pn28-viewport"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header section */}
            <motion.header className="pn28-hub-header" variants={cardVariants}>
                <div className="pn28-header-info">
                    <h2 className="pn28-section-title">Patches</h2>
                    <p className="pn28-section-subtitle">The digital topology of Void Synthesis evolution.</p>
                </div>
                
                <motion.a
                    href={`${githubRepo}/releases`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="pn28-manifest-link"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span>Full Release Manifest</span>
                    <ICONS.Core.ArrowRight size={14} />
                </motion.a>
            </motion.header>

            {/* Version list */}
            <motion.div 
                className="pn28-list" 
                ref={listRef}
                variants={containerVariants}
            >
                {history.map((major, i) => (
                    <MajorPatchCard key={major.version} major={major} targetPatch={targetPatch} />
                ))}
            </motion.div>

            <div className="pn28-grid-anchor" />
        </motion.div>
    );
}

