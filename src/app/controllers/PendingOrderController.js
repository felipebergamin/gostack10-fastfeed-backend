import Order from '../models/Order';

class PendingOrderController {
  async list(req, res) {
    const { courierId } = req.params;

    const pendingOrders = await Order.findAll({
      where: {
        courier_id: courierId,
        canceled_at: null,
        end_date: null,
      },
    });

    if (!pendingOrders || pendingOrders.length === 0) {
      return res.status(204).end();
    }

    return res.json(pendingOrders);
  }

  async get(req, res) {
    const { courierId, orderId } = req.params;

    const order = await Order.findOne({
      where: {
        id: orderId,
        courier_id: courierId,
        canceled_at: null,
        end_date: null,
      },
    });

    if (!order) {
      return res.status(204).end();
    }

    return res.json(order);
  }
}

export default new PendingOrderController();
