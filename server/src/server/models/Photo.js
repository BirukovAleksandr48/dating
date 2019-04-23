'use strict';

module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('Photo', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        photoName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Photo.associate = function (models) {
        Photo.belongsTo(
            models.User,
            { foreignKey: 'userId', targetKey: 'id' },
            { onDelete: "CASCADE" }
        );
    };

    return Photo;
};
