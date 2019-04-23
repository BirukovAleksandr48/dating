'use strict';

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isEdited: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    });

    Comment.associate = function (models) {
        Comment.belongsTo(
            models.User,
            { foreignKey: 'userId', targetKey: 'id' },
            { onDelete: "CASCADE" }
        );
        Comment.belongsTo(
            models.Photo,
            { foreignKey: 'photoId', targetKey: 'id' },
            { onDelete: "CASCADE" }
        );
    };

    return Comment;
};