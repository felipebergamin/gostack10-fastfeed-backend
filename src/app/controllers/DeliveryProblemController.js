import DeliveryProblem from '../models/DeliveryProblem';

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
    const problems = await DeliveryProblem.findAll({
      include: ['order'],
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
