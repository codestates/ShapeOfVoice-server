'use strict';
// board Model

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    static associate(models) {
      board.belongsToMany(models.voice, {
        through: 'voice_board',
      });
      board.belongsToMany(models.user, {
        through: 'userId',
      });
    }
  }
  board.init(
    {
      title: DataTypes.STRING,
      like_count: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'board',
    }
  );
  return board;
};
