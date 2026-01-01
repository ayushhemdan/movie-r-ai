# Movie R AI - AI-Powered Movie Recommendations

A powerful Next.js application that recommends movies based on user preferences using Google Gemini API. Get personalized movie suggestions tailored to your taste!

## Features

- 🎬 **Personalized Recommendations**: Get 3-5 movie recommendations based on your preferences
- 🎨 **Beautiful Dark Mode UI**: Glassmorphic design with modern, glowing effects
- 🤖 **AI-Powered**: Leverages Google Gemini API for intelligent movie suggestions
- 📋 **Copy to Clipboard**: One-click copy for all recommendations
- 🎯 **Smart Matching**: AI analyzes your preferences to find the perfect movies
- ⚡ **Fast & Responsive**: Built with Next.js App Router and optimized for performance

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd movie-r-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
cp .env.local.example .env.local
```

4. Add your Google Gemini API key to `.env.local`:
```
GOOGLE_GEMINI_API_KEY=your_actual_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter Preferences**: Describe your movie preferences in the text area (e.g., "I love sci-fi movies with complex plots like Inception, or psychological thrillers")
2. **Get Recommendations**: Click "Get Recommendations" or press Ctrl+Enter
3. **View Results**: Browse through 3-5 personalized movie recommendations, each including:
   - Movie title, year, and genre
   - Brief description (spoiler-free)
   - Explanation of why it matches your preferences
4. **Copy Recommendations**: Use the copy button to save all recommendations to your clipboard

## Project Structure

```
movie-r-ai/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts      # API route for Gemini integration
│   ├── globals.css           # Global styles and Tailwind directives
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page component
├── components/
│   ├── CopyButton.tsx        # Copy to clipboard button
│   ├── LoadingAnimation.tsx  # Loading state animation
│   └── MovieRecommendations.tsx  # Movie recommendations display component
├── .env.local.example        # Environment variables template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **AI**: Google Gemini API
- **Language**: TypeScript

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_GEMINI_API_KEY` | Your Google Gemini API key (required) |

## Building for Production

```bash
npm run build
npm start
```

## License

MIT

