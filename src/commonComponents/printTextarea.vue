<template>
  <div>
    <div v-show="state" @dblclick="handleEdit" v-html="value"></div>
    <!-- <div v-html="value" ref="printinput" contenteditable="true" aria-autocomplete="list" v-show="!state"
      class="printTextarea" @blur="onBlur"></div> -->
    <!-- <a-textarea
      v-show="!state"
      class="unDrag"
      ref="printinput"
      @click.stop="()=>{}"
      v-model="value"
       @input="$emit('input', $event.target.value)"
      :rows="6"
    /> -->
    <div style="border: 1px solid #ccc;" v-show="!state" @blur="onBlur">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor style="height: 220px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode"
        @onCreated="onCreated" />
    </div>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
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
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {
        excludeKeys: [
          'insertImage',
          'group-video',
          'insertVideo',
          'uploadVideo',
          'fullScreen'
        ]
      },
      editorConfig: {
        MENU_CONF: {
          uploadImage: {
            // fieldName:"image",
            // server:IDM?.url?.getContextWebUrl('/abc') || '/abc',
            // server:"/abc",
            async customUpload(file, insertFn) {
              console.log(res, 123)
              const formData = new FormData();
              formData.append('file', file);
              const res = await IDM.http
                .post("ctrl/journal/make/uploadImg", formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
              console.log(res)
              insertFn(res.data.data.url, '', '')
            }
          }
        }
      },
      mode: 'default', // or 'default'
    }
  },
  components: {
    Editor, Toolbar
  },
  watch: {
    html(newV) {
      this.$emit('input', newV)
    },
    state(){
      this.html = this.value
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },

  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      // console.log(this.editor.getConfig())
    },
    onBlur(e) {
      this.$emit('input', this.html)
    },
    handleEdit(e) {
      if (this.disabled) return
      this.$emit('edit', e)
      this.html = this.value
      this.$nextTick(() => {
        this.editor.focus()
      })
    },
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
.printTextarea {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 4px 11px;
  margin: 1px 0;
  outline: none;
  user-select: auto;
}

.printTextarea:focus {
  border: 1px solid #d9d9d9;
}

.printTextarea:focus-visible {
  border: 1px solid #d9d9d9;
}
</style>