import mongoose from "mongoose";
import { IUser } from "../types/IUser";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    }, 

})

userSchema.index({ name: 1})

const User = mongoose.model("User", userSchema) 

const build = (attr: IUser) => {
    return new User(attr)
}

export { User }