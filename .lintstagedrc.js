export default {
  '*.{js,ts,mjs,cjs,tsx,css,less,scss,vue,html}': ['cspell lint'],
  '*.{js,ts,vue,tsx,jsx}': ['prettier --write', 'eslint']
};
