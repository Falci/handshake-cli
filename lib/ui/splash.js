const blessed = require('blessed');

const animate = (n) =>
  new Array(3)
    .fill(0)
    .map((_, i) => (i < n % 4 ? '.' : ' '))
    .join('');

const getContent = (n) => `
{center}     _                     _     _           _               _ _ {/center}
{center}    | |                   | |   | |         | |             | (_){/center}
{center}    | |__   __ _ _ __   __| |___| |__   __ _| | _____    ___| |_ {/center}
{center}    | '_ \\ / _\` | '_ \\ / _\` / __| '_ \\ / _\` | |/ / _ \\  / __| | |{/center}
{center}    | | | | (_| | | | | (_| \\__ \\ | | | (_| |   <  __/ | (__| | |{/center}
{center}    |_| |_|\\__,_|_| |_|\\__,_|___/_| |_|\\__,_|_|\\_\\___|  \\___|_|_|{/center}

{center}Loading${animate(n)}{/center}`;

module.exports = (screen) => {
  const splash = blessed.box({
    parent: screen,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    tags: true,
  });

  splash._.active = false;

  return {
    start: async (fn) => {
      splash._.active = true;
      let i = 0;

      (function reload() {
        splash.setContent(getContent(i++));
        splash._.active && setTimeout(reload, 300);
        screen.render();
      })();

      try {
        return await fn();
      } finally {
        splash._.active = false;
      }
    },
  };
};
