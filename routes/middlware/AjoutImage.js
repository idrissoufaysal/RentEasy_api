const multer = require('multer');
const path = require('path');
const { MIMEType } = require('util');


const storage = multer.diskStorage({
  destination: '/images',
  filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage });

module.exports={upload}

