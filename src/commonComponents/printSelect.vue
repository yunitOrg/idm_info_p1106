<template>
  <div class="print">
    <span v-if="state" @dblclick="handleEdit">{{ value }}</span>
    <a-select v-else v-model="value" :style="`width: ${width}`" @change="handleChange" :disabled="disabled">
      <a-select-option :value="item.value" v-for="(item, index) in option" :key="index">
        {{ item.label}}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    state: {
      type: Boolean,
      default: true
    },
    option: {
      type: Array
    },
    width: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleEdit(e) {
      this.$emit('edit', e)
    },
    handleChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.print{
  display: inline-block;
}
</style>
