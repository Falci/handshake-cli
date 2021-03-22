const pad = (len, ch) => {
  ch = ch || ' ';
  if (len < 2) return ch;
  return Array(len + 1).join(ch);
};

const intl = new Intl.NumberFormat();

module.exports = {
  pad,
  intl,
};
