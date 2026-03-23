import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, RotateCcw, Share2, Dog, Cat } from 'lucide-react';
import { getRandomV2Result, type V2Result } from '@/lib/v2Translations';

type AppState = 'idle' | 'recording' | 'thinking' | 'result';
type PetType = 'dog' | 'cat';

const RECORDING_DURATION = 3000;
const THINKING_DURATION = 2500;

const thinkingPhrases = [
  'Analyzing woofs & meows...',
  'Decoding pet language...',
  'Consulting the fur dictionary...',
  'Translating tail wags...',
  'Reading whisker signals...',
  'Processing purr frequency...',
];

export default function V2Home() {
  const [state, setState] = useState<AppState>('idle');
  const [petType, setPetType] = useState<PetType>('dog');
  const [result, setResult] = useState<V2Result | null>(null);
  const [thinkingPhrase, setThinkingPhrase] = useState('');
  const [recordProgress, setRecordProgress] = useState(0);

  // Recording progress
  useEffect(() => {
    if (state !== 'recording') return;
    setRecordProgress(0);
    const interval = setInterval(() => {
      setRecordProgress((p) => Math.min(p + 2, 100));
    }, RECORDING_DURATION / 50);
    const timeout = setTimeout(() => {
      setState('thinking');
    }, RECORDING_DURATION);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [state]);

  // Thinking phase
  useEffect(() => {
    if (state !== 'thinking') return;
    const phrase = thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)];
    setThinkingPhrase(phrase);
    const timeout = setTimeout(() => {
      setResult(getRandomV2Result(petType));
      setState('result');
    }, THINKING_DURATION);
    return () => clearTimeout(timeout);
  }, [state, petType]);

  const handleRecord = useCallback(() => {
    if (state === 'idle' || state === 'result') {
      setResult(null);
      setState('recording');
    }
  }, [state]);

  const handleReset = () => {
    setState('idle');
    setResult(null);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full px-6 pt-12 pb-4 text-center"
      >
        <h1 className="text-2xl font-heading font-black tracking-tight">
          PawTalk <span className="text-primary">AI</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Tap to translate your pet! 🐾</p>
      </motion.div>

      {/* Pet Type Toggle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex items-center gap-2 rounded-full border border-border bg-card p-1 shadow-card"
      >
        <button
          onClick={() => state === 'idle' && setPetType('dog')}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-heading font-bold transition-all ${
            petType === 'dog'
              ? 'gradient-amber text-primary-foreground shadow-card'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Dog className="h-4 w-4" /> Dog
        </button>
        <button
          onClick={() => state === 'idle' && setPetType('cat')}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-heading font-bold transition-all ${
            petType === 'cat'
              ? 'gradient-teal text-secondary-foreground shadow-card'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Cat className="h-4 w-4" /> Cat
        </button>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* IDLE STATE */}
          {state === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-8">
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full gradient-amber opacity-20 animate-pulse-ring" />
                <div className="absolute inset-0 rounded-full gradient-amber opacity-10 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />

                <button
                  onClick={handleRecord}
                  className="relative flex h-36 w-36 items-center justify-center rounded-full gradient-amber shadow-elevated active:scale-95 transition-transform"
                >
                  <Mic className="h-14 w-14 text-primary-foreground" />
                </button>
              </div>
              <p className="text-base font-heading font-bold text-foreground">Tap to Listen</p>
              <p className="text-sm text-muted-foreground mt-1">Hold your phone near your pet</p>
            </motion.div>
          )}

          {/* RECORDING STATE */}
          {state === 'recording' && (
            <motion.div
              key="recording"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-8">
                {/* Animated waveform ring */}
                <svg className="absolute -inset-4 h-44 w-44" viewBox="0 0 176 176">
                  <circle
                    cx="88" cy="88" r="84"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeDasharray={`${recordProgress * 5.28} 528`}
                    strokeLinecap="round"
                    className="transition-all"
                    transform="rotate(-90 88 88)"
                  />
                </svg>

                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="relative flex h-36 w-36 items-center justify-center rounded-full bg-destructive shadow-elevated"
                >
                  {/* Waveform bars */}
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 rounded-full bg-primary-foreground"
                        animate={{ height: [8, 28 + Math.random() * 12, 8] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.4 + Math.random() * 0.4,
                          delay: i * 0.08,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
              <p className="text-base font-heading font-bold text-destructive">Listening...</p>
              <p className="text-sm text-muted-foreground mt-1">
                {petType === 'dog' ? '🐕 Catching those woofs!' : '🐱 Catching those meows!'}
              </p>
            </motion.div>
          )}

          {/* THINKING STATE */}
          {state === 'thinking' && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="mb-8 flex h-36 w-36 items-center justify-center rounded-full border-4 border-muted border-t-primary"
              />
              <div className="absolute mb-8 flex h-36 w-36 items-center justify-center">
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-5xl"
                >
                  {petType === 'dog' ? '🐶' : '🐱'}
                </motion.span>
              </div>
              <p className="mt-44 text-base font-heading font-bold text-primary">{thinkingPhrase}</p>
              <motion.div
                className="mt-2 flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* RESULT STATE */}
          {state === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="flex w-full flex-col items-center"
            >
              {/* Result Card */}
              <div className={`w-full rounded-3xl bg-gradient-to-br ${result.bgGradient} p-6 shadow-elevated mb-6`}>
                {/* Big pet emoji */}
                <div className="flex justify-center mb-4">
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                    className="text-8xl"
                  >
                    {result.petEmoji}
                  </motion.span>
                </div>

                {/* Speech Bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative rounded-2xl bg-card p-5 shadow-card"
                >
                  {/* Bubble arrow */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-card rotate-45 rounded-sm" />
                  <p className="relative text-center text-lg font-heading font-bold leading-snug text-foreground">
                    {result.translation}
                  </p>
                </motion.div>

                {/* Mood Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 flex items-center justify-center gap-2"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 px-4 py-2 text-sm font-heading font-bold shadow-card">
                    <span className="text-lg">{result.emoji}</span>
                    Mood: {result.mood}
                  </span>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex w-full gap-3">
                <button
                  onClick={handleRecord}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl gradient-amber py-4 text-primary-foreground font-heading font-bold shadow-card active:scale-95 transition-transform"
                >
                  <Mic className="h-5 w-5" /> Try Again
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center rounded-2xl border border-border bg-card p-4 text-muted-foreground shadow-card active:scale-95 transition-transform"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>

              {/* Disclaimer */}
              <p className="mt-6 text-center text-[10px] text-muted-foreground/60">
                🐾 For entertainment purposes only. Your pet may or may not agree with this translation.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer watermark */}
      {state === 'idle' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pb-8 text-[10px] text-muted-foreground/40"
        >
          PawTalk AI v2 • Just for fun 🐾
        </motion.p>
      )}
    </div>
  );
}
