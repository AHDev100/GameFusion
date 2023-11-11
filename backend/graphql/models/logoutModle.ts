// logoutModel.js
import User from "../../db/models/User.js";
import { createClient } from 'redis';

const blacklistToken = async (token) => {
  const redisClient = createClient();
  await redisClient.connect();
  await redisClient.set('logged out', `${token}`);
  const result = await redisClient.get('logged out');
  return result; 
};

const blackList = async (username, password) => {
  const user = await User.findOne({ where: { username, password } });
  if (!user) {
    return false; // User not found, can't logout
  }

  // Blacklist the token
  const token = user.dataValues.token;
  blacklistToken(token).then(result => {
    console.log(result); // Log the result after the promise resolves
  });

  // Reset the user's token in the database
  user.set({
    token: ""
  })
  console.log(user);
  await user.save();

  return (user.dataValues.token === "") ? true : false; 
};

export default blackList;
