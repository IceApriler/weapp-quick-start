const gulp = require('gulp')
const path = require('path')
const fs = require('fs-extra')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const minimist = require('minimist')
const config = require('./gulp.config')
const utils = require('./gulp.utils')

sass.compiler = require('node-sass')

/** 编译scss文件 */
gulp.task('compile:scss', function () {
  return gulp
    .src(utils.makeGlob(config.scssPath))
    .pipe(sass().on('error', sass.logError))
    .pipe(
      rename((path) => {
        path.extname = '.wxss'
      }),
    )
    .pipe(gulp.dest(config.srcPath))
})

/** 监听scss */
gulp.task('watch:scss', function (done) {
  gulp.watch(utils.makeGlob(config.scssPath), gulp.series('compile:scss'))
  done()
})

/** 修改app.json */
const addPathToAppJson = (params) => {
  fs.readFile(`${config.srcPath}/app.json`, function (err, data) {
    if (err) {
      return console.error(err)
    }
    const dataJson = JSON.parse(data.toString())
    dataJson.pages.push(params)
    const str = JSON.stringify(dataJson, null, 2)
    fs.writeFile(`${config.srcPath}/app.json`, str, function (err) {
      if (err) {
        console.error(err)
      }
    })
  })
}

/** 新建页面 */
gulp.task('page', function (done) {
  const options = minimist(process.argv.slice(2), {
    string: ['name', 'path'],
  })
  const { name, path: parentPath } = options
  const destPath = parentPath ? `${parentPath}/${name}` : `${name}`
  const templatepPagePath = path.resolve(config.templatePath, 'page/*.*')
  gulp
    .src(utils.makeGlob(templatepPagePath))
    .pipe(
      rename((path) => {
        path.basename = name
      }),
    )
    .pipe(gulp.dest(utils.makeGlob(`${config.srcPath}/pages/${destPath}/`)))
  addPathToAppJson(path.join(`pages/${destPath}/${name}`).split(path.sep).join('/'))
  done()
})

/** 新建组件 */
gulp.task('comp', function (done) {
  const options = minimist(process.argv.slice(2), {
    string: ['name', 'path'],
  })
  const { name, path: parentPath } = options
  const destPath = parentPath ? `${parentPath}/${name}` : `${name}`
  const templatepPagePath = path.resolve(config.templatePath, 'component/*.*')
  gulp
    .src(utils.makeGlob(templatepPagePath))
    .pipe(
      rename((path) => {
        path.basename = name
      }),
    )
    .pipe(gulp.dest(utils.makeGlob(`${config.srcPath}/components/${destPath}/`)))
  done()
})

/** 开发模式 */
gulp.task('default', gulp.series('compile:scss', 'watch:scss'))
