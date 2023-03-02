import dotenv from 'dotenv'
import axios from 'axios'
import { uploadToS3 } from '../middleware/uploadToS3.js';
import connection from '../consumer.js';

dotenv.config()

// Generate random images using unsplash API

const endpoint = `https://api.unsplash.com/photos/random/?client_id=${process.env.CLIENT_ID}`;
    
let random = '';

async function getResponse() {

    const response = await fetch(endpoint)
    await response.json().then((jsonData) => {
        random = jsonData.urls.regular;
    }) 
    return random

}

export const uploadRandom = async (req, res) => {
  
  const urlValue = await getResponse();
  const url = urlValue
  axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
  })
  .then(function (response) {
    const arrayBuffer = response.data;
    uploadToS3(arrayBuffer).then((result)=>{
      return res.json({
        msg: "upload Successful",
        imageUrl: result.Location
      })
    }).catch((err) => {
        console.log(err)
      })
  })
 
  
  // setTimeout(()=> {
  //     console.log('            ')
  //     connection()
  //   }, 2000)
}  