import * as Yup from 'yup';

import formatErrors from '../../helpers/ValidationErrorFormatter';

export default async function(req, res, next) {
  try {
    await Yup.object()
      .shape({
        recipient_id: Yup.number(),
        courier_id: Yup.number(),
        product: Yup.string(),
      })
      .validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json(formatErrors(err));
  }
}
