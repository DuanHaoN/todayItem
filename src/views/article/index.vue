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
            <el-form v-model='reqParams' label-width='80px' size='small'>
                <el-form-item label='状态：'>
                    <el-radio-group v-model="reqParams.status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                        <el-radio :label="2">审核成功</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label='频道：'>
                    <!-- 频道组件 -->
                    <my-channel  v-model='reqParams.channel_id'></my-channel>
                </el-form-item>
                <el-form-item label='日期：'>
                    <el-date-picker
                    value-format="yyyy-MM-dd"
                    @change='getDate'
                    v-model="pubDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary' @click="search()">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 卡片2 -->
        <el-card>
            <div slot='header'>
                经过筛选查询共得到{{total}}条数据
            </div>
            <!-- 表格封装 -->
            <el-table
              :data='articles'
              style="width: 100%">
              <el-table-column
                label="封面"
                width="180">
                 <template v-slot='scope'>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.cover.images[0]"
                    >
                    <div slot="error">
                      <img src="../../assets/images/error.gif" alt="" style="width: 100px; height: 100px">
                    </div>
                  </el-image>
                 </template>
              </el-table-column>
              <el-table-column
                prop='title'
                label="标题"
                >
              </el-table-column>
              <el-table-column
                label="状态">
                  <template v-slot='scope'>
                    <el-tag v-show='scope.row.status === 0'>草稿</el-tag>
                    <el-tag type="success" v-show='scope.row.status === 2'>审核成功</el-tag>
                    <el-tag type="info" v-show='scope.row.status === 1'>审核中</el-tag>
                    <el-tag type="warning" v-show='scope.row.status === 3'>审核失败</el-tag>
                    <el-tag type="danger" v-show='scope.row.status === 4'>已删除</el-tag>
                  </template>
              </el-table-column>
              <el-table-column
                prop='pubdate'
                label="发布日期"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                >
                 <template v-slot='scope'>
                    <el-button type="primary" @click='edit(scope.row.id)' class="el-icon-edit"></el-button>
                    <el-button type='danger' class="el-icon-delete"></el-button>
                 </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="pager"
              :current-page="reqParams.page"
              :page-size="reqParams.per_page"
              :total="total"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 10,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      pubDate: [],

      total: 0,
      articles: []
    }
  },
  methods: {
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data)
      this.total = data.total_count
      this.articles = data.results
    },
    edit (id) {
      this.$router.push(`edit/${id}`)
    },
    getDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    search () {
      this.getArticles()
    },
    pager (newPage) {
      // 提交当前页码给后台 才能获取对应的数据
      this.reqParams.page = newPage
      this.getArticles()
    }
  },
  created () {
    this.getArticles()
  }

}
</script>

<style lang='less' scoped>
.el-card{
    margin-bottom: 20px;
}
</style>
