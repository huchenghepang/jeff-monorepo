/* commitlint 配置文件 */
export default {
  /* 继承 conventional 提交规范 */
  extends: ['@commitlint/config-conventional'],

  /* 提交规则配置 */
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'scope-enum': [2, 'always', ['root', 'backend', 'frontend', 'components', 'utils', 'scripts']],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'types',
        'release',
        'wip',
        'workflow'
      ]
    ]
  }
};
