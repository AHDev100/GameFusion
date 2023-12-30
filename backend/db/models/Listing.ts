import { DataTypes } from "sequelize";
import db from "../db.js";

export const Listing = db.define('Listing', {
    gameID: {
        type: DataTypes.INTEGER || DataTypes.STRING
    }, 
    status: {
        type: DataTypes.STRING
    }, 
    seller: {
        type: DataTypes.INTEGER
    },
    listed_at: {
        type: DataTypes.STRING
    }, 
    sold_at: {
        type: DataTypes.STRING, 
        allowNull: true
    }
}); 