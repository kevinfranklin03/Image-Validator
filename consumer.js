import amqp from 'amqplib';
import { handleModeration } from './handleModeration.js';
import message from "aws-sdk/lib/maintenance_mode_message.js";
message.suppress = true;

connection()
async function connection() {

    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        await channel.assertQueue("imageLocation");
        async function consume() {
            await channel.consume('imageLocation',async img => {
                const input = JSON.parse(img.content.toString())
                handleModeration(input)
                channel.ack(img)
                console.log('message consumed')
            })   
        }
        setInterval( ()=> {
            // console.log('running')
            consume()
        }, 2000)
    }catch(err) {
        console.log(err)
    }
}

export default connection
