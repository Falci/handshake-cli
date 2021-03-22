const blessed = require('blessed');
const utils = require('../utils');

const TABS = [require('./tabs/overview'), require('./tabs/hsd')];

const screen = blessed.screen({
  autoPadding: true,
  fastCSR: true,
  debug: true,
  log: './debug.ui.log',
});

const start = (callback) => {
  screen._.frame = null;
  screen._.wrapper = blessed.box({
    parent: screen,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  screen._.bar = blessed.listbar({
    parent: screen._.wrapper,
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    keys: true,
    mouse: true,
    autoCommandKeys: true,
    style: {
      item: {
        fg: 'blue',
        hover: {
          fg: 'white',
          bg: 'black',
        },
      },
      selected: {
        fg: 'white',
        bg: 'black',
      },
      prefix: {
        fg: 'white',
      },
    },
  });

  screen.on('prerender', function () {
    screen._.bar.setContent(utils.pad(screen.width));
  });

  screen._.sep = blessed.line({
    parent: screen._.wrapper,
    top: 1,
    left: 0,
    right: 0,
    orientation: 'horizontal',
  });

  const tabs = (screen._.tabs = {});

  TABS.forEach(function (init) {
    const tab = blessed.box({
      top: 2,
      left: 0,
      right: 0,
      bottom: 0,
      scrollable: true,
      keys: true,
      vi: true,
      alwaysScroll: true,
      tags: true,
      scrollbar: {
        ch: ' ',
      },
      style: {
        scrollbar: {
          inverse: true,
        },
      },
    });

    const name = init(screen, tab);

    screen._.bar.addItem({
      text: name,
      callback: function () {
        if (screen._.frame) screen._.frame.detach();
        screen._.wrapper.append(tab);
        tab.focus();
        screen._.frame = tab;
        screen.render();
      },
    });
  });

  screen._.bar.selectTab(0);

  screen._.msg = blessed.message({
    parent: screen,
    top: 'center',
    left: 'center',
    height: 'shrink',
    width: '50%',
    align: 'center',
    tags: true,
    hidden: true,
    border: 'line',
    // "q" will not make the box disappear on display()
    ignoreKeys: ['q'],
  });

  screen.on('element keypress', function (el, ch, key) {
    const { _ } = screen;

    if (ch !== 'q') return;

    if (screen.grabKeys) return;

    if (el === _.msg) {
      return;
    }

    if (_.msg.visible) {
      _.msg.hide();
      screen.render();
      return;
    }

    return exit();
  });

  const exit = () => {
    screen._.msg.hide = () => {};
    screen._.msg.display('Shutting down...', -1);

    return callback();
  };

  // C-c can be used even if keys are locked,
  // for example, during a loading window.
  screen.ignoreLocked.push('C-c');

  screen.key('C-c', exit);

  // screen.render();
};

const UI = {
  screen,
  start,
};

module.exports = UI;
