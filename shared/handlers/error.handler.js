module.exports = (error, context) => {
  const { response } = context;
  const BAD_REQUEST = 400;
  if (error.isJoi) {
    return response.status(400).send({ error: error.details.map((e) => e.message) });
  }

  return response.status(error.httpStatusCode || 400).send({
    error: error.message,
    ...(error.code && { code: error.code }),
    ...(error.status && { status: error.status }),
  });
};
