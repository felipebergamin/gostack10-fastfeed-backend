import * as Yup from 'yup';

import Courier from '../models/Courier';
import formatError from '../../helpers/ValidationErrorFormatter';

class CourierController {
  async store(req, res) {
    const Schema = Yup.object().shape({
      name: Yup.string()
        .trim()
        .required('Name is required'),
      email: Yup.string()
        .trim()
        .required('E-mail is required')
        .email('Please, enter a valid e-mail address'),
    });

    try {
      const values = await Schema.validate(req.body, { abortEarly: false });

      const created = await Courier.create(values);
      return res.json(created);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json(formatError(err));
      }

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
    const Schema = Yup.object().shape({
      name: Yup.string().trim(),
      email: Yup.string()
        .trim()
        .email('Please, enter a valid e-mail address'),
    });

    try {
      const values = await Schema.validate(req.body, { abortEarly: false });
      const { id } = req.params;

      const courier = await Courier.findByPk(id);

      if (!courier) {
        return res.status(404).end();
      }

      await courier.update(values);
      return res.json(courier);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json(formatError(err));
      }

      return res.status(500).end();
    }
  }
}

export default new CourierController();
