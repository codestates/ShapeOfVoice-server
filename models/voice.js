'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class voice extends Model {
    static associate(models) {
      voice.belongsToMany(models.board, {
        through: 'voice_board',
        foreignKey: 'voiceId'
      })
      voice.belongsTo(models.user, {
        foreignKey: 'userId'
      })
    }
  };
  voice.init({
    thumbnail: DataTypes.STRING,
    records: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'voice',
  });
  return voice;
};