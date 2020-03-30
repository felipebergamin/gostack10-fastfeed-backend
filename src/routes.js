import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import CourierController from './app/controllers/CourierController';
import OrderController from './app/controllers/OrderController';

import validateCourierStore from './app/validators/CourierStore';
import validateCourierUpdate from './app/validators/CourierUpdate';
import validateOrderStore from './app/validators/OrderStore';
import validateOrderUpdate from './app/validators/OrderUpdate';

const router = new Router();

router.route('/sessions').post(SessionController.store);

router.use(authMiddleware);
router.route('/recipients').post(RecipientController.store);

router
  .route('/couriers')
  .post(validateCourierStore, CourierController.store)
  .get(CourierController.list);

router
  .route('/couriers/:id')
  .delete(CourierController.delete)
  .put(validateCourierUpdate, CourierController.update);

router
  .route('/orders')
  .post(validateOrderStore, OrderController.store)
  .get(OrderController.list);

router
  .route('/orders/:id')
  .put(validateOrderUpdate, OrderController.update)
  .delete(OrderController.delete);

export default router;
