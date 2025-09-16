const model = require("../services/gemini");
const fs = require('fs');


const imageToGenerativePart = (filePath) => ({
    inlineData: {
      data: fs.readFileSync(filePath).toString('base64'),
      mimeType: 'image/png',
    },
})

const analyzeImage = async (req, res) => {

    const prompt = req.body.prompt || 'Describe this image';
    const filePath = req.file?.path; // store it here

    try {
        const image = imageToGenerativePart(filePath);
        const result = await model([prompt, image]);
        res.json({ output: result.text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        // Only delete if filePath exists
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};

module.exports = analyzeImage;

