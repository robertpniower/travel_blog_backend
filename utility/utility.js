const connection = require('../config/db');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

class Utility {
    async userExists(email) {
        const query = 'SELECT * FROM users WHERE email = ?';

        try {
            const [rows] = await connection.execute(query, [email]);

            return rows.length > 0;
        } catch (err) {
            console.error('Error checking if user exists:', err);
            throw err;
        }
    };

    async resizeImage(filePath, outputFileName, width, height) {
        const outputDir = path.join(__dirname, '/uploads');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, outputFileName);

        try {
            if (filePath === outputPath) {
                throw new Error("Input and output paths cannot be the same");
            }

            await sharp(filePath)
                .resize(width, height)
                .toFile(outputPath);

            // Return only the file name or relative path for easy URL construction
            // Return only the relative path
            return outputFileName;

        } catch (error) {
            throw new Error(`Error resizing image: ${error.message}`);
        }
    }

    async getImageMetadata(imagePath) {
        const metadata = await sharp(imagePath).metadata();

        return {
            width: metadata.width,
            height: metadata.height,
            format: metadata.format,
        };
    }

    async slugify(str) {
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
        str = str.replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        return str;
    }
};

module.exports = new Utility();
