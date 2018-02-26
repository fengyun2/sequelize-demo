import Model from '../schema/mysql';

const { User, UserCheckin } = Model;

const Login = async (ctx) => {
  // eslint-disable-next-line
  const { ip, username, password } = ctx.request;
  const user = await User.findOne({
    where: {
      name: username,
    },
  });
  if (user.length === 0) {
    ctx.body = {
      code: 401,
      message: '该用户不存在',
      data: null,
    };
  }
  const userCheckin = UserCheckin.build({
    loginIp: ip,
  });
  user.setUserCheckin(userCheckin);
  ctx.body = {
    code: 200,
    message: '登录成功',
    data: null,
  };
};

export default {
  Login,
};
