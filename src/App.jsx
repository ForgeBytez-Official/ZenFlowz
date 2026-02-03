import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ICONS } from './design-system/icons';
import { SettingsProvider } from './context/SettingsContext';

// --- VISUAL LAYERS ---
import Pomodoro from './features/Pomodoro/Pomodoro';
import DateTimeDisplay from './components/DateTimeDisplay/DateTimeDisplay';
import BrandHeader from './components/Branding/BrandHeader';
import VersionTag from './components/VersionTag/VersionTag';
import ZenFlowzHub from './components/Popups/ZenFlowzHub/ZenFlowzHub';

// --- INTERACTIVE ELEMENTS ---
import Sidebar from './components/Sidebar/Sidebar';
import ShortcutsPanel from './components/Sidebar/ShortcutsPanel';
import PomodoroSettings from './components/Settings/PomodoroSettings';
import AmbienceControl from './components/Ambience/AmbienceControl';
import FullscreenButton from './components/FullscreenButton/FullscreenButton';

import './index.css';

/**
 * ZenFlowz Application Wrapper
 * 
 * Think of this as the "Motherboard". It connects all the specialized components 
 * (Timer, Settings, Audio) and handles the global state like "Is the sidebar open?".
 * 
 * We use a "SettingsProvider" at the top level so that any component, anywhere,
 * can ask "Hey, how long is a focus block?" without us passing props down 20 levels.
 */
export default function App() {
    // --- GLOBAL UI STATE ---
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
    const [isHubOpen, setIsHubOpen] = useState(false);

    // We sniff the screen width to decide if we need to squish things.
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    // Keep an eye on resize events.
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // "Panic Button" logic: Hitting Escape should close the top-most overlay.
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Escape') {
                if (isHubOpen) setIsHubOpen(false);
                else if (isShortcutsOpen) setIsShortcutsOpen(false);
                else if (isSidebarOpen) setIsSidebarOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSidebarOpen, isShortcutsOpen, isHubOpen]);

    // Simple toggle helpers
    const handleSidebarClose = () => {
        if (isShortcutsOpen) setIsShortcutsOpen(false);
        else setIsSidebarOpen(false);
    };

    const toggleSidebar = () => {
        if (isSidebarOpen) handleSidebarClose();
        else setIsSidebarOpen(true);
    };

    return (
        <SettingsProvider>
            <div className="app-shell">

                {/* --- MODALS & POPUPS --- */}
                {/* The "Hub" is the start/about screen */}
                <ZenFlowzHub
                    isOpen={isHubOpen}
                    onClose={() => setIsHubOpen(false)}
                />

                {/* --- HUD (HEADS UP DISPLAY) --- */}
                <BrandHeader />
                <DateTimeDisplay />
                <VersionTag onOpenHub={() => setIsHubOpen(true)} />

                {/* --- THE CORE ENGINE --- */}
                {/* We pass 'isSidebarOpen' because the timer might want to shift slightly */}
                <Pomodoro isSidebarOpen={isSidebarOpen} />

                {/* --- FLOATING UTILITIES --- */}
                <div className="bottom-left-controls">
                    <AmbienceControl />
                </div>

                <div className="bottom-right-controls">
                    <div className="floating-fullscreen-btn">
                        <FullscreenButton />
                    </div>
                </div>

                {/* --- SLIDE-OUT MENUS --- */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={handleSidebarClose}
                    title="Pomodoro Settings"
                    isSecondaryOpen={isShortcutsOpen}
                    onSecondaryClose={() => setIsShortcutsOpen(false)}
                    secondaryContent={<ShortcutsPanel isMobile={isMobile} />}
                >
                    <PomodoroSettings
                        onToggleShortcuts={() => setIsShortcutsOpen(!isShortcutsOpen)}
                        isShortcutsOpen={isShortcutsOpen}
                    />
                </Sidebar>
            </div>

            {/* --- THE SETTINGS TRIGGER --- */}
            {/* It floats above everything else. */}
            <div className="floating-settings-btn">
                <motion.button
                    className={`btn-settings-hud ${isSidebarOpen ? 'active' : ''}`}
                    onClick={toggleSidebar}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        animate={{ rotate: isSidebarOpen ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        style={{ display: 'flex' }}
                    >
                        <ICONS.Core.Settings size={isMobile ? 22 : 28} weight="duotone" />
                    </motion.div>
                </motion.button>
            </div>
        </SettingsProvider>
    );
}
