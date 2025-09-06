# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based flashcard quiz application for marine navigation concepts. The app is built with TypeScript, React 18, Vite, and Tailwind CSS. It features both study and test modes for learning navigation fundamentals.

## Development Commands

- `npm run dev` - Start development server (opens on http://localhost:5173)
- `npm run build` - Build for production 
- `npm run lint` - Run ESLint with TypeScript support
- `npm run preview` - Preview production build locally
- `npm run deploy` - Build and deploy to GitHub Pages

## Architecture

### Core Component Structure
- **Main entry**: `src/main.tsx` renders the single `NavigationFlashcardQuiz` component
- **Primary component**: `src/NavigationFlashcardQuiz.tsx` contains all application logic and UI
- **Styling**: Uses Tailwind CSS classes throughout, no separate CSS modules

### Data Management
- **Flashcard data**: Loaded from `public/navigation_flashcard_quiz.csv` at runtime
- **CSV format**: Front,Back,Tags columns with manual CSV parsing (handles quoted fields)
- **State management**: Uses React useState hooks for local state (no external state library)
- **Key state**: flashcards array, filtering by tags, current card index, quiz/study modes, scoring

### Key Features
- **Dual modes**: Study mode (self-paced review) and Test mode (scored assessment)  
- **Tag filtering**: Dynamic filtering by navigation topics extracted from CSV tags
- **Card navigation**: Previous/Next with progress tracking
- **Scoring system**: Only active in test mode, tracks correct/incorrect answers
- **CSV export**: Direct download link to the source CSV file for Anki import

## Important Implementation Details

### CSV Parsing
The app implements custom CSV parsing in NavigationFlashcardQuiz.tsx:18-54 to handle quoted fields correctly, rather than using a CSV library.

### Responsive Design
Built mobile-first with Tailwind responsive classes, designed to work across desktop and mobile devices.

### Deployment
Configured for GitHub Pages deployment via GitHub Actions. The `gh-pages` package handles the build artifact deployment to the gh-pages branch.