import { useAppStore } from '@/store/appStore';
import { getDailyHoroscope } from '@/lib/mockAI';
import TranslationCard from '@/components/TranslationCard';
import Disclaimer from '@/components/Disclaimer';
import { PawPrint, Plus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { pets, selectedPetId, selectPet, translations } = useAppStore();
  const selectedPet = pets.find((p) => p.id === selectedPetId);
  const recentTranslations = translations
    .filter((t) => !selectedPetId || t.petId === selectedPetId)
    .slice(0, 3);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="px-5 pt-12 pb-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="text-2xl font-heading font-black">{greeting}! 🐾</h1>
        <p className="text-sm text-muted-foreground">What's your pet saying today?</p>
      </motion.div>

      {/* Pet Selector */}
      <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {pets.map((pet) => (
          <button
            key={pet.id}
            onClick={() => selectPet(pet.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              pet.id === selectedPetId ? 'scale-105' : 'opacity-60'
            }`}
          >
            <div className={`h-16 w-16 rounded-full border-[3px] overflow-hidden ${
              pet.id === selectedPetId ? 'border-primary shadow-card' : 'border-border'
            }`}>
              {pet.photoUrl ? (
                <img src={pet.photoUrl} alt={pet.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <PawPrint className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <span className="text-xs font-medium">{pet.name}</span>
          </button>
        ))}
        <Link
          to="/pets"
          className="flex flex-col items-center gap-1"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-border">
            <Plus className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">Add Pet</span>
        </Link>
      </div>

      {/* Horoscope */}
      {selectedPet && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl border border-border bg-card p-4 shadow-card"
        >
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-sm font-heading font-bold">{selectedPet.name}'s Daily Horoscope</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {getDailyHoroscope(selectedPet.name)}
          </p>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { to: '/listen', label: 'Listen', icon: '🎙️', bg: 'gradient-amber' },
          { to: '/watch', label: 'Watch', icon: '📷', bg: 'gradient-teal' },
          { to: '/listen?mode=deep', label: 'Deep Scan', icon: '🔬', bg: 'gradient-coral' },
        ].map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className={`flex flex-col items-center gap-2 rounded-2xl p-4 ${action.bg} text-primary-foreground shadow-card transition-transform hover:scale-[1.03] active:scale-95`}
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-xs font-heading font-bold">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent Translations */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading font-bold">Recent Translations</h2>
          <Link to="/history" className="text-xs text-primary font-medium">See All</Link>
        </div>
        {recentTranslations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center">
            <PawPrint className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No translations yet!</p>
            <p className="text-xs text-muted-foreground">Record your pet's sounds to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTranslations.map((t) => (
              <TranslationCard key={t.id} translation={t} />
            ))}
          </div>
        )}
      </div>

      <Disclaimer />
    </div>
  );
}
