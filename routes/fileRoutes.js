const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  uploadFile,
  getProgress,
  getFileContent,
  listFiles,
  deleteFile,
} = require("../controllers/fileController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/files", upload.single("file"), uploadFile);
router.get("/files/:file_id/progress", getProgress);
router.get("/files/:file_id", getFileContent);
router.get("/files", listFiles);
router.delete("/files/:file_id", deleteFile);

module.exports = router;
