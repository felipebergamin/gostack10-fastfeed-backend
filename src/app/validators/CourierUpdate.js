import * as Yup from 'yup';

import formatError from '../../helpers/ValidationErrorFormatter';

export default async function(req, res, next) {
  try {
    await Yup.object()
      .shape({
        name: Yup.string().trim(),
        email: Yup.string()
          .trim()
          .email('Please, enter a valid e-mail address'),
      })
      .validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json(formatError(err))
      .end();
  }
}
