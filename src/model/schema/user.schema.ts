import mongoose,{Document, Model, Schema} from 'mongoose';
import 'dotenv/config'


const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export enum UserRole {
    User = "user",
    Admin = "admin",
    Instructor = "instructor"
}

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    avatar: {
        public_id: string;
        url: string;
    },
    role: UserRole;
    isVerified: boolean;
    courses: Array<{courseId: string}>;
    comparePassword: (password: string) => Promise<boolean>;
    SignAccessToken: () => string;
    SignRefreshToken: () => string;
}

const userSchema: Schema<IUser> =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your first name"]
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value: string){
                return emailRegex.test(value);
            },
            message: "Please enter a valid email."
        },
        unique: true
    },

    password: {
        type: String,
    },

    avatar: {
        type: String,
    },

    role: {
        type: String,
        default: UserRole.User,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    courses: [
        {
            courseId: String,
        }
    ]

},
{
timestamps: true
}
);


const UserModel: Model<IUser> = mongoose.model(
    "User",
    userSchema
  );
export default UserModel;