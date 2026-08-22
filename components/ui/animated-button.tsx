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
  onPress,
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

  const handlePress: typeof onPress = (e) => {
    if (animationType === 'pulse') {
      pulseSuccess(buttonRef.current);
    }
    onPress?.(e);
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
      ref={buttonRef}
      className={cn(getAnimationClasses(), className)}
      onPress={handlePress}
      {...props}
    >
      {children}
    </Button>
  );
};

AnimatedButton.displayName = 'AnimatedButton';
