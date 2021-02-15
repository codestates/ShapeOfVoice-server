'use strict';
// voice Model
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class voice extends Model {
    static associate(models) {
      voice.belongsTo(models.user, {
        foreignKey: 'userId',
      });

      voice.belongsToMany(models.board, {
        through: 'voice_board',
      });
    }
  }
  voice.init(
    {
      thumbnail: DataTypes.TEXT('long'),
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'voice',
    }
  );
  return voice;
};
