
# IMAGE-VALIDATOR

Upload images to Amazon S3 from your local system or generate random images using the unsplash API and then upload it to the S3 bucket. By any chance if the image is found to be explicit it will be deleted from the bucket. The images are sent to the message queue and acknowledged before uploading it to the bucket.


## Documentation

 - [How to upload images to S3 using NodeJS](https://plainenglish.io/blog/file-upload-to-amazon-s3-using-node-js-42757c6a39e9)
 - [Get S3 access](https://www.ibm.com/docs/vi/atcm/1.3.1?topic=cir-creating-iam-role-s3-access-in-same-aws-account)
 - [AWS Rekognition Guide](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/rekognition.html)


## Tech Stack

**Server:** `Node`, `Express`, `aws-sdk`, `multer`


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

`AWS_REGION`

`AWS_BUCKET`

`CLIENT_ID`

`CONFIDENCE_VALUE`
