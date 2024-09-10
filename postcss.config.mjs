// postcss.config.mjs
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

const config = {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
};

module.exports = config;


