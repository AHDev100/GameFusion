import { DataTypes } from "sequelize";
import db from "../db.js";

const UserChannel = db.define('UserChannel', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    channelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
});

export default UserChannel as any;