import { Op } from 'sequelize';

import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';

class DeliveryProblemController {
  async store(req, res) {
    const { orderId } = req.params;

    const problem = await DeliveryProblem.create({
      ...req.body,
      order_id: orderId,
    });
    return res.json(problem);
  }

  async list(req, res) {
    const { q } = req.query;

    const where = q
      ? {
          description: { [Op.like]: `%${q}%` },
        }
      : {};

    const problems = await DeliveryProblem.findAll({
      where,
      include: [
        {
          model: Order,
          as: 'order',
          include: ['recipient', 'courier'],
        },
      ],
    });

    return res.json(problems);
  }

  async get(req, res) {
    const { orderId } = req.params;

    const problems = await DeliveryProblem.findAll({
      where: {
        order_id: orderId,
      },
    });

    return res.json(problems);
  }
}

export default new DeliveryProblemController();
