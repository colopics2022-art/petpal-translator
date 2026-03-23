import catHungry from '@/assets/stickers/cat-hungry.png';
import catSassy from '@/assets/stickers/cat-sassy.png';
import catLazy from '@/assets/stickers/cat-lazy.png';
import catChaos from '@/assets/stickers/cat-chaos.png';
import catLoving from '@/assets/stickers/cat-loving.png';
import dogHungry from '@/assets/stickers/dog-hungry.png';
import dogSassy from '@/assets/stickers/dog-sassy.png';
import dogLazy from '@/assets/stickers/dog-lazy.png';
import dogChaos from '@/assets/stickers/dog-chaos.png';
import dogLoving from '@/assets/stickers/dog-loving.png';

export type V3Mood = 'hungry' | 'sassy' | 'lazy' | 'chaos' | 'loving';

interface MoodData {
  sticker: { cat: string; dog: string };
  texts: string[];
  thinkingText: string;
  emoji: string;
  bgColor: string;
}

export const MOOD_MAP: Record<V3Mood, MoodData> = {
  hungry: {
    sticker: { cat: catHungry, dog: dogHungry },
    texts: [
      "The bowl is 10% empty. I am fading away...",
      "I haven't eaten in 47 minutes. Call the authorities.",
      "If you loved me, there would be snacks.",
      "My stomach is writing you a formal complaint.",
    ],
    thinkingText: 'Detecting hunger levels...',
    emoji: '🍽️',
    bgColor: 'hsl(37 90% 95%)',
  },
  sassy: {
    sticker: { cat: catSassy, dog: dogSassy },
    texts: [
      "I'm the boss. You're just the HR department.",
      "Did I ask for your opinion? No. I did not.",
      "I tolerate you. That's basically love.",
      "Talk to the paw. The face ain't listening.",
    ],
    thinkingText: 'Measuring sass levels...',
    emoji: '😎',
    bgColor: 'hsl(340 80% 95%)',
  },
  lazy: {
    sticker: { cat: catLazy, dog: dogLazy },
    texts: [
      "I've had a long day of napping. I need a nap.",
      "Five more minutes... or five more hours.",
      "Moving is overrated. Bring the couch to me.",
      "I'm not lazy, I'm energy efficient.",
    ],
    thinkingText: 'Calculating sleepiness...',
    emoji: '😴',
    bgColor: 'hsl(210 60% 95%)',
  },
  chaos: {
    sticker: { cat: catChaos, dog: dogChaos },
    texts: [
      "I have the zoomies. Your rug is my racetrack.",
      "EVERYTHING IS AMAZING AND I MUST RUN!",
      "That vase? It was ugly anyway. You're welcome.",
      "Chaos isn't a pit. Chaos is a SLIDE! WHEEE!",
    ],
    thinkingText: 'Tracking zoomie frequency...',
    emoji: '⚡',
    bgColor: 'hsl(45 100% 95%)',
  },
  loving: {
    sticker: { cat: catLoving, dog: dogLoving },
    texts: [
      "You're my favorite human. Now give me a treat.",
      "I love you more than treats. Almost. Maybe. No.",
      "If I fits, I sits... on your heart. 💕",
      "You had me at 'Who's a good boy/girl?'",
    ],
    thinkingText: 'Reading love frequency...',
    emoji: '💖',
    bgColor: 'hsl(340 60% 96%)',
  },
};

const ALL_MOODS: V3Mood[] = ['hungry', 'sassy', 'lazy', 'chaos', 'loving'];

export function getRandomMood(): V3Mood {
  return ALL_MOODS[Math.floor(Math.random() * ALL_MOODS.length)];
}

export function getRandomText(mood: V3Mood): string {
  const texts = MOOD_MAP[mood].texts;
  return texts[Math.floor(Math.random() * texts.length)];
}

export function getSticker(mood: V3Mood, petType: 'cat' | 'dog'): string {
  return MOOD_MAP[mood].sticker[petType];
}
