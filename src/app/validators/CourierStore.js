import * as Yup from 'yup';

import formatErrors from '../../helpers/ValidationErrorFormatter';

export default async function(req, res, next) {
  try {
    await Yup.object()
      .shape({
        name: Yup.string()
          .trim()
          .required('Name is required'),
        email: Yup.string()
          .trim()
          .required('E-mail is required')
          .email('Please, enter a valid e-mail address'),
      })
      .validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json(formatErrors(err))
      .end();
  }
}
