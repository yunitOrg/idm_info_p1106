<template>
  <div class="print">
    <span v-if="state" @dblclick="handleEdit">{{ addBor ? `(${value})` : value }}</span>
    <a-input
      v-else
      ref="printinput"
      :style="{'width':inputWidth}"
      @click.stop="()=>{}"
      @input="$emit('input', $event.target.value)"
      v-model="value"
      />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    addBor: {
      type: Boolean,
      default: false
    },
    state: {
      type: Boolean,
      default: true
    },
    inputWidth: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleEdit(e) {
      if (this.disabled) return
      this.$emit('edit', e)
      this.$nextTick(() => {
        this.$refs.printinput.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.print{
  display: inline-block;
}
</style>
