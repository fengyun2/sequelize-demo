import { sequelize, Sequelize } from './mysql';

const User = sequelize.import('./user');
const UserAddress = sequelize.import('./userAddress');
const UserCheckin = sequelize.import('./userCheckin');
const Role = sequelize.import('./role');

// 建立模型之间的关系
User.hasMany(UserAddress, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: 'Address',
});
User.hasOne(UserCheckin, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: 'userCheckinInfo',
});
UserCheckin.belongsTo(User);

// 多对多
User.belongsToMany(Role, { through: 'userRoles', as: 'UserRoles' });
Role.belongsToMany(User, { through: 'userRoles', as: 'UserRoles' });

// 同步模型到数据库中
sequelize.sync();

export default {
  User,
  UserAddress,
  UserCheckin,
  Role,
};
