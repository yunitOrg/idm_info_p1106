<template>
  <div class="grandson">
    <a-button @click="hanldeMinBtnName">{{ zoomoutBtnName }}</a-button>
    <a-button @click="hanldeOutBtnName" style="margin-left: 10px;">{{ zoominBtnName }}</a-button>
  </div>
</template>

<script>
export default {
  name: 'grandson',
  props: ['zoominBtnName', 'zoomoutBtnName', 'add', 'reduce'],
  data() {
    return {}
  },
  methods: {
    // 减少
    hanldeMinBtnName() {
      this.$listeners.reduce()
    },
    // 增加
    hanldeOutBtnName() {
      this.$listeners.add()
    }
  }
}
</script>

