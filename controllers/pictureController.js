const connection = require('../config/db.js');
const path = require('path');
const fs = require('fs');
const Utility = require('../utility/utility');

class PictureController {
    static async uploadImages(req, res) {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'No files uploaded' });
            }

            const resizedImages = await Promise.all(
                req.files.map(async (file) => {
                    const resizedImagePath = await Utility.resizeImage(
                        file.path,
                        `resized-${file.filename}`,
                        500,
                        500
                    );
                    
                    console.log(resizedImagePath)
                    fs.unlink(file.path, (err) => {
                        if (err) console.error(`Failed to delete original file ${file.path}:`, err);
                    });
                    return resizedImagePath
                })
            );

            res.status(200).json({
                message: 'Files uploaded and resized successfully',
                resizedImages,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = PictureController;
