'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Adverts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: "CASCADE",
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            title: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            color: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Adverts');
    }
};
