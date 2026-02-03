/**
 * Centralized theme configuration for ZenFlowz.
 * Use this to adjust branding, limits, and messaging.
 */

export const THEME = {
    colors: {
        primary: '255, 107, 107',    // Zone focus
        accent: '78, 205, 196',     // Breath transition
        drift: '100, 149, 237',     // Drift restoration
        text: '#ffffff',
        textDim: 'rgba(255, 255, 255, 1)',
        quit: '255, 69, 58'
    },

    messages: {
        welcome: {
            title: "Welcome to ZenFlowz",
            vision: "ZenFlowz is built on the philosophy of 'Intentional Flow'. Unlike traditional timers, we focus on the harmony between deep work and restorative drift.",
            plans: "Coming soon: Integrated soundscapes, minimalist task tracking, and weekly flow analytics.",
            footer: "Ready to find your rhythm?"
        },
        finalStretch: [
            "The Final Push",
            "One last session for today.",
            "Almost there. Focus on the finish line.",
            "Final stretch. Make it count."
        ]
    }
};

export const UI_CONSTANTS = {
    SIDEBAR_WIDTH: 350,
    ANIMATION_SPRING: { type: "spring", stiffness: 200, damping: 25 },
    CONFETTI_DURATION: 3000
};
