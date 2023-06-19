import multer from "multer";

const storage = multer.diskStorage({
  destination: 'uploads/', 
  filename: (req, file, cb) => {

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + '-' + uniqueSuffix;
    cb(null, filename);
  }
});

const upload = multer({ storage });
export default upload;
