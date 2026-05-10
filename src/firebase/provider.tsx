
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

interface FirebaseContextProps {
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
}

const FirebaseContext = createContext<FirebaseContextProps>({
  firebaseApp: null,
  firestore: null,
  auth: null,
});

export const FirebaseProvider = ({
  children,
  firebaseApp,
  firestore,
  auth,
}: {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}) => {
  return (
    <FirebaseContext.Provider value={{ firebaseApp, firestore, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
export const useFirebaseApp = () => {
  const { firebaseApp } = useFirebase();
  if (!firebaseApp) throw new Error('useFirebaseApp must be used within FirebaseProvider');
  return firebaseApp;
};
export const useFirestore = () => {
  const { firestore } = useFirebase();
  if (!firestore) throw new Error('useFirestore must be used within FirebaseProvider');
  return firestore;
};
export const useAuth = () => {
  const { auth } = useFirebase();
  if (!auth) throw new Error('useAuth must be used within FirebaseProvider');
  return auth;
};
