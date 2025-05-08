// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// Solo inicializa si no hay instancias previas
const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// verifica si la inicialización fue exitosa
// console.log(firebaseConfig);

export const db = getFirestore(app);
