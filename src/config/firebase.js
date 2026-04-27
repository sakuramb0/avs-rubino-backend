const admin = require('firebase-admin');

/**
 * Inizializzazione Firebase Admin con Application Default Credentials.
 * In Cloud Run, le credenziali vengono fornite automaticamente dal
 * service account assegnato al servizio.
 *
 * - Firestore: usa il database (default) automaticamente
 * - Storage: usa il bucket di default (storageBucket) automaticamente
 */
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'vet-clinics-493413',
  storageBucket: 'vet-clinics-493413.firebasestorage.app'
});

module.exports = admin;
