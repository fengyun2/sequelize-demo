/**
 * 用户地址表
 * @param {*} sequelize
 * @param {*} DataTypes
 */

// import { sequelize, Sequelize } from './mysql';

module.exports = function (sequelize, DataTypes) {
  const UserAddress = sequelize.define(
    'UserAddress', // 表名(小写),(生成时, 会自动转换为复数形式)
    // 字段定义
    {
      userId: {
        type: DataTypes.BIGINT(11),
        field: 'user_id',
        allowNull: false,
        comment: '用户id',
      },
      consignee: {
        type: DataTypes.STRING,
        field: 'consignee',
        allowNull: false,
        comment: '收货人',
      },
      address: {
        type: DataTypes.STRING(1024),
        field: 'address',
        allowNull: false,
        comment: '详细地址',
      },
      zipCode: {
        type: DataTypes.STRING(16),
        field: 'zip_code',
        allowNull: true,
        comment: '邮编',
      },
      tel: {
        type: DataTypes.STRING(32),
        field: 'tel',
        allowNull: false,
        comment: '电话',
      },
    },
    {
      // 自定义表名
      freezeTableName: true,
      tableName: 'userAddress',

      // 是否需要增加createdAt、updatedAt、deletedAt字段
      timestamps: true,
      comment: '用户地址表',
      paranoid: true,
      indexes: [
        {
          name: 'userAddress_userId',
          method: 'BTREE',
          fields: ['user_id'],
        },
      ],
    },
  );

  return UserAddress;
};
