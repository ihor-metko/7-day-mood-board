export type Mood = 'happy' | 'tired' | 'focused' | 'stressed' | 'relaxed' | 'neutral';

export type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export const WEEKDAYS: Weekday[] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export type MoodDefinition = {
  key: Mood;
  label: string;
  color: string;
  emoji: string;
};

export const MOODS: MoodDefinition[] = [
  { key: 'happy',   label: 'Happy',   color: '#FACC15', emoji: '🙂' },
  { key: 'tired',   label: 'Tired',   color: '#60A5FA', emoji: '😪' },
  { key: 'focused', label: 'Focused', color: '#14B8A6', emoji: '🎯' },
  { key: 'stressed', label: 'Stressed', color: '#EF4444', emoji: '😖' },
  { key: 'relaxed', label: 'Relaxed', color: '#A78BFA', emoji: '🧘' },
  { key: 'neutral', label: 'Neutral', color: '#64748B', emoji: '😐' },
];

export type MoodsApiDay = {
  day: Weekday;
  mood: Mood | null;
};

export type MoodsApiResponse = {
  version: number;
  days: MoodsApiDay[];
  clientRequestId?: number;
};
