<template>
  <div class="container">
    <div class="img-btn" @click="open">
      <img :src="value || defaultImg" alt />
    </div>
    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选框组 -->
          <div style="margin-bottom: 20px">
            <el-radio-group size="small" v-model="reqParams.collect" @change="search">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <div
            class="img-item"
            v-for="item in images"
            :key="item.id"
            :class="{selected: selectedUrl === item.url}"
            @click="selected(item.url)"
          >
            <img :src="item.url" alt />
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="自定义图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
            :headers='headers'
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImg()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import defaultImg from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      imageUrl: '',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('dhn')).token
      },
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      dialogVisible: false,
      activeName: 'image',
      images: [],
      total: 0,
      selectedUrl: '',
      //   value: defaultImg
      defaultImg
    }
  },
  methods: {
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    confirmImg () {
      if (this.activeName === 'image') {
        if (!this.selectedUrl) return this.$message.warning('请选择素材')
        // this.value = this.selectedUrl
        this.$emit('input', this.selectedUrl)
      } else if (this.activeName === 'upload') {
        if (!this.imageUrl) return this.$message.warning('请上传图片')
        // this.value = this.imageUrl
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
    },
    selected (url) {
      this.selectedUrl = url
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    handleSuccess (res) {
      this.imageUrl = res.data.url
    },
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      //   console.log(this.images)
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  display: inline-block;
  margin-right: 15px;
}
.dialog-footer {
  text-align: center;
}
.el-pagination {
  text-align: center;
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img-item {
  display: inline-block;
  position: relative;
  margin-right: 20px;
  width: 140px;
  height: 140px;
  border: 1px dashed #ccc;
  &.selected {
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      background: rgba(0, 0, 0, 0.3) url("../assets/images/selected.png")
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
