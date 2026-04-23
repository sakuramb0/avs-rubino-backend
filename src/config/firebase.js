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

// Prepariamo le variabili pulendole da eventuali spazi invisibili (fondamentale!)
const projectId = (process.env.FIREBASE_PROJECT_ID || '').trim();
const bucketName = (process.env.FIREBASE_STORAGE_BUCKET || '').trim();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: projectId,
  storageBucket: bucketName
});

/**
 * PATCH DI ROUTING ESPLICITO
 * Forziamo l'SDK a ignorare i default di sistema e puntare alle risorse esatte.
 */

// 1. Blindatura Firestore: punta all'ID 'default' (quello creato da te)
admin.firestore = () => getFirestore('default');

// 2. Blindatura Storage: forza l'uso del bucket specifico passato nel .env
admin.storage = () => {
  return {
    bucket: (name) => getStorage().bucket(name || bucketName)
  };
};

module.exports = admin;
