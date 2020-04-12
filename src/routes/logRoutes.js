const { Router } = require("express");

const router = Router();

const LogEntry = require("../models/LogEntry");
const upload = require("../services/file-upload");
const singleUpload = upload.single("image");

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
  console.log(req.body);
});

router.post("/image-upload", async (req, res) => {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({ error: err.message });
    }

    res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
