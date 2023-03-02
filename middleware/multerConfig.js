
import multer from 'multer'

const upload = multer({
    limit: 1024 * 1024 * 20, // 5mb max size
    fileFilter: function(req, file, done) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
            done(null, true)
        } else {
            done('Image Type is not supported', false)
        }
    }
})

export default upload;