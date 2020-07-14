'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"http://49.4.26.127:8012"'
    //BASE_API: '"http://test16.zhongdianyun.com:1212"'
})