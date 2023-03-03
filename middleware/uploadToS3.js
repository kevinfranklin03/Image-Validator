import AWS from 'aws-sdk'
import { awsConfig } from "../middleware/awsConfig.js";
import connect from './producer.js';
const S3 = new AWS.S3(awsConfig);

// upload to S3 Bucket

const randomNumber = Math.floor(1000 + Math.random() * 9000);


export const uploadToS3 = (fileData, name) => {
    let keyValue = '';
    if(name === undefined) {
        keyValue = `${Date.now().toString()}.jpg`
    } else {
        const fileName = name.split('.');
        const imageName = fileName[0]
        const extension = fileName[1]
       keyValue = `${imageName}${randomNumber}.${extension}`
    }
    
    return new Promise((resolve, reject) =>   {
        const params = {
            Bucket: 'image-validator',
            Key: keyValue, // generate random key value
            Body: fileData
        }
        console.log('                    ')
        console.log(`Image :${params.Key}`)
        S3.upload(params, (err, data) => {
            if(err) {
                console.log(err)
                reject(err)
            }
            connect(params.Key)
            console.log('uploaded to bucket')
            return resolve(data)
        })
    })

}
