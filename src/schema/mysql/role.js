/**
 * 用户登录信息
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define(
    'Role',
    // 字段定义
    {
      roleName: {
        type: DataTypes.STRING,
        field: 'fole_name',
        allowNull: false,
        defaultValue: '',
        comment: '角色名称',
      },
    },
    {
      // 自定义表名
      freezeTableName: true,
      tableName: 'role',

      // 是否需要增加createdAt、updatedAt、deletedAt字段
      timestamps: true,
      comment: '角色表',
      paranoid: true,
    },
  );

  return Role;
};
