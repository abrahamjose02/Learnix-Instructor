
import 'dotenv/config'
import mongoose from 'mongoose'

const connectDB = async()=>{
    try {
        const url = `${process.env.MONGO_URI}/${process.env.MONGO_DATA}`
        const conn = await mongoose.connect(url)
        console.log(`InstructorDB Connected : ${conn.connection.host}`)
    } catch (e:any) {
        console.log(e)
        process.exit(1)
    }   
}

export {connectDB}