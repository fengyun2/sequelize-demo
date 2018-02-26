// import User from '../schema/mysql/user';
import Model from '../schema/mysql';
import { md5 } from '../utils';
// import { Sequelize } from '../schema/mysql/mysql';

const { User } = Model;
// const { Op } = Sequelize;

// 添加用户
const add = async (ctx) => {
  console.log('add user: ', ctx.request.body);
  const { name, nick_name, password: oldPassword = '' } = ctx.request.body;
  if (!name) {
    ctx.body = {
      code: 401,
      message: '用户名不能为空',
      data: null,
    };
    return;
  }
  if (!oldPassword) {
    console.log('xxxxx');
    ctx.body = {
      code: 401,
      message: '密码不能为空',
      data: null,
    };
    return;
  }
  const password = md5(oldPassword);
  try {
    const user = await User.build({
      name,
      nick_name,
      password,
    });
    await user.save();
    // const user = await User.save({
    //   name,
    //   nick_name,
    //   password,
    // });
    ctx.body = {
      code: 200,
      message: '添加用户成功',
      data: user,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 401,
      message: `添加用户失败${error}`,
      data: null,
    };
  }
};

// 查询用户
const list = async (ctx) => {
  let { page = 1, page_size = 10 } = ctx.request.body;
  page = parseInt(page, 10);
  page_size = parseInt(page_size, 10);
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

// 删除用户
const remove = async (ctx) => {
  const { name } = ctx.request.body;
  try {
    const user = await User.destroy({
      where: {
        name,
      },
    });
    ctx.body = {
      code: 200,
      message: '删除用户成功',
      data: user,
    };
  } catch (error) {
    ctx.body = {
      code: 401,
      message: '删除用户失败',
      data: null,
    };
  }
};
export default {
  add,
  list,
  remove,
};
