require('dotenv/config');
const express = require('express');
const cors = require('cors');

const contentRoutes = require('./routes/content');
const uploadRoutes = require('./routes/upload');
const publicRoutes = require('./routes/public');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admin/content', authMiddleware, contentRoutes);
app.use('/api/admin/upload', authMiddleware, uploadRoutes);
app.use('/api/public/content', publicRoutes);

console.log("=== CHECK VARIABILI D'AMBIENTE ===");
console.log("Project ID:", process.env.FIREBASE_PROJECT_ID);
console.log("Storage Bucket:", process.env.FIREBASE_STORAGE_BUCKET);
console.log("==================================");

const admin = require('./config/firebase')
const db = admin.firestore();

console.log("⏳ Esecuzione test connessione diretta a Firestore...");

db.collection('clinic_content').limit(1).get()
  .then(snapshot => {
    console.log("✅ FIRESTORE VIVO E VEGETO! Documenti trovati:", snapshot.size);
  })
  .catch(error => {
    console.error("❌ ERRORE DIRETTO FIRESTORE:", error);
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});