const os = require('os');
const path = require('path');
const fs = require('fs');
const defaultConfig = require('./config.json');
const HOME = path.join(os.homedir(), '.handshake-cli');
const userConfigLocation = path.join(HOME, 'config.json');

const pad = (len, ch) => {
  ch = ch || ' ';
  if (len < 2) return ch;
  return Array(len + 1).join(ch);
};

const copyDefaultConfig = () => {
  !fs.existsSync(HOME) && fs.mkdirSync(HOME);
  fs.writeFileSync(
    userConfigLocation,
    JSON.stringify(defaultConfig, null, 2),
    'UTF-8'
  );
};

const loadConfigOrCreate = (force) => {
  force && copyDefaultConfig();

  try {
    return require(userConfigLocation);
  } catch (e) {
    copyDefaultConfig();
  }
};

const delay = (n) => new Promise((r) => setTimeout(r, n));

const intl = new Intl.NumberFormat();

module.exports = {
  delay,
  intl,
  loadConfigOrCreate,
  pad,
};
