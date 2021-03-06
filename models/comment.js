const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');
// update
class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            referenses: {
                model: 'post',
                key: 'id'
            }
        },
        comment_txt: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,255]
            }
        }
    },
    {
        
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'comment'
        });

module.exports = Comment;