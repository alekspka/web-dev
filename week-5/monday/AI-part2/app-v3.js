const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
dotenv.config();

// Controllers
const generateText = require('./controllers/textController');
const analyzeImage = require('./controllers/imageController'); 
const analyzeAudio = require('./controllers/audioController'); 

// Middleware
app.use(express.json());

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer instance
const upload = multer({ dest: uploadDir });

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

app.post('/generate-text', generateText);
app.post('/analyze-image', upload.single('image'),analyzeImage);
app.post('/analyze-audio', upload.single('audio'), analyzeAudio);


// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// npm init -y
// npm install express dotenv multer @google/genai


