const { NodeClient } = require('hs-client');
const config = require('./config');

const client = new NodeClient(config.node);

module.exports = {
  client,
};
