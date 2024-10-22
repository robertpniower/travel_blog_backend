const express = require('express');
const fs = require('fs');  // Add this line to import fs
const path = require('path');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/upload', uploadMiddleware, (req, res) => {
    const files = req.files;

    files.forEach((file) => {
        const filePath = `uploads/${file.filename}`;
        fs.rename(file.path, filePath, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to store the file' });
            }
        });
    });
    res.status(200).json({ message: 'File upload successful' });
});

module.exports = router;