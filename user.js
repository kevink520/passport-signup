const Sequelize = require('sequelize');
const sequelize = require('./database');
const bcrypt = require('bcrypt');

class User extends Sequelize.Model {}

User.init({
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: false,
  hooks: {
    beforeCreate: async user => {
      const saltRounds = 10;
      const salt = bcrypt.genSalt(saltRounds);
      user.password = await bcrypt.hash(user.password, salt);
    },
  },
});

module.exports = User;

