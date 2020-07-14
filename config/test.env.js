'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    BASE_API: '"http://49.4.26.127:8012"'
    // BASE_API: '"http://test16.zhongdianyun.com:1212"'
        // BASE_API: '"http://122.14.50.6"'
})