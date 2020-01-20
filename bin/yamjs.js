#!/usr/bin/env node

process.title = 'yamjs-cli'
require('commander')
  .version(require('../package').version, '-v, --version')
  .usage('<command> [options]')
  // .command('url',' Use of links')
  // .command('config','Use configuration files')
  .parse(process.argv)

require('./generate')