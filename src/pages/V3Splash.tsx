import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

export default function V3Splash() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => navigate('/v3/setup', { replace: true }), 500);
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{ background: '#FFF9E6' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Paw icon with wagging animation */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 12, -12, 8, -8, 0] }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
            >
              <div className="w-24 h-24 rounded-[30px] flex items-center justify-center" style={{ background: '#FFD1DC' }}>
                <PawPrint className="w-14 h-14" style={{ color: '#FF6B8A' }} />
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            className="mt-6 text-3xl font-bold"
            style={{ fontFamily: 'Fredoka, sans-serif', color: '#2C2C2C' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            PawTalk AI
          </motion.h1>

          <motion.p
            className="mt-2 text-sm"
            style={{ color: '#999' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            What's your pet really saying?
          </motion.p>

          {/* Wagging tail */}
          <motion.div
            className="mt-8"
            animate={{ rotate: [0, 25, -25, 20, -20, 0] }}
            transition={{ duration: 1, delay: 1, repeat: 1 }}
          >
            <span className="text-4xl">🐾</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
