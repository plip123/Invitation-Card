import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './firebase.config';

// Prevent re-initialization in Astro's module hot-reload
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);
export { app };
