import { useState, useCallback, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { generateMockTranslation } from '@/lib/mockAI';
import TranslationCard from '@/components/TranslationCard';
import Disclaimer from '@/components/Disclaimer';
import { Mic, Square, Layers } from 'lucide-react';

export default function ListenPage() {
  const [searchParams] = useSearchParams();
  const isDeep = searchParams.get('mode') === 'deep';
  const { pets, selectedPetId, addTranslation, translations } = useAppStore();
  const selectedPet = pets.find((p) => p.id === selectedPetId);

  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [latestId, setLatestId] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const waveBars = 24;

  const startRecording = useCallback(() => {
    setRecording(true);
    setSeconds(0);
    setLatestId(null);
    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s >= 29) {
          stopRecording();
          return 30;
        }
        return s + 1;
      });
    }, 1000);
  }, []);

  const stopRecording = useCallback(() => {
    setRecording(false);
    clearInterval(timerRef.current);
    if (!selectedPet) return;

    setAnalyzing(true);
    setTimeout(() => {
      const mock = generateMockTranslation(selectedPet.name, selectedPet.type, isDeep ? 'deep' : 'audio');
      const id = crypto.randomUUID();
      addTranslation({
        ...mock,
        id,
        petId: selectedPet.id,
        createdAt: new Date().toISOString(),
      });
      setLatestId(id);
      setAnalyzing(false);
    }, 2000);
  }, [selectedPet, isDeep, addTranslation]);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const latestTranslation = translations.find((t) => t.id === latestId);

  return (
    <div className="px-5 pt-12 pb-4">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-heading font-black flex items-center justify-center gap-2">
          {isDeep ? <><Layers className="h-5 w-5 text-accent" /> Deep Scan</> : '🎙️ Listen'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isDeep ? 'Audio + visual analysis for best accuracy' : 'Record your pet\'s sounds'}
        </p>
      </div>

      {!selectedPet ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">Please add a pet first in "My Pets"</p>
        </div>
      ) : (
        <>
          {/* Waveform area */}
          <div className="mb-6 flex h-32 items-center justify-center gap-[3px] rounded-2xl border border-border bg-card">
            {Array.from({ length: waveBars }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-full bg-primary"
                animate={recording ? {
                  height: [8, 12 + Math.random() * 24, 8],
                } : { height: 8 }}
                transition={recording ? {
                  duration: 0.4 + Math.random() * 0.3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.04,
                } : { duration: 0.3 }}
              />
            ))}
          </div>

          {/* Timer */}
          <p className="mb-4 text-center font-mono text-lg font-bold text-muted-foreground">
            0:{seconds.toString().padStart(2, '0')} / 0:30
          </p>

          {/* Record Button */}
          <div className="mb-6 flex justify-center">
            <button
              onClick={recording ? stopRecording : startRecording}
              disabled={analyzing}
              className="relative"
            >
              {recording && (
                <span className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" />
              )}
              <div className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full transition-all ${
                recording
                  ? 'bg-accent shadow-elevated'
                  : analyzing
                    ? 'bg-muted'
                    : 'gradient-amber shadow-card hover:scale-105'
              }`}>
                {recording ? (
                  <Square className="h-7 w-7 text-accent-foreground" fill="currentColor" />
                ) : analyzing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <span className="text-2xl">🐾</span>
                  </motion.div>
                ) : (
                  <Mic className="h-8 w-8 text-primary-foreground" />
                )}
              </div>
            </button>
          </div>

          <p className="mb-6 text-center text-xs text-muted-foreground">
            {analyzing ? 'Analyzing...' : recording ? 'Tap to stop recording' : 'Tap to start recording'}
          </p>

          {/* Result */}
          <AnimatePresence>
            {latestTranslation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <TranslationCard translation={latestTranslation} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <Disclaimer />
    </div>
  );
}
