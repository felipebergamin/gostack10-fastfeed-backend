import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import CourierController from './app/controllers/CourierController';
import OrderController from './app/controllers/OrderController';

const router = new Router();

router.route('/sessions').post(SessionController.store);

router.use(authMiddleware);
router.route('/recipients').post(RecipientController.store);

router
  .route('/couriers')
  .post(CourierController.store)
  .get(CourierController.list);

router
  .route('/couriers/:id')
  .delete(CourierController.delete)
  .put(CourierController.update);

router
  .route('/orders')
  .post(OrderController.store)
  .get(OrderController.list);

export default router;
