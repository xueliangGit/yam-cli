const https = require('https')
const http = require('http')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const conf = require('../conf')
const decompress = require('decompress')
const childProcess = require('child_process')
const ora = require('ora')
const spinner = ora('Loading unicorns')
function down (appName, server) {
  let bspath = process.cwd()
  const decompressFolderPath = path.join(__dirname, '../contents', server.name + '-' + server.version) // your decompress folder
  const destPath = path.join(bspath, appName)
  if (fs.pathExistsSync(decompressFolderPath)) {
    spinner.text = '本地缓存项目已是最新，开始安装...'
    fs.copySync(decompressFolderPath + '/yamjs', destPath)
    installFn(appName, server)
  } else {
    spinner.text = '正在下载最新项目最新demo，请稍后...'
    var req = https.request(server.path, function (res) {
      const zipFilePath = path.join(__dirname, '../zip/', server.name + '.zip')
      const writeStream = fs.createWriteStream(zipFilePath)
      res.on('data', function (chunk) {
        writeStream.write(chunk)
      })
      res.on('end', function (chunk) {
        writeStream.end(chunk)
      })
      writeStream.on('finish', function () {
        // fs.createWriteStream(path.join(__dirname, 'app')).pipe(unzip.Extract({ path: zipFilePath }))
        decompress(zipFilePath, decompressFolderPath).then(files => {
          fs.copySync(decompressFolderPath + '/yamjs', destPath)
          spinner.text = '下载成功'
          installFn(appName, server)
        })
      })
    })

    req.on('error', function (e) {
      console.error('problem with request: ' + e.message)
    })

    // write data to request body
    // req.write(JSON.stringify(body)); // if you have query data or body

    req.end()
  }
}
function installFn (path, server) {
  let cmd = 'cd ' + path + '&& npm i'
  spinner.text = '正在安装依赖，请稍后...'
  childProcess.exec(cmd, function (err, stdout, stderr) {
    if (err) {
      spinner.stop()
      console.log('项目依赖安装失败，请手动安装')
      process.exit(1)
    }
    spinner.stop()
    console.log('项目建立成功')
    showinfo()
    if (server.msg) {
      console.log(chalk.redBright('     ' + server.msg))
    }
  })
}
function getConf (appName) {
  spinner.start()
  if (fs.pathExistsSync(path.join(process.cwd(), appName))) {
    spinner.stop()
    console.log('目录下已经存在该项目')
    process.exit(0)
  }
  spinner.text = '正在获取网络最新版本信息...'
  let req = http.get(conf.conf, function (res) {
    var resData = ''
    res.on('data', function (data) {
      resData += data
    })
    res.on('end', function () {
      let server = JSON.parse(resData)
      spinner.text = '获取成功开始安装...'
      fs.writeFile('../conf/server.json', resData, function () {
        down(appName, server)
      })
    })
    req.on('error', function (e) {
      console.error('problem with request: ' + e.message)
      let server
      try {
        server = require('../conf/server.json')
        spinner.text = '网络请求失败，本次建立项目使用本地缓存'
        console.log(chalk.red('网络请求失败，本次建立项目使用本地缓存'))
        down(appName, server)
      } catch (e) {
        spinner.stop()
        console.log(chalk.red('网络请求失败，且本地没有缓存文件，请链接网络后再试'))
      }
    })
  })
  req.end()
}
module.exports = getConf
function showinfo (errInfo = '') {
  if (errInfo)console.log(chalk.red(`ERROR: ${errInfo}`))
  console.log()
  console.log(' Examples:')
  console.log()
  console.log(chalk.gray('    # dev'))
  console.log('    $ yarn start ')
  console.log()
  console.log(chalk.gray('    # build'))
  console.log('    $ yarn build ')
  console.log(chalk.gray('    # analyz'))
  console.log('    $ yarn analyz ')
  console.log()
  console.log()
}
