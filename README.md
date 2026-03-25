# ZenFlowz

ZenFlowz is a glassmorphic productivity app designed to help users maintain a Flow State. It focuses on physical, satisfying interaction and intentionality, while remaining open-source and lightweight.

---

### The "Void" Timer
The core experience is built around the "Void" model — a circular ring that reduces as time passes, providing a clear visual representation of remaining focus.
* **Fluid Motion:** Runs on an independent render loop for smooth animation.
* **Minimal Distraction:** Visual feedback is restrained to keep the focus on the task at hand.

### Flow State Machine
ZenFlowz manages session transitions automatically:
1. **Zone:** Deep work blocks (25m).
2. **Breath:** Short resets between sessions (5m).
3. **Drift:** Long restorative breaks after a full cycle (15m).

### ZenFlowz Hub
The Hub is a central dashboard for project updates and system information:
* **Briefing:** Quick onboard overview and system status.
* **Overview:** Detailed breakdown of core features and architecture.
* **Patches:** Complete version history with nested details.

### Progress Tracking
A subtle gamification system tracks discipline without distraction.
* **Visual Status:** Progress bars fill as you complete honest focus sessions.
* **Integrity Check:** Skipping sessions or using shortcuts resets progress toward a "Crystal Cycle."

---

## Shortcuts
| Key | Action |
| :--- | :--- |
| `Space` | Play / Pause |
| `R` | Reset current clock |
| `C` | Cheat (Instantly finish a session) |
| `Q` | Wipe (Hard reset everything) |
| `Z / B / D` | Switch to Zone, Breath, or Drift |
| `Esc` | Close open menus |

---

## Tech Stack
* **Framework:** React 18 + Vite.
* **Animation:** Framer Motion (spring physics).
* **Styling:** Vanilla CSS.
* **Optimization:** Decoupled timer rendering and mobile-first responsive design.

---

## Setup
1. `git clone https://github.com/ForgeBytez-Official/ZenFlowz.git`
2. `bun install`
3. `bun run dev`

---

Built by ForgeBytez Studio.
