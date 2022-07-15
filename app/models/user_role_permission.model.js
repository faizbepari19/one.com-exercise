module.exports = (sequelize, Sequelize) => {
    const UserRolePermission = sequelize.define("user_role_permission", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_role_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'user_roles',
                key: 'id'
            }
        },
        permission_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'permissions',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1
        }
    });


    /**
     * 
     * @param {*} user_id - id of the logged in user
     * @param {*} method - string
     * @returns allowed permissions
     */
    UserRolePermission.checkAccess = async (user_id, method) => {
        const query = `
        SELECT p.name AS permission_name
        FROM users u
        INNER JOIN user_roles ur ON u.role = ur.id
        INNER JOIN user_role_permissions up ON up.user_role_id = ur.id AND up.status = 1
        INNER JOIN permissions p ON up.permission_id = p.id
        WHERE u.id = ? AND lower(p.name) = lower(?)
        `

        return sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: [ user_id, method]
        })
    }

    return UserRolePermission;
};
