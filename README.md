# Айгерім & Амирхан — Premium Wedding Invitation

Luxury Kazakhstan wedding invitation website built with Next.js 15, TypeScript, TailwindCSS, Framer Motion, GSAP, and Firebase.

## Features

- 14 premium sections (Hero, Invitation, Story, Countdown, Event, Venue, Gallery, Video, RSVP, Wishes, Gift, Family, FAQ, Footer)
- Kazakh national ornaments & Shanyraq symbol
- Glassmorphism luxury design
- Golden particles, cursor glow, magnetic buttons
- Firebase Firestore + Storage integration
- Full Admin Dashboard
- PWA ready with manifest & service worker
- SEO optimized with structured data
- Mobile-first responsive design

## Getting Started

```bash
cd wedding
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Default credentials (demo mode): `admin@wedding.kz` / `admin123`

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password), Firestore, and Storage
3. Copy `.env.example` to `.env.local` and fill in your Firebase config

## Tech Stack

- Next.js 15
- TypeScript
- TailwindCSS 4
- Framer Motion
- GSAP
- Swiper.js
- React Hook Form
- Firebase
- Zustand

## Color Palette

| Color | Hex |
|-------|-----|
| Deep Emerald | `#0D352D` |
| Dark Forest | `#123A32` |
| Luxury Gold | `#C99A3D` |
| Soft Gold | `#F2D58A` |
| Ivory | `#FFF8EF` |
| Warm Cream | `#F5EEDD` |

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/
│   ├── admin/        # Admin dashboard components
│   ├── effects/      # Visual effects
│   ├── layout/       # Layout components
│   ├── sections/     # Wedding page sections
│   └── ui/           # Reusable UI components
├── data/             # Default wedding data
├── lib/              # Utilities & Firebase
├── store/            # Zustand stores
└── types/            # TypeScript types
```
