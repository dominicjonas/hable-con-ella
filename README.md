# Hable Con Ella

**A minimalist React app for learning Argentine Spanish phrases**

Hable Con Ella is a simple, personal tool to practise beginner-to-intermediate Argentine Spanish.  
It focuses on real conversational phrases, including voseo (vos conjugations), lunfardo slang, and everyday expressions unique to Argentina.

Built as a side project to improve Spanish skills.

## Features (Phase 1 – Current)

- Categorised phrase lists (Basics, Voseo, Slang, Daily Life, Romantic)
- Clickable category cards with hover & focus effects
- Clean, responsive, mobile-first design
- Reusable components: Button, Header, CategoryCard
- React Router navigation with back button support
- Ready for expansion: favourites, audio, authentication

## Planned Features

### Phase 2 – User Accounts & Backend Basics

- Email + password login / signup (Firebase Auth or Supabase)
- User-specific data storage (favourites, progress, custom phrases)
- Backend phrase management (move static data → Firestore / Supabase DB)
- Migrate all SCSS → Tailwind CSS for faster styling & consistency
- Protected routes & user dashboard

### Phase 3 – Voice Interaction & AI Enhancement

- Browser-based voice recording (MediaRecorder API)
- Upload recorded audio phrases (Firebase Storage / Supabase Storage)
- Basic speech-to-text / pronunciation checking (Web Speech API or external service)
- AI-generated phrase suggestions (e.g. OpenAI / Grok API for custom or situational phrases)
- Optional: streak tracking, daily goals, shareable phrase cards

## Screenshots

## Tech Stack (Phase 1)

- React + Vite
- React Router v6
- SCSS (plain, no Tailwind yet)
- PropTypes for prop validation

## Current TODO

### Phase 1 (MVP polish)

- [x] Add Phrase / Swipe page / Phrase progression (Figma → code)
- [ ] Final navigation polish (active states, mobile menu)
- [ ] Header redesign (logo, icons, theme toggle)
- [ ] Side nav / drawer (optional for larger screens)
- [ ] Integrate real phrase data from data/ folder
- [ ] Framer Motion

### Phase 2

- [ ] User login
- [ ] Backend user setup
- [ ] Store phrases in backend
- [ ] Convert all styles into Tailwind
- [ ] GSAP

### Phase 3

- [ ] Voice record
- [ ] Voice upload
- [ ] Voice recognition
- [ ] AI phrase data

## How to Run

```bash
# Clone the repo
git clone https://github.com/dominicjonas/hable-con-ella.git
cd hable-con-ella

# Install dependencies
npm install

# Use correct Node version (if using nvm)
nvm use 20

# Start dev server
npm run dev
