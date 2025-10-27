/**
 * @type {import('prettier').Config}
 *  prettier 配置文件
 * 参考：https://prettier.io/docs/en/options.html
 */
export default {
  // 超过最大值换行
  printWidth: 120,
  // 缩进字节数
  tabWidth: 2,
  // 使用空格代替tab缩进
  useTabs: false,
  // 句尾添加分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 引号括起对象属性
  quoteProps: 'as-needed',
  // 在JSX中使用单引号而不是双引号
  jsxSingleQuote: false,
  // 尾随逗号
  trailingComma: 'none',
  // 大括号内的空格
  bracketSpacing: true,
  // 在对象字面量中把'>' 单独放一行
  bracketSameLine: false,
  // 在JSX中把'>' 单独放一行
  jsxBracketSameLine: false,
  arrowParens: 'avoid'
};
