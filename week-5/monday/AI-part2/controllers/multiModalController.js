// app.post('/analyze', upload.single('file'), async (req, res) => {
//     const filePath = req.file?.path;

//     try {
//         if (!filePath) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const buffer = fs.readFileSync(filePath);
//         const base64Data = buffer.toString('base64');
//         const mimeType = req.file.mimetype;

//         let prompt;
//         if (mimeType.startsWith('image/')) {
//             prompt = 'Analyze this image:';
//         } else if (mimeType.startsWith('audio/')) {
//             prompt = 'Transcribe or analyze this audio:';
//         } else if (
//             mimeType === 'application/pdf' ||
//             mimeType.startsWith('text/')
//         ) {
//             prompt = 'Analyze this document:';
//         } else {
//             return res.status(400).json({ error: 'Unsupported file type' });
//         }

//         const part = {
//             inlineData: {
//                 data: base64Data,
//                 mimeType
//             }
//         };

//         const result = await model([prompt, part]);
//         res.json({ output: result.text });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     } finally {
//         if (filePath && fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath);
//         }
//     }
// });
