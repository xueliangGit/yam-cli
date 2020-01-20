/*
 * @Author: xuxueliang
 * @Date: 2019-06-20 19:17:50
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-02 18:19:00
 */
const updater = require('pkg-updater')
const pkg = require('../package.json') // 命令行工具自己的 package 信息

updater({ 'pkg': pkg }).then(() => { /* 在这里启动命令行工具 */ })

// updater({
//   'pkg': pkg,
//   // 完全自定义版本更新时的逻辑
//   'onVersionChange': function* (opts) {

//   }
// }).then(() => { /* 在这里启动命令行工具 */ })
