#!/usr/bin / env node
/*
 * @Author: xuxueliang
 * @Date: 2019-06-20 18:55:00
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-02 18:19:20
 */
const program = require('commander')
const chalk = require('chalk')
// const HDC = require('../../src/index')
const path = require('path')
const down = require('./getFile')
const clean = require('./clean')
const fs = require('fs-extra')
const strBy = ['当你遇到难点的时候，你应该庆幸，你又要提高了！', '喜欢折腾就开始造吧！', '开拓你的思维，没有什么技术难点，只是没有想到而已！', '技能是靠经验打磨出来的！', '前端发展很快，一不留神就会跟不上的；所以请不断学习']

/**
 * Usage.
 */
program
  .command('create [name] [randomNum]')
  .description('create App')
  // .alias('conf')
  .action(function (name, randomNum, ...other) {
    if (!name) {
      console.log(chalk.redBright('请输入项目名称'))
    } else {
      doUrl('create', name, randomNum)
    }
  }).on('--help', function () {
    showinfo()
  })
program
  .command('clean')
  .description('clean cache ')
  .action(function (name) {
    doUrl('clean', name)
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
function doUrl (type, paths, randomNum, doStyle) {
  switch (type) {
    case 'create':
      down(paths, randomNum)
      break
    case 'clean':
      clean()
      break
    default:
      showinfo('uncaught command')
      break
  }
}
function showinfo (errInfo = '') {
  if (errInfo) console.log(chalk.red(`ERROR: ${ errInfo }`))
  console.log()
  console.log(' Examples:')
  console.log()
  console.log(chalk.gray('    # Use of links'))
  console.log('    $ yamjs create [path]')
  console.log()
  console.log()
}
