
import { uploadToS3 } from '../middleware/uploadToS3.js';;

export const uploadLocal = async(req, res) => {
    if(req.file) {
        uploadToS3(req.file.buffer).then((result)=>{
            return res.json({
                msg: "upload Successful",
                imageUrl: result.Location
            })
        }).catch((err) => {
            console.log(err)
        })
    
    }
  
    //     setTimeout(()=> {
    //     console.log('            ')
    //     connection()
    // },2000)

}  