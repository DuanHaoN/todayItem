<template>
  <div class='container'>my-comb---------{{bData}}</div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  name: 'my-comb',
  created () {
    // 绑定事件，接收数据
    eventBus.$on('fromA', (data) => {
      this.bData = data
    })
  },
  data () {
    return {
      bData: ''
    }
  }
}
</script>

<style scoped lang='less'></style>
