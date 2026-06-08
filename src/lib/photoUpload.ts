import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload a single photo to Firebase Storage under fotos-evento/.
 * Returns the download URL on success.
 */
export async function uploadPhoto(file: File): Promise<UploadResult> {
  try {
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storageRef = ref(storage, `fotos-evento/${timestamp}_${safeName}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return { success: true, url };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error al subir la foto',
    };
  }
}

/** Upload is available when storage is initialized. */
export function isPhotoUploadAvailable(): boolean {
  return storage !== null;
}
