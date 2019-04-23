'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Comments', {
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
            photoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: "CASCADE",
                references: {
                    model: 'Photos',
                    key: 'id'
                }
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            isEdited: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
        return queryInterface.dropTable('Comments');
    }
};
