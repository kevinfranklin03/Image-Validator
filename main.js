import express from 'express'
import uploadRoute from './routes/upload.js'
import message from "aws-sdk/lib/maintenance_mode_message.js";
message.suppress = true;


const app = express()
const PORT = 3000

// Routes (upload-local, upload-random)
app.use(uploadRoute)


// Server

app.listen(PORT, () => console.log(`listening on port ${PORT}`));