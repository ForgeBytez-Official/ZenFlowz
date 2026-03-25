import React from 'react';
import { motion } from 'framer-motion';
import { SOCIALS_DATA } from './socialsData';
import { ICONS } from '../../design-system/icons';
import './SocialLinks.css';

export default function SocialLinks({ variant = 'default' }) {
    return (
        <div className={`social-links-container ${variant}`}>
            {SOCIALS_DATA.map((social) => {
                const Icon = ICONS.Social[social.icon] || ICONS.Help.Info;

                return (
                    <motion.a
                        key={social.id}
                        href={social.disabled ? undefined : social.link}
                        target={social.disabled ? undefined : "_blank"}
                        rel="noreferrer"
                        className={`social-link-item ${social.disabled ? 'disabled' : ''}`}
                        whileHover={social.disabled ? {} : { y: -3, scale: 1.05 }}
                        whileTap={social.disabled ? {} : { scale: 0.95 }}
                        title={social.disabled ? `${social.name} (Coming Soon)` : social.name}
                    >
                        <Icon size={variant === 'briefing' ? 20 : 18} />
                        {variant !== 'minimal' && <span>{social.name}</span>}
                    </motion.a>
                );
            })}
        </div>
    );
}
