// ZenFlowz Briefing static data
export const BRIEFING_DATA = {
    // Introduction and hero section data
    intro: {
        title: "ZenFlowz: {{Find Your Own Rythm}}",
        tag: "PROJECT ONBOARDING",
        desc: "ZenFlowz is a {{cognitive architectured Web App}} designed to dissolve the friction between intent and execution. It's a gateway to your ((absolute peak performance))",
        manifest: [
            { label: "Audio Dictation", info: "Rather than just staying on this website and lacking your productivity, let it idle in the background and focus.", icon: "Audio" },
            { label: "Community Approach", info: "We listen to our community and always try to give the best to their request.", icon: "Synthesis" },
            { label: "Privacy On Top", info: "We don't keep or get your data unless we implement where we need your consent.", icon: "Crystals" }
        ],
        onboarding: [
            { label: "Break Cycle", info: "Take a breathing after every zone.", id: "ob1" },
            { label: "Control Yourself", info: "You take control of your time from the sidebar.", id: "ob2" },
            { label: "Upcoming Stuffz", info: "We're working on improving day by day.", id: "ob3" }
        ],
        vision: "Defining the future of flow-state architecture.",
        principles: [
            { title: "Fluidity", desc: "Each animation and effect is chosen with ((precision))." },
            { title: "Precision", desc: "All features and timings are ((mathematically accurate))." },
            { title: "Sovereignty", desc: "((You)) own your focus and ((we)) help you achieve it." }
        ]
    },

    // Quick navigation links
    queries: {
        title: "Quick {{Queries}}",
        tag: "INTELLIGENCE",
        links: [
            { label: "The {{ForgeCraftz Engine}}", target: "engine-card" },
            { label: "The {{Flow Architecture}}", target: "session-architecture" },
            { label: "The {{Ambience Deck}}", target: "sound-card" },
            { label: "The {{Command Deck}}", target: "shortcuts-card" },
            { label: "The {{Session Alerts}}", target: "notifications-card" },
            { label: "The {{Chronos HUD}}", target: "chronos-card" },
            { label: "The {{Focus Cycle}}", target: "celebration-card" }
        ]
    },

    // Keybindings mapping
    hotkeys: {
        title: "Hotkeys {{Mastery}}",
        tag: "KEYBINDINGS",
        items: [
            { key: "SPACE", label: "((Start / Pause))" },
            { key: "R", label: "Reset Session" },
            { key: "Z", label: "Zone Entry" },
        ]
    },

    // System status metrics
    system: {
        title: "Engine {{Integrity}}",
        tag: "DIAGNOSTICS",
        metrics: [
            { label: "Project Status", value: "Alpha", status: "optimal", },
            { label: "Engine Buffer", value: "ForgeCraftz Engine", status: "active", },
            { label: "Focus Improvements", value: "+33% (Unofficial Data)", status: "enhanced", }
        ]
    },

    // Recent project updates
    updates: {
        title: "Latest {{Changes}}",
        tag: "EVOLUTION",
        changelog: [
            "ZenFlowz Hub included",
            "New sections (Briefing, Overview, Patches) in ZenFlowz Hub",
            "Better onboard for new users",
        ]
    },

    // Social media links and status
    socials: {
        title: "Social {{Connectivity}}",
        tag: "CHANNELS",
        links: [
            {
                platform: "Instagram",
                link: "https://www.instagram.com/_forgebytez_/",
                handle: "@_ForgeBytez.Offical_",
                color: "#E4405F",
                stats: "3 Followers",
                desc: "Official Updates, Dev Logs, Posters and More.",
                active: true
            },
            {
                platform: "X / Twitter",
                link: "https://x.com/_ForgeBytez_",
                handle: "@_ForgeBytez_",
                color: "#1DA1F2",
                stats: "2 Followers",
                desc: "Fast announcements and Sneak Peaks",
                active: true
            },
            {
                platform: "Facebook",
                link: "https://www.facebook.com/profile.php?id=61576471796094",
                handle: "Forge Bytez",
                color: "#1877F2",
                stats: "1 Follower",
                desc: "Just Normal Posts",
                active: true
            },
            {
                platform: "GitHub",
                link: "https://github.com/ForgeBytez-Official/ZenFlowz",
                handle: "@chanForgeBytez-Official",
                color: "#7BA6AA",
                stats: "2 Stars",
                desc: "Check The Sources and Contribute Youself",
                active: true
            },
            {
                platform: "Discord",
                link: "#",
                handle: "ZenFlowz Hub",
                color: "#5865F2",
                stats: "Soon (No fans)",
                desc: "Join the comm.",
                active: false
            },
            {
                platform: "LinkedIn",
                link: "#",
                handle: "ForgeBytez",
                color: "#0A66C2",
                stats: "In Review",
                desc: "Connect with us.",
                active: false
            },
            {
                platform: "YouTube",
                link: "#",
                handle: "ForgeBytez Labs",
                color: "#FF0000",
                stats: "Queued",
                desc: "Watch the demos.",
                active: false
            },
            {
                platform: "Reddit",
                link: "#",
                handle: "r/ZenFlowz",
                color: "#FF4500",
                stats: "Setup Phase",
                desc: "Join the Subreddit.",
                active: false
            }
        ]
    },

    // Curated quotes for the briefing section
    quotes: [
        { text: "The successful warrior is the average man, with ((laser-like focus)).", author: "Bruce Lee" },
        { text: "Your focus determines your reality.", author: "Qui-Gon Jinn" },
        { text: "Focus is a matter of deciding what things you're not going to do.", author: "John Carmack" }
    ]
};
