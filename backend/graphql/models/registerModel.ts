import User from "../../db/models/User.js";

const addUser = async (newUsername : String, newPassword : String) => {
    const newUser = await User.create({
        username: newUsername, 
        password: newPassword,
        token: "",
        pfp: "",
    }); 
    await newUser.save();
    const user = await User.findOne({ where: { username: newUsername, password: newPassword } });
    return user ? true : false;
}; 

export default addUser;