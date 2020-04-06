import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Order from '../models/Order';
import Courier from '../models/Courier';

class WithdrawController {
  async store(req, res) {
    const { courierId, orderId } = req.params;

    const courier = await Courier.findByPk(courierId);

    if (!courier) {
      return res.status(404).json({ message: 'Courier not found' });
    }

    const today = new Date();

    const withdrawsToday = await Order.count({
      where: {
        courier_id: courierId,
        start_date: {
          [Op.between]: [startOfDay(today), endOfDay(today)],
        },
      },
    });

    if (withdrawsToday >= 5) {
      return res
        .status(403)
        .json({ message: 'Reached the limit of 5 withdrawals per day' });
    }

    const order = await Order.findOne({
      where: {
        id: orderId,
        start_date: null,
        canceled_at: null,
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.set({
      start_date: new Date(),
      courier_id: courierId,
    });

    await order.save();

    return res.json(order);
  }
}

export default new WithdrawController();
