const File = require("../models/File");
const { v4: uuidv4 } = require("uuid");
const parseFile = require("../utils/parseFile");

exports.uploadFile = async (req, res) => {
  try {
    const file_id = uuidv4();
    const file = new File({
      file_id,
      filename: req.file.originalname,
      path: req.file.path,
      status: "uploading",
      progress: 10,
    });
    await file.save();

    // Simulate async parsing
    setTimeout(async () => {
      try {
        await File.findOneAndUpdate(
          { file_id },
          { status: "processing", progress: 50 }
        );

        const parsedContent = await parseFile(
          req.file.path,
          req.file.originalname
        );

        await File.findOneAndUpdate(
          { file_id },
          { status: "ready", progress: 100, parsedContent }
        );
      } catch (err) {
        await File.findOneAndUpdate({ file_id }, { status: "failed" });
      }
    }, 3000);

    res.json({ file_id, message: "File uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "File upload failed" });
  }
};

exports.getProgress = async (req, res) => {
  const file = await File.findOne({ file_id: req.params.file_id });
  if (!file) return res.status(404).json({ error: "File not found" });
  res.json({
    file_id: file.file_id,
    status: file.status,
    progress: file.progress,
  });
};

exports.getFileContent = async (req, res) => {
  const file = await File.findOne({ file_id: req.params.file_id });
  if (!file) return res.status(404).json({ error: "File not found" });

  if (file.status !== "ready") {
    return res.json({
      message: "File upload or processing in progress. Please try again later.",
    });
  }

  res.json({ file_id: file.file_id, content: file.parsedContent });
};

exports.listFiles = async (req, res) => {
  const files = await File.find().select("-parsedContent");
  res.json(files);
};

exports.deleteFile = async (req, res) => {
  const file = await File.findOneAndDelete({ file_id: req.params.file_id });
  if (!file) return res.status(404).json({ error: "File not found" });
  res.json({ message: "File deleted successfully" });
};
