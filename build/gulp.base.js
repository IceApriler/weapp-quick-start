const gulp = require('gulp')
const path = require('path')
const fs = require('fs-extra')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const minimist = require('minimist')
const child_process = require('child_process')
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
  addPathToAppJson(
    path.join(`pages/${destPath}/${name}`).split(path.sep).join('/'),
  )
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
    .pipe(
      gulp.dest(utils.makeGlob(`${config.srcPath}/components/${destPath}/`)),
    )
  done()
})

/**
 * 执行命令行
 * @param {String}} cmd 命令
 */
function exec(cmd) {
  const cliback = child_process.exec(cmd)
  console.log(`[执行脚本] ${cmd}`)
  cliback.stdout.on('data', (data) => {
    const lines = data
      .toString()
      .split(/[\n|\r\n]/)
      .filter((i) => i)
    const contents = lines.join('\r\n')
    console.log(contents)
  })
  cliback.stderr.on('data', (data) => {
    const lines = data
      .toString()
      .split(/[\n|\r\n]/)
      .filter((i) => i)
    const contents = lines.join('\r\n')
    console.log(contents)
  })
}

/**
 * 复制node_modules包和package.json到src
 */
gulp.task('generate:package', function (done) {
  // 读取package.json - dependencies
  fs.readFile(path.resolve(config.rootPath, 'package.json'), function (
    err,
    data,
  ) {
    if (err) {
      return console.error(err)
    }
    const dataJson = JSON.parse(data.toString())
    const weappPackageJson = {
      description: 'Generate by npm script: `npm run generate:package`.',
      dependencies: dataJson.dependencies,
    }
    const str = JSON.stringify(weappPackageJson, null, 2)
    // 生成新的package.json
    fs.writeFile(path.resolve(config.srcPath, 'package.json'), str, function (
      err,
    ) {
      if (err) {
        console.error(err)
      }
      // npm i
      exec(`cd ${config.srcPath} && npm i`)
    })
  })
  done()
})

gulp.task('check:package', function (done) {
  // 读取./package.json - dependencies
  fs.readFile(path.resolve(config.rootPath, 'package.json'), function (
    err,
    data,
  ) {
    if (err) {
      return console.error(err)
    }
    const dataJson = JSON.parse(data.toString())
    // 读取src/package.json - dependencies
    fs.readFile(path.resolve(config.srcPath, 'package.json'), function (
      err,
      data,
    ) {
      if (err) {
        return console.error(err)
      }
      const weappDataJson = JSON.parse(data.toString())
      console.log(
        JSON.stringify(dataJson.dependencies) !==
          JSON.stringify(weappDataJson.dependencies),
      )
      if (
        JSON.stringify(dataJson.dependencies) !==
        JSON.stringify(weappDataJson.dependencies)
      ) {
        exec('gulp generate:package')
      }
    })
  })
  done()
})

/** 开发模式 */
gulp.task('default', gulp.series('compile:scss', 'watch:scss'))
