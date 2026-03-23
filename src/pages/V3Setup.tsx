import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PawPrint, Cat, Dog } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';

export default function V3Setup() {
  const navigate = useNavigate();
  const addPet = useAppStore((s) => s.addPet);
  const [name, setName] = useState('');
  const [petType, setPetType] = useState<'cat' | 'dog' | null>(null);

  const canContinue = name.trim().length > 0 && petType !== null;

  const handleStart = () => {
    if (!canContinue || !petType) return;
    const id = crypto.randomUUID();
    addPet({
      id,
      name: name.trim(),
      type: petType,
      breed: '',
      age: 0,
      photoUrl: '',
      personalityTags: [],
      createdAt: new Date().toISOString(),
    });
    navigate('/v3/home', { replace: true });
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-6" style={{ background: '#FFF9E6' }}>
      <motion.div
        className="w-full max-w-sm space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-16 h-16 rounded-[24px] items-center justify-center" style={{ background: '#B2F2BB' }}>
            <PawPrint className="w-9 h-9" style={{ color: '#2D8A4E' }} />
          </div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2C2C2C' }}>
            Let's meet your pet!
          </h1>
          <p className="text-sm" style={{ color: '#888' }}>Just two quick things and we're ready</p>
        </div>

        {/* Name input */}
        <div className="space-y-2">
          <label className="text-sm font-medium" style={{ color: '#555', fontFamily: 'Fredoka, sans-serif' }}>
            What's your pet's name?
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Luna, Max, Whiskers..."
            className="w-full px-4 py-3 rounded-2xl border-2 text-base outline-none transition-colors"
            style={{
              background: 'white',
              borderColor: name ? '#B2F2BB' : '#E8E4DA',
              fontFamily: 'Fredoka, sans-serif',
            }}
            maxLength={20}
            autoFocus
          />
        </div>

        {/* Pet type */}
        <div className="space-y-2">
          <label className="text-sm font-medium" style={{ color: '#555', fontFamily: 'Fredoka, sans-serif' }}>
            Is {name || 'your pet'} a...
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPetType('cat')}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all"
              style={{
                background: petType === 'cat' ? '#FFD1DC' : 'white',
                borderColor: petType === 'cat' ? '#FF6B8A' : '#E8E4DA',
                transform: petType === 'cat' ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <Cat className="w-10 h-10" style={{ color: petType === 'cat' ? '#FF6B8A' : '#999' }} />
              <span className="text-sm font-medium" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2C2C2C' }}>Cat</span>
            </button>
            <button
              onClick={() => setPetType('dog')}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all"
              style={{
                background: petType === 'dog' ? '#B2F2BB' : 'white',
                borderColor: petType === 'dog' ? '#2D8A4E' : '#E8E4DA',
                transform: petType === 'dog' ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <Dog className="w-10 h-10" style={{ color: petType === 'dog' ? '#2D8A4E' : '#999' }} />
              <span className="text-sm font-medium" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2C2C2C' }}>Dog</span>
            </button>
          </div>
        </div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: canContinue ? 1 : 0.4 }}
        >
          <Button
            onClick={handleStart}
            disabled={!canContinue}
            className="w-full py-6 rounded-2xl text-lg font-bold border-0"
            style={{
              background: canContinue ? '#FFD1DC' : '#E8E4DA',
              color: canContinue ? '#FF6B8A' : '#999',
              fontFamily: 'Fredoka, sans-serif',
            }}
          >
            🐾 Start Translating!
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
