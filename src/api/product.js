/*
 * @Author: LF
 * @Date: 2022-04-23 17:57:50
 * @LastEditors: LF
 * @LastEditTime: 2022-04-25 10:13:28
 * @Description: file content
 * @FilePath: \PepperAdmin\src\api\product.js
 */
import request from '@/utils/request'
// 商品管理相关的 Api
// 获取品牌列表
export const reqBrandGetList = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get'
})

// 删除品牌
export const reqBrandDeleteById = (id) => request({
  url: `/admin/product/baseTrademark/remove/${id}`,
  method: 'delete'
})

// 新增品牌
export const reqBrandCreate = (data) => request({
  url: '/admin/product/baseTrademark/save',
  method: 'post',
  data
})

// 新增品牌
export const reqBrandEdit = (data) => request({
  url: '/admin/product/baseTrademark/update',
  method: 'put',
  data
})
