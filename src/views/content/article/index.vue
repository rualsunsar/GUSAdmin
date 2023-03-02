<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入文章标题"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="角色状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option key="-1" label="全部" :value="undefined" />
          <el-option key="1" label="启用" :value="1" />
          <el-option key="0" label="停用" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          v-permission="['content:article:query']"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索</el-button>
        <el-button
          v-permission="['content:article:query']"
          icon="el-icon-refresh"
          size="mini"
          @click="resetQuery"
        >重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-permission="['content:article:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permission="['content:article:del']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="articleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="文章编号" prop="article_id" width="100" />
      <el-table-column label="文章标题" prop="title" :show-overflow-tooltip="true" />
      <el-table-column label="作者" prop="author" :show-overflow-tooltip="true" />
      <el-table-column label="来源" prop="source" :show-overflow-tooltip="true" />
      <el-table-column label="状态" align="center" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status ? 'success' : 'info'"
            disable-transitions
          >{{ scope.row.status ? '启用' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center" prop="published_time">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.published_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="update_time">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.update_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="create_time">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="scope">
          <el-button
            v-permission="['content:article:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            v-permission="['content:article:del']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="750px">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="文章副标题" prop="subtitle">
          <el-input v-model="form.subtitle" placeholder="请输入文章副标题" />
        </el-form-item>
        <el-form-item label="排序(数值越大越靠前)" prop="sort">
          <el-input v-model="form.sort" type="number" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="form.link" placeholder="请输入链接" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-input v-model="form.source" placeholder="请输入来源" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :key="1" :label="1">发布</el-radio>
            <el-radio :key="0" :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章正文" prop="content">
          <el-input v-model="form.content" type="textarea" placeholder="请输入文章正文" />
        </el-form-item>
        <el-form-item label="文章富文本" prop="richtext">
          <el-input v-model="form.richtext" type="textarea" placeholder="请输入文章正文" />
        </el-form-item>
        <el-form-item label="封面图(大)">
          <div class="selectBox">
            <label for="file">
              <div class="inputBox">选择图片(实时上传)</div>
            </label>
            <input
              id="file"
              type="file"
              name="file"
              accept="image/*"
              capture="camera"
              style="display: none"
              @change="uploadAvator"
            >
          </div>
          <!-- 预览图片 -->
          <div v-if="showUploadImg !== ''" class="img">
            <img
              :src="showUploadImg"
              alt=""
              style="width: 200px; height: 200px; margin: 10px auto"
            >
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listArticle, delArticle, addArticle, updateArticle } from '@/api/content/article'
import { uploadImg } from '@/api/common'

export default {
  name: 'Article',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 文章表格数据
      articleList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        title: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' }
        ],
        subtitle: [
          { required: true, message: '文章副标题不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '文章正文不能为空', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '来源不能为空', trigger: 'blur' }
        ],
        richtext: [
          { required: true, message: '文章富文本不能为空', trigger: 'blur' }
        ]
      },
      showUploadImg: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询文章列表 */
    getList() {
      this.loading = true
      if (this.queryParams.title === '') {
        this.queryParams.title = undefined
      }
      listArticle(this.queryParams).then(
        response => {
          this.articleList = response.data.articles
          this.total = response.data.count
          this.loading = false
        }
      )
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      if (this.$refs.menu !== undefined) {
        this.$refs.menu.setCheckedKeys([])
      }
      this.form = {
        article_id: undefined,
        title: undefined,
        status: 0,
        content: undefined
      }
      this.showUploadImg = ''
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.article_id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加文章'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      this.form = {
        article_id: row.article_id,
        title: row.title,
        subtitle: row.subtitle,
        sort: row.sort,
        link: row.link,
        status: row.status,
        author: row.author,
        source: row.source,
        content: row.content,
        richtext: row.richtext,
        logoL: row.logoL
      }
      this.showUploadImg = row.logoL ? `${process.env.VUE_APP_IMG}/${row.logoL}` : ''
      this.open = true
      this.title = '修改文章'
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.article_id !== undefined) {
            updateArticle(this.form.article_id, this.form).then(response => {
              this.msgSuccess(response.message)
              this.open = false
              this.getList()
            })
          } else {
            addArticle(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const article_ids = row.article_id ? [row.article_id] : this.ids
      this.$confirm('是否确认删除文章编号为"' + article_ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delArticle(article_ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {
      })
    },
    // 点击选择图片按钮
    uploadAvator(e) {
      console.log('uploadAvator', this.form.logoL)
      if (this.form.logoL === '' || this.form.logoL == null) {
        this.type = 'add'// 首次上传
      } else {
        this.type = 'updata'// 更新
      }
      const file = e.target.files[0] // 从input获取文件

      // 以文件形式上传
      this.formData = new FormData() // 实例化一个FormData对象
      this.formData.append('logoL', file) // 将文件加入FormData对象中
      this.formData.append('title', this.form.title)
      this.formData.append('id', this.form.article_id)
      this.formData.append('type', this.type)

      this.uploadImg()

      // 文件转base64,预览图片
      const reader = new FileReader() // 实例化文件读取对象
      reader.readAsDataURL(file) // 将文件读取为base64格式
      reader.onload = () => { // 读取完成时的回调
        this.showUploadImg = reader.result // reader.result=e.target.result存储的是文件的base64编码
        const base64Str = reader.result
        console.log(base64Str) // data:image/webp;base64,UklGRuYxAABXRUJQVlA4IN
      }
    },
    // 上传图片
    uploadImg() {
      console.log('上传图片')
      uploadImg(this.formData).then(response => {
        this.getList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-tree-node {
    height: 36px;
    line-height: 36px;
    .custom-tree-node-btns {
      span:nth-child(1) {
        padding: 0 10px;
      }
    }
    /deep/ .el-checkbox-group {
      display: inline-block;
      .el-checkbox {
        margin-right: 12px;
      }
    }
  }
  .inputBox{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 36px;
    background-color: #1890ff;
    border-color: #1890ff;
    color: #fff;
    cursor: pointer;
  }
</style>
