const model = require("../services/gemini");
const fs = require('fs');

const analyzeAudio = async (req, res) => {
    // Store the uploaded file path for cleanup
    const filePath = req.file?.path;

    try {
        const audioBuffer = fs.readFileSync(filePath);
        const base64Audio = audioBuffer.toString('base64');

        const audioPart = {
            inlineData: {
                data: base64Audio,
                mimeType: req.file.mimetype
            }
        };

        const result = await model([
            'Transcribe or analyze the following audio:',
            audioPart
        ]);

        res.json({ output: result.text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        // Only delete if the file exists
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};

module.exports = analyzeAudio;

