'use strict';

module.exports = (sequelize, DataTypes) => {
    const Advert = sequelize.define('Advert', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: "CASCADE",
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        color: {
            type: DataTypes.TEXT,
            allowNull: false
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

    Advert.associate = function (models) {
        Advert.belongsTo(
            models.User,
            { foreignKey: 'userId', targetKey: 'id' },
            { onDelete: "CASCADE" }
        );
    };

    return Advert;
};
