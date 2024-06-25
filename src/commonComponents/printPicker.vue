<template>
  <div class="print">
    <span v-if="state" @dblclick="handleEdit">{{ value }}</span>
    <a-date-picker v-else :default-value="handleVal()" @change="onChange" />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    value: {
      type: String
    },
    state: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      dateFormat: 'YYYY/MM/DD',
      dealVal: ''
    }
  },
  methods: {
    handleVal() {
      let val = this.handleDraw(this.value)
      let num = val.join('/')
      return moment(num, this.dateFormat)
    },
    handleDraw(str) {
      if (!str) return
      return str.match(/\d+/g).map(Number);
    },
    handleEdit(e) {
      this.$emit('edit', e)
    },
    onChange(date, dateString) {
      // let dat = dateString.split('-')
      // let time = `${dat[0]}年${dat[1]}月${dat[2]}日`
      this.$emit('input', dateString)
    }
  }
}
</script>

<style lang="scss" scoped>
.print{
  display: inline-block;
}
</style>
