
import UserModel,{IUser} from "../model/schema/user.schema";
import { IUserRepository } from "../interface/IUserRepository";


export class UserRepository implements IUserRepository{
    async changeRole(userId: string) {
        const user = await UserModel.findByIdAndUpdate(userId,{role:"instructor"}).select("-password")
        return user;
    }
}
