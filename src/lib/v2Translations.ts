import type { EmotionState } from '@/types/pet';

export interface V2Result {
  emotion: EmotionState;
  emoji: string;
  petEmoji: string;
  translation: string;
  mood: string;
  bgGradient: string;
}

const DOG_RESULTS: V2Result[] = [
  { emotion: 'hungry', emoji: '🍖', petEmoji: '🐶', translation: '"FOOD. NOW. PLEASE. I\'m literally wasting away!"', mood: 'Hangry', bgGradient: 'from-amber-100 to-orange-100' },
  { emotion: 'excited', emoji: '🎾', petEmoji: '🐕', translation: '"OH MY DOG! YOU\'RE HOME! BEST. DAY. EVER!"', mood: 'Ecstatic', bgGradient: 'from-yellow-100 to-amber-100' },
  { emotion: 'sleepy', emoji: '😴', petEmoji: '🐕‍🦺', translation: '"Five more minutes... or five more hours..."', mood: 'Sleepy Boi', bgGradient: 'from-indigo-100 to-purple-100' },
  { emotion: 'wants_play', emoji: '🥏', petEmoji: '🐶', translation: '"THROW THE BALL! Why are you just HOLDING it?!"', mood: 'Playful', bgGradient: 'from-green-100 to-teal-100' },
  { emotion: 'affectionate', emoji: '❤️', petEmoji: '🐕', translation: '"You are my entire world and I love you SO much!"', mood: 'In Love', bgGradient: 'from-pink-100 to-rose-100' },
  { emotion: 'anxious', emoji: '😰', petEmoji: '🐶', translation: '"What was that sound?! I will protect you! ...from behind you."', mood: 'Nervous', bgGradient: 'from-slate-100 to-gray-100' },
  { emotion: 'needs_outside', emoji: '🌳', petEmoji: '🐕', translation: '"I need to go OUT. Like, yesterday. HURRY!"', mood: 'Urgent', bgGradient: 'from-emerald-100 to-green-100' },
  { emotion: 'greeting', emoji: '🥳', petEmoji: '🐶', translation: '"HI HI HI HI! Did you miss me? I missed you for 0.2 seconds!"', mood: 'Over the Moon', bgGradient: 'from-sky-100 to-blue-100' },
  { emotion: 'annoyed', emoji: '😤', petEmoji: '🐕', translation: '"Stop taking photos of me. I\'m not \'being cute\', I\'m serious."', mood: 'Grumpy', bgGradient: 'from-red-100 to-orange-100' },
  { emotion: 'content', emoji: '😊', petEmoji: '🐶', translation: '"This is perfect. You, me, and this couch. Forever."', mood: 'Zen Mode', bgGradient: 'from-teal-100 to-cyan-100' },
  { emotion: 'bored', emoji: '🥱', petEmoji: '🐕', translation: '"I\'ve destroyed all my toys. Now what? YOUR shoes look fun..."', mood: 'Mischievous', bgGradient: 'from-stone-100 to-neutral-100' },
];

const CAT_RESULTS: V2Result[] = [
  { emotion: 'hungry', emoji: '🐟', petEmoji: '🐱', translation: '"My bowl has been empty for 3 seconds. I\'m calling ASPCA."', mood: 'Dramatically Starving', bgGradient: 'from-amber-100 to-orange-100' },
  { emotion: 'annoyed', emoji: '😑', petEmoji: '🐈', translation: '"You touched me without an appointment. Unacceptable."', mood: 'Offended', bgGradient: 'from-red-100 to-orange-100' },
  { emotion: 'sleepy', emoji: '💤', petEmoji: '🐱', translation: '"I\'m on nap 7 of 12 today. Do NOT interrupt."', mood: 'Professional Sleeper', bgGradient: 'from-indigo-100 to-purple-100' },
  { emotion: 'excited', emoji: '📦', petEmoji: '🐈‍⬛', translation: '"A BOX! A BOX! This is MY box now. Everything is my box."', mood: 'Box Obsessed', bgGradient: 'from-yellow-100 to-amber-100' },
  { emotion: 'affectionate', emoji: '🥰', petEmoji: '🐱', translation: '"I shall allow you to pet me. You have 3 strokes. Choose wisely."', mood: 'Gracious Ruler', bgGradient: 'from-pink-100 to-rose-100' },
  { emotion: 'wants_play', emoji: '🪶', petEmoji: '🐈', translation: '"That red dot WILL be caught today. I\'ve trained for this."', mood: 'Laser Hunter', bgGradient: 'from-green-100 to-teal-100' },
  { emotion: 'bored', emoji: '😒', petEmoji: '🐱', translation: '"I\'ve knocked 3 things off the counter. Still bored. Your move."', mood: 'Chaotic Neutral', bgGradient: 'from-stone-100 to-neutral-100' },
  { emotion: 'greeting', emoji: '🐾', petEmoji: '🐈‍⬛', translation: '"Oh. You\'re back. I didn\'t notice you were gone. ...I lied."', mood: 'Playing It Cool', bgGradient: 'from-sky-100 to-blue-100' },
  { emotion: 'content', emoji: '☀️', petEmoji: '🐱', translation: '"This sunbeam was made specifically for me. I am royalty."', mood: 'Sun Worshipper', bgGradient: 'from-teal-100 to-cyan-100' },
  { emotion: 'anxious', emoji: '🥒', petEmoji: '🐈', translation: '"Is that a cucumber?! WHY WOULD YOU DO THIS TO ME?!"', mood: 'Traumatized', bgGradient: 'from-slate-100 to-gray-100' },
  { emotion: 'needs_outside', emoji: '🪟', petEmoji: '🐱', translation: '"Open the door. No wait, close it. Open it again. CLOSE IT."', mood: 'Indecisive', bgGradient: 'from-emerald-100 to-green-100' },
];

export function getRandomV2Result(petType: 'dog' | 'cat'): V2Result {
  const results = petType === 'dog' ? DOG_RESULTS : CAT_RESULTS;
  return results[Math.floor(Math.random() * results.length)];
}
