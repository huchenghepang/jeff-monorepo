import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import vue from '@vitejs/plugin-vue';
import fs from 'node:fs';
import path from 'node:path';
import URL from 'node:url';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

// 定义所有包的根目录
const __filename = URL.fileURLToPath(import.meta.url);
console.log('当前脚本所在目录：', __filename);
const __dirname = path.dirname(__filename); // 脚本所在目录
console.log('当前脚本所在目录的父目录：', __dirname);

const packages = ['utils', 'components'];

/** 获取所有包的根目录 */
function getPackageRoots() {
  return packages.map(pkg => path.resolve(__dirname, '../packages', pkg));
}

/** 读取包的 package.json 文件的内容 */
async function packageJson(root) {
  console.log('读取包的 package.json 文件的内容：', root);
  const jsonPath = path.resolve(root, 'package.json');
  const content = await fs.promises.readFile(jsonPath, 'utf-8');
  return JSON.parse(content);
}

/** 获取包的 Rollup 配置 */
async function getRollupConfig(root) {
  const config = await packageJson(root); // 读取包的 package.json 文件的内容
  const tsconfig = path.resolve(root, 'tsconfig.json'); // 读取包的 tsconfig.json 文件的内容
  const { name, formats } = config.buildOptions || {}; // 从包的 package.json 文件中读取 buildOptions 字段
  if (!name || !formats || formats.length === 0) {
    throw new Error('buildOptions 字段必须包含 name 和 formats 字段');
  }
  const dist = path.resolve(root, './dist'); // 定义包的输出目录
  const entry = path.resolve(root, './src/index.ts'); // 定义包的入口文件
  const rollupOptions = {
    input: entry, // 定义包的入口文件
    sourcemap: true, // 生成 sourcemap 文件
    external: ['vue'], // 外部依赖，不打包进最终的文件
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig,
        compilerOptions: {
          outDir: dist // 定义包的输出目录
        }
      }),
      vue({
        template: {
          compilerOptions: {
            // 自定义转换函数，在生成 AST 时移除特定属性
            nodeTransforms: [
              node => {
                if (node.type === 1 /* NodeTypes.ELEMENT */) {
                  // 过滤掉所有 data-testid 属性
                  node.props = node.props.filter(prop => {
                    if (prop.type === 6 /* NodeTypes.ATTRIBUTE */) {
                      return prop.name !== 'data-testid';
                    }
                    return true;
                  });
                }
              }
            ]
          }
        }
      }),
      postcss()
    ],
    dir: dist
  };
  const output = [];
  for (const format of formats) {
    const outputItem = {
      format,
      file: path.resolve(dist, `index.${format}.js`),
      sourcemap: true,
      globals: {
        vue: 'Vue'
      }
    };
    if (format === 'iife') {
      outputItem.name = name;
    }
    output.push(outputItem);
  }
  rollupOptions.output = output;
  // watch options
  rollupOptions.watch = {
    include: path.resolve(root, 'src/**'),
    exclude: path.resolve(root, 'node_modules/**'),
    clearScreen: false
  };
  return rollupOptions;
}

export async function getRollupConfigs() {
  const roots = getPackageRoots();
  const configs = await Promise.all(roots.map(getRollupConfig));
  const result = {};
  for (let i = 0; i < packages.length; i++) {
    result[packages[i]] = configs[i];
  }
  return result;
}

export function clearDist(name) {
  const dist = path.resolve(__dirname, '../packages', name, 'dist');
  if (fs.existsSync(dist)) {
    fs.rmSync(dist, { recursive: true, force: true });
  }
}
