<template>

     <div class='children'>
         {{number}}
      </div>

  </template>

<script>

export default {
  props: {
    number: [Number, String]
  }
}
// 当然也可以简单一点，如果不考虑数据类型，直接 props:["number","string"]就可以了,中括号包裹，多个值使用，分隔。

</script>
