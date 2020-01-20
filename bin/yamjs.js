#!/usr/bin / env node
/*
 * @Author: xuxueliang
 * @Date: 2019-06-20 18:55:00
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-02 18:19:51
 */
process.title = 'yamjs-cli'
require('commander')
  .version(require('../package').version, '-v, --version')
  .usage('<command> [options]')
  // .command('url',' Use of links')
  // .command('config','Use configuration files')
  .parse(process.argv)

require('./generate')
