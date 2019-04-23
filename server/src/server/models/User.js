'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isBaned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    gender: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['man', 'woman']
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
        isBefore: moment().subtract(18, 'year').format('YYYY-MM-DD')
      }
    },
    intention: {
      allowNull: false,
      type:   DataTypes.ENUM,
      values: ['sex', 'friendship', 'communication']
    },
    role: {
      type:   DataTypes.ENUM,
      values: ['user', 'moderator', 'admin'],
      defaultValue: 'user'
    },
    education: {
      type: DataTypes.ENUM,
      values: ['Basic', 'Technique', 'University', 'Post degree'],
      allowNull: false
    },
    civilStatus: {
      type: DataTypes.ENUM,
      values: ['Single', 'Married'],
      allowNull: false
    },
    religion: {
      type: DataTypes.ENUM,
      values: ['Christianity', 'Islam', 'Atheist', 'Hinduism', 'Buddhism', 'Sikhism'],
      allowNull: false
    },
    children: {
      type: DataTypes.ENUM,
      values: ['No', '1', '2', '3', '3+'],
      allowNull: false
    },
    piercings: {
      type: DataTypes.ENUM,
      values: ['No', 'Yes'],
      allowNull: false
    },
    smoker: {
      type: DataTypes.ENUM,
      values: ['No', 'Yes'],
      allowNull: false
    },
    tattoos: {
      type: DataTypes.ENUM,
      values: ['No', 'Yes'],
      allowNull: false
    },
    work: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
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

  return User;
};
