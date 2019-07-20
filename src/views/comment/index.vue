<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <bread-crumb>评论管理</bread-crumb>
      </div>
      <!-- 列表 -->
      <el-table :data="comments">
        <el-table-column label="标题" width="400" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">{{scope.row.comment_status?'正常': '关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template v-slot="scope">
            <el-button type="success" @click='toggleStatus(scope.row)' size="mini" v-if="!scope.row.comment_status">打开评论</el-button>
            <el-button type="danger"  @click='toggleStatus(scope.row)' size="mini" v-else>关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :current-page="reqParams.page"
        @current-change="pager"
        :page-size="reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        style="margin-top: 20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 评论信息
      comments: [],
      total: 0,
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      }
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    toggleStatus (row) {
      const text1 = '您确认打开该文章的评论功能吗？'
      const text2 = '关闭评论功能后，用户将无法对改文章进行评论，您确认关闭该文章的评论功能吗？'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put('comments/status?article_id=' + row.id, { allow_comment: !row.comment_status })
        this.$message.success('修改文章评论状态成功')
        row.comment_status = data.allow_comment
      }).catch(() => {

      })
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    }
  }
}
</script>

<style scoped lang='less'></style>
