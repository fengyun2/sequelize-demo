/**
 * 用户表
 * @param {*} sequelize
 * @param {*} DataTypes
 */

// import { sequelize, Sequelize } from './mysql';
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'user', // 表名(小写),(生成时, 会自动转换为复数形式)
    // 字段定义
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        comment: '用户名',
      },
      nick_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '用户密码',
      },
      department: {
        type: DataTypes.STRING(40),
        allowNull: true,
        comment: '部门单位',
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否正常状态',
      },
    },
    {
      // 自定义表名
      freezeTableName: true,
      tableName: 'users',

      // 是否需要增加createdAt、updatedAt、deletedAt字段
      timestamps: true,
      comment: '用户表',
      // 将createdAt字段改个名
      // 'createdAt': 'ctime',

      // // 将updatedAt字段改个名
      // 'updatedAt': 'utime',

      // // 将deletedAt字段改名
      // // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
      // 'deletedAt': 'dtime',
      paranoid: true,
    },
  );

  return User;
};
