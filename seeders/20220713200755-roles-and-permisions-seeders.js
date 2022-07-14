'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('user_role', [
        {
          name: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Seller',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Supporter',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Customer',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);

      await queryInterface.bulkInsert('permission', [
        {
          name: 'create',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'update',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'delete',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'fetch',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
    } catch (err) {
      await t.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
