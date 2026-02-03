import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PiCornersOut, PiCornersIn } from 'react-icons/pi';
import { useSound } from '../../design-system';
import './FullscreenButton.css';

export default function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const { playClick } = useSound();

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = () => {
        playClick();
        const doc = window.document;
        const docEl = doc.documentElement;

        const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitCancelFullScreen || doc.msExitFullscreen;

        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            if (requestFullScreen) {
                requestFullScreen.call(docEl);
            }
        } else {
            if (cancelFullScreen) {
                cancelFullScreen.call(doc);
            }
        }
    };

    return (
        <motion.button
            className={`btn-fullscreen-glass ${isFullscreen ? 'active' : ''}`}
            onClick={toggleFullscreen}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
            <div className={`icon-wrapper ${isFullscreen ? 'active' : ''}`}>
                {isFullscreen ? (
                    <PiCornersIn size={24} weight="bold" />
                ) : (
                    <PiCornersOut size={24} weight="bold" />
                )}
            </div>
        </motion.button>
    );
}
