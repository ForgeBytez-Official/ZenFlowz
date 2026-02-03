import { motion } from 'framer-motion';
import { SHORTCUTS } from '../../utils/shortcuts';
import './ShortcutsPanel.css';

export default function ShortcutsPanel({ isMobile }) {
    return (
        <div className="shortcuts-panel">
            <div className="shortcuts-list">
                {SHORTCUTS.map((s, i) => (
                    <motion.div
                        key={s.key}
                        className="shortcut-item"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <div className="shortcut-key-wrap">
                            <kbd className="shortcut-kbd">{s.key}</kbd>
                        </div>
                        <div className="shortcut-info">
                            <div className="shortcut-action">{s.action}</div>
                            <div className="shortcut-desc">{s.description}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="shortcuts-footer">
                <h2 className="shortcuts-title">Keyboard Shortcuts</h2>
                {!isMobile && (
                    <p className="shortcuts-hint">
                        Press <kbd className="mini-kbd">Esc</kbd> to back
                    </p>
                )}
            </div>
        </div>
    );
}
