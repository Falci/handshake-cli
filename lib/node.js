const { NodeClient } = require('hs-client');

const clientOptions = {
  port: 12037,
  host: '192.168.1.57',
  apiKey: 'a888ba54-bd10-41b0-a0e3-3ed89d64cb7e',
};

const client = new NodeClient(clientOptions);

module.exports = {
  client,
};
