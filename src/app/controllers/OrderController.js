import Order from '../models/Order';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';

class OrderController {
  async store(req, res) {
    try {
      const created = await Order.create(req.body);
      return res.json(created);
    } catch (err) {
      return res.status(500).end();
    }
  }

  async delete(req, res) {
    try {
      const order = await Order.findByPk(req.params.id);

      if (!order) return res.status(404).end();

      await order.destroy();

      return res.status(200).end();
    } catch (err) {
      return res.status(500).end();
    }
  }

  async update(req, res) {
    try {
      const order = await Order.findByPk(req.params.id);

      if (!order) return res.status(404).end();

      order.set(req.body);
      await order.save();

      return res.json(req.body);
    } catch (err) {
      return res.status(500).end();
    }
  }

  async list(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: Courier,
            as: 'courier',
          },
          {
            model: Recipient,
            as: 'recipient',
          },
        ],
      });

      return res.json(orders);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new OrderController();
