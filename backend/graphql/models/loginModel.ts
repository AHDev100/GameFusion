// import db from "../../db/db.js";
import User from "../../db/models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isUserAuth = async (userName: any, passWord: any) => {
    const user = await User.findOne({ where: { username: userName, password: passWord } });
    if (!user) {
      return { isAuth: false, token: "null"};
    }

    const jwtToken = jwt.sign({ id: user.dataValues.id }, `${process.env.JWT_SECRET}` , { expiresIn: '1h' });

    return {isAuth: true, token: jwtToken};
}; 

export default isUserAuth;