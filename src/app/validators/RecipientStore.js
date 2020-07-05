import * as Yup from 'yup';

import formatErrors from '../../helpers/ValidationErrorFormatter';

export default async function RecipientStore(req, res, next) {
  try {
    Yup.object()
      .shape({
        name: Yup.string().required('Please, provide a name'),
        street: Yup.string().required('Street name is required'),
        number: Yup.number('Please, provide a valid number').required(
          'Number is required'
        ),
        complement: Yup.string().required('Complement is a required field'),
        state: Yup.string().required('State is a required field'),
        city: Yup.string().required('City name is a required field'),
        cep: Yup.string().required('CEP is a required field'),
      })
      .validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json(formatErrors(err));
  }
}
