<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside class="my-side" :width="collapse? '64px': '200px'">
        <div :class="collapse? 'close': 'logo'">

        </div>
      <el-menu
        router
        :collapse="collapse"
        :collapse-transition="false"
        style="border-right: none"
        v-bind:default-active="$route.path"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >

        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>

      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header class="my-header">
        <span class="el-icon-s-unfold" @click="toggleMenu"></span>
        <span class="text">木叶忍者村</span>
        <el-dropdown style="float: right">
          <span class="el-dropdown-link">
            <img
              style="vertical-align: middle"
              v-bind:src="avatar"
              width="30"
              height="30"
              alt
            />
            <b style="vertical-align:middle;padding-left:5px">{{ name }}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native='setting()'>个人设置</el-dropdown-item>
            <el-dropdown-item @click.native='loginOut()'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      collapse: false,
      avatar: '',
      name: ''
    }
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    setting () {
      this.$router.push('/setting')
    },
    loginOut () {
      window.sessionStorage.removeItem('dhn')
      this.$router.push('/login')
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('dhn'))
    this.avatar = user.photo
    this.name = user.name
    // 绑定提交用户名称的事件
    eventBus.$on('updateHeaderName', (name) => {
      this.name = name
    })
    eventBus.$on('updateHeaderPhoto', (url) => {
      this.avatar = url
    })
  }
}
</script>

<style lang="less" scoped>
.home-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  .my-side {
    background: #002033;

    .logo {
        background: url("../../assets/images/logo_admin.png") no-repeat center  ;
        width: 200px;
        height: 60px;
        // background: #000;
    }
    .close{
        background:url('../../assets/images/logo_admin_01.png') no-repeat center;
        background-size: 36px auto;
        height: 60px;
    }
  }

  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-unfold {
      font-size: 26px;
      vertical-align: middle;
    }

    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
  }
}
</style>
