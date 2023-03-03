import { awsConfig } from "./middleware/awsConfig.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import AWS from 'aws-sdk'
AWS.config.update(awsConfig);
import dotenv from 'dotenv'
dotenv.config()

// Moderation Part

export  const  handleModeration = async (inputValue) => {
  const bucket = 'image-validator' 
  const photo  =  inputValue

  const moderation = new AWS.Rekognition();
  const params = {
    Image: {
      S3Object: {
          Bucket: bucket,
          Name: photo
      },
    }
  }
  
  const deleteParams = {
    Bucket: bucket,
    Key: photo,
  }

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
              new DeleteObjectCommand(deleteParams);
              console.log("image Deleted Successfully from the bucket")
        }else {
          console.log(err)
        }
      }
    } 
  })
}