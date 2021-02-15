'use strict';
// user Model
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.voice, {
        foreignKey: 'userId',
      });
      user.hasMany(models.board, {
        foreignKey: 'userId',
      });
    }
  }
  user.init(
    {
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_signed_up: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
