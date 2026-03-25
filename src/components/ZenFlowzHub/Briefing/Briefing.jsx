import React from 'react';
import { motion } from 'framer-motion';
import { BRIEFING_DATA } from './briefingData';
import './Briefing.css';

// Briefing section components
import DiagnosticsCard from './cards/DiagnosticsCard-Briefing/DiagnosticsCard-Briefing';
import HotkeysCard from './cards/HotkeysCard-Briefing/HotkeysCard-Briefing';
import RoadmapCard from './cards/RoadmapCard-Briefing/RoadmapCard-Briefing';
import HeroCard from './cards/HeroCard-Briefing/HeroCard-Briefing';
import SocialsCard from './cards/SocialsCard-Briefing/SocialsCard-Briefing';
import QuoteCard from './cards/QuoteCard-Briefing/QuoteCard-Briefing';
import UpdatesCard from './cards/UpdatesCard-Briefing/UpdatesCard-Briefing';
import QueriesCard from './cards/QueriesCard-Briefing/QueriesCard-Briefing';

// Briefing tab - Main onboarding view with project info and quick links
export default function Briefing({ onNavigate, onHighlight, onClose }) {
    const d = BRIEFING_DATA || {};

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.15 }
        }
    };

    const handleAction = (type, target, id = null) => {
        if (type === 'highlight') {
            onHighlight(target);
            onClose();
        } else if (type === 'navigate') {
            onNavigate(target, id);
        }
    };

    if (!d.intro) return <div className="br19-loading">Loading Intel Protocol...</div>;

    return (
        <motion.div
            className="br-v19-viewport"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="br-v19-bento">

                {/* Left column: Stats and navigation */}
                <motion.div className="br19-col" variants={containerVariants}>
                    <DiagnosticsCard system={d.system} />
                    <HotkeysCard hotkeys={d.hotkeys} onHighlight={handleAction} />
                    <RoadmapCard onNavigate={onNavigate} />
                </motion.div>

                {/* Center column: Main intro and social links */}
                <motion.div className="br19-col br19-col-c" variants={containerVariants}>
                    <HeroCard intro={d.intro} />
                    <SocialsCard socials={d.socials} />
                </motion.div>

                {/* Right column: Extra info and updates */}
                <motion.div className="br19-col" variants={containerVariants}>
                    <QuoteCard quotes={d.quotes} />
                    <UpdatesCard updates={d.updates} />
                    <QueriesCard queries={d.queries} onNavigate={handleAction} />
                </motion.div>

            </div>
        </motion.div>
    );
}
