import { awsConfig } from "./middleware/awsConfig.js";
import AWS from 'aws-sdk'
AWS.config.update(awsConfig);
import dotenv from 'dotenv'
dotenv.config()
const s3 = new AWS.S3();

// Moderation Part

export  const  handleModeration = (inputValue) => {
  const photo  =  inputValue

  const moderation = new AWS.Rekognition();
  const params = {
    Image: {
      S3Object: {
          Bucket: process.env.AWS_BUCKET,
          Name: photo
      },
    }
  }
  
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET,
    Key: photo,
  }
console.log(deleteParams)
  moderation.detectModerationLabels(params, function(err, response) {
    if(response == null) {
      console.log(`No explicit content found in the image ${inputValue}`) 
    }else {
      const key = Object.keys(response.ModerationLabels)
      if(key.length < 1) {
      console.log(`No explicit content found in the image ${inputValue}`) 
      }else {
      const ConfidenceValue = response.ModerationLabels[0].Confidence

        // Delete From S3 Part
        if(ConfidenceValue > process.env.CONFIDENCE_VALUE) {
          s3.deleteObject(deleteParams, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log('Deleted from the bucket')
            }
          });
        }
      }
    } 
  })
}
