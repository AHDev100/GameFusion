// loginModel.js
import User from "../../db/models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const isUserAuth = async (userName, passWord) => {
  const user = await User.findOne({ where: { username: userName, password: passWord } });
  if (!user) {
    return { isAuth: false, token: null };
  }

  const jwtToken = jwt.sign({ id: user.dataValues.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  user.set({
    token: jwtToken
  })
  console.log(user);
  await user.save();

  const status = { isAuth: true, token: jwtToken };
  return status;
};

export default isUserAuth;
