import { DataTypes } from "sequelize";
import db from "../db.js";

export const Channel = db.define('Channel', {
    channelName: {
        type: DataTypes.STRING, 
        allowNull: false,
    }
}); 