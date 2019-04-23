'use strict';
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      profilePicture: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      isBaned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      gender: {
        type:   Sequelize.ENUM,
        allowNull: false,
        values: ['man', 'woman']
      },
      birthDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true,
          isDate: true,
          isBefore: moment().subtract(18, 'year').format('YYYY-MM-DD')
        }
      },
      role: {
        type:   Sequelize.ENUM,
        values: ['user', 'moderator', 'admin'],
        defaultValue: 'user'
      },
      intention: {
        allowNull: false,
        type:   Sequelize.ENUM,
        values: ['sex', 'friendship', 'communication']
      },
      education: {
        type: Sequelize.ENUM,
        values: ['Basic', 'Technique', 'University', 'Post degree'],
        allowNull: false
      },
      civilStatus: {
        type: Sequelize.ENUM,
        values: ['Single', 'Married'],
        allowNull: false
      },
      religion: {
        type: Sequelize.ENUM,
        values: ['Christianity', 'Islam', 'Atheist', 'Hinduism', 'Buddhism', 'Sikhism'],
        allowNull: false
      },
      children: {
        type: Sequelize.ENUM,
        values: ['No', '1', '2', '3', '3+'],
        allowNull: false
      },
      piercings: {
        type: Sequelize.ENUM,
        values: ['No', 'Yes'],
        allowNull: false
      },
      smoker: {
        type: Sequelize.ENUM,
        values: ['No', 'Yes'],
        allowNull: false
      },
      tattoos: {
        type: Sequelize.ENUM,
        values: ['No', 'Yes'],
        allowNull: false
      },
      work: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Users');
  }
};
