import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import formatValidationErrors from '../../helpers/ValidationErrorFormatter';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const Schema = Yup.object().shape({
      email: Yup.string()
        .trim()
        .required('E-mail is a required field')
        .email('Please, enter a valid e-mail'),
      password: Yup.string().required('Please, enter your password'),
    });

    try {
      const { email, password } = await Schema.validate(req.body, {
        abortEarly: false,
      });

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const { id, name } = user;

      return res.status(200).json({
        user: { id, name, email },
        token: jwt.sign({ id, user_type: 'admin' }, authConfig.secret, {
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

export default new SessionController();
