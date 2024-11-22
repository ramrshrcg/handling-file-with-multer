const express = require("express");
const fs = require("fs");
const path = require("path");
const { storage, multer } = require("./middleware/multerconfig");

const port = 3000;
const app = express();
const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/uploads", express.static(path.join(__dirname, "storage")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "this is a home page by route / ",
  });
});

app.post("/upload", upload.single("image"),  (req, res) => {
  const image = req.file.filename;

  if (image != null) {
    res.status(200).json({
      message: `image uploaded successfully ${image}`,
    });
  } else {
    res.status(400).json({
      message: "image not uploaded",
    });
  }
});

app.delete('/delete/:fileName', (req, res) => {
    const fileName = req.params.fileName;
      const filePath = path.join(__dirname, 'storage', fileName);
  
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.send(`File "${fileName}" has been deleted.`);
    } else {
      res.status(404).send(`File "${fileName}" not found.`);
    }
  });

app.get("/view", (req, res) => {
  const uploadDirectory = path.join(__dirname, "storage");
  fs.readdir(uploadDirectory, (err, files) => {
    if (err) {
      res.status(500).json({
        message: "error in reading files",
      });
    } else {
      res.status(200).json(files);
    }
  });
});

app.listen(port, () =>{
  console.log("server is started at 3000");
});
