import React from 'react';
import { motion } from 'framer-motion';

// --- Animation Variants ---

// Swift, premium draw-in effect
const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i = 0) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { delay: i * 0.05, type: "spring", duration: 1.0, bounce: 0 },
            opacity: { delay: i * 0.05, duration: 0.2 }
        }
    })
};

// Ambient loops for active states
const loops = {
    bounce: {
        y: [0, -3, 0],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    float: {
        y: [0, -2, 0],
        rotate: [0, 1, -1, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    pulse: {
        scale: [1, 1.1, 1],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    rotate: {
        rotate: 360,
        transition: { duration: 8, repeat: Infinity, ease: "linear" }
    },
    slide: {
        x: [0, 3, 0],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    wiggle: {
        rotate: [0, 10, -10, 0],
        transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 }
    }
};

// --- Generic Wrapper ---
// Decouples "Drawing" (on SVG) from "Moving" (on Group) to prevent bugs.
const IconWrapper = ({
    isActive = false,
    loopType = null,
    customAnimate,
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className,
    children,
    ...props
}) => {
    // Determine the animation for the group layer
    let groupAnimate = {};
    let groupTransition = {};

    if (isActive) {
        if (customAnimate) {
            groupAnimate = customAnimate.animate;
            groupTransition = customAnimate.transition;
        } else if (loopType && loops[loopType]) {
            // Unpack loop definition
            const { transition, ...values } = loops[loopType];
            groupAnimate = values;
            groupTransition = transition;
        }
    } else {
        // Reset to default state when inactive
        groupAnimate = { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 };
        groupTransition = { duration: 0.3 };
    }

    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            {...props}
        >
            <motion.g
                animate={groupAnimate}
                transition={groupTransition}
                style={{ originX: "50%", originY: "50%" }}
            >
                {children}
            </motion.g>
        </motion.svg>
    );
};

// --- Icons (Official Lucide Geometry) ---

export const Play = (props) => (
    <IconWrapper {...props} style={{ overflow: 'visible', ...props.style }}>
        <motion.path
            d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
            variants={drawVariants}
            fill="transparent"
            whileHover={{ fill: props.fill || "currentColor", stroke: "transparent" }}
        />
    </IconWrapper>
);

export const Pause = (props) => (
    <IconWrapper {...props}>
        <motion.rect x="14" y="3" width="5" height="18" rx="1" variants={drawVariants} custom={0} />
        <motion.rect x="5" y="3" width="5" height="18" rx="1" variants={drawVariants} custom={0.1} />
    </IconWrapper>
);

export const RotateCcw = (props) => (
    <IconWrapper {...props}>
        <motion.path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" variants={drawVariants} />
        <motion.path d="M3 3v5h5" variants={drawVariants} custom={0.2} />
    </IconWrapper>
);

export const Ghost = (props) => (
    <IconWrapper {...props} loopType="bounce">
        <motion.path d="M9 10h.01" variants={drawVariants} />
        <motion.path d="M15 10h.01" variants={drawVariants} />
        <motion.path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" variants={drawVariants} custom={0.2} />
    </IconWrapper>
);

export const Wind = (props) => (
    <IconWrapper {...props} loopType="slide">
        <motion.path d="M12.8 19.6A2 2 0 1 0 14 16H2" variants={drawVariants} />
        <motion.path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" variants={drawVariants} custom={0.1} />
        <motion.path d="M9.8 4.4A2 2 0 1 1 11 8H2" variants={drawVariants} custom={0.2} />
    </IconWrapper>
);

export const Brain = (props) => (
    <IconWrapper {...props} loopType="pulse">
        <motion.path d="M12 18V5" variants={drawVariants} />
        <motion.path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" variants={drawVariants} />
        <motion.path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" variants={drawVariants} />
        <motion.path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" variants={drawVariants} />
        <motion.path d="M18 18a4 4 0 0 0 2-7.464" variants={drawVariants} />
        <motion.path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" variants={drawVariants} />
        <motion.path d="M6 18a4 4 0 0 1-2-7.464" variants={drawVariants} />
        <motion.path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" variants={drawVariants} />
    </IconWrapper>
);

export const Moon = (props) => (
    <IconWrapper {...props}
        customAnimate={{
            animate: { rotate: [0, 10, 0] },
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ rotate: 15 }}
    >
        <motion.path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" variants={drawVariants} />
    </IconWrapper>
);

export const Settings = (props) => (
    <IconWrapper {...props}
        customAnimate={{
            animate: { rotate: 180 },
            transition: { type: "spring", stiffness: 100 }
        }}
    >
        <motion.path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" variants={drawVariants} />
        <motion.circle cx="12" cy="12" r="3" variants={drawVariants} />
    </IconWrapper>
);

export const Volume2 = ({ isActive, ...props }) => (
    // Volume uses specific path animations, so we don't use the generic group loop
    <IconWrapper {...props} isActive={false}>
        <motion.path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" variants={drawVariants} />
        <motion.path d="M16 9a5 5 0 0 1 0 6" variants={drawVariants} custom={1}
            animate={isActive ? { opacity: [0.3, 1, 0.3], pathLength: 1 } : "visible"}
            transition={isActive ? { duration: 1.5, repeat: Infinity } : { duration: 0.2 }}
        />
        <motion.path d="M19.364 18.364a9 9 0 0 0 0-12.728" variants={drawVariants} custom={2}
            animate={isActive ? { opacity: [0.3, 1, 0.3], pathLength: 1 } : "visible"}
            transition={isActive ? { duration: 1.5, repeat: Infinity, delay: 0.2 } : { duration: 0.2 }}
        />
    </IconWrapper>
);

export const XCircle = (props) => (
    <IconWrapper {...props}>
        <motion.circle cx="12" cy="12" r="10" variants={drawVariants} />
        <motion.path d="m15 9-6 6" variants={drawVariants} custom={0.2} />
        <motion.path d="m9 9 6 6" variants={drawVariants} custom={0.3} />
    </IconWrapper>
);

export const CheckCircle = (props) => (
    <IconWrapper {...props}>
        <motion.path d="M21.801 10A10 10 0 1 1 17 3.335" variants={drawVariants} />
        <motion.path d="m9 11 3 3L22 4" variants={drawVariants} custom={0.2} />
    </IconWrapper>
);
