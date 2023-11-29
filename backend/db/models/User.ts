// user.js
import { DataTypes } from 'sequelize';
import db from '../db.js';

const User = db.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING 
  }, 
  pfp: {
    type: DataTypes.STRING
  }
});

export default User;
