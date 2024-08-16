
import 'dotenv/config'
import mongoose from 'mongoose'

const connectDB = async()=>{
    try {
        const url = `${process.env.MONGO_URI}/${process.env.MONGODB_NAME}`
        const conn = await mongoose.connect(url)
        console.log(`NotificationDB Connected : ${conn.connection.host}`)
    } catch (e:any) {
        console.log(e)
        process.exit(1)
    }   
}

export {connectDB}