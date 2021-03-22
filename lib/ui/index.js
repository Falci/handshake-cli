const blessed = require('blessed');
const splash = require('./splash');
const main = require('./main');

const screen = blessed.screen({
  autoPadding: true,
  fastCSR: true,
  debug: true,
  log: './debug.ui.log',
});

const start = async () => {
  await splash(screen).start(() => {
    // TODO: check if we need to start hsd
  });

  main(screen);

  screen._.exit = async () => {
    screen._.msg.hide = () => {};
    screen._.msg.display('Shutting down...', -1);
    process.exit(0);
  };

  screen.ignoreLocked.push('C-c');
  screen.key('C-c', screen._.exit);
};

const UI = {
  screen,
  start,
};

module.exports = UI;
