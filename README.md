<div align="center">

<div align="center">
<img src="docs/banner.png" alt="TriviaFlux Banner" width="100%"/>


#  TriviaFlux

**An AI-powered Trivia Game built with Next.js, Firebase & Google Genkit**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Download APK](#-download) · [Features](#-features) · [Getting Started](#-getting-started) · [Tech Stack](#-tech-stack)

</div>

---

## 📱 Download
 
### ⬇️ [Download TriviaFlux.apk](https://github.com/raunakpatil/triviaflux/releases/latest/download/TriviaFlux.apk)

> **Requires Android 7.0+** — enable *Install from unknown sources* in your device settings before installing.

---
<div align="center">
<table>
  <tr>
    <td align="center"><b>Home — Game Modes</b></td>
    <td align="center"><b>Category Select</b></td>
    <td align="center"><b>Classic Gameplay</b></td>
  </tr>
  <tr>
    <td><img src="docs/home.png" width="220" alt="Home screen showing Classic, Trivia Mix, Challenge and Daily Sync modes"/></td>
    <td><img src="docs/categories.png" width="220" alt="Category selection with Geography, Entertainment, Science and Tech"/></td>
    <td><img src="docs/gameplay.png" width="220" alt="Classic mode gameplay with Higher/Lower mechanic and score counter"/></td>
  </tr>
</table>
</div>
---

## ✨ Features

- 🤖 **AI-Generated Questions** — Trivia questions powered by Google Genkit & Gemini, so every session feels fresh
- 🏆 **Score Tracking** — Real-time leaderboards and personal bests backed by Firebase
- 🎯 **Multiple Categories** — Covers a wide range of topics to keep things interesting
- 🎉 **Confetti Celebrations** — Because every right answer deserves a party
- 📊 **Progress & Stats** — Charts and analytics to track how you're improving over time
- 📱 **Mobile-First Design** — Responsive UI that works great on any screen size
- ⚡ **Blazing Fast** — Built on Next.js 15 with Turbopack for lightning-quick loads

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router + Turbopack) |
| Language | TypeScript 5 |
| AI / LLM | [Google Genkit](https://firebase.google.com/docs/genkit) + Gemini |
| Backend | [Firebase](https://firebase.google.com/) (Auth, Firestore, Hosting) |
| UI Components | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Styling | Tailwind CSS + tailwindcss-animate |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Mobile Build | [Codemagic CI/CD](https://codemagic.io/) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- A Firebase project ([create one here](https://console.firebase.google.com/))
- A Google AI API key ([get one here](https://aistudio.google.com/))

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/raunakpatil/triviaflux.git
cd triviaflux

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Firebase config and Google AI API key in .env

# 4. Start the dev server
npm run dev
```

The app will be running at `http://localhost:9002`.

### Environment Variables

Create a `.env` file in the root with the following:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Google AI (Genkit)
GOOGLE_GENAI_API_KEY=
```

### Available Scripts

```bash
npm run dev          # Start dev server on port 9002 (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking

# Genkit AI flows
npm run genkit:dev   # Start Genkit dev UI
npm run genkit:watch # Start Genkit with file watching
```

---

## 📦 Building the Android APK

This project uses [Codemagic](https://codemagic.io/) for CI/CD to build the Android APK.

1. Connect your GitHub repo to Codemagic
2. Configure your `codemagic.yaml` with signing credentials
3. Trigger a build — the APK will be available as a build artifact

To add a release manually:

```bash
# Go to your repo on GitHub
# Releases → Draft a new release
# Upload TriviaFlux.apk as a release asset
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/cool-thing`)
3. Commit your changes (`git commit -m 'Add cool thing'`)
4. Push and open a PR

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ by <a href="https://github.com/raunakpatil">@raunakpatil</a>
</div>
