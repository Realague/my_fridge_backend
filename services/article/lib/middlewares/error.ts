module.exports = (err, req, res, next) => {
  const log = require("../logger")();
  log.error({ err }, "A wild error appears!");

  res.sendStatus(err.statusCode || 500);
};
