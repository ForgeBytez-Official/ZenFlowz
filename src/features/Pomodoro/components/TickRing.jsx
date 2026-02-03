import React, { memo } from 'react';

/**
 * Renders the static tick marks around the timer.
 * MEMOIZED: Only re-renders when the active tick integer changes.
 */
const TickRing = memo(function TickRing({ count, activeIdx, color }) {
    const cx = 200, cy = 200;
    const tickElements = [];
    if (!count) return null;

    for (let m = 0; m <= count; m++) {
        const degrees = (m / count) * 360 - 90;
        const rad = (degrees * Math.PI) / 180;
        const dotR = 160, textR = 135;
        const dotX = cx + dotR * Math.cos(rad);
        const dotY = cy + dotR * Math.sin(rad);

        const isPassed = m <= activeIdx;

        let isMajor = false, showNumber = false;
        if (count <= 10) { isMajor = true; showNumber = true; }
        else if (count <= 30) { if (m % 5 === 0) { isMajor = true; showNumber = true; } }
        else { if (m % 15 === 0) { isMajor = true; showNumber = true; } }

        if (m === 0 && count > 10) showNumber = false;

        tickElements.push(
            <circle
                key={`tick-${m}`}
                cx={dotX} cy={dotY}
                r={isMajor ? 4 : 2}
                fill={isPassed ? `rgba(${color}, 1)` : "rgba(255,255,255,0.15)"}
                style={{ transition: 'fill 0.1s linear' }}
            />
        );

        if (showNumber && m !== count) {
            const tx = cx + textR * Math.cos(rad);
            const ty = cy + textR * Math.sin(rad);
            tickElements.push(
                <text
                    key={`num-${m}`}
                    x={tx} y={ty}
                    fill={isPassed ? `rgba(${color}, 1)` : "rgba(255,255,255,0.4)"}
                    fontSize="18" fontWeight="700" textAnchor="middle" alignmentBaseline="central"
                    style={{ transition: 'fill 0.1s linear' }}
                >
                    {m}
                </text>
            );
        }
    }
    return <>{tickElements}</>;
});

export default TickRing;
