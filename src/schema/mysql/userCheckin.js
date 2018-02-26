/**
 * 用户登录信息
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = function (sequelize, DataTypes) {
  const userCheckin = sequelize.define(
    'UserCheckin',
    // 字段定义
    {
      userId: {
        type: DataTypes.BIGINT(11),
        field: 'user_id',
        allowNull: false,
        unique: true,
        // references: {
        //   model: 'User',
        //   key: 'id'
        // },
        comment: '用户id',
      },
      loginIp: {
        type: DataTypes.STRING,
        field: 'login_ip',
        allowNull: false,
        defaultValue: '',
        validate: {
          isIP: true,
        },
        comment: '登录IP',
      },
    },
    {
      // 自定义表名
      freezeTableName: true,
      tableName: 'userCheckin',

      // 是否需要增加createdAt、updatedAt、deletedAt字段
      timestamps: true,
      comment: '用户登录信息表',
      paranoid: true,
      indexes: [
        {
          name: 'userCheckin_userId',
          method: 'BTREE',
          fields: ['user_id'],
        },
      ],
    },
  );

  return userCheckin;
};
