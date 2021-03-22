const blessed = require('blessed');
const { client } = require('../../node');
const { intl } = require('../../utils');

let i = 0;

module.exports = (screen, tab) => {
  let active = false;

  tab._.general = blessed.text({
    parent: tab,
    top: 0,
    left: 0,
    height: 4,
    width: 30,
    label: ' {blue-fg}General{/blue-fg} ',
    border: {
      type: 'line',
    },
    tags: true,
  });

  tab._.chain = blessed.text({
    parent: tab,
    top: 4,
    left: 0,
    height: 8,
    width: 30,
    label: ' {blue-fg}Chain{/blue-fg} ',
    border: {
      type: 'line',
    },
    tags: true,
  });

  tab._.pool = blessed.text({
    parent: tab,
    top: 0,
    left: 31,
    height: 5,
    width: 30,
    label: ' {blue-fg}Pool{/blue-fg} ',
    border: {
      type: 'line',
    },
    tags: true,
  });

  tab._.mempool = blessed.text({
    parent: tab,
    top: 5,
    left: 31,
    height: 7,
    width: 30,
    label: ' {blue-fg}Mempool{/blue-fg} ',
    border: {
      type: 'line',
    },
    tags: true,
  });

  tab._.memory = blessed.text({
    parent: tab,
    top: 0,
    left: 61,
    height: 7,
    width: 30,
    label: ' {blue-fg}Memory{/blue-fg} ',
    border: {
      type: 'line',
    },
    tags: true,
  });

  tab.on('focus', () => {
    active = true;

    (async function self() {
      if (!active) return;

      const info = await client.getInfo();

      tab._.general.setContent(
        [
          // TODO: highlight when there's an HSD update
          `{bold}Version:{/bold}{|}${info.version}`,
          `{bold}Network:{/bold}{|}${info.network}`,
        ].join('\n')
      );

      tab._.chain.setContent(
        [
          `{bold}Height:{/bold}{|}${info.chain.height}`,
          `{bold}Progress:{/bold}{|}${(info.chain.progress * 100).toFixed(2)}%`,
          `{bold}Transactions:{/bold}{|}${info.chain.state.tx}`,
          `{bold}Coin:{/bold}{|}${info.chain.state.coin}`,
          `{bold}Value:{/bold}{|}${info.chain.state.value / 1e6}`,
          `{bold}Burned:{/bold}{|}${info.chain.state.burned / 1e6}`,
        ].join('\n')
      );

      tab._.pool.setContent(
        [
          `{bold}Services:{/bold}{|}${info.pool.services}`,
          `{bold}Outbound:{/bold}{|}${info.pool.outbound}`,
          `{bold}Inbound:{/bold}{|}${info.pool.inbound}`,
        ].join('\n')
      );

      tab._.mempool.setContent(
        [
          `{bold}Transactions:{/bold}{|}${info.mempool.tx}`,
          `{bold}Size:{/bold}{|}${info.mempool.size}`,
          `{bold}Claims:{/bold}{|}${info.mempool.claims}`,
          `{bold}Airdrops:{/bold}{|}${info.mempool.airdrops}`,
          `{bold}Orphans:{/bold}{|}${info.mempool.orphans}`,
        ].join('\n')
      );

      // TODO add blessed-contrib elements
      tab._.memory.setContent(
        [
          `{bold}Total:{/bold}{|}${info.memory.total}`,
          `{bold}JS Heap:{/bold}{|}${info.memory.jsHeap}`,
          `{bold}JS Heap Total:{/bold}{|}${info.memory.jsHeapTotal}`,
          `{bold}Native Heap:{/bold}{|}${info.memory.nativeHeap}`,
          `{bold}External:{/bold}{|}${info.memory.external}`,
        ].join('\n')
      );

      screen.render();
      setTimeout(self, 250);
    })();
  });

  tab.on('detach', () => {
    active = false;
  });

  return 'HSD';
};
