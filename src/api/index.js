
import request from '@/utils/request'
import { requestPath, uploadUrl, uploadPath } from '@/utils/global.js'

export function getClassifyListAPI(params) { //推荐分类的
  return request({
      url: `${requestPath.resource}/diytype/list`,
      method: 'get',
      params
  })
}
export function getResListAPI(params) { //pdf等资源的列表
  return request({
      url: `${requestPath.resource}/video-library/pagePdfAndVideo`,
      method: 'get',
      params
  })
}
export function getPathAPI(params) { //获取路径
  return request({
      url: `${requestPath.file}/getFilePath`,
      method: 'get',
      params
  })
}
// http://test16.zhongdianyun.com:1212/file/file/getFilePath

