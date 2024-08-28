import mongoose, { Model, Schema } from "mongoose";
import "dotenv/config";
import { Instructor } from "../instructor.entities";

const InstructorSchema: Schema<Instructor> = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    institution: {
    type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    yearOfCompletion: {
      type: String,
      required: true,
    },
    certificateName: {
      type: String,
      required: true,
    },
    createdCourses: [
      {
        courseId: String,
      },
    ],
    certificateDate: {
      type: Date,
      required: true,
    },
    certificate: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const InstructorModel: Model<Instructor> = mongoose.model(
  "Instructor",
  InstructorSchema
);
export default InstructorModel;