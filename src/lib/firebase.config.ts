declare global {
  interface Window {
    _APP_CLIENT_CONFIG_?: Record<string, string | undefined>;
  }
}

const env = import.meta.env as Record<string, string | undefined>;

function getInjectedConfig(): Record<string, string | undefined> {
  if (typeof window === "undefined") {
    return {};
  }

  return window._APP_CLIENT_CONFIG_ || {};
}

function getRequiredEnvVar(name: string): string {
  const injected = getInjectedConfig()[name]?.trim();
  const value = injected || env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing Firebase environment variable: ${name}. Configure it in your .env file.`,
    );
  }
  console.log(`Using Firebase config ${name}=${value ? "****" : "MISSING"}`);
  return value;
}

export const firebaseConfig = {
  apiKey: getRequiredEnvVar("PUBLIC_FIREBASE_API_KEY"),
  authDomain: getRequiredEnvVar("PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: getRequiredEnvVar("PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: getRequiredEnvVar("PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getRequiredEnvVar("PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: getRequiredEnvVar("PUBLIC_FIREBASE_APP_ID"),
};
