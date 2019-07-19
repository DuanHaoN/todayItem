<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <bread-crumb>{{articleId?'修改':'发布'}}文章</bread-crumb>
      </div>
      <el-form v-model="articleForm" label-width="100px">
        <el-form-item label="标题">
          <el-input style="width: 500px" size="small" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="正文">
            <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="articleForm.cover.type" @change='changeType'>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- <el-form-item>
          <el-button @click='publish(true)'>存入草稿</el-button>
          <el-button type="primary" @click='publish(false)'>发表文章</el-button>
        </el-form-item> -->
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }]
          ]
        }
      },
      articleForm: {
        content: '',
        channel_id: null,
        title: '',
        cover: {
          type: 1,
          images: []
        }
      },
      articleId: null
    }
  },
  methods: {
    changeType () {
      this.articleForm.cover.images = []
    },
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    async publish (draft) {
      alert(1)
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(!draft ? '发表成功' : '存入草稿成功')
      this.$router.push('/article')
    }
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      this.getArticle()
    }
  },
  watch: {
    $route () {
      this.articleId = null
      this.articleForm = {
        content: '',
        channel_id: null,
        title: '',
        cover: {
          type: 1,
          images: []
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
.my-image{
    display: inline-block;
    margin-right: 15px;
}

.article-container .ql-editor{
  height: 300px;
}
.article-container .ql-toolbar .ql-snow{
  padding: 0 8px;
}
</style>
