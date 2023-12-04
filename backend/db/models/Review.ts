import { DataTypes } from 'sequelize';
import db from '../db.js';
import User from './User.js';

const Review = db.define('Review', {
    reviewerID: {
        type: DataTypes.INTEGER, 
        references : {
            model: User, 
            key: 'id',
        }, 
        allowNull: false,
    }, 
    review: {
        type: DataTypes.STRING, 
        allowNull: false,
    }, 
    rating : {
        type: DataTypes.INTEGER,
        allowNull: false, 
    }, 
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    likes: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    }, 
    dislikes: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    }
});

User.hasMany(Review, { foreignKey: 'reviewerId' });
Review.belongsTo(User, { foreignKey: 'reviewerId' });

export default Review;