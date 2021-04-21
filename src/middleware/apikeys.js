const API_KEY = process.env.API_KEY;
const HOST = process.env.HOST;
const validateKey = (req, res, next) => {
  const apiKey = req.headers.api_key;
  const host = req.headers.host;
  if (apiKey === API_KEY && host === HOST) {
    next();
  } else {
    res.status(401).send("Unauthorized request");
  }
};

module.exports = validateKey;
