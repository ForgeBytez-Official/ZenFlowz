// Overview tab - Feature details and technical breakdown
export const OVERVIEW_DATA = {
    items: [
        {
            id: "engine-card",
            title: "The {{ForgeCraftz Engine}}",
            desc: "Official ForgeBytez internal architecture — a structured React framework that keeps code modular, maintainable, and ready to scale. First used in ZenFlowz, built for every project after.",
            intelTag: "Feature",
            patch: "0.1.0-alpha",
            img: null,
            width: 2,
            color: "var(--color-accent-1-hex)",
            subItems: [
                { name: "Modular Core", info: "UI, state, logic separated — no spaghetti." },
                { name: "Zero Bloat", info: "No heavy third-party frameworks. We control the stack." },
                { name: "Reusable Patterns", info: "Same structure across products & client work." },
                { name: "Versioned", info: "v1 — first public showcase in ZenFlowz." }
            ]
        },
        {
            id: "session-architecture",
            title: "{{The Flow State Machine}}",
            desc: "ZenFlowz's core logic — a state machine that moves you through intentional phases of focus and rest. No button mashing. Just flow.",
            intelTag: "Feature",
            patch: "0.1.0-alpha",
            img: "/OnboardingImages/sessions.png",
            width: 4,
            color: "var(--color-accent-2-hex)",
            subItems: [
                { name: "Zone Phase", info: "Deep work. Pomodoro timing. The brush paints with confidence." },
                { name: "Breath Mode", info: "Short rest. 5-minute reset. The brush rests." },
                { name: "Drift Cycle", info: "Long recovery. 15-minute reset after full cycle. A stone wobbles." },
                { name: "Auto-Flow", info: "Automatic transitions between phases. You focus, we track." }
            ]
        },
        {
            id: "sidebar-card",
            title: "{{The Control Panel}}",
            desc: "A clean, slide-out panel that puts everything you need to adjust — timing, targets, and ambiance — in one place. No clutter. No distraction.",
            intelTag: "Component",
            patch: "0.1.0-alpha",
            img: null,
            width: 2,
            color: "var(--color-accent-2-hex)",
            subItems: [
                { name: "Session Durations", info: "Set Zone (1–180 min), Breath (1–30 min), Drift (1–90 min)." },
                { name: "Flow Goals", info: "Choose how many Zoned sessions before a long break. Default: 3." },
                { name: "Ambience & Sound", info: "Toggle sound, adjust volume, choose ambient tracks." }
            ]
        },
        {
            id: "sound-card",
            title: "{{The Ambience Deck}}",
            desc: "A layered sound system designed to fade the outside world. Choose from nature recordings or synthetic noise — your settings save automatically.",
            intelTag: "Component",
            patch: "0.1.0-alpha",
            color: "var(--color-accent-3-hex)",
            width: 4,
            subItems: [
                { name: "Nature Library", info: "Rain, forest, ocean — each track loops seamlessly." },
                { name: "Synthetic Noise", info: "White, pink, brownian — for deep concentration." },
                { name: "Persistent Settings", info: "Your last choice is saved. No need to reset." }
            ]
        },
        {
            id: "progress-bars-card",
            title: "{{Focus Tracking Bars}}",
            desc: "Two progress bars track your session quality in real time. Zone Performance fills when you complete focused sessions. Drifted Quality fills when you drift or skip. Honest feedback, no judgment.",
            intelTag: "Feature",
            patch: "0.1.0-alpha",
            width: 2,
            color: "var(--color-accent-1-hex)",
            subItems: [
                { name: "Zoned Performance", info: "Fills with each completed Zone session. 3 full segments = a Drift long break." },
                { name: "Drifted Quality", info: "Fills when you drift or use the Cheat button. A visual reminder, not a punishment." },
                { name: "Wipe Button", info: "Resets both bars. Fresh start anytime." }
            ]
        },
        {
            id: "shortcuts-card",
            title: "{{The Command Deck}}",
            desc: "Keep your hands on the keyboard. Every core action has a shortcut — so you never need to reach for the mouse.",
            intelTag: "Component",
            patch: "0.1.0-alpha",
            width: 2,
            color: "var(--color-accent-2-hex)",
            subItems: [
                { name: "Space", info: "Start / Pause / Resume the current session." },
                { name: "R", info: "Reset the current session to full duration." },
                { name: "C", info: "Cheat — instantly finish the current session." },
                { name: "Q", info: "Wipe — hard reset all progress and timers." },
                { name: "Z / B / D", info: "Switch modes: Zone, Breath, or Drift." },
                { name: "Esc", info: "Close any open panel (sidebar, menu)." }
            ]
        },
        {
            id: "notifications-card",
            title: "{{Session Alerts}}",
            desc: "Gentle cues that keep you in the flow without yanking you out. Visual toasts, subtle sounds, and color shifts tell you what's happening — without demanding your attention.",
            intelTag: "Feature",
            patch: "0.1.0-alpha",
            width: 2,
            color: "var(--color-accent-1-hex)",
            subItems: [
                { name: "Visual Toasts", info: "Slide-in alerts when sessions end, modes switch, or timers complete." },
                { name: "Audio Cues", info: "Optional sound toggle for session start and end. Clean, unobtrusive." },
                { name: "Color Feedback", info: "Countdown ring shifts color: Rose (Zone), Teal (Breath), Blue (Drift)." },
                { name: "Progress Bars", info: "Zone Performance and Drifted Quality bars fill in real time." }
            ]
        },
        {
            id: "chronos-card",
            title: "{{Chronos HUD}}",
            desc: "A quiet clock and date display in the corner — keeps you grounded without pulling you out of flow. Because knowing it's 3 PM matters when you've been in Zone for two hours.",
            intelTag: "Component",
            patch: "0.1.0-alpha",
            width: 2,
            color: "var(--color-accent-3-hex)",
            subItems: [
                { name: "Current Time", info: "Local time, always visible." },
                { name: "Session Context", info: "See when your session started and when it ends." },
                { name: "Date Reference", info: "Day and date, for long-form focus." }
            ]
        },
        {
            id: "celebration-card",
            title: "{{Final Session Mode}}",
            desc: "Complete a full focus cycle — Zone, Breath, Zone, Breath, Drift — and get a quiet confetti burst. A small celebration for sustained focus.",
            intelTag: "Feature",
            patch: "0.1.0-alpha",
            width: 4,
            color: "var(--color-accent-3-hex)",
            subItems: [
                { name: "Cycle Tracking", info: "Tracks your progress through Zone, Breath, and Drift sessions." },
                { name: "Confetti Burst", info: "Triggers after the final Drift session. Subtle, not distracting." },
                { name: "Reset on Cheat", info: "If you use the Cheat button, the cycle resets — you earn the celebration only when you finish honestly." }
            ]
        },
    ]
};
