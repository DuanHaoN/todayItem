<template>
  <div class="container" v-loading="loading">
    <el-card>
      <div slot="header">
        <bread-crumb>素材管理</bread-crumb>
      </div>
      <el-radio-group v-model="reqParams.collect" size="medium" @change="search">
        <el-radio-button :label="true">收藏</el-radio-button>
        <el-radio-button :label="false">全部</el-radio-button>
      </el-radio-group>
      <el-button
        size="medium"
        type="success"
        @click="centerDialogVisible = true"
        style="float: right"
      >添加素材</el-button>
      <!-- <el-button @click="centerDialogVisible = true" style="float: right" type="success">添加素材</el-button> -->

      <el-dialog title="素材" :visible.sync="centerDialogVisible" width="30%" center>
        <!-- <span>需要注意的是内容是默认不居中的</span> -->
        <el-upload
          name="image"
          :headers="headers"
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :on-success="handleSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <!-- <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button> -->
        </span>
      </el-dialog>
      <ul class="materialList">
        <li v-for="item in materials" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot" v-if="!reqParams.collect">
            <span class="el-icon-star-off" :class="{red: item.is_collected}" @click='ToggleCollect(item)'></span>
            <span class="el-icon-delete" @click='delImage(item.id)'></span>
          </div>
        </li>
      </ul>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="reqParams.page"
        @current-change="pager"
        :total="total"
        :page-size="reqParams.per_page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('dhn')).token
      },
      imageUrl: '',
      centerDialogVisible: false,
      loading: false,
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      materials: [],
      total: 0
    }
  },
  methods: {
    delImage (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getMaterials()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async ToggleCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      item.is_collected = data.collect
      this.$message.success('修改成功')
      //   item.is_collected = data
    //   console.log(data)
    },
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.centerDialogVisible = false
      }, 2000)
      //   console.log(res)
      this.imageUrl = ''
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getMaterials()
    },
    async getMaterials () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      //   console.log(data)
      this.total = data.total_count
      this.materials = data.results
      this.loading = false
    },
    search () {
      this.reqParams.page = 1
      this.getMaterials()
    }
  },
  created () {
    this.getMaterials()
  }
}
</script>

<style scoped lang='less'>
.el-pagination {
  text-align: center;
}
.materialList {
  overflow: hidden;
  margin-top: 30px;
  li {
    position: relative;
    list-style: none;
    width: 280px;
    height: 280px;
    margin-right: 20px;
    margin-bottom: 20px;
    float: left;
    border: 1px dashed #ddd;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .fot {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      text-align: center;
      background: rgba(30, 138, 240, 0.3);
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
