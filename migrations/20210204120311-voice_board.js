'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('voice_board', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      voiceId: {
        type: Sequelize.INTEGER,
        references: { model: 'voices', key: 'id' },
        onDelete: 'CASCADE',
      },
      boardId: {
        type: Sequelize.INTEGER,
        references: { model: 'boards', key: 'id' },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('voice_board');
  },
};
