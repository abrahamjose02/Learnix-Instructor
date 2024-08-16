import { IInstructorRepository } from "../interface/IInstructorRepository";
import { IInstructorService } from "../interface/IInstructorService";
import { S3Params } from "../interface/IServiceInterface";
import { IUserRepository } from "../interface/IUserRepository";
import { Instructor } from "../model/instructor.entities";
import {s3} from '../config/s3Config';
import crypto from 'crypto';
import { PutObjectCommand } from "@aws-sdk/client-s3";

export class InstructorService implements IInstructorService{
    constructor(private instructorRepository:IInstructorRepository,private userRepository:IUserRepository){}

     async userRegister(data: Instructor) {
        const {
            buffer,
            userId,
            degree,
            yearOfCompletion,
            institution,
            subject,
            certificationDate,
            certificationName,
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

          const command = new PutObjectCommand(params)
          await s3.send(command)

          const url = `https://instructor-data-bucket.s3.ap-south-1.amazonaws.com/${imageName}`

          const userData = {
            buffer,
            userId,
            degree,
            yearOfCompletion,
            institution,
            subject,
            certificationDate,
            certificationName,
            fieldName,
            mimeType,
            certificate:url
          };

          const instructor = await this.instructorRepository.register(userData);
          // if(instructor){
          //   const updateRole = await this.userRepository.changeRole(userId);
          //   const result = Buffer.from(JSON.stringify(updateRole));
          //   return result;
          // }
          if(instructor){
            return instructor;
          }
          else{
            return "error adding instructor";
          }
    }
}