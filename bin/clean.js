/*
 * @Author: xuxueliang
 * @Date: 2019-08-13 15:14:30
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-13 15:33:08
 */
const fs = require('fs-extra')
const path = require('path')
module.exports = function () {
  fs.emptyDir(path.join(__dirname, '../contents'))
  fs.emptyDir(path.join(__dirname, '../zip'), () => {
    console.log('已清除缓存')
  })
}
