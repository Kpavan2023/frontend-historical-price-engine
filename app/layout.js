'use client';
import { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css'; // Correct path since globals.css is in app/
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="en" className={`${inter.variable} ${darkMode ? 'dark' : ''}`} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪙</text></svg>"
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700`} suppressHydrationWarning>
        <motion.button
          className="fixed top-4 right-4 p-2 rounded-full bg-[var(--primary)] text-white shadow-lg glow pulse"
          onClick={() => setDarkMode(!darkMode)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>
        <motion.main
          className="flex min-h-screen items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.main>
        <div id="loading-portal"></div>
        <div id="toast-portal"></div>
        <div id="modal-portal"></div>
      </body>
    </html>
  );
}