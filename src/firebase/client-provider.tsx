
'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export const FirebaseClientProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<{
    firebaseApp: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
  } | null>(null);

  useEffect(() => {
    const initialized = initializeFirebase();
    setServices(initialized);
  }, []);

  if (!services) return null;

  return (
    <FirebaseProvider
      firebaseApp={services.firebaseApp}
      firestore={services.firestore}
      auth={services.auth}
    >
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
};
