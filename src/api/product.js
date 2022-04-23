/*
 * @Author: LF
 * @Date: 2022-04-23 17:57:50
 * @LastEditors: LF
 * @LastEditTime: 2022-04-23 18:24:07
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
