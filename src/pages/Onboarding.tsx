import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { PawPrint, Mic, Camera, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    icon: PawPrint,
    title: 'Welcome to PawTalk AI',
    subtitle: 'Speak Paw. Understand All.',
    description: "Discover what your furry friend is really trying to tell you with the power of AI.",
    gradient: 'gradient-amber',
  },
  {
    icon: Mic,
    title: 'Listen & Translate',
    subtitle: 'Record pet sounds',
    description: "Capture barks, meows, purrs and whimpers. Our AI interprets their meaning instantly.",
    gradient: 'gradient-teal',
  },
  {
    icon: Camera,
    title: 'See & Understand',
    subtitle: 'Analyze body language',
    description: "Point your camera at your pet and discover what their posture, ears, and tail are saying.",
    gradient: 'gradient-coral',
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const setOnboarded = useAppStore((s) => s.setOnboarded);
  const navigate = useNavigate();

  const finish = () => {
    setOnboarded();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center text-center"
        >
          <div className={`mb-8 flex h-28 w-28 items-center justify-center rounded-[2rem] ${slides[step].gradient} shadow-elevated`}>
            {(() => {
              const Icon = slides[step].icon;
              return <Icon className="h-14 w-14 text-primary-foreground" />;
            })()}
          </div>

          <h1 className="mb-2 text-2xl font-heading font-black">{slides[step].title}</h1>
          <p className="mb-3 text-sm font-heading font-bold text-primary">{slides[step].subtitle}</p>
          <p className="mb-10 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {slides[step].description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="mb-8 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === step ? 'w-8 bg-primary' : 'w-2 bg-muted'
            }`}
          />
        ))}
      </div>

      <Button
        onClick={step < slides.length - 1 ? () => setStep(step + 1) : finish}
        className="w-full max-w-xs rounded-2xl gradient-amber text-primary-foreground font-heading font-bold h-12 text-base shadow-card hover:opacity-90 transition-opacity"
      >
        {step < slides.length - 1 ? (
          <>Next <ChevronRight className="h-4 w-4" /></>
        ) : (
          "Get Started 🐾"
        )}
      </Button>

      {step < slides.length - 1 && (
        <button
          onClick={finish}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      )}
    </div>
  );
}
