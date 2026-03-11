import type { EmotionState, Translation, ResponseSuggestion } from '@/types/pet';

const EMOTIONS: EmotionState[] = [
  'hungry', 'sleepy', 'excited', 'bored', 'anxious', 'affectionate',
  'needs_outside', 'wants_play', 'annoyed', 'content', 'greeting',
];

const TRANSLATIONS: Record<string, Record<EmotionState, string[]>> = {
  dog: {
    hungry: ["I can smell something delicious! Is it dinner time yet?", "My tummy is rumbling — a treat would be amazing right now!"],
    sleepy: ["I could really use a nap on the couch right now...", "Five more minutes of belly rubs and I'm out!"],
    excited: ["OH BOY OH BOY! Is that a ball?! Let's GO!", "This is the BEST day ever! You're home!"],
    bored: ["There's nothing to chew on... this is tragic.", "Can we please do literally anything? I'm dying here."],
    anxious: ["What was that noise? I don't like it...", "Please don't leave me alone, I get worried!"],
    affectionate: ["You're my favorite human in the whole world!", "I love you so much, here's some kisses!"],
    needs_outside: ["I really need to go outside, like NOW!", "The squirrels are taunting me through the window!"],
    wants_play: ["Throw the ball! Throw it! THROW IT!", "Let's play tug of war, I promise I'll let you win!"],
    annoyed: ["Stop touching my paws, I've told you a million times!", "That vacuum cleaner is my mortal enemy."],
    in_pain: ["Something doesn't feel right... can you help me?", "My paw hurts when I walk on it..."],
    content: ["Life is good. Sunshine, belly rubs, what more could I want?", "This is my happy place, right here with you."],
    greeting: ["YOU'RE HOME! I've been waiting FOREVER!", "Hi hi hi! I missed you so much!"],
  },
  cat: {
    hungry: ["My bowl has been empty for 0.3 seconds. Unacceptable.", "I shall sit by the food area and stare at you judgmentally."],
    sleepy: ["Do not disturb. I'm in the middle of my 14th nap.", "This sunbeam is mine. I will sleep here until it moves."],
    excited: ["Is that... a laser pointer?! WHERE IS IT?!", "A cardboard box! My kingdom has arrived!"],
    bored: ["I've knocked everything off the table. Now what?", "Staring at the wall is my new hobby. Thanks for nothing."],
    anxious: ["Something changed and I don't approve.", "There's a cucumber behind me, isn't there?"],
    affectionate: ["I shall grace you with my presence on your lap. You're welcome.", "You may pet me three times. No more."],
    needs_outside: ["The window is RIGHT THERE. Open it.", "I want to go outside, stare at a bush, then come right back in."],
    wants_play: ["If you dangle that feather toy, I will destroy it.", "My prey instincts are tingling. Prepare yourself."],
    annoyed: ["You moved while I was sleeping on you. Betrayal.", "Stop singing. Your voice offends my ears."],
    in_pain: ["I'm not feeling well... I'm going to hide under the bed.", "Something hurts but I'll never let you know which part."],
    content: ["This is adequate. I approve of this arrangement.", "Purrrrrr... Don't read into it. I'm just vibrating."],
    greeting: ["Oh, you're back. I barely noticed you were gone.", "Meow. That's my greeting. Don't expect more."],
  },
};

const SUGGESTIONS: Record<EmotionState, ResponseSuggestion[]> = {
  hungry: [
    { verbal: "Say: 'Dinner time, buddy!'", action: "Check if it's feeding time and prepare their meal" },
    { verbal: "Say: 'Just a little more patience!'", action: "Offer a small healthy treat" },
    { verbal: "Say: 'Let's check your bowl!'", action: "Ensure fresh water is also available" },
  ],
  sleepy: [
    { verbal: "Whisper: 'Sweet dreams, little one'", action: "Dim the lights and reduce noise" },
    { verbal: "Say: 'Time for a cozy nap'", action: "Prepare their favorite sleeping spot" },
    { verbal: "Softly: 'Rest well, buddy'", action: "Gentle slow petting to help them relax" },
  ],
  excited: [
    { verbal: "Say: 'Let's have some fun!'", action: "Engage in active play for 10-15 minutes" },
    { verbal: "Say: 'Good energy, buddy!'", action: "Take them for a walk or play session" },
    { verbal: "Say: 'Who's a happy pet!'", action: "Channel the energy with their favorite toy" },
  ],
  bored: [
    { verbal: "Say: 'Want to play a game?'", action: "Introduce a puzzle toy or new activity" },
    { verbal: "Say: 'Let's go explore!'", action: "Take a walk in a new environment" },
    { verbal: "Say: 'I've got something fun!'", action: "Rotate their toys to keep things fresh" },
  ],
  anxious: [
    { verbal: "Say: 'It's okay, I'm right here'", action: "Stay close and offer gentle reassurance" },
    { verbal: "Calmly: 'You're safe with me'", action: "Create a quiet, enclosed safe space" },
    { verbal: "Say: 'Nothing to worry about'", action: "Use calming music or white noise" },
  ],
  affectionate: [
    { verbal: "Say: 'I love you too!'", action: "Return affection with gentle petting" },
    { verbal: "Say: 'You're the best!'", action: "Spend quality one-on-one time together" },
    { verbal: "Say: 'Come here, sweetie!'", action: "Cuddle session on the couch" },
  ],
  needs_outside: [
    { verbal: "Say: 'Let's go outside!'", action: "Take them out immediately" },
    { verbal: "Say: 'Walkies time!'", action: "Grab the leash and head to their favorite spot" },
    { verbal: "Say: 'Fresh air time!'", action: "Open the door or window for fresh air" },
  ],
  wants_play: [
    { verbal: "Say: 'Game on!'", action: "Grab their favorite toy and play" },
    { verbal: "Say: 'Ready, set, go!'", action: "Start a game of fetch or chase" },
    { verbal: "Say: 'Let's have fun!'", action: "Try a new interactive game" },
  ],
  annoyed: [
    { verbal: "Say: 'Sorry about that'", action: "Give them space and stop the irritating behavior" },
    { verbal: "Say: 'I'll leave you be'", action: "Let them have alone time" },
    { verbal: "Quietly: 'My bad, buddy'", action: "Offer a peace-offering treat after some time" },
  ],
  in_pain: [
    { verbal: "Say: 'I'm here for you'", action: "Gently check for visible injuries" },
    { verbal: "Say: 'Let me help you'", action: "Contact your veterinarian immediately" },
    { verbal: "Softly: 'You'll be okay'", action: "Keep them calm and comfortable" },
  ],
  content: [
    { verbal: "Say: 'Happy pet, happy life!'", action: "Keep doing what you're doing — it's working!" },
    { verbal: "Say: 'Life is good, right?'", action: "Enjoy the peaceful moment together" },
    { verbal: "Say: 'That's my good buddy!'", action: "Gentle pets to maintain the calm" },
  ],
  greeting: [
    { verbal: "Say: 'Hello, beautiful!'", action: "Give them an enthusiastic greeting back" },
    { verbal: "Say: 'I missed you too!'", action: "Spend a minute of focused attention" },
    { verbal: "Say: 'Hi there, buddy!'", action: "Offer a small welcome treat" },
  ],
};

export function generateMockTranslation(petName: string, petType: 'dog' | 'cat', mode: 'audio' | 'visual' | 'deep'): Omit<Translation, 'id' | 'petId' | 'createdAt'> {
  const emotion = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
  const texts = TRANSLATIONS[petType][emotion];
  const text = texts[Math.floor(Math.random() * texts.length)];
  const confidence = mode === 'deep' ? 85 + Math.random() * 14 : 60 + Math.random() * 30;

  return {
    petName,
    type: mode,
    emotion,
    confidence: Math.round(confidence),
    translation: text,
    suggestions: SUGGESTIONS[emotion].slice(0, 3),
  };
}

const HOROSCOPES = [
  "The stars suggest extra treats are in your future today! 🌟",
  "A nap in a sunbeam will bring you inner peace. ☀️",
  "Today is perfect for zoomies around the living room! 🏃",
  "Your human will share something delicious with you. 🍕",
  "An unexpected visitor will bring joy and belly rubs. 🤗",
  "The mailman carries an important message for you today. 📬",
  "Romance is in the air — that cute pet next door noticed you! 💕",
  "Your lucky number is the number of treats you can eat. ♾️",
  "A squeaky toy from the past will resurface today. 🧸",
  "Mercury is in retrograde — blame any mischief on that. 🪐",
];

export function getDailyHoroscope(petName: string): string {
  const day = new Date().getDate();
  const idx = (petName.length + day) % HOROSCOPES.length;
  return HOROSCOPES[idx];
}
