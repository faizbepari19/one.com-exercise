'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('user_roles', [
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
      ], { transaction: t });

      await queryInterface.bulkInsert('permissions', [
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
      ], { transaction: t });

      let all_roles = await queryInterface.sequelize.query(`SELECT id, name from user_roles where status = 1`, {
        type: queryInterface.sequelize.QueryTypes.SELECT,
        raw: true,
        transaction: t
      });

      for (let role of all_roles) {
        if (role.name == 'Admin') {
          await queryInterface.sequelize.query(`INSERT INTO user_role_permissions (user_role_id, permission_id, createdAt, updatedAt) SELECT ${role.id}, id, now(), now() FROM permissions`, {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            raw: true,
            transaction: t
          });

        } else if (role.name == 'Seller') {
          await queryInterface.sequelize.query(`INSERT INTO user_role_permissions (user_role_id, permission_id, createdAt, updatedAt) SELECT ${role.id}, id, now(), now() FROM permissions WHERE name != 'delete'`, {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            raw: true,
            transaction: t
          });

        } else if (role.name == 'Supporter') {

          await queryInterface.sequelize.query(`INSERT INTO user_role_permissions (user_role_id, permission_id, createdAt, updatedAt) SELECT ${role.id}, id, now(), now() FROM permissions WHERE name IN ('delete', 'fetch')`, {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            raw: true,
            transaction: t
          });
        } else if (role.name == 'Customer') {
          await queryInterface.sequelize.query(`INSERT INTO user_role_permissions (user_role_id, permission_id, createdAt, updatedAt) SELECT ${role.id}, id , now(), now()FROM permissions WHERE name = 'fetch'`, {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            raw: true,
            transaction: t
          });
        }
      }

      await t.commit();

    } catch (err) {
      console.log(err)
      await t.rollback();
      throw err;
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