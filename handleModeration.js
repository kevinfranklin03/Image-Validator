import { awsConfig } from "./middleware/awsConfig.js";
import AWS from 'aws-sdk'
const S3 = new AWS.S3(awsConfig);
AWS.config.update(awsConfig);
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
    Key: photo
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
        if(ConfidenceValue > 90) {
          S3.deleteObject(deleteParams, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else  
            console.log('Deleted from the bucket')
          })         // successful response
        }else {
          console.log(err)
        }
      }
    } 
  })
}
// handleModeration()