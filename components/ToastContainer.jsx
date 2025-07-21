'use client';
import { motion, AnimatePresence } from 'framer-motion';

const toastVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
};

const typeStyles = {
  success: 'border-l-4 border-green-500 bg-green-100/60 dark:bg-green-900/60 text-green-800 dark:text-green-200',
  error: 'border-l-4 border-red-500 bg-red-100/60 dark:bg-red-900/60 text-red-800 dark:text-red-200',
  info: 'border-l-4 border-blue-500 bg-blue-100/60 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200',
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-6 right-6 z-[9999] space-y-3 w-[calc(100%-3rem)] max-w-sm sm:right-6 sm:top-6">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`glass px-4 py-3 rounded-xl shadow-xl ${typeStyles[toast.type] || typeStyles.info}`}
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-start space-x-3">
              <span className="text-sm font-medium">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-xl leading-none text-[var(--text)]/70 hover:text-red-500 transition-colors"
                aria-label="Close toast"
              >
                &times;
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
