# 7-Day Mood Board

## Project Overview

A mood tracking application built with Next.js App Router that allows users to track their daily mood throughout the week. The application displays 7 tiles representing Monday through Sunday, where each tile can be assigned one of 6 different moods. Clicking on a tile opens a modal for mood selection, and changes are applied optimistically with persistent storage backed by a JSON file.

## Features

- 7 tiles representing the 7 days of the week (Monday through Sunday)
- 6 mood options: Happy, Tired, Focused, Stressed, Relaxed, and Neutral
- Modal interface for selecting moods
- Optimistic UI updates for immediate visual feedback
- Persistent data storage using a JSON file
- Data survives server restarts
- Artificial latency simulation for realistic network behavior

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4

## Getting Started

### Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### GET /api/moods

Retrieves all moods for the week.

**Response:**
```json
{
  "version": 1,
  "days": [
    { "day": "Monday", "mood": "happy" },
    { "day": "Tuesday", "mood": null }
  ]
}
```

### PUT /api/moods/:day

Updates the mood for a specific day.

**Parameters:**
- `day`: Weekday name (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)

**Request Body:**
```json
{
  "mood": "happy"
}
```

**Response:**
```json
{
  "version": 2,
  "days": [...]
}
```

Valid mood values: `happy`, `tired`, `focused`, `stressed`, `relaxed`, `neutral`, or `null`.

All API requests include artificial latency between 300-1200ms.

## Data Persistence

Mood data is stored in `data/moods.json` in the project root. The file is automatically created on first use and persists across server restarts. The data directory is excluded from version control.

## Notes About Optimistic UI

The application implements optimistic updates to provide immediate visual feedback when selecting moods. When a user selects a mood, the tile updates instantly before the server request completes. If the request fails, the UI reverts to the previous state. This approach ensures a responsive user experience even with network latency.

## License

MIT
