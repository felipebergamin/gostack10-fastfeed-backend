import Courier from '../models/Courier';
import File from '../models/File';

class CourierAuthController {
  async store(req, res) {
    const { id } = req.body;

    const courier = await Courier.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
        },
      ],
    });

    if (!courier) return res.status(404).end();
    return res.json(courier);
  }
}

export default new CourierAuthController();
