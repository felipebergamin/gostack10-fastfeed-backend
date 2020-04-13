import { Op } from 'sequelize';

import Order from '../models/Order';
import Courier from '../models/Courier';

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
}

export default new DeliveryController();
