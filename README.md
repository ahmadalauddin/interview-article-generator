# Dynamic Interview Article Generator

A fullstack application where users can conduct AI-powered interviews (voice or text) on any topic, with live transcription and automatic article generation.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **AI**: Mock implementation (default) + OpenAI GPT-3.5 (optional)
- **Speech-to-Text**: Web Speech API (browser-native)

## Features

- Enter any topic to generate 3-5 dynamic interview questions
- Answer via voice (speech-to-text) or text input
- Switch between input modes anytime
- Live transcript panel showing all Q&A
- Automatic 300-500 word article generation after interview
- Works without API keys (mock mode) or with OpenAI for enhanced results

## Project Structure

```
pressmaster/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API client
│   │   └── types/          # TypeScript interfaces
│   └── ...
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # AI services (mock + OpenAI)
│   │   ├── routes/         # API routes
│   │   └── types/          # TypeScript interfaces
│   └── ...
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd pressmaster
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **(Optional) Configure OpenAI**

   To use real AI instead of mock responses:
   ```bash
   cd ../server
   cp .env.example .env
   ```
   Then edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key
   ```

### Running the Application

1. **Start the backend server** (Terminal 1)
   ```bash
   cd server
   npm run dev
   ```
   Server runs on http://localhost:3001

2. **Start the frontend** (Terminal 2)
   ```bash
   cd client
   npm run dev
   ```
   Client runs on http://localhost:5173

3. **Open your browser**
   Navigate to http://localhost:5173

## API Endpoints

### POST `/api/interview/questions`
Generate interview questions based on a topic.

**Request:**
```json
{
  "topic": "Machine Learning"
}
```

**Response:**
```json
{
  "questions": [
    "What inspired you to get involved with Machine Learning?",
    "Can you describe your experience with Machine Learning?",
    ...
  ]
}
```

### POST `/api/article/generate`
Generate an article from the interview transcript.

**Request:**
```json
{
  "topic": "Machine Learning",
  "transcript": [
    {
      "question": "What inspired you?",
      "answer": "I was fascinated by..."
    }
  ]
}
```

**Response:**
```json
{
  "article": "# Exploring Machine Learning...\n\n..."
}
```

## Voice Input

Voice input uses the Web Speech API, which is supported in:
- Google Chrome (recommended)
- Microsoft Edge
- Safari (limited support)

If voice input is not available, the app automatically falls back to text input.

## AI Modes

### Mock Mode (Default)
- No API key required
- Generates contextually relevant questions based on topic
- Produces coherent mock articles
- Great for testing and demos

### OpenAI Mode (Optional)
- Requires `OPENAI_API_KEY` in server `.env`
- Uses GPT-3.5-turbo for cost efficiency
- Generates more sophisticated questions and articles
- Falls back to mock if API fails

## Deployment

### Backend on Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repo
3. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add environment variable: `OPENAI_API_KEY` (optional)
5. Note your Render URL (e.g., `https://your-app.onrender.com`)

### Frontend on Vercel

1. Import your repo on [Vercel](https://vercel.com)
2. Configure:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
3. Add environment variable:
   - `VITE_API_URL` = `https://your-render-url.onrender.com/api`
4. Deploy

## Development

### Server Commands
```bash
npm run dev    # Start development server with hot reload
npm run build  # Build for production
npm start      # Run production build
npm test       # Run tests
```

### Client Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```
