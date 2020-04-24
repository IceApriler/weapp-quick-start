
const path = require('path')

function makeGlob(_path) {
  return _path.split(path.sep).join('/'); // 修复windows路径和glob规则
}

module.exports = {
  makeGlob
}