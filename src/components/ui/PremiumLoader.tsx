'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PremiumLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Total sequence time ~ 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      y: '-100%',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom cubic-bezier for a smooth slide UP
      },
    },
  };

  const textVariants = {
    hidden: { y: '100%' },
    visible: {
      y: '0%',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[var(--bg-primary)] flex flex-col items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Masking container for the first line */}
          <div className="overflow-hidden">
            <motion.div
              variants={textVariants}
              className="text-[clamp(3rem,8vw,8rem)] font-[family-name:var(--font-display)] leading-none text-center"
            >
              THE.MONK
            </motion.div>
          </div>
          
          {/* Masking container for the second line */}
          <div className="overflow-hidden">
            <motion.div
              variants={textVariants}
              className="text-[clamp(3rem,8vw,8rem)] font-[family-name:var(--font-display)] leading-none text-center"
            >
              BRANDING.LAB
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

