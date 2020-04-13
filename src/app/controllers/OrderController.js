import Order from '../models/Order';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';

import Mail from '../../lib/Mail';

class OrderController {
  async store(req, res) {
    try {
      const created = await Order.create(req.body);
      const courier = await Courier.findByPk(req.body.courier_id);
      const recipient = await Recipient.findByPk(req.body.recipient_id);

      Mail.sendMail({
        to: `${courier.name} <${courier.email}>`,
        subject: 'Nova entrega cadastrada',
        template: 'new_order',
        context: {
          courierName: courier.name,
          recipientName: recipient.name,
          street: recipient.street,
          number: recipient.number,
          cep: recipient.cep,
          city: recipient.city,
          state: recipient.state,
          complement: recipient.complement,
        },
      });
      return res.json(created);
    } catch (err) {
      console.log(err);
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
