import { IInstructorRepository } from "../interface/IInstructorRepository";
import { Instructor } from "../model/instructor.entities";
import InstructorModel from "../model/schema/instructor.schema";



export class InstructorRepostiory implements IInstructorRepository{
    async register(data: Instructor) {
        return  await InstructorModel.create(data)
    }
    async findByUserId(userId:string):Promise<Instructor | null>{
        return await InstructorModel.findOne({userId}).exec()
    }
}