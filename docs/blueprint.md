# **App Name**: Higher or Lower: Real Data

## Core Features:

- User Account Management: Secure user registration, login, and profile management (including tracking high score and streak) leveraging Firebase Authentication and storing user data in Firestore's 'users' collection.
- Gameplay Core Loop: Present dynamically generated comparison challenges from cached data (e.g., population, temperature, market cap), process 'Higher or Lower' user guesses, track current score and streak, and provide immediate outcome feedback.
- Data Caching & Curation: An automated background service that fetches up-to-date real-world data from free APIs (REST Countries, Open Meteo, World Bank API, CoinGecko, TheSportsDB), curates relevant comparison pairs, and stores them in Firestore's 'stat_snapshots' and 'daily_challenges' collections for rapid gameplay.
- AI-Powered Fun Fact Tool: After each round, an AI tool will generate a concise, educational, and relevant 'fun fact' related to the two compared entities to enhance the learning experience.
- Global & Daily Leaderboards: Display global and daily challenge rankings, dynamically updating with user scores from the 'leaderboards' and 'daily_challenges' Firestore collections to foster competitive play.

## Style Guidelines:

- Color Scheme: Dark mode to provide a premium, sleek feel. The aesthetic aims for a 'neon' vibrancy often found in modern mobile games.
- Primary Color: A vibrant electric purple (#B433E6), chosen for its bold, energetic feel that aligns with neon aesthetics. This hue provides strong contrast against the dark background.
- Background Color: A deep charcoal with a subtle purple undertone (#1C191E). This desaturated variant of the primary hue ensures visual consistency while maintaining a dark, immersive canvas.
- Accent Color: A bright electric blue (#1F99FC), chosen as an analogous complement to the primary purple. Its high saturation and brightness ensure it pops effectively for calls to action, highlights, and interactive elements.
- Headline Font: 'Space Grotesk' (sans-serif) for its modern, techy, and bold presence, perfectly suited for eye-catching titles and scores.
- Body Font: 'Inter' (sans-serif) for general text, including fun facts and game descriptions, providing excellent readability and a clean, objective feel that complements the headline font.
- Utilize minimalist, crisp icons that have a slightly glowing or outlined effect to fit the neon gradient theme, ensuring clarity and modern appeal.
- Glassmorphism Cards: Implement UI elements with frosted glass effects and subtle transparencies, emphasizing depth against neon gradients to achieve a premium mobile game feel.
- Swipe Interactions: Core navigation and gameplay decisions will heavily leverage intuitive swipe gestures to provide a fluid and 'addictive' mobile user experience.
- Smooth 60fps Motion: All transitions and interactive elements will feature highly optimized, smooth animations including card slide transitions, animated counters, and glowing button states.
- Responsive Feedback: Implement 'scale pop' animations for correct answers, a 'shake' animation for incorrect guesses, and confetti bursts for streak rewards, providing immediate and satisfying visual feedback.