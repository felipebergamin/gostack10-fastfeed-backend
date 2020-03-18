export default function(validationErrors) {
  const errors = {};

  if (!validationErrors.inner) {
    return {};
  }

  validationErrors.inner.forEach(error => {
    errors[error.path] = error.errors;
  });

  return errors;
}
