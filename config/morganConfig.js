const chalk = require('chalk');

const info = msg => {
  return chalk.dim.white(msg);
};
const success = msg => {
  return chalk.hex('#adff2f').italic(msg);
};
const redirect = msg => {
  return chalk.cyan(msg);
};
const reqError = msg => {
  //* Hex color dark orange
  return chalk.hex('#ff8c00').bold(msg);
};
const serverError = msg => {
  return chalk.hex('#ff0000').bold(msg);
};
const getColor = status => {
  if (status < 200) return success;
  if (status >= 200 && status < 300) return success;
  if (status >= 300 && status < 400) return redirect;
  if (status >= 400 && status < 500) return reqError;
  if (status >= 500) return serverError;
};

//*:method :url :status :response-time ms - :res[content-length]
const devProfile = (tokens, req, res) => {
  color = getColor(tokens.status(req, res));
  return [
    color(tokens.method(req, res)),
    chalk.white(tokens.url(req, res)),
    color(tokens.status(req, res)),
    color(tokens['response-time'](req, res) + ' ms'),
    '- :',
    color(tokens.res(req, res, 'content-length'))
  ].join(' ');
};

module.exports = { devProfile };
