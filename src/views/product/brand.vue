<!--
 * @Author: LF
 * @Date: 2022-04-23 14:58:03
 * @LastEditors: LF
 * @LastEditTime: 2022-04-27 08:59:22
 * @Description: file content
 * @FilePath: \PepperAdmin\src\views\product\brand.vue
-->
<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 15px"
      @click="handelClickEditOrAdd(true, null)"
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
            @click="handelClickEditOrAdd(false, row)"
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
    <!-- 新增、编辑品牌的弹窗 -->
    <el-dialog
      :title="isAdd === true ? '新增品牌' : '编辑品牌'"
      :visible.sync="dialogFormVisible"
      align="center"
    >
      <el-form ref="brand" :model="brand" style="width: 80%" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input v-model="brand.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌logo" label-width="100px" align="left">
          <el-upload
            class="avatar-uploader"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="brand.logoUrl" :src="brand.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClickSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqBrandGetList,
  reqBrandDeleteById,
  reqBrandCreate,
  reqBrandEdit
} from '@/api/product'
export default {
  name: 'Brand',
  data() {
    return {
      list: [],
      page: 1,
      limit: 15,
      totalCount: 0,
      dialogFormVisible: false,
      isAdd: null,
      brand: {
        id: '',
        logoUrl: '',
        tmName: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'change'
          }
        ],
        logoUrl: [{ required: true, message: '请上传品牌 logo' }]
      },
      uploadPath: 'http://39.98.123.211/admin/product/upload'
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取数据
    async getList() {
      const { page, limit } = this
      const result = await reqBrandGetList(page, limit)
      if (result.code === 200) {
        const { data } = result
        this.list = data.records
        this.totalCount = data.total
      }
    },
    // 修改每页数量
    handleSizeChange(size) {
      this.limit = size
      this.getList()
    },
    // 跳页
    handleCurrentChange(page) {
      this.page = page
      this.getList()
    },
    // 点击新增、编辑按钮
    handelClickEditOrAdd(type, obj) {
      this.dialogFormVisible = true
      this.isAdd = type
      if (!type) {
        this.brand = { ...obj }
      } else {
        this.brand = {
          id: '',
          logoUrl: '',
          tmName: ''
        }
      }
    },
    // 点击删除
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
    },
    // 新增、编辑点击提交
    handleClickSubmit() {
      const { brand, isAdd } = this
      let result = { code: '' }
      this.$refs['brand'].validate(async(valid) => {
        if (valid) {
          if (isAdd) {
            result = await reqBrandCreate(brand)
          } else {
            if (brand.id) {
              result = await reqBrandEdit(brand)
            }
          }
        }
      })
      if (result.code === 200) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.getList()
        this.dialogFormVisible = false
      }
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      const { code, data } = res
      if (code === 200) {
        this.brand.logoUrl = data
      }
    },
    // 验证图片上传
    beforeAvatarUpload(file) {
      const isJPGorPNG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGorPNG) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPGorPNG && isLt2M
    }
  }
}
</script>

<style>
/* 上传组件的样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style lang='scss' scoped>
</style>
