import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../../../../design-system/icons';
import { renderText, cardVariants } from '../../BriefingUtils';
import './QuoteCard-Briefing.css';

// Quote Card - Daily productivity quotes
const QuoteCard = ({ quotes }) => {
    // Determine the quote for today based on the date
    const todayQuote = quotes[new Date().getDate() % quotes.length];

    return (
        <motion.section className="br19-card br19-quote is-compact" variants={cardVariants}>
            <header className="br19-card-head">
                <div className="br19-ico"><ICONS.Help.Quotes size={16} /></div>
                <div>
                    <span className="br19-tag">Wisdom</span>
                    <h4>{renderText("Quote of the {{Day}}")}</h4>
                </div>
            </header>
            <div className="br19-quote-box">
                <div className="br19-quote-mark">“</div>
                <p className="br19-quote-text">
                    {renderText(todayQuote.text)}
                </p>
                <div className="br19-quote-author-v15">
                    <span className="v2-author-line" />
                    <span>{todayQuote.author}</span>
                </div>
            </div>
        </motion.section>
    );
};

export default QuoteCard;
