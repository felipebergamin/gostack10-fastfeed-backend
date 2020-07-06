import { Op } from 'sequelize';

import Order from '../models/Order';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryController {
  async store(req, res) {
    const { courierId, orderId } = req.params;
    const { signature_id } = req.body;

    const courier = await Courier.findByPk(courierId);

    if (!courier) {
      return res.json(404).json({ message: 'Courier not found' });
    }

    const order = await Order.findOne({
      where: {
        id: orderId,
        courier_id: courierId,
        start_date: { [Op.not]: null },
        end_date: null,
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.set({ end_date: new Date(), signature_id });
    await order.save();

    return res.json(order);
  }

  async list(req, res) {
    const { courierId: courier_id } = req.params;

    const deliveriesCompleted = await Order.findAll({
      where: {
        courier_id,
        start_date: { [Op.not]: null },
        end_date: { [Op.not]: null },
      },
      include: [
        { model: Recipient, as: 'recipient' },
        {
          model: Courier,
          as: 'courier',
        },
        {
          model: File,
          as: 'signature',
        },
      ],
    });

    return res.json(deliveriesCompleted);
  }
}

export default new DeliveryController();
