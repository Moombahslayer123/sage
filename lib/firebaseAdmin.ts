import "server-only";
import { cert, initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const projectId = required("FIREBASE_PROJECT_ID");
const clientEmail = required("FIREBASE_CLIENT_EMAIL");
const privateKey = required("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      })
    : getApps()[0];

export const db = getFirestore(app);
