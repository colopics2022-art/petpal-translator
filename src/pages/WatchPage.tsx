import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { generateMockTranslation } from '@/lib/mockAI';
import TranslationCard from '@/components/TranslationCard';
import Disclaimer from '@/components/Disclaimer';
import { Camera, Upload, ScanEye } from 'lucide-react';

export default function WatchPage() {
  const { pets, selectedPetId, addTranslation, translations } = useAppStore();
  const selectedPet = pets.find((p) => p.id === selectedPetId);
  const [analyzing, setAnalyzing] = useState(false);
  const [latestId, setLatestId] = useState<string | null>(null);

  const analyze = useCallback(() => {
    if (!selectedPet) return;
    setAnalyzing(true);
    setLatestId(null);
    setTimeout(() => {
      const mock = generateMockTranslation(selectedPet.name, selectedPet.type, 'visual');
      const id = crypto.randomUUID();
      addTranslation({
        ...mock,
        id,
        petId: selectedPet.id,
        createdAt: new Date().toISOString(),
      });
      setLatestId(id);
      setAnalyzing(false);
    }, 2500);
  }, [selectedPet, addTranslation]);

  const latestTranslation = translations.find((t) => t.id === latestId);

  return (
    <div className="px-5 pt-12 pb-4">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-heading font-black">📷 Watch</h1>
        <p className="text-sm text-muted-foreground">Analyze your pet's body language</p>
      </div>

      {!selectedPet ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">Please add a pet first in "My Pets"</p>
        </div>
      ) : (
        <>
          {/* Camera Preview Area */}
          <div className="relative mb-6 flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card overflow-hidden">
            {analyzing ? (
              <motion.div
                className="flex flex-col items-center gap-3"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ScanEye className="h-12 w-12 text-secondary" />
                <p className="text-sm font-medium text-muted-foreground">Analyzing body language...</p>
                <div className="flex gap-2">
                  {['Tail', 'Ears', 'Eyes', 'Posture'].map((part, i) => (
                    <motion.span
                      key={part}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.5 }}
                      className="rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-medium text-secondary"
                    >
                      {part} ✓
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Camera className="h-10 w-10" />
                <p className="text-sm">Camera preview</p>
                <p className="text-xs">(Camera access requires HTTPS)</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              onClick={analyze}
              disabled={analyzing}
              className="flex items-center justify-center gap-2 rounded-2xl gradient-teal px-4 py-3 font-heading font-bold text-sm text-secondary-foreground shadow-card transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <Camera className="h-4 w-4" />
              Capture & Analyze
            </button>
            <button
              onClick={analyze}
              disabled={analyzing}
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 font-heading font-bold text-sm shadow-card transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <Upload className="h-4 w-4" />
              Upload Photo
            </button>
          </div>

          {/* Body Language Info */}
          <div className="mb-6 rounded-2xl border border-border bg-card p-4">
            <p className="mb-2 text-sm font-heading font-bold">What we analyze:</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Tail Position', emoji: '🐕' },
                { label: 'Ear Orientation', emoji: '👂' },
                { label: 'Eye Expression', emoji: '👀' },
                { label: 'Body Posture', emoji: '🦴' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs">
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

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
