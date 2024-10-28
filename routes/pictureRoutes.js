const express = require('express');
const fs = require('fs');  // Add this line to import fs
const path = require('path');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const PictureController = require('../controllers/pictureController')

const router = express.Router();

router.post('/upload', uploadMiddleware, PictureController.uploadImages);


module.exports = router;