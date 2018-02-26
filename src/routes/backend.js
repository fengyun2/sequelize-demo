import User from '../controllers/userController';

export default function (router) {
  router.post('/user', User.list);
  router.post('/user/add', User.add);
}
