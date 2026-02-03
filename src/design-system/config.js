import { ICONS } from './icons';
import { THEME } from './theme';

/**
 * Global Pomodoro Modes Configuration.
 */
export const POMODORO_MODES = {
    ZONE: {
        label: 'Zone',
        color: THEME.colors.primary,
        icon: ICONS.Pomodoro.Zone
    },
    BREATH: {
        label: 'Breath',
        color: THEME.colors.accent,
        icon: ICONS.Pomodoro.Breath
    },
    DRIFT: {
        label: 'Drift',
        color: THEME.colors.drift,
        icon: ICONS.Pomodoro.Drift
    },
};

/**
 * Project-wide strings and labels.
 */
export const STRINGS = {
    buttons: {
        start: "Start",
        pause: "Pause",
        resume: "Resume",
        cheat: "Cheat",
        quit: "Quit",
        welcomeAction: "Let's Flow"
    },
    timer: {
        format: "HH:MM"
    },
    settings: {
        title: "Pomodoro Settings",
        durations: "Durations",
        flowCycle: "Flow Cycle",
        zonesGoal: "Zones until Drift",
        driftsGoal: "Drifts until Finish"
    }
};

/**
 * Logic constants.
 */
export const CYCLE_LOGIC = {
    AUTO_START_DELAY: 1200,
    FINISHED_RESET_DELAY: 5000, // Longer celebration
};
