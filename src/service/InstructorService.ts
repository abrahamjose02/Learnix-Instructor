import { IInstructorRepository } from "../interface/IInstructorRepository";
import { IInstructorService } from "../interface/IInstructorService";
import { S3Params } from "../interface/IServiceInterface";
import { Instructor } from "../model/instructor.entities";
import {s3} from '../config/s3Config';
import crypto from 'crypto';
import { PutObjectCommand } from "@aws-sdk/client-s3";

export class InstructorService implements IInstructorService{
    constructor(private instructorRepository:IInstructorRepository){}

     async userRegister(data: Instructor) {
        const {
            buffer,
            userId,
            degree,
            yearOfCompletion,
            institution,
            subject,
            certificateDate,
            certificateName,
            fieldName,
            mimeType,
          } = data;

          const randomName = (bytes = 32)=>
            crypto.randomBytes(bytes).toString("hex");
          const bucketName = process.env.S3_BUCKET_NAME || ""
          const imageName = `learnix-certificate/${randomName()}`

          const params:S3Params = {
            Bucket:bucketName,
            Key:imageName,
            Body:Buffer.from(buffer?.data || ""),
            ContentType:mimeType
          }

          try {
            const command = new PutObjectCommand(params);
            await s3.send(command);
            console.log("File uploaded successfully.");
          } catch (error) {
            console.error("Error uploading file to S3:", error);
            throw new Error("S3 upload failed");
          }
      

          const url = `https://instructor-data-bucket.s3.ap-south-1.amazonaws.com/${imageName}`

          const userData = {
            buffer,
            userId,
            degree,
            yearOfCompletion,
            institution,
            subject,
            certificateDate,
            certificateName,
            fieldName,
            mimeType,
            certificate:url
          };

          console.log(userData);

          
          const instructor = await this.instructorRepository.register(userData);
    if (instructor) {
      
      return instructor;
    } else {
      return "error adding instructor";
  }
 }
 async getInstructorByUserId(userId:string):Promise<Instructor | null>{
  return await this.instructorRepository.findByUserId(userId)
 }
}