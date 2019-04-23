'use strict';

module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Token.associate = function (models) {
        Token.belongsTo(
            models.User,
            {foreignKey: 'userId', targetKey: 'id'},
            { onDelete: "CASCADE" }
        );
    };

    return Token;
};
