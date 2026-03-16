const fs = require('fs')
const path = require('path')
const multer = require('multer')

const uploadPath = path.join(__dirname, '../uploads')

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

const allowedExtensions = [
  '.jpeg','.jpg','.png','.webp',
  '.mp4','.mov','.avi'
]

const fileFilter = (req,file,cb)=>{

  const ext = path.extname(file.originalname).toLowerCase()

  const validExt = allowedExtensions.includes(ext)

  const validMime =
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/')

  if(validExt && validMime){
    cb(null,true)
  }else{
    cb(new Error("Only images and videos allowed"))
  }

}

const storage = multer.diskStorage({

  destination:(req,file,cb)=>{
    cb(null,uploadPath)
  },

  filename:(req,file,cb)=>{
    const unique =
      Date.now()+'-'+Math.round(Math.random()*1e9)

    cb(null,unique+path.extname(file.originalname))
  }

})

module.exports = multer({
  storage,
  fileFilter,
  limits:{
    fileSize:100*1024*1024
  }
})