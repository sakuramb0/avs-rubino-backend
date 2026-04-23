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
const { getStorage } = require('firebase-admin/storage');

/**
 * CONFIGURAZIONE STATICA DEFINITIVA
 * Nessuna variabile d'ambiente, solo nomi certi per bypassare ogni glitch di routing.
 */
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'vet-clinics-493413',
  storageBucket: 'vet-clinics-493413.firebasestorage.app'
});

// 1. Blindatura Firestore: puntiamo al database nominale 'default'
admin.firestore = () => getFirestore('default');

// 2. Blindatura Storage: puntiamo al bucket esatto visto nei log
admin.storage = () => {
  return {
    bucket: () => getStorage().bucket('vet-clinics-493413.firebasestorage.app')
  };
};

module.exports = admin;
