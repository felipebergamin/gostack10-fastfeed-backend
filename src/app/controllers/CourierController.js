import * as Yup from 'yup';

import Courier from '../models/Courier';
import formatError from '../../helpers/ValidationErrorFormatter';

class CourierController {
  async store(req, res) {
    const Schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .required('E-mail is required')
        .email('Please, enter a valid e-mail address'),
    });

    try {
      const values = await Schema.validate(req.body);

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
}

export default new CourierController();
