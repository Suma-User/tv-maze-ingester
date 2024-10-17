const { bodyParser, express, helmet } = require('../packages');

const RESPONSE_MAX_AGE = 604800;
module.exports = (app) => {
  // body Parser
  app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
  app.use(bodyParser.json({ limit: '25mb' }));

  // Cors
  app.use((req, res, next) => {
    const allowedCrossDomains = process.env.ALLOWED_CROSS_DOMAINS
      ? process.env.ALLOWED_CROSS_DOMAINS.split(';')
      : 'http://localhost:5001';

    if (allowedCrossDomains.indexOf(req.headers.origin) > -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE,HEAD');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type,Origin,Authorization,X-Request-ID,X-A-Key',
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Max-Age', RESPONSE_MAX_AGE);
    next();
  });

  // helmet
  app.use(helmet(express.helmet));
};
