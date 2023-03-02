import amqp from 'amqplib';
// Publisher

async function connect(img) {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        await channel.assertQueue("imageLocation")
        channel.sendToQueue("imageLocation", Buffer.from(JSON.stringify(img)))
        console.log("Added To Queue")
        
    }   catch(err) {
        console.log(err)
    }
}

export default connect;

  