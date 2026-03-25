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
    Question,
    X,
    TwitterLogo,
    DiscordLogo,
    GithubLogo,
    InstagramLogo,
    LinkedinLogo,
    FacebookLogo,
    CaretRight,
    CalendarBlank as Calendar,
    CloudRain,
    Train,
    Books,
    Tree,
    Waves,
    Link,
    YoutubeLogo,
    TiktokLogo,
    Shield,
    Quotes,
    CaretDown,
    LockSimple,
    CornersOut,
    Sparkle,
    Graph,
    RedditLogo
} from '@phosphor-icons/react';

/* 
  ZenFlowz Icon System
  Powered by Phosphor Icons (Duotone) with Framer Motion for premium interactivity.
*/

// Simplified Premium Icon Wrapper
const wrap = (Icon) => {
    if (!Icon) return (props) => <div {...props} />;
    const M = motion(Icon);
    return (props) => (
        <M 
            weight="duotone" 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }} 
            {...props} 
        />
    );
};

export const ICONS = {
    Pomodoro: {
        Zone: wrap(Brain),
        Breath: wrap(Wind),
        Drift: wrap(Moon),
        Start: wrap(Play),
        Pause: wrap(Pause),
        Reset: wrap(RotateCcw),
        Quit: wrap(XCircle),
        Cheat: wrap(Ghost)
    },
    Core: {
        Settings: wrap(Settings),
        Sound: wrap(Volume2),
        Success: wrap(CheckCircle),
        Error: wrap(XCircle),
        Ambience: wrap(MusicNotes),
        ArrowRight: wrap(CaretRight),
        CaretRight: wrap(CaretRight),
        CaretDown: wrap(CaretDown),
        Link: wrap(Link),
        Shield: wrap(Shield),
        Lock: wrap(LockSimple),
        Expand: wrap(CornersOut),
        Atmosphere: wrap(Sparkle),
        Analytics: wrap(Graph)
    },
    Help: {
        Keyboard: wrap(Keyboard),
        Info: wrap(Question),
        X: wrap(X),
        Calendar: wrap(Calendar),
        Quotes: wrap(Quotes)
    },
    Social: {
        Instagram: wrap(InstagramLogo),
        Twitter: wrap(TwitterLogo),
        X: wrap(TwitterLogo),
        GitHub: wrap(GithubLogo),
        LinkedIn: wrap(LinkedinLogo),
        Facebook: wrap(FacebookLogo),
        Discord: wrap(DiscordLogo),
        YouTube: wrap(YoutubeLogo),
        TikTok: wrap(TiktokLogo),
        Reddit: wrap(RedditLogo)
    },
    Ambience: {
        Rain: wrap(CloudRain),
        Train: wrap(Train),
        Library: wrap(Books),
        Forest: wrap(Tree),
        Ocean: wrap(Waves)
    }
};

