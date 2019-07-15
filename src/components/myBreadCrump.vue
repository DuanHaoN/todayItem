<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- 默认插槽  <slot></slot>  -->
        <!-- 具名插槽  <slot><slot>  -->
        <el-breadcrumb-item><slot>内容管理</slot></el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'bread-crumb'

}
</script>

<style scoped lang='less'>

</style>
