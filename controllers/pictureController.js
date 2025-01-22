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

                    console.log(resizedImagePath);

                    // Generate the URL for the resized image
                    const imageUrl = `http://localhost:8000/uploads/${resizedImagePath}`;

                    // Delete the original file after resizing
                    fs.unlink(file.path, (err) => {
                        if (err) console.error(`Failed to delete original file ${file.path}:`, err);
                    });

                    return imageUrl;
                })
            );

            res.status(200).json({
                message: 'Files uploaded and resized successfully',
                resizedImages, // Return the URLs of the resized images
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = PictureController;
