<<<<<<< HEAD
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});
const User = mongoose.model("User", userSchema);
export default User;
=======
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' }
    }
);
    const User = mongoose.model('User', userSchema);
    export default User;
>>>>>>> ad0d333fe5588494675f5bfd83d832d84ad31c66
