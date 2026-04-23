// const admin = require('firebase-admin');

// // Inizializzazione dinamica tramite variabili d'ambiente
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET
// });

// module.exports = admin;

const admin = require('firebase-admin');

// Inizializzazione dinamica tramite variabili d'ambiente (con .trim() di sicurezza contro gli spazi)
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: (process.env.FIREBASE_PROJECT_ID || '').trim(),
  storageBucket: (process.env.FIREBASE_STORAGE_BUCKET || '').trim()
});

// Recuperiamo l'istanza del database
const db = admin.firestore();

// PATCH ARCHITETTURALE: Forziamo esplicitamente l'SDK a puntare al database '(default)'.
// Questo bypassa il glitch di routing di GCP e va a colpo sicuro.
db.settings({ databaseId: '(default)' });

module.exports = admin;