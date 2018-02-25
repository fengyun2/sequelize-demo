import User from '../schema/mysql/user';

// 添加用户
const add = async (ctx, next) => {
  console.log('add user: ', ctx.body);
  const user = await User.create({
    name: '刘德华',
    nick_name: '华仔',
  });
  return ctx.body;
};

// 查询用户
const list = async (ctx, next) => {
  console.log('list user');
  const user = await User.findAll();
  ctx.body = {
    code: 200,
    message: '获取用户列表成功！',
    data: user,
  };
};

export default {
  add,
  list,
};
