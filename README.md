# Navigation Flashcard Quiz

A React-based flashcard quiz application for learning marine navigation concepts. Features 97 navigation questions covering coordinates, compass navigation, charts, plotting, dead reckoning, fixes, current, tides, and more.

## Features

- **Study Mode**: Review cards at your own pace
- **Test Mode**: Quiz yourself and track your score
- **Topic Filtering**: Focus on specific navigation concepts
- **Progress Tracking**: Monitor your learning progress
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Deploying to GitHub Pages

This project is configured to automatically deploy to GitHub Pages via GitHub Actions when you push to the main branch.

1. Push your code to a GitHub repository
2. Go to your repository Settings → Pages
3. Set Source to "GitHub Actions"
4. The site will be available at `https://yourusername.github.io/navigation_flashcard_quiz/`

## Data Source

The flashcard data is loaded from `public/navigation_flashcard_quiz.csv` and includes questions on:

- Coordinates and basic navigation
- Compass variation and deviation
- Chart reading and plotting
- Dead reckoning
- Position fixing
- Current and leeway
- Tides and tidal currents
- Navigation safety

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React Icons

## License

MIT License