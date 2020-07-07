import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import CourierController from './app/controllers/CourierController';
import OrderController from './app/controllers/OrderController';
import PendingOrdersController from './app/controllers/PendingOrderController';
import DeliveredOrderController from './app/controllers/DeliveredOrderController';
import DeliveryController from './app/controllers/DeliveryController';
import WithdrawController from './app/controllers/WithdrawController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import CancellationController from './app/controllers/CancellationController';
import FileController from './app/controllers/FileController';

import validateCourierStore from './app/validators/CourierStore';
import validateCourierUpdate from './app/validators/CourierUpdate';
import validateOrderStore from './app/validators/OrderStore';
import validateOrderUpdate from './app/validators/OrderUpdate';
import validateDeliveryStore from './app/validators/DeliveryStore';
import validateRecipientStore from './app/validators/RecipientStore';
import CourierAuthController from './app/controllers/CourierAuthController';

const router = new Router();
const upload = multer(multerConfig);

router.route('/sessions').post(SessionController.store);
router.route('/auth-courier').post(CourierAuthController.store);

router.post('/orders/:orderId/problems', DeliveryProblemController.store);

router.use(authMiddleware);

router
  .route('/recipients')
  .post(validateRecipientStore, RecipientController.store)
  .get(RecipientController.list);

router
  .route('/recipients/:id')
  .get(RecipientController.view)
  .delete(RecipientController.delete)
  .put(validateRecipientStore, RecipientController.update);

router
  .route('/couriers')
  .post(validateCourierStore, CourierController.store)
  .get(CourierController.list);

router.get(
  '/couriers/:courierId/pending/:orderId',
  PendingOrdersController.get
);
router.get('/couriers/:courierId/pending', PendingOrdersController.list);

router.get(
  '/couriers/:courierId/delivered/:orderId',
  DeliveredOrderController.get
);
router.get('/couriers/:courierId/delivered', DeliveredOrderController.list);

router
  .route('/couriers/:id')
  .get(CourierController.view)
  .delete(CourierController.delete)
  .put(validateCourierUpdate, CourierController.update);

router
  .route('/orders')
  .post(validateOrderStore, OrderController.store)
  .get(OrderController.list);

router
  .route('/orders/:id')
  .get(OrderController.view)
  .put(validateOrderUpdate, OrderController.update)
  .delete(OrderController.delete);

router.post(
  '/orders/:orderId/delivery/:courierId',
  validateDeliveryStore,
  DeliveryController.store
);
router.get('/orders/:courierId/delivered', DeliveryController.list);

router.post('/orders/:orderId/withdraw/:courierId', WithdrawController.store);
router.get('/orders/:orderId/problems', DeliveryProblemController.get);

router.get('/delivery-problems', DeliveryProblemController.list);
router.delete(
  '/delivery-problems/:problemId/cancel-delivery',
  CancellationController.store
);

router.post('/files', upload.single('file'), FileController.store);

export default router;
