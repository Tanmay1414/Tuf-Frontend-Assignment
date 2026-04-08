# 🗓️ Interactive Wall Calendar Component

A polished, high-fidelity React/Next.js calendar component inspired by the tactile aesthetic of a physical wall calendar. Built as a responsive, interactive web component with integrated date-range selection and persistent note-taking functionality.

### 🔗 Quick Links
* **[Live Demo](https://tuf-frontend-assignment-fawn.vercel.app/)**
* **[Video Walkthrough](https://drive.google.com/file/d/1bH87IQ8vyAEiuXifYT-_Tg5U1F4FW44n/view?usp=sharing)**

---

## ✨ Features

### Core Requirements Met
* **Wall Calendar Aesthetic:** A premium, layered UI featuring a prominent hero image that serves as a visual anchor alongside the date grid.
* **Interactive Date Range Selector:** Users can click to select a start date and an end date. The UI updates dynamically to show distinct visual states for the start, end, and in-between dates.
* **Integrated Notes Panel:** A functional planner section allows users to jot down memos. Notes are bound to the selected dates and persist across browser reloads.
* **Fully Responsive:** 
  * **Desktop:** Elevated side-by-side layout prioritizing space and readability.
  * **Tablet/Mobile:** Gracefully collapses into a vertically stacked, touch-friendly interface without losing functionality.

### 🚀 Creative Liberties Taken
* **Seamless Range Highlights:** Implemented continuous background styling for "in-between" dates to create a unified, flowing visual state rather than disjointed blocks.
* **Client-Side Persistence:** Utilized `localStorage` to save user notes and date selections locally, ensuring a seamless UX without the need for a backend database.
* **Smooth Transitions:** Added subtle hover states and soft transitions using Tailwind CSS to make the interface feel highly responsive and tactile.
* **Accessible Note Modals:** Implemented a robust note-taking system using accessible dialogs to intuitively capture headings, descriptions, and date attachments.
* **Curated Visual Context:** Replaced generic placeholders with beautiful, high-quality nature photography to enhance the premium calendar aesthetic.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (React)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Date Logic:** [date-fns](https://date-fns.org/) *(Used to cleanly handle leap years, month boundaries, and week generation without the pitfalls of native JS Date objects)*
* **Components:** [Radix UI](https://www.radix-ui.com/) *(Accessible primitives for building high-quality dialogs and interactive elements)*
* **State Management:** React Hooks (`useState`, `useEffect`) + `localStorage` API

---

## 🏗️ Architecture & Technical Choices

Given the strictly frontend scope of this challenge, the focus was placed on component architecture, state management, and CSS implementation:

1. **Separation of Concerns:** The UI is broken down into modular components (e.g., `CalendarGrid`, `HeroImage`, `NotesPanel`). This keeps the main page clean and makes individual pieces easier to test and maintain.
2. **State Management:** The core state (`currentMonth`, `selectedRange`, `notes`) is lifted to a parent container to serve as a single source of truth, passing data down to the grid and notes panel via props.
3. **Styling Strategy:** Tailwind CSS was chosen for rapid prototyping and maintaining a strict design system. Custom utility classes were used to handle the complex rounded corners required for the start/end date range logic.

---

## 💻 Getting Started (Local Development)

To run this project locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tanmay1414/Tuf-Frontend-Assignment.git
   ```

2. Navigate into the project directory:
   ```bash
   cd Tuf-Frontend-Assignment
   ```

3. Install the dependencies:
   ```bash
   npm install
   # or yarn install
   # or pnpm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
