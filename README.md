# 7-Day Mood Board

A Next.js application for tracking your mood across the week. Select from 6 different moods for each day of the week (Monday through Sunday), with persistent storage and optimistic UI updates.

## Features

- **7 Daily Tiles**: One for each weekday (Monday → Sunday)
- **6 Mood Options**: Happy 🙂, Tired 😪, Focused 🎯, Stressed 😖, Relaxed 🧘, Neutral 😐
- **Persistent Storage**: Moods are saved to `data/moods.json` and survive server restarts
- **Optimistic UI**: Immediate visual feedback when selecting moods
- **Accessibility**: Full keyboard support with Esc to close modal and proper focus management
- **API with Artificial Latency**: Simulates real-world network conditions (300-1200ms delay)

## Requirements

- **Node.js**: Version 20 or higher
- **npm**: Version 9 or higher

## Getting Started

### Development Mode

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The page will hot-reload as you edit files in the `app/` directory.

### Production Mode

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Persistence

Moods are automatically saved to a JSON file:
- **Location**: `data/moods.json`
- **Format**: `{ version: number, days: Array<{ day: string, mood: string | null }> }`
- **Persistence**: File survives server restarts and page reloads

The `data/` directory is created automatically on first use and is excluded from git via `.gitignore`.

## API Endpoints

### GET /api/moods

Retrieves all moods for the week.

**Response:**
```json
{
  "version": 1,
  "days": [
    { "day": "Monday", "mood": "happy" },
    { "day": "Tuesday", "mood": null },
    ...
  ]
}
```

### PUT /api/moods/:day

Updates the mood for a specific day.

**Request Body:**
```json
{
  "mood": "happy",
  "clientRequestId": 123
}
```

**Response:**
```json
{
  "version": 2,
  "days": [...],
  "clientRequestId": 123
}
```

**Parameters:**
- `day`: Weekday name (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)
- `mood`: One of: happy, tired, focused, stressed, relaxed, neutral, or null

**Artificial Latency:**
All API requests include a simulated delay between 300-1200ms to mimic real-world network conditions.

## Mood Reference

| Mood | Color | Emoji |
|------|-------|-------|
| Happy | #FACC15 | 🙂 |
| Tired | #60A5FA | 😪 |
| Focused | #14B8A6 | 🎯 |
| Stressed | #EF4444 | 😖 |
| Relaxed | #A78BFA | 🧘 |
| Neutral | #64748B | 😐 |

## Architecture

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **State Management**: React Hooks (useMoods custom hook)
- **Optimistic Updates**: Client-side optimistic UI with server reconciliation
- **Out-of-Order Handling**: Uses `clientRequestId` to ignore stale responses

## Project Structure

```
app/
  ├── api/
  │   └── moods/
  │       ├── route.ts          # GET /api/moods
  │       └── [day]/route.ts    # PUT /api/moods/:day
  ├── page.tsx                  # Main page component
  ├── layout.tsx                # Root layout
  └── globals.css               # Global styles
components/
  ├── DayTile.tsx               # Individual day tile
  ├── MoodModal.tsx             # Modal dialog for mood selection
  └── MoodPicker.tsx            # Mood selection grid
hooks/
  └── useMoods.ts               # Custom hook for mood management
lib/
  └── moods-store.ts            # Server-side file persistence
services/
  └── api.ts                    # API client functions
types/
  └── mood.ts                   # TypeScript type definitions
```

## License

This project is licensed under the MIT License.
