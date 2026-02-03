import { PiMinus, PiPlus } from 'react-icons/pi';
import './DurationControl.css';

// Manual adjustment card for each session mode.
export default function DurationControl({ mode, label, icon: Icon, value, limit, onChange, color }) {

    const handleSliderChange = (e) => {
        onChange(mode, parseInt(e.target.value));
    };

    const handleInputChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) val = 0;
        if (val > limit) val = limit;
        onChange(mode, val);
    };

    const adjustTime = (delta) => {
        let newVal = value + delta;
        if (newVal < 1) newVal = 1;
        if (newVal > limit) newVal = limit;
        onChange(mode, newVal);
    };

    const accentColor = color ? `rgb(${color})` : 'var(--color-accent)';

    return (
        <div className="duration-control" style={{ '--accent-color': accentColor }}>
            <div className="dc-header">
                <div className="header-left">
                    <div className="dc-icon" style={{ color: accentColor }}><Icon size={18} /></div>
                    <span className="dc-label">{label}</span>
                </div>
            </div>

            <div className="dc-layout-row">
                <div className="dc-stepper">
                    <button className="step-btn" onClick={() => adjustTime(-1)}>
                        <PiMinus size={14} weight="bold" />
                    </button>
                    <div className="step-display">
                        <span className="step-value">{value}</span>
                        <span className="step-unit">m</span>
                    </div>
                    <button className="step-btn" onClick={() => adjustTime(1)}>
                        <PiPlus size={14} weight="bold" />
                    </button>
                </div>

                <div className="dc-slider-wrapper">
                    <div className="dc-track-ticks">
                        {Array.from({ length: 21 }).map((_, i) => (
                            <div key={i} className={`dc-tick ${i % 5 === 0 ? 'major' : 'minor'}`} />
                        ))}
                    </div>
                    <input
                        type="range"
                        min="1"
                        max={limit}
                        value={value}
                        onChange={handleSliderChange}
                        className="dc-slider"
                        style={{ '--thumb-color': accentColor }}
                    />
                </div>
            </div>
        </div>
    );
}
