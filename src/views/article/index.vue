<template>
    <div class="article-container">
        <!-- 卡片1 -->
        <el-card>
            <!-- 卡片头部 -->
            <div slot='header' >
                <!-- 面包屑插槽 -->
                <bread-crumb></bread-crumb>
            </div>
            <!-- 卡片尾部 -->
            <!--表单  v-model用于表单数据的双向绑定，用于其他标签无效-->
            <el-form v-model='articleForm' label-width='80px' size='small'>
                <el-form-item label='状态：'>
                    <el-radio-group v-model="articleForm.status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核失败</el-radio>
                        <el-radio :label="3">审核成功</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label='频道：'>
                    <el-select v-model="articleForm.channel_id" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='日期：'>
                    <el-date-picker
                    v-model="pubDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary'>筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 卡片2 -->
        <el-card>
            <div slot='header'>
                22
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      articleForm: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      pubDate: [],
      options: [
        { name: '小薰', id: 1 }
      ]
    }
  }
}
</script>

<style lang='less' scoped>
.el-card{
    margin-bottom: 20px;
}
</style>
