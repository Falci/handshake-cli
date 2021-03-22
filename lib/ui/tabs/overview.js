const blessed = require('blessed');

module.exports = (screen, tab) => {
  tab.setContent(`
{center}     _                     _     _           _               _ _ {/center}
{center}    | |                   | |   | |         | |             | (_){/center}
{center}    | |__   __ _ _ __   __| |___| |__   __ _| | _____    ___| |_ {/center}
{center}    | '_ \\ / _\` | '_ \\ / _\` / __| '_ \\ / _\` | |/ / _ \\  / __| | |{/center}
{center}    | | | | (_| | | | | (_| \\__ \\ | | | (_| |   <  __/ | (__| | |{/center}
{center}    |_| |_|\\__,_|_| |_|\\__,_|___/_| |_|\\__,_|_|\\_\\___|  \\___|_|_|{/center}


{center}Loading...{/center}
`);

  return 'Overview';
};
