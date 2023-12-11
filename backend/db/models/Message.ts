import { DataTypes } from "sequelize";
import db from "../db.js";

const Message = db.define('Message', {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    channelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
});
  
export default Message;