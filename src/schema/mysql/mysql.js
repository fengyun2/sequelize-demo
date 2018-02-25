/**
 * 建立数据库连接
 */

import Sequelize from 'sequelize';
import config from 'config';

const Op = Sequelize.Op;

Sequelize.Promise = Promise;

const mysqlConfig = config.get('Customer.mysqlConfig');
const sequelize = new Sequelize(
  mysqlConfig.database,
  mysqlConfig.root,
  mysqlConfig.password,
  {
    dialect: 'mysql',
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    logging: console.log, // logging-option should be either a function or false
    freezeTableName: true,
    define: {
      // 字段以下划线（_）来分割（默认是驼峰命名风格）
      underscored: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like,
    },
  },
);

// export default { sequelize, Sequelize };
module.exports = { sequelize, Sequelize };
