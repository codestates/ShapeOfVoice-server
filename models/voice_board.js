'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class voice_board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      voice_board.belongsTo(models.voice, {
        foreignKey: 'voiceId',
      });
      voice_board.belongsTo(models.board, {
        foreignKey: 'boardId',
      });
    }
  }
  voice_board.init(
    {
      voiceId: DataTypes.INTEGER,
      boardId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'voice_board',
    }
  );
  return voice_board;
};
