const router=require('express').Router();
const multer=require('multer');
const Authorization=require('../middleware/Authorization');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  const upload = multer({ storage:storage });
  
  
  router.post("/",Authorization,upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.log(req.body.name)
    }
  });

module.exports=router  