export default {
  '*.{js,ts,mjs,cjs,json,tsx,css, less,scss, vue,html}': ['cspell lint'],
  '*.{js,ts,vue,tsx,jsx}': ['prettier --write', 'eslint']
};
