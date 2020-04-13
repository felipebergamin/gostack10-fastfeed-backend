import * as Yup from 'yup';
import { Op } from 'sequelize';

import formatValidationError from '../../helpers/ValidationErrorFormatter';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const Schema = Yup.object().shape({
      name: Yup.string().required('Please, provide a name'),
      street: Yup.string().required('Street name is required'),
      number: Yup.number('Please, provide a valid number').required(
        'Number is required'
      ),
      complement: Yup.string().required('Complement is a required field'),
      state: Yup.string().required('State is a required field'),
      city: Yup.string().required('City name is a required field'),
      cep: Yup.string().required('CEP is a required field'),
    });

    try {
      const values = await Schema.validate(req.body, { abortEarly: false });

      const saved = await Recipient.create(values);
      return res.json(saved.toJSON());
    } catch (err) {
      if (err.name === 'ValidationError')
        return res.status(400).json(formatValidationError(err));

      return res.status(500).end();
    }
  }

  async list(req, res) {
    const { q } = req.query;

    const where = q ? { name: { [Op.iLike]: `%${q}%` } } : {};

    const recipients = await Recipient.findAll({
      where,
    });

    return res.json(recipients);
  }
}

export default new RecipientController();
