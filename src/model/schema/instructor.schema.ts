
import mongoose, { Model, Schema } from "mongoose";
import 'dotenv/config';
import { Instructor } from "../instructor.entities";

const InstructorSchema:Schema<Instructor> = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    institution:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    yearOfCompletion:{
        type:String,
        required:true
    },
    certificationName:{
        type:String,
        requried:true
    },
    createdCourses:[
        {
            courseId:String
        }
    ],
    certificationDate:{
        type:Date,
        required:true
    },
    certificate:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
});


const InstructorModel:Model<Instructor> = mongoose.model('Instructor',InstructorSchema);

export default InstructorModel