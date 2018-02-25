import User from '../controllers/userController';

export default function (router) {
  router.get('/user', User.list);
  router.post('/user/add', User.add);
}
