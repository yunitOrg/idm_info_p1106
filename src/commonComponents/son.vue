<template>
  <div class="son">
    <p class="text" :style="`fontSize:${size}px`">文本内容</p>
    <Grandson v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import Grandson from './grandson.vue'
export default {
  name: 'son',
  components: {
    Grandson
  },
  props: ['size'],
  data() {
    return {}
  },
}
</script>

