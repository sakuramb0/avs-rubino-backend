const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
// Uses Application Default Credentials (ADC) automatically
admin.initializeApp();

module.exports = admin;
