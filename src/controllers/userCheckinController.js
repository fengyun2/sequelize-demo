import Model from '../schema/mysql';

const { User, UserCheckin } = Model;

const Login = async (ctx) => {
  // eslint-disable-next-line
  const { username, password } = ctx.request.body;
  const { ip } = ctx;
  const user = await User.findOne({
    where: {
      name: username,
    },
  });
  const userInfo = user.get({
    plain: true,
  });
  console.log('info: ', ctx.ip);
  console.log('userInfo: ', userInfo);
  if (!user) {
    ctx.body = {
      code: 401,
      message: '该用户不存在',
      data: null,
    };
    return;
  }
  try {
    await UserCheckin.create({
      userId: userInfo.id,
      loginIp: ip,
    });
    // user.setUserCheckin(userCheckin);
    ctx.body = {
      code: 200,
      message: '登录成功',
      data: null,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 401,
      message: '登录失败',
      data: null,
    };
  }
};

export default {
  Login,
};
