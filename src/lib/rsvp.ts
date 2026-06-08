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
  const key = token.trim().toUpperCase();
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
  const key = token.trim().toUpperCase();
  try {
    await updateDoc(doc(db, 'guests', key), { status, confirmedGuests });
    return true;
  } catch {
    return false;
  }
}
