import { Instructor } from "../model/instructor.entities";

export interface IInstructorRepository{
    register(data:Instructor):any;
}