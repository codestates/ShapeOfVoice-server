'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_board_like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_board_like.belongsTo(models.user, {
        foreignKey: 'userId',
      });
      user_board_like.belongsTo(models.board, {
        foreignKey: 'boardId',
      });
    }
  }
  user_board_like.init(
    {
      userId: DataTypes.INTEGER,
      boardId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user_board_like',
    }
  );
  return user_board_like;
};
