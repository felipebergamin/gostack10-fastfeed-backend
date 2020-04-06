import Order from '../models/Order';
import DeliveryProblem from '../models/DeliveryProblem';

class CancellationController {
  async store(req, res) {
    const { problemId } = req.params;

    const problem = await DeliveryProblem.findByPk(problemId);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const order = await Order.findByPk(problem.order_id);

    if (order.canceled_at) {
      return res.status(403).json({ message: 'Order was already canceled' });
    }

    order.set('canceled_at', new Date());
    await order.save();

    return res.json(order);
  }
}

export default new CancellationController();
