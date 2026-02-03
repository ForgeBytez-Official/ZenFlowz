# ZenFlowz

ZenFlowz is a glassmorphic productivity engine we built to help people actually stay in a "Flow State." 

Most Pomodoro apps feel like chores—we wanted something that feels physical, satisfying, and intentional. On top of that it’s open-source, lightweight, and built with a lot of care

---

### The "Void" Timer
Instead of just watching numbers drop, we built the "Void" model. It’s a circular ring that reduces clockwise as time passes.
* **Buttery Smooth:** It runs on an independent `60FPS` render loop (`TimerFace`), so the motion is fluid, not frame-y.
* **Low Noise:** The background ticks only light up as you earn them, keeping your screen clean and your brain focused.

### Flow State Machine
We don't want you clicking buttons all day. ZenFlowz automates the transitions:
1.  **ZONE:** Deep work blocks (25m).
2.  **BREATH:** Quick resets (5m).
3.  **DRIFT:** Long, restorative breaks after a full "Crystal Cycle" (15m).

### Crystal Progress
We wanted to gamify discipline without the childish cartoons. 
* **Visual Growth:** Crystals grow at the bottom of the screen as you complete sessions.
* **Honesty Check:** If you "Cheat" (skip) a session, the crystal stays small or "shattered." It’s a subtle way to see if you actually did the work.

### Small Features:

1. Ambience Sound (only 5 for now, we plan to add more later on.)

*more features coming soon*

---

## Shortcuts (Stay in the flow)

| Key | Action |
| :--- | :--- |
| `Space` | Play / Pause |
| `R` | Reset current clock |
| `C` | **Cheat** (Instantly finish a session) |
| `Q` | **Quit** (Hard reset everything) |
| `Z / B / D` | Force switch to Zone, Breath, or Drift |
| `Esc` | Close any open menus |

---

## Tech Stack & Perf
We engineered this to run smooth even on old laptops or low-end mobile devices.

* **Core:** React 18 + Vite.
* **Motion:** Framer Motion (Spring-based physics for that "heavy" feel).
* **Styling:** Vanilla CSS & Glassmorphism.
* **Optimization:**
    * **Isolated Rendering:** The high-frequency timer ring is decoupled from the main app logic to prevent lag.
    * **Mobile-First:** Fully responsive using `dvh` units so it doesn't break on mobile browsers (maybe a bit buggy on some mobile browsers, we're trying to fix it.).

---

## Setup
1. `git clone https://github.com/your-username/zenflowz.git`
2. `bun install` (as the project uses bun)
3. `bun run dev`

---

## Icy Stuff Coming Soon 

*ZenFlowz — Flow with intention.*

 **Built by ForgeBytez Studio.** 🇧🇩