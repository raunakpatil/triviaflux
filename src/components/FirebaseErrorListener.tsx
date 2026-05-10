
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { toast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      console.error('Firebase Permission Error:', error.context);
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: `You don't have permission to ${error.context.operation} at ${error.context.path}.`,
      });
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return null;
}
