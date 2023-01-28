const { isEmail } = require("validator");
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Posts, {
        foreignKey: "userId"
      });
      User.hasMany(models.Comments, {
        foreignKey: "userId"
      })
      User.hasMany(models.Follows, { 
        foreignKey: "followerId",
        foreignKey: "followedId"
      });
      User.hasMany(models.Products, {
        foreignKey: "userId"
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};