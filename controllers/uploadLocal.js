import { uploadToS3 } from '../middleware/uploadToS3.js';;

// upload from system

export const uploadLocal = async(req, res) => {
    const originalName = req.file.originalname
    if(req.file) {
        uploadToS3(req.file.buffer, originalName).then((result)=>{
            return res.json({
                msg: "upload Successful",
                imageUrl: result.Location
            })
        }).catch((err) => {
            console.log(err)
        })
    }
}  