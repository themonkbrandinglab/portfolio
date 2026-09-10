'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Motion values for cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for smooth movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if the device is a touch device or screen is less than 1024px
    const checkTouch = () => {
      const matchMedia = window.matchMedia('(max-width: 1024px)');
      setIsTouchDevice(
        matchMedia.matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    return () => {
      window.removeEventListener('resize', checkTouch);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      // Offset by 3px to center the 6x6 dot on the cursor tip
      cursorX.set(e.clientX - 3);
      cursorY.set(e.clientY - 3);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the hovered element matches any of the specified selectors
      if (
        target.closest('.link-hover') ||
        target.closest('.arrow-hover') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive')
      ) {
        setIsHovered(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [isTouchDevice, cursorX, cursorY, isVisible]);

  // Completely hide on touch devices or screens < 1024px
  if (isTouchDevice) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '6px',
        height: '6px',
        backgroundColor: 'var(--text-primary, black)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
        opacity: isVisible ? (isHovered ? 0.6 : 1) : 0,
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        opacity: { duration: 0.2 }
      }}
    />
  );
};

export default CustomCursor;
