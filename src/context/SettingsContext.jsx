import { createContext, useContext, useState } from 'react';

// Global settings hub. Keep all durations and cycle goals in one place.
const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

const LIMITS = {
    ZONE: 180,
    BREATH: 30,
    DRIFT: 90
};

export const SettingsProvider = ({ children }) => {

    // Default session lengths. Update these in the sidebar.
    const [durations, setDurations] = useState({
        ZONE: 25,
        BREATH: 5,
        DRIFT: 15
    });

    // Cycle targets for when to take big breaks.
    const [cycleSettings, setCycleSettings] = useState({
        zonesUntilDrift: 3,
        driftsUntilFinish: 3
    });

    // Notification Preferences
    const [notifications, setNotifications] = useState({
        browser: true,
        system: true
    });

    const toggleNotification = (type) => {
        if (type === 'system' && !notifications.system) {
            // Check if API exists
            if (!('Notification' in window)) {
                alert("This browser does not support desktop notifications.");
                return;
            }

            // Proactively request permission on user gesture
            if (Notification.permission !== 'granted') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        setNotifications(prev => ({ ...prev, system: true }));
                    } else {
                        // User denied or closed the prompt
                        setNotifications(prev => ({ ...prev, system: false }));
                    }
                });
                return; // Wait for permission
            }
        }

        setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
    };

    // Handy tool to tweak cycle targets.
    const updateCycleSetting = (key, val) => {
        let value = parseInt(val);
        if (isNaN(value) || value < 1) value = 1;
        if (value > 10) value = 10;

        setCycleSettings(prev => ({ ...prev, [key]: value }));
    };

    // Method to change how long each session lasts.
    const updateDuration = (mode, newVal) => {
        let value = parseInt(newVal);
        if (isNaN(value)) value = 1;

        if (value < 1) value = 1;
        if (value > LIMITS[mode]) value = LIMITS[mode];

        setDurations(prev => ({
            ...prev,
            [mode]: value
        }));
    };

    return (
        <SettingsContext.Provider value={{
            durations,
            LIMITS,
            updateDuration,
            cycleSettings,
            updateCycleSetting,
            notifications,
            toggleNotification
        }}>
            {children}
        </SettingsContext.Provider>
    );
};
