<template>
    <el-select :value='value' @change='fn' placeholder="请选择">
        <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      options: [
        { name: '小薰', id: 1 }
      ]
    }
  },
  methods: {
    async getChannels () {
      const { data: { data } } = await this.$http.get('channels')
      // console.log(data.channels)
      this.options = data.channels
    },
    fn (value) {
      this.$emit('input', value)
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>

</style>
