// user.js
import { DataTypes } from 'sequelize';
import db from '../db.js';

const User = db.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING
  },
  token: {
    type: DataTypes.STRING // You might want to adjust the data type or length based on your requirements
  }
});

export default User;
