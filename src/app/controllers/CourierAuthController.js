import jwt from 'jsonwebtoken';

import formatValidationErrors from '../../helpers/ValidationErrorFormatter';
import authConfig from '../../config/auth';
import Courier from '../models/Courier';
import File from '../models/File';

class CourierAuthController {
  async store(req, res) {
    try {
      const { id } = req.body;

      const courier = await Courier.findByPk(id, {
        include: [
          {
            model: File,
            as: 'avatar',
          },
        ],
      });

      if (!courier) {
        return res.status(401).json({ error: 'User not found' });
      }

      return res.status(200).json({
        user: courier,
        token: jwt.sign({ id, user_type: 'courier' }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      if (err.name === 'ValidationError')
        return res.status(400).json(formatValidationErrors(err));

      return res.status(500).end();
    }
  }
}

export default new CourierAuthController();
