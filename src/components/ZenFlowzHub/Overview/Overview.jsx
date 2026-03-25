import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OVERVIEW_DATA } from './overviewData';
import './Overview.css';

// Overview tab - Feature showcase and system breakdown grid
const renderText = (str) => {
    if (!str) return "";
    const parts = str.split(/(\[\[.*?\]\]|\{\{.*?\}\}|\(\(.*?\)\))/g);
    return parts.map((part, i) => {
        if (part.startsWith('[[')) return <span key={i} className="ov26-acc-1">{part.slice(2, -2)}</span>;
        if (part.startsWith('((')) return <span key={i} className="ov26-acc-2">{part.slice(2, -2)}</span>;
        if (part.startsWith('{{')) return <span key={i} className="ov26-acc-3">{part.slice(2, -2)}</span>;
        return part;
    });
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 20 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { type: "spring", stiffness: 350, damping: 25 }
    }
};

function FeatureCard({ item, isHighlighted, onNavigate }) {
    const [imgFailed, setImgFailed] = useState(false);
    const [spans, setSpans] = useState(1);
    const cardRef = useRef(null);
    const rowHeight = 10; 
    const gapBuffer = 15; 

    const measureCard = () => {
        if (!cardRef.current) return;
        const height = cardRef.current.offsetHeight;
        const calculatedSpans = Math.ceil((height + gapBuffer) / rowHeight);
        setSpans(calculatedSpans);
    };

    useEffect(() => {
        measureCard();
        const observer = new ResizeObserver(() => measureCard());
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, [item]);

    const hasMedia = item.img && !imgFailed;

    return (
        <motion.section
            ref={cardRef}
            id={item.id}
            variants={cardVariants}
            className={`ov-v26-card ${hasMedia ? 'has-media' : 'no-media'} ${isHighlighted ? 'is-active' : ''}`}
            style={{
                gridColumn: `span ${item.width}`,
                gridRowEnd: `span ${spans}`,
                '--acc': item.color
            }}
            whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
        >
            {/* Media/Image section */}
            {hasMedia && (
                <div className="ov26-media">
                    <img
                        src={item.img}
                        alt={item.title}
                        onError={() => setImgFailed(true)}
                        onLoad={measureCard}
                        loading="lazy"
                    />
                    <div className="ov26-media-gradient" />
                </div>
            )}


            {/* Card text and details */}
            <div className="ov26-body">
                <header className="ov26-header">
                    <h2 className="ov26-title">{renderText(item.title)}</h2>
                </header>

                <p className="ov26-desc">{renderText(item.desc)}</p>

                {item.subItems && (
                    <div className="ov26-sub-grid">
                        {item.subItems.map((sub, i) => (
                            <div key={i} className="ov26-sub-item">
                                <div className="ov26-sub-dot" />
                                <div className="ov26-sub-txt">
                                    <strong>{renderText(sub.name)}</strong>
                                    <span>{renderText(sub.info)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Metadata footer */}
            <footer className="ov26-footer">
                <div className="ov26-divider" />
                <div className="ov26-footer-row">
                    <span className={`ov26-tag ${item.intelTag.toLowerCase()}`}>{renderText(item.intelTag)}</span>
                    <span className="ov26-patch-tag">{item.patch}</span>
                </div>
            </footer>

            <AnimatePresence>
                {isHighlighted && (
                    <motion.div
                        className="ov26-rim-highlight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>

            <div className="ov26-texture" />
        </motion.section>
    );
}

export default function Overview({ highlightId, onNavigate }) {
    const { items } = OVERVIEW_DATA;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.1, 
                delayChildren: 0.1 
            }
        }
    };

    return (
        <div className="ov-v26-viewport">
            <motion.div 
                className="ov-v26-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {items.map((item) => (
                    <FeatureCard
                        key={item.id}
                        item={item}
                        isHighlighted={highlightId === item.id}
                        onNavigate={onNavigate}
                    />
                ))}
            </motion.div>

            <div className="ov26-grid-anchor" />
        </div>
    );
}

