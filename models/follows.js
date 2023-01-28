'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Follows.belongsTo(models.User, {
        foreignKey: "followerId",
        as:  "follower"
      });
      Follows.belongsTo(models.User, {
        foreignKey: "followedId",
        as: "followed"
      });
    }
  }
  Follows.init({
    followerId: DataTypes.INTEGER,
    followedId: DataTypes.INTEGER,
    isFollow: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Follows',
  });
  return Follows;
};