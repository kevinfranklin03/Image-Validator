import amqp from 'amqplib';
import { handleModeration } from './handleModeration.js';
connection()
async function connection() {

    try {
        // console.log('consumer started')
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        await channel.assertQueue("imageLocation");
        async function consume() {
            // console.log('function started')
            await channel.consume('imageLocation',async img => {
                const input = JSON.parse(img.content.toString())
                console.log('message consumed')
                await handleModeration(input)
                channel.ack(img)
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
