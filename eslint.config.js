import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
const ignores = ['**/dist/**', '**/node_modules/**', '.*', 'scripts/**', '**/*.d.ts'];
export default defineConfig(
  {
    // 通用配置
    ignores,
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    plugins: {
      prettier: eslintPluginPrettier
    },
    languageOptions: {
      ecmaVersion: 'latest', // 支持最新的 ECMAScript 版本
      sourceType: 'module', // 支持 ES 模块
      parser: tseslint.parser // 使用 TypeScript 解析器
    },
    rules: {
      // 允许warn和error级别的打印存在
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'warn',
      'no-var': 'error'
    }
  },
  // 前端配置
  {
    ignores,
    // 配置前端涉及的文件范围
    files: ['apps/frontend/**/*.{js,jsx,ts,tsx,vue}', 'packages/components/**/*.{js,jsx,ts,tsx,vue}'],
    extends: [...eslintPluginVue.configs['flat/recommended'], eslintConfigPrettier],
    languageOptions: {
      // 配置前端相关的全局变量
      globals: {
        ...globals.browser
      }
    },
    rules: {
    }
  },

  // 后端配置
  {
    ignores,
    // 配置后端涉及的文件范围
    files: ['apps/backend/**/*.{js,ts}'],
    languageOptions: {
      // 配置后端相关的全局变量
      globals: {
        ...globals.node
      }
    }
  }
);
