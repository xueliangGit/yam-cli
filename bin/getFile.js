/*
 * @Author: xuxueliang
 * @Date: 2019-06-20 19:22:01
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-02 19:10:28
 */
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
const packageConf = require('../package.json')
function down (appName, server) {
  let bspath = process.cwd()
  var name_ = server.name + '-' + server.version
  const decompressFolderPath = path.join(__dirname, '../contents', name_) // your decompress folder
  const destPath = path.join(bspath, appName)
  if (fs.pathExistsSync(decompressFolderPath)) {
    spinner.text = '本地缓存项目已是最新，开始安装...'
    try {
      fs.copySync(decompressFolderPath + '/yamjs', destPath)
      installFn(appName, server, destPath)
    } catch (e) {
      spinner.text = '创建失败'
      spinner.stop()
      console.log(chalk.red('yamjs:创建失败。' + `
      请运行[ yamjs clean ] 命令后再次尝试创建项目，若还是失败请联系邮件(xu.xueliang@163.com)作者进行修复`))
      // console.log(chalk.red('yamjs:' + `请运行[ yamjs clean ] 命令后再次尝试创建项目，若还是失败请联系邮件(xu.xueliang@163.com)作者进行修复`))
    }
  } else {
    spinner.text = '正在下载最新项目最新demo，请稍后...'
    var req = https.get(server.link, function (res) {
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
          installFn(appName, server, destPath)
        }).catch(e => {
          spinner.text = '下载失败'
          spinner.stop()
          console.log(chalk.red('yamjs:' + name_ + '.zip下载失败,请联系邮件(xu.xueliang@163.com)作者进行修复'))
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
function installFn (path, server, destPath) {
  let cmd = 'cd ' + path + '&& npm i'
  spinner.text = '项目创建成功，正在安装依赖，请稍后...'
  childProcess.exec(cmd, function (err, stdout, stderr) {
    if (err) {
      spinner.stop()
      console.log('项目依赖安装失败，请手动安装')
      // console.log('手动安装成功后，请把lib内文件夹复制到node_modules文件夹内')
      process.exit(1)
    }
    // fs.copySync(destPath + '/lib', destPath + '/node_modules')
    // fs.removeSync(destPath + '/lib')
    spinner.stop()
    console.log('项目依赖安装成功')
    showinfo(path)
  })
}
function getConf (appName, randomNum) {
  spinner.start()
  if (fs.pathExistsSync(path.join(process.cwd(), appName))) {
    spinner.stop()
    console.log('目录下已经存在该项目')
    process.exit(0)
  }
  spinner.text = '正在获取网络最新版本信息...'
  let req = http.get(conf.conf + '?cli_v=' + packageConf.version + '&key=' + randomNum, function (res) {
    var resData = ''
    res.on('data', function (data) {
      resData += data
    })
    res.on('end', function () {
      let server = JSON.parse(resData)
      spinner.text = '获取配置信息开始下载安装包...'
      fs.writeFile('../conf/server.json', resData, function () {
        if (server.code == 200) {
          down(appName, server)
        } else {
          spinner.stop()
          console.log(chalk.red(server.msg))
        }
      })
    })
    req.on('error', function (e) {
      console.error('problem with request: ' + e.message)
      let server
      try {
        server = require('../conf/server.json')
        console.log(chalk.red('网络请求失败，本次建立项目使用本地缓存'))
        spinner.text = '网络请求失败，本次建立项目使用本地缓存'
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
  console.log(chalk.gray('    【' + errInfo + '】项目创建成功'))
  console.log(' the next:')
  console.log()
  console.log('    cd ' + errInfo)
  console.log()
  console.log(chalk.gray('    # dev'))
  console.log('    $ yarn start ')
  console.log()
  console.log(chalk.gray('    # build'))
  console.log('    $ yarn build ')
  console.log()
  console.log(chalk.gray('    # analyz'))
  console.log('    $ yarn analyz ')
  console.log()
  console.log()
}
