import { Instructor } from "../model/instructor.entities";

export interface IInstructorService{
    userRegister(data:Instructor):any
}