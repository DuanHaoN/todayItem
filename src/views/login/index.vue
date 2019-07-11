<template>
  <div class="container-login">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />

      <el-form ref="loginForm" :model="loginForm" status-icon :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width: 240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- v-model是绑定了值 -->
          <el-checkbox :value="true">我已阅读并同意用户协议</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 校验手机号
    const checkMobile = (rule, value, callback) => {
      // 把value进行格式校验 /^1[3-9]\d(9)$/.test()
      if (/^1[3-9]\d(9)$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 提交登录请求  axios是基于promise封装的  post（）返回值是一个promise对象
          this.$http
            .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then((res) => {
            // res是响应对象
            // console.log(res.data)
            // session只会在当前服务器下生效，不会在客户端生效
            // 跳转到首页  保存用户的信息，判断登录的状态
              this.$router.push('/')
            })
            .catch(() => {
            // 提示用户错误
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
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
  width: 400px;
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
