// import db from "../../db/db.js";
import User from "../../db/models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const isUserAuth = async (userName: any, passWord: any) => {
    const user = await User.findOne({ where: { username: userName, password: passWord } });
    if (!user) {
      return false;
    }

    return true;
}; 

export default isUserAuth;