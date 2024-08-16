
import 'dotenv/config'

export default {
    rabbitMQ:{
        url:String(process.env.RabbitMQ_link),
        queues:{
            instructorQueue:'instructor_queue',
            
        },
        heartbeat:10
    },
}