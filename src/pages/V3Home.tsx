import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { getRandomMood, getRandomText, getSticker, MOOD_MAP, type V3Mood } from '@/lib/v3Engine';

type Phase = 'idle' | 'listening' | 'thinking' | 'result';

export default function V3Home() {
  const navigate = useNavigate();
  const pets = useAppStore((s) => s.pets);
  const selectedPetId = useAppStore((s) => s.selectedPetId);
  const pet = pets.find((p) => p.id === selectedPetId) ?? pets[0];

  const [phase, setPhase] = useState<Phase>('idle');
  const [mood, setMood] = useState<V3Mood | null>(null);
  const [text, setText] = useState('');

  const handleTap = useCallback(() => {
    if (phase !== 'idle') return;

    setPhase('listening');

    // Simulate 3s listening
    setTimeout(() => {
      setPhase('thinking');
      const m = getRandomMood();
      setMood(m);
      setText(getRandomText(m));

      // Simulate 2s thinking
      setTimeout(() => setPhase('result'), 2000);
    }, 3000);
  }, [phase]);

  const handleReset = () => {
    setPhase('idle');
    setMood(null);
    setText('');
  };

  const handleShare = async () => {
    if (!mood || !pet) return;
    // Create a share card using canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d')!;

    // Background
    ctx.fillStyle = MOOD_MAP[mood].bgColor;
    ctx.fillRect(0, 0, 1080, 1920);

    // Load sticker image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = getSticker(mood, pet.type);
    await new Promise((r) => { img.onload = r; });

    // Draw sticker centered
    const stickerSize = 500;
    ctx.drawImage(img, (1080 - stickerSize) / 2, 400, stickerSize, stickerSize);

    // Speech bubble
    ctx.fillStyle = 'white';
    const bubbleY = 980;
    const bubbleW = 900;
    const bubbleH = 220;
    const bubbleX = (1080 - bubbleW) / 2;
    roundRect(ctx, bubbleX, bubbleY, bubbleW, bubbleH, 40);
    ctx.fill();

    // Text
    ctx.fillStyle = '#2C2C2C';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    wrapText(ctx, `"${text}"`, 540, bubbleY + 80, bubbleW - 60, 50);

    // Pet name
    ctx.fillStyle = '#999';
    ctx.font = '28px sans-serif';
    ctx.fillText(`— ${pet.name} ${MOOD_MAP[mood].emoji}`, 540, bubbleY + bubbleH + 60);

    // Logo
    ctx.fillStyle = '#FFD1DC';
    roundRect(ctx, 390, 1700, 300, 60, 30);
    ctx.fill();
    ctx.fillStyle = '#FF6B8A';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('🐾 PawTalk AI', 540, 1740);

    // Download
    const link = document.createElement('a');
    link.download = `pawtalk-${pet.name}-${mood}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!pet) {
    navigate('/v3/setup', { replace: true });
    return null;
  }

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: '#FFF9E6' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div>
          <h2 className="text-lg font-bold" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2C2C2C' }}>
            {pet.name}'s Translator
          </h2>
          <p className="text-xs" style={{ color: '#999' }}>
            {pet.type === 'cat' ? '🐱' : '🐶'} Ready to translate
          </p>
        </div>
        <button
          onClick={() => navigate('/v3/setup')}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: '#F0EDE4' }}
        >
          <Settings className="w-5 h-5" style={{ color: '#999' }} />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {/* IDLE STATE */}
          {phase === 'idle' && (
            <motion.div
              key="idle"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <p className="text-center text-base" style={{ fontFamily: 'Fredoka, sans-serif', color: '#888' }}>
                Tap to hear what {pet.name} is saying
              </p>

              {/* Big paw button */}
              <div className="relative">
                {/* Pulse rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full animate-pulse-ring" style={{ background: '#FFD1DC44' }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full animate-pulse-ring" style={{ background: '#FFD1DC33', animationDelay: '0.5s' }} />
                </div>

                <motion.button
                  onClick={handleTap}
                  className="relative w-36 h-36 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #FFD1DC, #FFB6C8)' }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <PawPrint className="w-16 h-16" style={{ color: 'white' }} />
                </motion.button>
              </div>

              <p className="text-xs" style={{ color: '#BBB' }}>Hold your phone near your pet</p>
            </motion.div>
          )}

          {/* LISTENING STATE */}
          {phase === 'listening' && (
            <motion.div
              key="listening"
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-base font-medium" style={{ fontFamily: 'Fredoka, sans-serif', color: '#FF6B8A' }}>
                Listening to {pet.name}...
              </p>

              {/* Waveform */}
              <div className="flex items-center gap-1 h-16">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 rounded-full"
                    style={{ background: '#FFD1DC' }}
                    animate={{
                      height: [8, 28 + Math.random() * 20, 8],
                    }}
                    transition={{
                      duration: 0.6 + Math.random() * 0.4,
                      repeat: Infinity,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>

              {/* Pulsing paw */}
              <motion.div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: '#FFD1DC' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <PawPrint className="w-12 h-12" style={{ color: 'white' }} />
              </motion.div>
            </motion.div>
          )}

          {/* THINKING STATE */}
          {phase === 'thinking' && mood && (
            <motion.div
              key="thinking"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Cartoon pet with glasses emoji */}
              <motion.div
                className="text-7xl"
                animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {pet.type === 'cat' ? '🐱' : '🐶'}
              </motion.div>

              <div className="flex items-center gap-2">
                <motion.span
                  className="text-3xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  🤓
                </motion.span>
                <p className="text-base font-medium" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2C2C2C' }}>
                  {MOOD_MAP[mood].thinkingText}
                </p>
              </div>

              {/* Loading dots */}
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ background: '#FFD1DC' }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* RESULT STATE */}
          {phase === 'result' && mood && (
            <motion.div
              key="result"
              className="flex flex-col items-center gap-5 w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Mood badge */}
              <motion.div
                className="px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: MOOD_MAP[mood].bgColor,
                  color: '#2C2C2C',
                  fontFamily: 'Fredoka, sans-serif',
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {MOOD_MAP[mood].emoji} {mood.charAt(0).toUpperCase() + mood.slice(1)} Mood
              </motion.div>

              {/* Sticker */}
              <motion.img
                src={getSticker(mood, pet.type)}
                alt={`${pet.name} feeling ${mood}`}
                className="w-56 h-56 object-contain"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              />

              {/* Speech bubble */}
              <motion.div
                className="relative w-full px-6 py-5 rounded-3xl"
                style={{ background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Bubble pointer */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45"
                  style={{ background: 'white' }}
                />
                <p
                  className="relative text-center text-lg leading-relaxed"
                  style={{ fontFamily: 'Fredoka, sans-serif', color: '#2C2C2C' }}
                >
                  "{text}"
                </p>
                <p className="relative text-center text-xs mt-2" style={{ color: '#BBB' }}>
                  — {pet.name} {MOOD_MAP[mood].emoji}
                </p>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                className="flex gap-3 w-full mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={handleReset}
                  className="flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-95"
                  style={{
                    background: '#F0EDE4',
                    color: '#888',
                    fontFamily: 'Fredoka, sans-serif',
                  }}
                >
                  🔄 Try Again
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #FFD1DC, #FFB6C8)',
                    color: 'white',
                    fontFamily: 'Fredoka, sans-serif',
                  }}
                >
                  📸 Share Moment
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom branding */}
      <div className="pb-6 pt-2 text-center">
        <p className="text-xs" style={{ color: '#CCC' }}>🐾 PawTalk AI — What's your pet really saying?</p>
      </div>
    </div>
  );
}

// Canvas helpers
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  for (const word of words) {
    const testLine = line + word + ' ';
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, currentY);
      line = word + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}
