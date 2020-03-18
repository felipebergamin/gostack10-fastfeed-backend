import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const router = new Router();

router.route('/sessions').post(SessionController.store);
router.route('/users').get(UserController.list);

export default router;
