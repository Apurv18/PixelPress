const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.post('/compress', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const quality = parseInt(req.body.quality) || 80;
        const originalFilename = req.file.originalname;
        const compressedFilename = `compressed_${Date.now()}_${originalFilename}`;
        const outputPath = path.join(uploadsDir, compressedFilename);

        // Compress the image
        await sharp(req.file.buffer)
            .jpeg({ quality: quality })
            .toFile(outputPath);

        // Send the compressed file
        res.download(outputPath, compressedFilename, (err) => {
            if (err) {
                console.error('Error sending file:', err);
            }
            // Clean up: delete the compressed file after sending
            fs.unlink(outputPath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error('Error deleting file:', unlinkErr);
                }
            });
        });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Error processing image' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 