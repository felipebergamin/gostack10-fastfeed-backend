import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

const router = new Router();

router.route('/sessions').post(SessionController.store);

router.use(authMiddleware);
router.route('/recipients').post(RecipientController.store);

export default router;
