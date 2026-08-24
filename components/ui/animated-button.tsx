"use client";

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAnimations } from '@/hooks/useAnimations';

type AnimatedButtonProps = React.ComponentProps<typeof Button> & {
  animationType?: 'ripple' | 'bounce' | 'pulse' | 'none';
  successAnimation?: boolean;
  errorAnimation?: boolean;
};

export const AnimatedButton = ({
  className,
  animationType = 'ripple',
  successAnimation = false,
  errorAnimation = false,
  children,
  onClick,
  ...props
}: AnimatedButtonProps) => {
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

  const handleClick: typeof onClick = (e) => {
    if (animationType === 'pulse') {
      pulseSuccess(buttonRef.current);
    }
    onClick?.(e);
  };

  const getAnimationClasses = () => {
    // le focus visible est géré par le Button du registre
    return animationType === 'ripple' ? 'ripple-effect' : '';
  };

  return (
    <Button
      ref={buttonRef}
      className={cn(getAnimationClasses(), className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};

AnimatedButton.displayName = 'AnimatedButton';
