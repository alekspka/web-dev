const model = require("../services/gemini");
const fs = require('fs');

const analyzeDocument = async (req, res) => {
    const filePath = req.file?.path; // optional chaining in case no file is uploaded

    try {
        if (!filePath) {
            return res.status(400).json({ error: 'No document uploaded' });
        }

        const buffer = fs.readFileSync(filePath);
        const base64Doc = buffer.toString('base64');
        const mimeType = req.file.mimetype;

        const documentPart = {
            inlineData: {
                data: base64Doc,
                mimeType
            }
        };

        const result = await model([
            'Analyse this document:',
            documentPart
        ]);

        res.json({ output: result.text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};

module.exports = analyzeDocument;

