const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadDirectory = path.join(__dirname, '..', 'uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Define storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory); // Specify the destination directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
    }
});
// Configure multer with the storage settings
const upload = multer({ storage: storage });
// Middleware for handling file uploads
const uploadMiddleware = (req, res, next) => {
    upload.array('files', 5)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message }); // Handle multer errors
        }

        const files = req.files;
        const errors = [];
        const allowedTypes = ['image/jpeg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5 MB max file size

        // Validate the uploaded files
        files.forEach((file) => {
            if (!allowedTypes.includes(file.mimetype)) {
                errors.push(`Invalid file type: ${file.originalname}`);
            }

            if (file.size > maxSize) {
                errors.push(`File too large: ${file.originalname}`);
            }
        });

        // If validation fails, remove the uploaded files and return the errors
        if (errors.length > 0) {
            files.forEach((file) => {
                fs.unlinkSync(file.path); // Remove files if validation fails
            });

            return res.status(400).json({ errors });
        }

        // Map the file paths and return them in the response
        const filePaths = files.map((file) => ({
            originalName: file.originalname,
            filePath: path.join(uploadDirectory, file.filename), // Full file path
            fileUrl: `http://localhost:8000/uploads/${path.basename(file.path)}`
        }));

        // Return the list of image URLs
        return res.status(200).json({ resizedImages: filePaths });
    });
};

module.exports = uploadMiddleware;
