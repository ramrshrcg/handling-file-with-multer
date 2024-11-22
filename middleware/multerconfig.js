const multer= require('multer')
//code for multerdisk storage for file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./storage")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
})
module.exports= {storage,multer};

