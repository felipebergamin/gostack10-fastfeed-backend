import { Op } from 'sequelize';

import formatValidationError from '../../helpers/ValidationErrorFormatter';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    try {
      const saved = await Recipient.create(req.body);
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

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) return res.status(404).end();

    await recipient.destroy();

    return res.json(recipient);
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) return res.status(404).end();

    await recipient.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
