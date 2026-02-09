# Hable Con Ella

**A minimalist React application for learning Argentine Spanish phrases**

Hable Con Ella is a personal, focused tool designed to help practise beginner-to-intermediate Argentine Spanish.
It emphasises authentic conversational expressions, including voseo conjugations, lunfardo slang, and everyday Argentine idioms.

Built as a side project to improve Spanish fluency.

## Current Status

- Phase 1: MVP complete (static phrases, categories, favourites via context/localStorage)
- Phase 2: In progress (Firebase authentication, Firestore phrase storage, real-time favourites, UI polish)
- Phase 3: Planned (voice interaction, AI-generated content)

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)

## Features

### Phase 1 – Core MVP

- Categorised phrase lists (Saludos, Comida, Lunfardo, Viaje, Vida Diaria, Expresiones)
- Clickable category cards with hover and focus effects
- Swipeable / navigable phrase cards with smooth Framer Motion animations
- Shuffle, favourite/unfavourite functionality
- Clean, responsive, mobile-first design
- Reusable components (Button, Header, CategoryCard)
- Side navigation drawer
- Favourites managed via React Context + localStorage
- Progress bar for phrase navigation

### Phase 2 – Authentication & Backend Integration (in progress)

- Email + password login / signup (Firebase Authentication)
- Google Sign-In support
- Protected routes (categories, phrases, favourites)
- User-specific favourites stored in Firestore
- Static phrases migrated to Firestore collection
- Success/error toasts via Sonner
- Basic user profile display (name/avatar in header/drawer)

### Planned Features – Phase 3

- Browser-based voice recording (MediaRecorder API)
- Upload recorded audio phrases (Firebase Storage)
- Speech-to-text / pronunciation feedback (Web Speech API or external service)
- AI-generated phrase suggestions (e.g. via Grok)
- Streak tracking, daily goals, shareable phrase cards

## Screenshots

_(Screenshots to be added soon)_

## Tech Stack

- React 18 + Vite
- React Router v6
- Firebase (Authentication + Firestore)
- Framer Motion (animations & transitions)
- Sonner (toast notifications)
- SCSS (modular styling)
- PropTypes (type checking)

## Current TODO

### Phase 1 (complete)

- [x] Phrase / Swipe page with navigation
- [x] Final navigation polish (active states, mobile menu)
- [x] Header redesign (icons, conditional content)
- [x] Side navigation drawer
- [x] Favourite context & persistence
- [x] Framer Motion phrase & category animations

### Phase 2 (in progress)

- [x] User login / signup (email + Google)
- [x] Protected routes
- [x] Store favourites in Firestore
- [x] Migrate static phrases to Firestore
- [x] User profile display (name/avatar)
- [ ] Frontend hosting (Vercel / Netlify)
- [ ] Migrate remaining SCSS → Tailwind (optional polish)

### Phase 3 (planned)

- [ ] Voice recording
- [ ] Voice upload to storage
- [ ] Pronunciation checking / speech-to-text
- [ ] AI-generated phrase suggestions

## How to Run

```bash
# 1. Clone the repository
git clone https://github.com/dominicjonas/hable-con-ella.git
cd hable-con-ella

# 2. Install dependencies
npm install

# 3. (Optional) Use specific Node version
nvm use 20

# 4. Start the development server
npm run dev
```
