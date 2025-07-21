'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const progressVariants = {
  initial: { width: 0 },
  animate: { width: '75%', transition: { duration: 1, ease: 'easeInOut' } },
};

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ScheduleProgress() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const handleSchedule = async () => {
    setLoading(true);
    setDone(false);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/schedule?token=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&network=ethereum&interval=300&backfill=6`
      );
      if (!res.ok) throw new Error('Schedule failed');

      setTimeout(() => {
        setLoading(false);
        setDone(true);
      }, 2000);
    } catch (err) {
      setError('Failed to schedule jobs.');
      setLoading(false);
    }
  };

  return (
    <motion.div className="mt-10 max-w-xl mx-auto text-center glass p-6 rounded-xl glow" initial="hidden" animate="visible" variants={messageVariants}>
      <motion.button
        onClick={handleSchedule}
        className={`bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:from-[var(--secondary)] hover:to-[var(--accent)] text-white font-bold py-2 px-4 rounded-xl transition duration-300 glow pulse ${
          loading ? 'bg-gray-400 cursor-not-allowed' : ''
        }`}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ⏱️ Run Scheduled Price Fetch
      </motion.button>

      <AnimatePresence>
        {loading && (
          <motion.div
            className="w-full mt-4 bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-3 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full"
              variants={progressVariants}
              initial="initial"
              animate="animate"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {done && (
          <motion.div
            className="mt-4 text-green-500 dark:text-green-400 font-medium"
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            ✅ Schedule completed successfully!
          </motion.div>
        )}
        {error && (
          <motion.div
            className="mt-4 text-red-500 dark:text-red-400 font-medium"
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            ❌ {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}