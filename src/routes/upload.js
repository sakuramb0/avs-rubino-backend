const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const crypto = require('crypto');

const router = express.Router();
const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME;

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const bucket = storage.bucket(bucketName);
    const fileName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}-${req.file.originalname}`;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
      resumable: false,
    });

    stream.on('error', (err) => {
      console.error(err);
      res.status(500).send('Unable to upload file.');
    });

    stream.on('finish', async () => {
      // Make file public
      await file.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      res.status(200).json({ url: publicUrl });
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.error("🔥 ERRORE CRITICO NELLA ROTTA:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
