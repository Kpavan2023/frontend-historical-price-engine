'use client';
import { usePriceStore } from '../store/usePriceStore';
import { motion } from 'framer-motion';
import { LucideTrendingUp, LucideClock3, LucideBadgeDollarSign, LucideSearchCode } from 'lucide-react';

export default function PriceDisplay() {
  const { priceData } = usePriceStore();

  if (!priceData) return null;

  const formattedTime = new Date(priceData.timestamp * 1000).toLocaleString();

  return (
    <motion.div
      className="mt-10 p-6 rounded-xl border border-muted shadow-lg bg-white/80 dark:bg-black/20 backdrop-blur-lg max-w-xl mx-auto space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-center text-[var(--text)]">📈 Token Price Fetched</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[var(--text)]/90">
        <div className="flex items-center gap-3">
          <LucideBadgeDollarSign className="text-green-500" />
          <span><strong>Price:</strong> ${priceData.price}</span>
        </div>

        <div className="flex items-center gap-3">
          <LucideClock3 className="text-yellow-500" />
          <span><strong>Timestamp:</strong> {formattedTime}</span>
        </div>

        <div className="flex items-center gap-3">
          <LucideTrendingUp className="text-blue-500" />
          <span><strong>Network:</strong> {priceData.network}</span>
        </div>

        <div className="flex items-center gap-3">
          <LucideSearchCode className="text-purple-500" />
          <span><strong>Source:</strong> {priceData.source || 'alchemy'}</span>
        </div>
      </div>
    </motion.div>
  );
}
