"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} retry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error; retry: () => void }> = ({ error, retry }) => {
  return (
    <Card className="p-6 m-4 max-w-md mx-auto">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-destructive">
            Une erreur s'est produite
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {error?.message || "Une erreur inattendue s'est produite"}
          </p>
        </div>
        <Button onClick={retry} variant="outline" className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Réessayer
        </Button>
      </div>
    </Card>
  );
};

// Hook pour les erreurs de validation
export const useValidationError = () => {
  const [validationError, setValidationError] = React.useState<string | null>(null);

  const showValidationError = React.useCallback((message: string) => {
    setValidationError(message);
    setTimeout(() => setValidationError(null), 5000);
  }, []);

  const clearValidationError = React.useCallback(() => {
    setValidationError(null);
  }, []);

  return {
    validationError,
    showValidationError,
    clearValidationError,
  };
};

export default ErrorBoundary;