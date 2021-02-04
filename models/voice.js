'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class voice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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