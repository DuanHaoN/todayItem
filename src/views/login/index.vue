<template>
  <div class="container-login">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单验证 -->
      <el-form ref="loginform" :model="formData" status-icon :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input v-model="formData.code" placeholder="请输入验证码" style="width: 240px"></el-input>
          <el-button style="float: right">请输入验证码</el-button>
        </el-form-item>

        <el-form-item>
          <el-checkbox :value="true">我已阅读协议且同意</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width: 100%" @click='login'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        // alert(1)
        callback()
      } else {
        // alert(2)
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      formData: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginform.validate(async valid => {
        try {
          if (valid) {
            const res = await this.$http.post('authorizations', this.formData)
            window.sessionStorage.setItem('dhn', JSON.stringify(res.data.data))
            this.$router.push('/')
          }
        } catch (err) {
          this.$message.error(err)
        }
      })
    }
    // login () {
    //   this.$refs.loginform.validate(valid => {
    //     if (valid) {
    //       // alert(1)
    //       this.$http
    //         .post('authorizations', this.formData)
    //         .then((res) => {
    //           // console.log(res)
    //           window.sessionStorage.setItem('dhn', JSON.stringify(res.data.data))
    //           this.$router.push('/')
    //         })
    //         .catch(() => {
    //           this.$message.error('手机号或验证码错误')
    //         })
    //     }
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.container-login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/25.jpg) no-repeat center / cover;
}
.login-box {
  width: 420px;
  height: 340px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  // opacity: 0.3;
}
img {
  display: block;
  width: 200px;
  margin: 10px auto;
}
</style>
