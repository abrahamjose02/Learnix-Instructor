import { IInstructorService } from "../interface/IInstructorService";


export class InstructorController{
    constructor(private service:IInstructorService){}

    registerInstructor = async(data:any)=>{
        try {
            const response = await this.service.userRegister(data);
            return response;
        } catch (e:any) {
            console.log(e)
        }
    }

    getInstructorByUserId = async(id:string) =>{
        try {
            const instructor = await this.service.getInstructorByUserId(id);
            if(instructor){
                return {success:true,instructor}
            }else{
                return {success:false,message:"Instructor not found"}
            }
        } catch (e:any) {
            console.log(e)
            return { success: false, error: e.message };
        }
    }
}