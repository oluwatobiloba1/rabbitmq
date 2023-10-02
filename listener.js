const express = require('express');

const amqp = require('amqplib');
require('./server/db')
const app = express();
const transcriptHandler = require('./transcript.service');


async function connect(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("transcriptions");

        channel.consume("transcriptions", async (message) => {
            console.log(message.content.toString());
            const input = JSON.parse(message.content.toString());
            console.log(input)
        //     const transcript = await transcriptHandler(input.file)
        //     if(input.file){
        //         channel.ack(message);
        //     }

        //    try {
        //        await Video.findByIdAndUpdate(id, {transcript: transcript}, {new: true});
        //    } catch (error) {
        //         console.error(error);
        //    }

        });
    }
    catch(ex){
        console.error(ex);
    }
}


app.get('/transcript', (req, res) => {
    connect();
    res.send('message sent');
});

app.listen(3002, () => {console.log('listening on port 3002')});