import { Router } from 'express';

import UserController from './app/controllers/UserController';

const router = new Router();

router.route('/users').get(UserController.list);

export default router;
