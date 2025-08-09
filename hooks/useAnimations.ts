import { useCallback, useRef } from 'react';

export const useAnimations = () => {
  const animationTimeouts = useRef<Set<NodeJS.Timeout>>(new Set());

  const addAnimation = useCallback((element: HTMLElement | null, className: string, duration = 500) => {
    if (!element) return;

    // Ajouter la classe d'animation
    element.classList.add(className);

    // Retirer la classe après la durée spécifiée
    const timeout = setTimeout(() => {
      element.classList.remove(className);
      animationTimeouts.current.delete(timeout);
    }, duration);

    animationTimeouts.current.add(timeout);
  }, []);

  const flashElement = useCallback((element: HTMLElement | null) => {
    addAnimation(element, 'quantity-flash', 400);
  }, [addAnimation]);

  const slideInElement = useCallback((element: HTMLElement | null) => {
    addAnimation(element, 'slide-in', 300);
  }, [addAnimation]);

  const pulseSuccess = useCallback((element: HTMLElement | null) => {
    addAnimation(element, 'pulse-success', 600);
  }, [addAnimation]);

  const bounceElement = useCallback((element: HTMLElement | null) => {
    addAnimation(element, 'success-bounce', 500);
  }, [addAnimation]);

  const shakeElement = useCallback((element: HTMLElement | null) => {
    addAnimation(element, 'error-shake', 500);
  }, [addAnimation]);

  // Nettoyer tous les timeouts
  const cleanup = useCallback(() => {
    animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    animationTimeouts.current.clear();
  }, []);

  return {
    addAnimation,
    flashElement,
    slideInElement,
    pulseSuccess,
    bounceElement,
    shakeElement,
    cleanup,
  };
};