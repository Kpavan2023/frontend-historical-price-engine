'use client';

import { Loader2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTokenForm } from '../hooks/useTokenForm';
import { useState } from 'react';

export default function TokenPriceForm({ onSubmit, loading }) {
  const { form, handleChange, handleSubmit } = useTokenForm(onSubmit);
  const [isFocused, setIsFocused] = useState({ token: false, timestamp: false });

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const inputVariants = {
    focused: { scale: 1.02, boxShadow: '0 0 50px rgba(94, 52, 134, 0.5)' },
    blurred: { scale: 1, boxShadow: 'none' },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 0 15px rgba(236, 72, 153, 0.5)' },
    tap: { scale: 0.95 },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md glass p-8 rounded-2xl transition-all duration-300 glow"
    >
      <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mb-6 flex items-center justify-center gap-2">
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Search className="w-6 h-6 text-[var(--secondary)]" />
        </motion.span>
        Token Price Lookup
      </h2>

      <div className="mb-4 relative group">
        <label className="block text-sm font-medium text-center text-[var(--text)] mb-1 transition-all duration-200 group-hover:text-[var(--secondary)]">
          Token Address
        </label>
        <motion.input
          type="text"
          name="token"
          value={form.token}
          onChange={handleChange}
          onFocus={() => setIsFocused({ ...isFocused, token: true })}
          onBlur={() => setIsFocused({ ...isFocused, token: false })}
          variants={inputVariants}
          animate={isFocused.token ? 'focused' : 'blurred'}
          placeholder="e.g., 0xa0b8...6eb48"
          className="w-full px-4 py-2 rounded-lg border border-[var(--primary)]/30 bg-white/50 dark:bg-gray-800/50 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] transition-all duration-300 glow"
          required
        />
        <span className="absolute -top-2 right-2 text-xs text-[var(--secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Paste ERC-20 token address
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-center text-[var(--text)] mb-1 transition-all duration-200 hover:text-[var(--secondary)]">
          Network
        </label>
        <motion.select
          name="network"
          value={form.network}
          onChange={handleChange}
          variants={inputVariants}
          animate={form.network ? 'focused' : 'blurred'}
          className="w-full px-4 py-2 rounded-lg border border-[var(--primary)]/30 bg-white/50 dark:bg-gray-800/50 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] transition-all duration-300 glow"
        >
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
        </motion.select>
      </div>

      <div className="mb-6 relative group">
        <label className="block text-sm font-medium text-center text-[var(--text)] mb-1 transition-all duration-200 group-hover:text-[var(--secondary)]">
          Timestamp
        </label>
        <motion.input
          type="datetime-local"
          name="timestamp"
          value={form.timestamp}
          onChange={handleChange}
          onFocus={() => setIsFocused({ ...isFocused, timestamp: true })}
          onBlur={() => setIsFocused({ ...isFocused, timestamp: false })}
          variants={inputVariants}
          animate={isFocused.timestamp ? 'focused' : 'blurred'}
          className="w-full px-4 py-2 rounded-lg border border-[var(--primary)]/30 bg-white/50 dark:bg-gray-800/50 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] transition-all duration-300 glow"
          required
        />
        <span className="absolute -top-2 right-2 text-xs text-[var(--secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Select date and time
        </span>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        variants={buttonVariants}
        whileHover={!loading ? 'hover' : ''}
        whileTap={!loading ? 'tap' : ''}
        className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition duration-300 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hover:from-[var(--secondary)] hover:to-[var(--accent)] pulse ${
          loading ? 'bg-gray-400 cursor-not-allowed' : ''
        }`}
      >
        <AnimatePresence>
          {loading && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            </motion.span>
          )}
        </AnimatePresence>
        {loading ? 'Fetching...' : 'Get Price'}
      </motion.button>
    </motion.form>
  );
}
