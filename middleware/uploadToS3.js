import AWS from 'aws-sdk'
import { awsConfig } from "../middleware/awsConfig.js";
import connect from '../middleware/rabbitMQ_config.js';
const S3 = new AWS.S3(awsConfig);

// upload to S3 Bucket

export const uploadToS3 = (fileData) => {

    return new Promise((resolve, reject) =>   {
        const params = {
            Bucket: 'image-validator',
            Key: `${Date.now().toString()}.jpg`, // generate random key value
            Body: fileData
        }
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
