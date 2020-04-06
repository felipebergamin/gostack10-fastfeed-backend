import { Op } from 'sequelize';

import Order from '../models/Order';

class DeliveredOrderController {
  async list(req, res) {
    const { courierId } = req.params;

    const orders = await Order.findAll({
      where: {
        courier_id: courierId,
        canceled_at: null,
        [Op.not]: { end_date: null },
      },
    });

    if (!orders || orders.length === 0) {
      return res.status(204).end();
    }

    return res.json(orders);
  }

  async get(req, res) {
    const { courierId, orderId } = req.params;

    const order = await Order.findOne({
      where: {
        id: orderId,
        courier_id: courierId,
        canceled_at: null,
        [Op.not]: { end_date: null },
      },
    });

    if (!order) {
      return res.status(204).end();
    }

    return res.json(order);
  }
}

export default new DeliveredOrderController();