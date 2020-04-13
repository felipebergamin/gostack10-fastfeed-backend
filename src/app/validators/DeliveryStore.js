import * as Yup from 'yup';

import formatErrors from '../../helpers/ValidationErrorFormatter';

export default async function(req, res, next) {
  try {
    await Yup.object()
      .shape({
        signature_id: Yup.number('Imagem de assinatura inválida').required(
          'Por favor, envie a imagem com a assinatura'
        ),
      })
      .validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json(formatErrors(err));
  }
}
