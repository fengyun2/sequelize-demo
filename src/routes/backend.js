import User from '../controllers/userController';
import userCheckin from '../controllers/userCheckinController';

export default function (router) {
  router.post('/user', User.list);
  router.post('/user/add', User.add);
  router.post('/user/remove', User.remove);

  router.post('/checkin/login', userCheckin.Login);
}
