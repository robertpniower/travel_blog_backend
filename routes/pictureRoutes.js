const express = require('express');
const fs = require('fs');  // Add this line to import fs
const path = require('path');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/upload', uploadMiddleware, (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    // Map the uploaded files to return the necessary information
    const fileUrls = req.files.map(file => ({
        originalName: file.originalname,
        fileUrl: `/uploads/${path.basename(file.path)}`  // Correct key name for the URL
    }));

    console.log(fileUrls)

    // Ensure the response matches the expected structure
    res.status(200).json({ resizedImages: fileUrls });
});

module.exports = router;
