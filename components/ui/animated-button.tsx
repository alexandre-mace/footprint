"use client";

import React, { useRef, useEffect } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAnimations } from '@/hooks/useAnimations';

interface AnimatedButtonProps extends ButtonProps {
  animationType?: 'ripple' | 'bounce' | 'pulse' | 'none';
  successAnimation?: boolean;
  errorAnimation?: boolean;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    className, 
    animationType = 'ripple', 
    successAnimation = false,
    errorAnimation = false,
    children, 
    onClick,
    ...props 
  }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { bounceElement, shakeElement, pulseSuccess } = useAnimations();

    // Gérer les animations de succès/erreur
    useEffect(() => {
      if (successAnimation) {
        bounceElement(buttonRef.current);
      }
    }, [successAnimation, bounceElement]);

    useEffect(() => {
      if (errorAnimation) {
        shakeElement(buttonRef.current);
      }
    }, [errorAnimation, shakeElement]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (animationType === 'pulse') {
        pulseSuccess(buttonRef.current);
      }
      
      if (onClick) {
        onClick(e);
      }
    };

    const getAnimationClasses = () => {
      const classes: string[] = [];
      
      if (animationType === 'ripple') {
        classes.push('ripple-effect');
      }
      
      classes.push('focus-ring');
      
      return classes.join(' ');
    };

    return (
      <Button
        ref={ref || buttonRef}
        className={cn(getAnimationClasses(), className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';