// const admin = require('firebase-admin');

// // Inizializzazione dinamica tramite variabili d'ambiente
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET
// });

// module.exports = admin;

const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

// Inizializzazione dinamica con trim per sicurezza contro gli spazi invisibili
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: (process.env.FIREBASE_PROJECT_ID || '').trim(),
  storageBucket: (process.env.FIREBASE_STORAGE_BUCKET || '').trim()
});

// Forziamo esplicitamente l'SDK a usare il database '(default)'
// bypassando eventuali vecchie cache di routing di Google Cloud
admin.firestore = () => getFirestore('(default)');

module.exports = admin;