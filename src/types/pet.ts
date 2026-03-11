export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat';
  breed: string;
  age: number;
  photoUrl: string;
  personalityTags: string[];
  createdAt: string;
}

export interface Translation {
  id: string;
  petId: string;
  petName: string;
  type: 'audio' | 'visual' | 'deep';
  emotion: EmotionState;
  confidence: number;
  translation: string;
  suggestions: ResponseSuggestion[];
  feedback?: 'up' | 'down';
  createdAt: string;
}

export interface ResponseSuggestion {
  verbal: string;
  action: string;
}

export type EmotionState =
  | 'hungry' | 'sleepy' | 'excited' | 'bored'
  | 'anxious' | 'affectionate' | 'needs_outside'
  | 'wants_play' | 'annoyed' | 'in_pain'
  | 'content' | 'greeting';

export const EMOTION_CONFIG: Record<EmotionState, { label: string; emoji: string; color: string }> = {
  hungry: { label: 'Hungry', emoji: '🍖', color: 'hsl(37 90% 55%)' },
  sleepy: { label: 'Sleepy', emoji: '😴', color: 'hsl(240 40% 70%)' },
  excited: { label: 'Excited', emoji: '🎉', color: 'hsl(37 90% 55%)' },
  bored: { label: 'Bored', emoji: '😑', color: 'hsl(0 0% 60%)' },
  anxious: { label: 'Anxious', emoji: '😰', color: 'hsl(0 100% 70%)' },
  affectionate: { label: 'Affectionate', emoji: '❤️', color: 'hsl(0 100% 70%)' },
  needs_outside: { label: 'Needs Outside', emoji: '🌳', color: 'hsl(120 40% 50%)' },
  wants_play: { label: 'Wants to Play', emoji: '🎾', color: 'hsl(174 55% 54%)' },
  annoyed: { label: 'Annoyed', emoji: '😤', color: 'hsl(0 100% 70%)' },
  in_pain: { label: 'In Pain', emoji: '🩹', color: 'hsl(0 84% 60%)' },
  content: { label: 'Content', emoji: '😊', color: 'hsl(174 55% 54%)' },
  greeting: { label: 'Greeting', emoji: '👋', color: 'hsl(37 90% 55%)' },
};
