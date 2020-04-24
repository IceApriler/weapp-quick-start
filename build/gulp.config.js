const path = require('path')

/** 根目录 */
const rootPath = path.resolve(__dirname, '../')

/** 源码目录 */
const srcPath = path.resolve(__dirname, rootPath, 'src')

/** scss文件路径 */
const scssPath = path.resolve(__dirname, srcPath, '**/*.scss')

/** 命令行创建页面/组件的模板 */
const templatePath = path.resolve(__dirname, rootPath, 'template')

module.exports = {
  rootPath,
  srcPath,
  scssPath,
  templatePath,
}
