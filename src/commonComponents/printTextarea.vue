<template>
  <div>
    <span v-show="state" @dblclick="handleEdit" v-html="value"></span>
    <div v-html="value"
      ref="printinput"
      contenteditable="true"
      aria-autocomplete="list"
      v-show="!state"
      class="printTextarea"
      @blur="onBlur"
      ></div>
    <!-- <a-textarea
      v-show="!state"
      class="unDrag"
      ref="printinput"
      @click.stop="()=>{}"
      v-model="value"
       @input="$emit('input', $event.target.value)"
      :rows="6"
    /> -->
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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    keepLastIndex(obj) {
      if (window.getSelection) {
        let range = window.getSelection()
        range.selectAllChildren(obj)
        range.collapseToEnd()
      } else if (document.selection) {
        let range = document.selection.createRange() // 创建选择对象
        range.moveToElementText(obj) // range定位到obj
        range.collapse(false) // 光标移到最后
        range.select()
      }
    },
    onBlur(e) {
      this.$emit('input', e.target.innerHTML)
    },
    handleEdit(e) {
      if (this.disabled) return
      this.$emit('edit', e)
      this.$nextTick(() => {
        this.keepLastIndex(this.$refs.printinput)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.printTextarea{
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 4px 11px;
  margin: 1px 0;
  outline: none;
  user-select: auto;
}
.printTextarea:focus{
  border: 1px solid #d9d9d9;
}
.printTextarea:focus-visible{
  border: 1px solid #d9d9d9;
}
</style>
