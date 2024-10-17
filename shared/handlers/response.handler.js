
module.exports = (context, data) => {
  const { response } = context;
  if (response === data) {
    return data;
  }
  response.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.setHeader('Pragma', 'no-cache');

  if (data && data._redirect) {
    return response.redirect(data._redirect);
  }
  response.set('Cache-Control', 'no-cache, must-revalidate');
  if (typeof data === 'string') {
    response.set('Content-Type', 'text/plain');
  } else {
    response.set('Content-Type', 'application/json');
  }
  return response.send(data);
};
