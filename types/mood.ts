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
  label: string;   // human label
  color: string;   // hex color
  emoji: string;   // emoji character
};

export const MOODS: MoodDefinition[] = [
  { key: 'happy',   label: 'Happy',   color: '#FACC15', emoji: '🙂' },
  { key: 'tired',   label: 'Tired',   color: '#60A5FA', emoji: '😪' },
  { key: 'focused', label: 'Focused', color: '#14B8A6', emoji: '🎯' },
  { key: 'stressed', label: 'Stressed', color: '#EF4444', emoji: '😖' },
  { key: 'relaxed', label: 'Relaxed', color: '#A78BFA', emoji: '🧘' },
  { key: 'neutral', label: 'Neutral', color: '#64748B', emoji: '😐' },
];
