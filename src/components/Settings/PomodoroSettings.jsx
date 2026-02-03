import { motion } from 'framer-motion';
import { ICONS } from '../../design-system/icons';
import { STRINGS } from '../../design-system/config';
import DurationControl from './DurationControl';
import { useSettings } from '../../context/SettingsContext';
import './PomodoroSettings.css';

// Sidebar controls. Tune your focus and rest session lengths.
export default function PomodoroSettings({ onToggleShortcuts, isShortcutsOpen }) {
    const { durations, updateDuration, LIMITS, cycleSettings, updateCycleSetting, notifications, toggleNotification } = useSettings();

    // Modes we care about. Zone, Breath, and Drift.
    const CONFIGS = [
        { key: 'ZONE', label: 'Zone', icon: ICONS.Pomodoro.Zone, color: '123, 166, 170' },   /* Sage Blue */
        { key: 'BREATH', label: 'Breath', icon: ICONS.Pomodoro.Breath, color: '140, 63, 92' }, /* Berry */
        { key: 'DRIFT', label: 'Drift', icon: ICONS.Pomodoro.Drift, color: '184, 192, 255' }, /* Lavender */
    ];

    return (
        <div className="pomodoro-settings">

            {/* Section for session lengths. */}
            <div className="sidebar-section">
                <h3 className="section-title">{STRINGS.settings.durations}</h3>
                <div className="duration-stack">
                    {CONFIGS.map(cfg => (
                        <DurationControl
                            key={cfg.key}
                            mode={cfg.key}
                            label={cfg.label}
                            icon={cfg.icon}
                            color={cfg.color}
                            value={durations[cfg.key]}
                            limit={LIMITS[cfg.key]}
                            onChange={updateDuration}
                        />
                    ))}
                </div>
            </div>

            {/* Section for cycle targets. How many zones before a drift? */}
            <div className="sidebar-section">
                <h3 className="section-title">{STRINGS.settings.flowCycle}</h3>
                <div className="cycle-controls">
                    <CycleStepper
                        label={STRINGS.settings.zonesGoal}
                        value={cycleSettings.zonesUntilDrift}
                        icon={ICONS.Pomodoro.Zone}
                        onChange={(val) => updateCycleSetting('zonesUntilDrift', val)}
                    />
                    <CycleStepper
                        label={STRINGS.settings.driftsGoal}
                        value={cycleSettings.driftsUntilFinish}
                        icon={ICONS.Pomodoro.Drift}
                        onChange={(val) => updateCycleSetting('driftsUntilFinish', val)}
                    />
                </div>
            </div>

            {/* Notifications Section */}
            <div className="sidebar-section">
                <h3 className="section-title">Notifications</h3>
                <div className="notification-controls">
                    <ToggleSwitch
                        label="Browser"
                        isActive={notifications.browser}
                        onClick={() => toggleNotification('browser')}
                        description="In-app alerts" // or "Toast"
                    />
                    <ToggleSwitch
                        label="System"
                        isActive={notifications.system}
                        onClick={() => toggleNotification('system')}
                        description="OS desktop bubbles"
                    />
                </div>
            </div>

            {/* User Helpz Section */}
            <div className="sidebar-section">
                <h3 className="section-title">User Helpz</h3>
                <div className="help-controls">
                    <button
                        className={`help-btn ${isShortcutsOpen ? 'active' : ''}`}
                        onClick={onToggleShortcuts}
                    >
                        <div className="hb-icon">
                            <ICONS.Help.Keyboard size={20} />
                        </div>
                        <div className="hb-info">
                            <span className="hb-label">Keyboard Shortcuts</span>
                        </div>
                    </button>
                </div>
            </div>

        </div>
    );
}

const ToggleSwitch = ({ label, isActive, onClick }) => (
    <motion.button
        className={`toggle-switch-card ${isActive ? 'active-card' : ''}`}
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
        <div className="ts-info">
            <span className="ts-label">{label}</span>
            <span className="ts-desc">{isActive ? 'Enabled' : 'Disabled'}</span>
        </div>
        <div className={`ts-track ${isActive ? 'active' : ''}`}>
            <motion.div className="ts-knob" layout transition={{ type: "spring", stiffness: 500, damping: 30 }} />
        </div>
    </motion.button>
);

// A simple +/- stepper for cycle goals.
const CycleStepper = ({ label, value, icon: Icon, onChange }) => (
    <div className="cycle-card">
        <div className="cc-info">
            <div className="cc-icon"><Icon size={18} /></div>
            <span className="cc-label">{label}</span>
        </div>
        <div className="cc-stepper">
            <button className="step-btn" onClick={() => onChange(value - 1)}>−</button>
            <span className="step-value">{value}</span>
            <button className="step-btn" onClick={() => onChange(value + 1)}>+</button>
        </div>
    </div>
);
