const express = require('express');
const router = express.Router();
const admin = require("../config/firebase");

const db = admin.firestore();
const collection = db.collection('clinic_content');

// GET all content
router.get('/', async (req, res) => {
  try {
    const snapshot = await collection.get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    console.error("🔥 ERRORE CRITICO NELLA ROTTA:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST new content
router.post('/', async (req, res) => {
  try {
    const docRef = await collection.add(req.body);
    res.status(201).json({ id: docRef.id, ...req.body });
  } catch (error) {
    console.error("🔥 ERRORE CRITICO NELLA ROTTA:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update content
router.put('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).update(req.body);
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (error) {
    console.error("🔥 ERRORE CRITICO NELLA ROTTA:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE content
router.delete('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error("🔥 ERRORE CRITICO NELLA ROTTA:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
