const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  file_id: { type: String, unique: true },
  filename: String,
  path: String,
  status: {
    type: String,
    enum: ["uploading", "processing", "ready", "failed"],
    default: "uploading",
  },
  progress: { type: Number, default: 0 },
  parsedContent: { type: mongoose.Schema.Types.Mixed },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);
