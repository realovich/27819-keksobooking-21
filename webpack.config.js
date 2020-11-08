const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/backend.js`,
    `./js/debounce.js`,
    `./js/card.js`,
    `./js/map.js`,
    `./js/filter.js`,
    `./js/preview.js`,
    `./js/form.js`,
    `./js/page.js`,
    `./js/main.js`,
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
