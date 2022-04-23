<!--
 * @Author: LF
 * @Date: 2022-04-23 14:58:03
 * @LastEditors: LF
 * @LastEditTime: 2022-04-23 18:31:37
 * @Description: file content
 * @FilePath: \PepperAdmin\src\views\product\brand.vue
-->
<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 15px"
    >添加</el-button>
    <el-table :data="list" style="100%" border>
      <el-table-column
        align="center"
        prop="prop"
        label="序号"
        type="index"
        width="100"
      />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="logoUrl" label="品牌logo">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="height: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            size="small"
            icon="el-icon-edit"
            @click="handelClickEdit(row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handelClickDelete(row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 15px 0; text-align: center"
      :current-page="page"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="limit"
      layout="total, prev, pager, next, jumper, sizes"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { reqBrandGetList, reqBrandDeleteById } from '@/api/product'
export default {
  name: 'Brand',
  data() {
    return {
      list: [],
      page: 1,
      limit: 30,
      totalCount: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const { page, limit } = this
      const result = await reqBrandGetList(page, limit)
      if (result.code === 200) {
        const { data } = result
        this.list = data.records
        this.totalCount = data.total
      }
    },
    handleSizeChange(size) {
      //
      this.limit = size
      this.getList()
    },
    handleCurrentChange(page) {
      //
      this.page = page
      this.getList()
    },
    handelClickEdit(obj) {
      //
    },
    async handelClickDelete(id) {
      const result = await reqBrandDeleteById(id)
      if (result.code === 200) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        if (this.list.length === 0) {
          this.page -= 1
        }
        this.getList()
      } else {
        this.$message({
          message: result.data,
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
