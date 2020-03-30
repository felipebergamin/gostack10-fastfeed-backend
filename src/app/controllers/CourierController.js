import Courier from '../models/Courier';

class CourierController {
  async store(req, res) {
    try {
      const created = await Courier.create(req.body);
      return res.json(created);
    } catch (err) {
      return res.status(500).end();
    }
  }

  async list(_, res) {
    const couriers = await Courier.findAll();
    return res.json(couriers);
  }

  async delete(req, res) {
    const { id } = req.params;

    const courier = await Courier.findByPk(id);

    if (courier === null) {
      return res.status(404).end();
    }

    await courier.destroy();
    return res.json(courier.toJSON());
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const courier = await Courier.findByPk(id);

      if (!courier) {
        return res.status(404).end();
      }

      await courier.update(req.body);
      return res.json(courier);
    } catch (err) {
      return res.status(500).end();
    }
  }
}

export default new CourierController();
