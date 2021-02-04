'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      board.belongsToMany(models.voice, {
        through: 'voice_board',
      });
    }
  }
  board.init(
    {
      title: DataTypes.STRING,
      like_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'board',
    }
  );
  return board;
};
