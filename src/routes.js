import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import CourierController from './app/controllers/CourierController';

const router = new Router();

router.route('/sessions').post(SessionController.store);

router.use(authMiddleware);
router.route('/recipients').post(RecipientController.store);

router
  .route('/couriers')
  .post(CourierController.store)
  .get(CourierController.list);

export default router;
