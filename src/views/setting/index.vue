<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <bread-crumb>个人设置</bread-crumb>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form v-model="userForm" label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机："> {{userForm.mobile}} </el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input type="textarea" :rows="3" v-model="userForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 表单 -->

        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            :http-request="myUpload"
            :show-file-list="false"
            action=''
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align: center; font-size: 16px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userForm: {
        name: null,
        intro: null,
        email: null,
        id: null,
        mobile: null,
        photo: null
      },
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('dhn')).token
      }

    }
  },
  methods: {
    myUpload (data) {
      // res.data.photo 修改后的新头像
      // 使用xhr配合formData进行图片上传
      // :header='headers'
      //       name="photo"
      //       action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
      //       :on-success="handleSuccess"
      // 通过data.file获取图片对象
      // console.log(data)
      const formData = new FormData()
      formData.append('photo', data.file)
      this.$http.patch('user/photo', formData).then(res => {
        // 上传图片成功  res.data.data.photo  地址  res 响应对象
        this.$message.success('修改头像成功')
        this.userForm.photo = res.data.data.photo
        // 更新home组件的头像   更新本地存储的头像
        eventBus.$emit('updateHeaderPhoto', res.data.data.photo)
        const userInfo = JSON.parse(window.sessionStorage.getItem('dhn'))
        userInfo.photo = res.data.data.photo
        window.sessionStorage.setItem('dhn', JSON.stringify(userInfo))
      })
    },
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userForm = data
    },
    // 修改用户信息
    async updateUserInfo () {
      const { data: { data } } = await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改用户信息成功')
      // 修改home组件的数据，用户名称  传当前修改的用户名称给home组件
      eventBus.$emit('updateHeaderName', data.name)
      // 更新本地存储的用户名称
      const userInfo = JSON.parse(window.sessionStorage.getItem('dhn'))
      userInfo.name = data.name
      window.sessionStorage.setItem('dhn', JSON.stringify(userInfo))
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang='less'></style>
