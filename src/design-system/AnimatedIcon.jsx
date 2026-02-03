import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useImperativeHandle } from 'react';

/**
 * AnimatedIcon - Wraps Phosphor icons with unique click animations.
 * Each icon type has a signature animation that triggers on click.
 */

// Animation presets for each icon type
const ICON_ANIMATIONS = {
    // Play: Quick pulse + nudge right (motion feel)
    Play: {
        animate: { scale: [1, 1.2, 1], x: [0, 3, 0] },
        transition: { duration: 0.3, ease: "easeOut" }
    },
    // Pause: Bars squeeze inward then bounce back
    Pause: {
        animate: { scaleX: [1, 0.8, 1.1, 1] },
        transition: { duration: 0.35, ease: "easeOut" }
    },
    // Brain (Zone): Cerebral pulse - scale with emphasis
    Brain: {
        animate: { scale: [1, 1.25, 0.95, 1], rotate: [0, 5, -5, 0] },
        transition: { duration: 0.4, ease: "easeOut" }
    },
    Zone: {
        animate: { scale: [1, 1.25, 0.95, 1], rotate: [0, 5, -5, 0] },
        transition: { duration: 0.4, ease: "easeOut" }
    },
    // Wind (Breath): Horizontal whoosh slide
    Wind: {
        animate: { x: [0, 8, -4, 0], opacity: [1, 0.7, 1] },
        transition: { duration: 0.4, ease: "easeInOut" }
    },
    Breath: {
        animate: { x: [0, 8, -4, 0], opacity: [1, 0.7, 1] },
        transition: { duration: 0.4, ease: "easeInOut" }
    },
    // Moon (Drift): Gentle rock/cradle rotation
    Moon: {
        animate: { rotate: [0, 15, -10, 5, 0], scale: [1, 1.05, 1] },
        transition: { duration: 0.5, ease: "easeInOut" }
    },
    Drift: {
        animate: { rotate: [0, 15, -10, 5, 0], scale: [1, 1.05, 1] },
        transition: { duration: 0.5, ease: "easeInOut" }
    },
    // Settings: Gear spin (90° snap rotation)
    Settings: {
        animate: { rotate: [0, 90] },
        transition: { duration: 0.3, type: "spring", stiffness: 200, damping: 15 }
    },
    Cheat: {
        animate: { y: [0, -6, 0], rotate: [0, 8, -8, 4, -4, 0], scale: [1, 1.1, 1] },
        transition: { duration: 0.5, ease: "easeOut" }
    },
    // Reset (RotateCcw): Counter-clockwise full 360° spin
    Reset: {
        animate: { rotate: -360 },
        transition: { duration: 0.5, ease: "easeOut" }
    },
    RotateCcw: {
        animate: { rotate: -360 },
        transition: { duration: 0.5, ease: "easeOut" }
    },
    // Quit (XCircle): Quick shake/vibrate
    Quit: {
        animate: { x: [0, -4, 4, -3, 3, -2, 2, 0], scale: [1, 1.05, 1] },
        transition: { duration: 0.4, ease: "easeOut" }
    },
    XCircle: {
        animate: { x: [0, -4, 4, -3, 3, -2, 2, 0], scale: [1, 1.05, 1] },
        transition: { duration: 0.4, ease: "easeOut" }
    },
    // CheckCircle: Satisfying pop + bounce
    CheckCircle: {
        animate: { scale: [1, 1.3, 0.9, 1.1, 1] },
        transition: { duration: 0.4, ease: "easeOut" }
    },
    // Volume/Sound: Pulse waves
    Volume2: {
        animate: { scale: [1, 1.15, 1], opacity: [1, 0.8, 1] },
        transition: { duration: 0.3, ease: "easeOut" }
    },
    Sound: {
        animate: { scale: [1, 1.15, 1], opacity: [1, 0.8, 1] },
        transition: { duration: 0.3, ease: "easeOut" }
    },
    // Default fallback: Simple pop
    default: {
        animate: { scale: [1, 1.15, 1] },
        transition: { duration: 0.25, ease: "easeOut" }
    }
};

/**
 * Get animation config for an icon by name
 */
const getIconAnimation = (iconName) => {
    if (!iconName) return ICON_ANIMATIONS.default;

    // Try exact match first
    if (ICON_ANIMATIONS[iconName]) {
        return ICON_ANIMATIONS[iconName];
    }

    // Try to find partial match (e.g., "BrainBold" -> "Brain")
    const baseName = Object.keys(ICON_ANIMATIONS).find(key =>
        iconName.includes(key) || key.includes(iconName)
    );

    return baseName ? ICON_ANIMATIONS[baseName] : ICON_ANIMATIONS.default;
};

/**
 * AnimatedIcon Component
 * Wraps any Phosphor icon with click animations.
 * 
 * @param {Component} icon - Phosphor icon component
 * @param {string} iconName - Name hint for animation lookup (e.g., "Play", "Settings")
 * @param {number} size - Icon size (default: 24)
 * @param {string} weight - Phosphor weight: "bold", "fill", "duotone", etc. (default: "bold")
 * @param {function} onActivate - Callback when animation triggers
 * @param {boolean} triggerOnRender - If true, animate on mount
 */
const AnimatedIcon = forwardRef(({
    icon: Icon,
    iconName,
    size = 24,
    weight = "bold",
    className = "",
    style = {},
    onActivate,
    triggerOnRender = false,
    ...props
}, ref) => {
    const controls = useAnimation();

    // Determine icon name for animation lookup
    const resolvedName = iconName || Icon?.displayName || Icon?.name || "";
    const animation = getIconAnimation(resolvedName);

    // Expose trigger method via ref
    useImperativeHandle(ref, () => ({
        trigger: async () => {
            await controls.start(animation.animate, animation.transition);
            controls.set({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
        }
    }));

    const handleClick = async () => {
        if (onActivate) onActivate();
        await controls.start(animation.animate, animation.transition);
        // Reset to default state
        controls.set({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
    };

    return (
        <motion.div
            className={`animated-icon ${className}`}
            animate={controls}
            initial={triggerOnRender ? animation.animate : undefined}
            onClick={handleClick}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                ...style
            }}
            {...props}
        >
            {Icon && <Icon size={size} weight={weight} />}
        </motion.div>
    );
});

AnimatedIcon.displayName = 'AnimatedIcon';

export default AnimatedIcon;
export { ICON_ANIMATIONS, getIconAnimation };
