#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
// const HDC = require('../../src/index')
const path = require('path')
const down = require('./getFile')
const fs = require('fs-extra')
const strBy = ['当你遇到难点的时候，你应该庆幸，你又要提高了！', '喜欢折腾就开始造吧！', '开拓你的思维，没有什么技术难点，只是没有想到而已！', '技能是靠经验打磨出来的！', '前端发展很快，一不留神就会跟不上的；所以请不断学习']

/**
 * Usage.
 */
program
  .command('creat [name]')
  .description('Use configuration files')
// .alias('conf')
  .action(function (name, ...other) {
    if (!name) {
      console.log(chalk.redBright('请输入项目名称'))
    } else {
      doUrl('creat', name)
    }
  }).on('--help', function () {
    showinfo()
  })
program
  .command('*')
  .action(function (env) {
    showinfo('uncaught command : ' + env)
  })

program.parse(process.argv)
function make_red (txt) {
  return chalk.magentaBright(' \n', txt, ' \n', getStr())
}
function getStr () {
  return chalk.gray(' \n', strBy[parseInt(Math.random() * strBy.length)], '  --by 无声', ' \n')
}
function doUrl (type, paths, floderName, doStyle) {
  switch (type) {
    case 'creat':
      down(paths)
      break
    default:
      showinfo('uncaught command')
      break
  }
}
function showinfo (errInfo = '') {
  if (errInfo)console.log(chalk.red(`ERROR: ${errInfo}`))
  console.log()
  console.log(' Examples:')
  console.log()
  console.log(chalk.gray('    # Use of links'))
  console.log('    $ HDC url [path]')
  console.log()
  console.log(chalk.gray('    # Use configuration files'))
  console.log('    $ HDC conf <path>')
  console.log()
  console.log()
}
