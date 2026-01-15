# Sage

This repository is a minimal Next.js project configured with Firebase Admin.

## Setup

1. Copy `.env.example` to `.env.local` and replace the placeholder values with your own secrets:
   - `FIREBASE_PROJECT_ID` – your Firebase project ID.
   - `FIREBASE_CLIENT_EMAIL` – the client email for your service account.
   - `FIREBASE_PRIVATE_KEY` – your service account private key (with `\n` for line breaks).
   - `LAUNCH_SECRET` – a long random secret string used by the application.

2. Do not commit `.env.local`. It is ignored by `.gitignore`.

3. The Firebase Admin SDK is initialized in `lib/firebaseAdmin.ts`. Ensure you only import it in server-side code.

## Development

Install dependencies and start the development server:

```
npm install
npm run dev
```

This will run Next.js in development mode.

## License

MIT
