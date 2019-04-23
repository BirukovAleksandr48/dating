'use strict';
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: 'Justin',
        lastName: 'Bieber',
        email: 'justin@gmail.com',
        gender: 'man',
        password: bcrypt.hashSync('1qaz2w3e4r', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date(),
        birthDate: moment().subtract(18, 'year').format("YYYY-MM-DD"),
        intention: 'friendship',
        education: 'Basic',
        role: 'admin',
        civilStatus: 'Single',
        religion: 'Christianity',
        children: 'No',
        piercings: 'Yes',
        smoker: 'No',
        tattoos: 'Yes',
        work: 'Programmer',
        city: 'Kiyev'
      },{
        firstName: 'Alex',
        lastName: 'Alexandr',
        email: 'aleksandr@gmail.com',
        gender: 'man',
        password: bcrypt.hashSync('1qaz2w3e4r', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date(),
        birthDate: moment("1997-08-02").format('YYYY-MM-DD'),
        intention: 'sex',
        education: 'Technique',
        role: 'moderator',
        civilStatus: 'Single',
        religion: 'Christianity',
        children: 'No',
        piercings: 'Yes',
        smoker: 'No',
        tattoos: 'Yes',
        work: 'Programmer',
        city: 'Kiyev'
      },{
        firstName: 'Olya',
        lastName: 'Olya',
        email: 'olya@gmail.com',
        gender: 'woman',
        password: bcrypt.hashSync('1qaz2w3e4r', bcrypt.genSaltSync(8)),
        createdAt: new Date(),
        updatedAt: new Date(),
        birthDate: moment("1997-08-03").format('YYYY-MM-DD'),
        intention: 'sex',
        education: 'University',
        role: 'user',
        civilStatus: 'Single',
        religion: 'Christianity',
        children: 'No',
        piercings: 'Yes',
        smoker: 'No',
        tattoos: 'Yes',
        work: 'Programmer',
        city: 'Kiyev'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
