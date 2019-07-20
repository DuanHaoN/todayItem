<template>
   <div class='parent'>
       <input type="text" v-model="content">
       <children :number='content'></children>
    </div>

</template>

<script>
import Children from '../../components/demo' // 引入子组件
export default {
  components: {
    Children
  },
  data () {
    return {
      content: ''
    }
  }
}

</script>
