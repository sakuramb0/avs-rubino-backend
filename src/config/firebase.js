const admin = require('firebase-admin');

// Inizializzazione dinamica tramite variabili d'ambiente
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

module.exports = admin;