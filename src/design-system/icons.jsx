import React from 'react';
import { motion } from 'framer-motion';
import {
    Brain,
    Wind,
    MoonStars as Moon,
    Play,
    Pause,
    ArrowCounterClockwise as RotateCcw,
    XCircle,
    Ghost,
    GearSix as Settings,
    SpeakerHigh as Volume2,
    CheckCircle,
    MusicNotes,
    Keyboard,
    Question
} from '@phosphor-icons/react';

/* 
  ZenFlowz Icon System
  Powered by Phosphor Icons (Duotone) with Framer Motion for premium interactivity.
*/

// Helper to create animated duotone icons
const createIcon = (Icon, animationType = 'scale') => {
    const MotionIcon = motion(Icon);

    const variants = {
        scale: {
            hover: { scale: 1.15 },
            tap: { scale: 0.9 }
        },
        rotate: {
            hover: { rotate: 90, scale: 1.1 },
            tap: { scale: 0.9 }
        },
        spin: {
            hover: { rotate: -180, scale: 1.1 },
            tap: { scale: 0.9 }
        },
        pulse: {
            hover: { scale: 1.1, filter: "brightness(1.2)" },
            tap: { scale: 0.95 }
        },
        shake: {
            hover: { rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } },
            tap: { scale: 0.9 }
        }
    };

    return (props) => (
        <MotionIcon
            weight="duotone"
            variants={variants[animationType] || variants.scale}
            whileHover="hover"
            whileTap="tap"
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            {...props}
        />
    );
};

export const ICONS = {
    // Pomodoro Features
    Pomodoro: {
        Zone: createIcon(Brain, 'pulse'),
        Breath: createIcon(Wind, 'shake'),
        Drift: createIcon(Moon, 'pulse'),
        Start: createIcon(Play, 'scale'),
        Pause: createIcon(Pause, 'scale'),
        Reset: createIcon(RotateCcw, 'spin'),
        Quit: createIcon(XCircle, 'scale'),
        Cheat: createIcon(Ghost, 'pulse')
    },

    // Core Icons
    Core: {
        Settings: createIcon(Settings, 'rotate'),
        Sound: createIcon(Volume2, 'pulse'),
        Success: createIcon(CheckCircle, 'scale'),
        Error: createIcon(XCircle, 'scale'),
        Ambience: createIcon(MusicNotes, 'shake')
    },

    // Help & Shortcuts
    Help: {
        Keyboard: createIcon(Keyboard, 'scale'),
        Info: createIcon(Question, 'scale')
    }
};
