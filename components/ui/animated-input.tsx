"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAnimations } from '@/hooks/useAnimations';

interface AnimatedInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidChange?: (value: string) => void;
  onInvalidChange?: (value: string, error: string) => void;
  validator?: (value: string) => { isValid: boolean; error?: string };
  flashOnChange?: boolean;
}

export const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ 
    className,
    onChange,
    onValidChange,
    onInvalidChange,
    validator,
    flashOnChange = true,
    ...props 
  }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { flashElement, shakeElement } = useAnimations();
    const [isInvalid, setIsInvalid] = useState(false);
    const [lastValue, setLastValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      // Animation flash pour les changements
      if (flashOnChange && value !== lastValue) {
        flashElement(inputRef.current);
      }
      
      setLastValue(value);

      // Validation si un validator est fourni
      if (validator) {
        const validation = validator(value);
        setIsInvalid(!validation.isValid);
        
        if (validation.isValid) {
          onValidChange?.(value);
        } else {
          onInvalidChange?.(value, validation.error || 'Valeur invalide');
          shakeElement(inputRef.current);
        }
      }

      onChange?.(e);
    };

    return (
      <Input
        ref={ref || inputRef}
        className={cn(
          'focus-ring transition-all duration-200',
          isInvalid && 'border-destructive focus:ring-destructive',
          className
        )}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

AnimatedInput.displayName = 'AnimatedInput';