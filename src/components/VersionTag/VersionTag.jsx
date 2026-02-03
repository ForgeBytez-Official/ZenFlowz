import { motion } from 'framer-motion';
import { VERSION_INFO } from '../../versions/history';
import './VersionTag.css';

export default function VersionTag({ onOpenHub }) {
    return (
        <motion.div
            className="version-tag-hud clickable"
            onClick={onOpenHub}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="v-pill-hud">
                {VERSION_INFO.type} <span>{VERSION_INFO.current}</span>
            </span>
            <span className="s-pill-hud">{VERSION_INFO.status}</span>
        </motion.div>
    );
}
