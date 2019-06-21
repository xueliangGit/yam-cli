const updater = require('pkg-updater')
const pkg = require('../package.json') // 命令行工具自己的 package 信息

updater({ 'pkg': pkg }).then(() => { /* 在这里启动命令行工具 */ })

updater({
  'pkg': pkg,
  // 自定义 registry
  'registry': 'http://xxx.regist.rycom',
  // 自定义请求的 dist-tag，默认是 latest
  'tag': 'next',
  // 自定义检查间隔，默认是 1h
  'checkInterval': 24 * 60 * 60 * 1000,
  // 自定义更新提示信息
  'updateMessage': 'package update from <%=current%> to <%=latest%>.',
  // 自定义强制更新的版本更新级别，默认是 major
  'level': 'minor'
}).then(() => { /* 在这里启动命令行工具 */ })

updater({
  'pkg': pkg,
  // 完全自定义版本更新时的逻辑
  'onVersionChange': function * (opts) {

  }
}).then(() => { /* 在这里启动命令行工具 */ })
