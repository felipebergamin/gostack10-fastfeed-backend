import * as Yup from 'yup';

import formatError from '../../helpers/ValidationErrorFormatter';
import Order from '../models/Order';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';

class OrderController {
  async store(req, res) {
    const Schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      courier_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    try {
      const values = await Schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const created = await Order.create(values);
      return res.json(created);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json(formatError(err));
      }

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
