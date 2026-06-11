import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface Guest {
  token: string;
  maxGuests: number;
  status: 'pending' | 'confirmed' | 'declined';
  confirmedGuests: number;
  invitees?: Array<{
    firstName?: string;
    lastName?: string;
    fullName?: string;
  }>;
  name?: string;
}

/**
 * Validate token against Firestore guests collection.
 * Returns null if token is not found.
 */
export async function validateRSVPToken(token: string): Promise<Guest | null> {
  // Los IDs de documento distinguen mayúsculas/minúsculas y los tokens
  // generados por el panel son en minúsculas, así que se usa tal cual.
  const key = token.trim();
  try {
    const snap = await getDoc(doc(db, 'guests', key));
    if (!snap.exists()) return null;
    return snap.data() as Guest;
  } catch {
    return null;
  }
}

/**
 * Submit RSVP — updates status and confirmedGuests in Firestore.
 */
export async function submitRSVP(
  token: string,
  confirmedGuests: number,
  status: 'confirmed' | 'declined',
): Promise<boolean> {
  const key = token.trim();
  try {
    await updateDoc(doc(db, 'guests', key), { status, confirmedGuests });
    return true;
  } catch {
    return false;
  }
}
