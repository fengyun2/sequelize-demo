// import User from '../schema/mysql/user';
import Model from '../schema/mysql';
import { sequelize, Sequelize } from '../schema/mysql/mysql';

const User = Model.User;
const Op = Sequelize.Op;

// 添加用户
const add = async (ctx, next) => {
  console.log('add user: ', ctx.request.body);
  const { name, nick_name } = ctx.request.body;
  if (!name) {
    ctx.body = {
      code: 401,
      message: '用户名不能为空',
      data: null,
    };
  }
  try {
    const user = await User.create({
      name,
      nick_name,
    });
    ctx.body = {
      code: 200,
      message: '添加用户成功',
      data: user,
    };
  } catch (error) {
    ctx.body = {
      code: 401,
      message: '用户失败',
      data: null,
    };
  }
};

// 查询用户
const list = async (ctx, next) => {
  console.log('list user');
  let { page = 1, page_size = 10 } = ctx.request.body;
  page = parseInt(page);
  page_size = parseInt(page_size);
  const user = await User.findAndCountAll({
    attributes: [
      'name',
      'nick_name',
      ['created_at', 'createdAt'],
      // [sequelize.fn('COUNT', sequelize.col('id')), 'total_users'],
    ],
    where: {
      // [Op.or]: [{ id: 1 }, { id: 5 }],
    },
    offset: (page - 1) * page_size, // 开始的数据索引
    limit: page_size, // 每页限制返回的数据条数
  });
  ctx.body = {
    code: 200,
    message: '获取用户列表成功！',
    data: { list: user.rows, total: user.count },
  };
};

export default {
  add,
  list,
};
