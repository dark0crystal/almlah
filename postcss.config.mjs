
// postcss.config.cjs
const postcssImport = require('postcss-import');
const tailwindcssNesting = require('tailwindcss/nesting');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    postcssImport(),
    tailwindcssNesting(),
    tailwindcss(),
    autoprefixer(),
  ],
};



