'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TokenPriceForm from '../components/TokenPriceForm';
import PriceDisplay from '../components/PriceDisplay';
import ScheduleProgress from '../components/ScheduleProgress';
import ToastContainer from '../components/ToastContainer';
import { usePriceStore } from '../store/usePriceStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TokenPriceApp() {
  const { priceData, setPriceData } = usePriceStore();
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleSubmit = async ({ token, network, timestamp }) => {
    setLoading(true);
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/price`);
      url.searchParams.append('token', token);
      url.searchParams.append('network', network);
      url.searchParams.append('timestamp', Math.floor(new Date(timestamp).getTime() / 1000));

      const res = await fetch(url.toString());
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Fetch failed');
      setPriceData(data);
      addToast('Token price fetched successfully!', 'success');
    } catch (err) {
      console.error(err);
      addToast(err.message || 'Error fetching price', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <motion.main
        className="w-full max-w-3xl p-8 sm:p-10 md:p-12 rounded-2xl bg-white/10 dark:bg-black/20 shadow-xl backdrop-blur-lg border border-white/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-10" variants={itemVariants}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
            🧠 Historical Token Price Engine
          </h1>
          <p className="mt-2 text-[var(--text)]/70 text-lg">
            Get accurate token prices from cache, interpolated, or live sources.
          </p>
        </motion.div>

        <motion.div className="mb-8" variants={itemVariants}>
          <TokenPriceForm onSubmit={handleSubmit} loading={loading} />
        </motion.div>

        <AnimatePresence>
          {priceData && (
            <motion.div
              className="mb-8"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
            >
              <PriceDisplay />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={itemVariants}>
          <ScheduleProgress />
        </motion.div>
      </motion.main>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
