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
    <div class="editor-container" style="border: 1px solid #ccc;" v-show="!state" @blur="onBlur">
      <div class="editor-element" :class="{'is-ai-icon': isAiIcon}">
          <editor
            :id="editorKey"
            v-model="html"
            :init="initOptions()"
            :key="editorKey"
          />
      </div>
      <div class="middle-line" v-show="arrowDirection">
        <div class="arrow-icon-container" :class="arrowDirection === 'right' ? 'arrow-left' : ''"
          @click="handleRightFold">
          <svg class="arrow-icon" viewBox="0 0 1035 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M530.850448 573.163313c32.005172-31.883636 32.111192-87.434343-0.069818-119.489939C399.437114 322.845737 268.507336 191.603071 137.436629 60.506505c-12.621576-12.625455-27.585939-20.686869-45.26804-23.540364-3.529697-0.570182-7.085253-0.999434-10.630465-1.499798-1.025293 0-2.055758 0-3.081051 0-4.035232 0.575354-8.111838 0.943838-12.091475 1.757091-33.298101 6.818909-54.838303 26.616242-63.959919 59.278222-3.201293 11.479919-2.806949 24.85398-1.135192 35.701657 1.751919 11.344162 7.11499 21.818182 14.479515 30.904889 3.444364 4.252444 7.050343 8.418263 10.918788 12.291879 111.045818 111.127273 222.142061 222.222222 333.247354 333.293899 1.444202 1.444202 3.227152 2.554828 5.187232 4.080485-2.121697 2.222545-3.475394 3.696485-4.879515 5.100606C252.653437 625.450667 145.164468 733.112889 37.416912 840.506182c-15.829333 15.773737-33.541172 31.162182-36.146424 54.273293-1.233455 10.908444-1.859232 22.111677 0 32.929616 0.919273 5.363071 3.262061 10.423596 5.494949 15.358707 23.655434 52.318384 89.514667 64.241778 130.66602 23.186101C268.668953 835.315071 399.501761 703.987071 530.850448 573.163313L530.850448 573.163313zM78.451902 35.466343l-12.091475 1.757091C70.345235 36.410182 74.421841 36.041697 78.451902 35.466343L78.451902 35.466343zM551.467498 36.441212c-38.000485 2.858667-70.434909 37.034667-71.651556 75.106263-0.79903 24.979394 8.131232 45.650747 25.691798 63.197091 111.383273 111.252687 222.661818 222.615273 334.015354 333.893818 1.534707 1.534707 3.686141 2.448808 6.595232 4.327434-3.35903 2.667313-5.116121 3.803798-6.565495 5.253172-68.050747 68.000323-136.075636 136.035556-204.100525 204.065616C591.916791 765.814949 548.391619 809.360808 504.845761 852.880808c-19.449535 19.439192-28.328081 42.706747-24.045899 70.054788 4.829091 30.919111 22.440081 52.516202 51.712 63.010909 29.450343 10.550303 56.692364 4.803232 80.49002-15.848727 1.944566-1.682101 3.798626-3.470222 5.616485-5.288081 130.121697-130.111354 259.955071-260.509737 390.546101-390.141414 33.272242-33.035636 33.454545-88.934141 1.206303-121.050505C879.016912 322.804364 748.093599 191.557818 617.028064 60.456081c-12.626747-12.626747-27.611798-20.655838-45.288727-23.505455-3.534869-0.570182-7.090424-0.994263-10.635636-1.484283-1.030465 0-2.055758 0-3.086222 0.005172C555.835013 35.799919 553.659013 36.274424 551.467498 36.441212L551.467498 36.441212zM551.467498 36.441212"
              fill="#3448a5" p-id="4311"></path>
          </svg>
        </div>
      </div>
      <div class="main-box-right" v-show="arrowDirection == 'left'">
        <div class="main-box-right-header just-center">
          <div class="main-box-right-header-left">以下为<span class="write-type-text">{{ getCurrentTypeField('title')
              }}</span>内容</div>
          <div class="just-center cursor re-write-btn" @click="handleDoWrting">
            <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20"
              height="20">
              <path
                d="M55.935033 264.48948c0 0 85.897017-132.548409 221.81443-203.673173 135.916406-71.121743 303.368504-50.646859 413.187968 18.319527 109.819465 68.970415 146.791894 127.160016 146.791894 127.160016l94.59499-53.879895c0 0 19.576483-9.697092 19.576483 12.932142l0 338.379961c0 0 0 30.17399-22.837719 19.395191-19.210878-9.062571-226.959086-127.198289-292.424528-164.466828-35.950145-16.035251-4.365101-29.062068-4.365101-29.062068l91.284402-52.173738c0 0-52.068992-65.209619-128.278989-99.744682-81.576231-42.501826-157.948384-47.541735-251.497925-12.224097-61.002644 23.025054-132.823368 81.988166-184.553949 169.082716L55.935033 264.48948 55.935033 264.48948 55.935033 264.48948zM904.056909 711.697844c0 0-85.897017 132.550423-221.816444 203.671159-135.917413 71.12275-303.366489 50.651895-413.186961-18.315498-109.825508-68.972429-146.790886-127.165052-146.790886-127.165052L27.662591 823.768348c0 0-19.572454 9.703135-19.572454-12.932142L8.090137 472.459267c0 0 0-30.170968 22.831676-19.397205 19.211885 9.067607 226.965129 127.198289 292.430571 164.470856 35.950145 16.035251 4.366109 29.058039 4.366109 29.058039l-91.285409 52.175753c0 0 52.071006 65.206598 128.279996 99.744682 81.57321 42.498804 157.942341 47.540728 251.496918 12.222082 60.998616-23.026061 132.820346-81.983131 184.546898-169.082716L904.056909 711.697844 904.056909 711.697844 904.056909 711.697844zM904.056909 711.697844">
              </path>
            </svg>
            <span class="write-type-text">{{ getCurrentTypeField('title') }}</span>
          </div>
        </div>

        <div class="write-box">
          <div class="write-box-content" :style="{maxHeight: writeMaxHeight}">
            <div class="think-title">
              <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16"
                height="16">
                <path
                  d="M87.133091 928.581818c-57.623273-57.530182-65.163636-155.927273-17.687273-279.272727 18.338909-46.824727 41.332364-91.787636 68.328727-134.237091L139.636364 512l-1.861819-3.072a793.6 793.6 0 0 1-68.421818-134.050909C21.969455 251.345455 29.509818 152.948364 87.133091 95.325091 118.877091 63.581091 164.491636 46.545455 219.694545 46.545455c80.802909 0 179.665455 36.026182 281.134546 99.607272l3.072 1.861818 2.978909-1.861818C608.256 82.664727 707.118545 46.545455 787.921455 46.545455c55.202909 0 100.817455 17.035636 132.468363 48.779636 57.530182 57.623273 65.163636 156.113455 17.687273 279.458909a788.014545 788.014545 0 0 1-68.328727 134.050909l-1.954909 3.165091 1.861818 2.978909c28.392727 45.335273 51.665455 90.577455 68.421818 134.144 47.476364 123.345455 39.936 221.835636-17.687273 279.458909-31.650909 31.744-77.265455 48.779636-132.375273 48.779637-80.896 0-179.665455-36.119273-281.134545-99.607273l-3.165091-1.861818-2.978909 1.861818c-101.469091 63.581091-200.331636 99.700364-281.134545 99.700363-55.202909 0-100.817455-17.035636-132.468364-48.779636z m773.213091-249.483636a662.248727 662.248727 0 0 0-40.215273-84.712727l-4.282182-7.447273-5.213091 6.795636c-65.163636 84.340364-140.846545 159.930182-225.093818 225.093818l-6.795636 5.306182 7.447273 4.189091c74.193455 41.611636 145.221818 65.908364 201.728 65.908364 31.930182 0 57.064727-7.819636 73.541818-24.389818 17.128727-17.035636 24.855273-43.938909 24.389818-76.334546-0.465455-32.581818-9.029818-71.68-25.506909-114.501818zM500.456727 772.654545l3.258182 2.420364 3.351273-2.420364A1127.703273 1127.703273 0 0 0 765.207273 515.351273l2.420363-3.351273-2.420363-3.258182A1119.325091 1119.325091 0 0 0 507.066182 251.345455l-3.351273-2.327273-3.258182 2.420363a1127.889455 1127.889455 0 0 0-258.234182 257.303273l-2.420363 3.258182 2.420363 3.351273a1119.790545 1119.790545 0 0 0 258.234182 257.396363z m361.099637-618.402909c-16.663273-16.570182-41.797818-24.389818-73.634909-24.389818-56.599273 0-127.534545 24.203636-201.728 65.908364l-7.447273 4.189091 6.795636 5.213091c84.340364 65.163636 160.023273 140.753455 225.093818 225.093818l5.213091 6.795636 4.189091-7.447273c16.011636-28.578909 29.789091-56.971636 40.308364-84.712727 16.477091-42.635636 25.134545-81.733818 25.506909-114.315636 0.465455-32.488727-7.261091-59.298909-24.296727-76.334546zM147.083636 344.994909c11.450182 29.137455 24.948364 57.437091 40.308364 84.712727l4.282182 7.354182 5.213091-6.795636a1244.625455 1244.625455 0 0 1 225.000727-225.093818l6.888727-5.213091-7.447272-4.189091c-74.286545-41.704727-145.221818-65.908364-201.821091-65.908364-31.930182 0-57.064727 7.819636-73.541819 24.389818-17.035636 17.035636-24.762182 43.845818-24.296727 76.334546 0.372364 32.581818 9.029818 71.68 25.413818 114.408727z m0 334.103273c-16.477091 42.728727-25.041455 81.826909-25.413818 114.408727-0.465455 32.395636 7.168 59.298909 24.203637 76.334546 16.663273 16.570182 41.797818 24.389818 73.634909 24.389818 56.599273 0 127.534545-24.203636 201.728-65.908364l7.447272-4.189091-6.795636-5.306182a1244.625455 1244.625455 0 0 1-225.000727-225.093818l-5.306182-6.795636-4.189091 7.447273c-15.453091 27.275636-28.858182 55.575273-40.308364 84.712727z"
                  fill="#999" p-id="7012"></path>
                <path fill="#999"
                  d="M543.744 608.721455A104.541091 104.541091 0 0 1 399.080727 512 104.634182 104.634182 0 1 1 543.650909 608.814545z">
                </path>
              </svg>
              <span class="thinking-text" v-show="thinkingStatus == 1">思考中...</span>
              <span class="thinking-over-text" v-show="thinkingStatus == 2">已深度思考</span>
            </div>
            <div class="write-content-main" v-html="writeHtmlContent">

            </div>
            <svg v-show="thinkingStatus == 1" class="loading-icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <path
                d="M511.882596 287.998081h-0.361244a31.998984 31.998984 0 0 1-31.659415-31.977309v-0.361244c0-0.104761 0.115598-11.722364 0.115598-63.658399V96.000564a31.998984 31.998984 0 1 1 64.001581 0V192.001129c0 52.586273-0.111986 63.88237-0.119211 64.337537a32.002596 32.002596 0 0 1-31.977309 31.659415zM511.998194 959.99842a31.998984 31.998984 0 0 1-31.998984-31.998984v-96.379871c0-51.610915-0.111986-63.174332-0.115598-63.286318s0-0.242033 0-0.361243a31.998984 31.998984 0 0 1 63.997968-0.314283c0 0.455167 0.11921 11.711527 0.11921 64.034093v96.307622a31.998984 31.998984 0 0 1-32.002596 31.998984zM330.899406 363.021212a31.897836 31.897836 0 0 1-22.866739-9.612699c-0.075861-0.075861-8.207461-8.370021-44.931515-45.094076L195.198137 240.429485a31.998984 31.998984 0 0 1 45.256635-45.253022L308.336112 263.057803c37.182834 37.182834 45.090463 45.253022 45.41197 45.578141A31.998984 31.998984 0 0 1 330.899406 363.021212zM806.137421 838.11473a31.901448 31.901448 0 0 1-22.628318-9.374279L715.624151 760.859111c-36.724054-36.724054-45.018214-44.859267-45.097687-44.93874a31.998984 31.998984 0 0 1 44.77618-45.729864c0.32512 0.317895 8.395308 8.229136 45.578142 45.411969l67.88134 67.88134a31.998984 31.998984 0 0 1-22.624705 54.630914zM224.000113 838.11473a31.901448 31.901448 0 0 0 22.628317-9.374279l67.88134-67.88134c36.724054-36.724054 45.021826-44.859267 45.097688-44.93874a31.998984 31.998984 0 0 0-44.776181-45.729864c-0.32512 0.317895-8.395308 8.229136-45.578142 45.411969l-67.88134 67.884953a31.998984 31.998984 0 0 0 22.628318 54.627301zM255.948523 544.058589h-0.361244c-0.104761 0-11.722364-0.115598-63.658399-0.115598H95.942765a31.998984 31.998984 0 1 1 0-64.00158h95.996952c52.586273 0 63.88237 0.111986 64.337538 0.11921a31.998984 31.998984 0 0 1 31.659414 31.97731v0.361244a32.002596 32.002596 0 0 1-31.988146 31.659414zM767.939492 544.058589a32.002596 32.002596 0 0 1-31.995372-31.666639v-0.361244a31.998984 31.998984 0 0 1 31.659415-31.970085c0.455167 0 11.754876-0.11921 64.34115-0.11921h96.000564a31.998984 31.998984 0 0 1 0 64.00158H831.944685c-51.936034 0-63.553638 0.111986-63.665624 0.115598h-0.335957zM692.999446 363.0176a31.998984 31.998984 0 0 1-22.863126-54.381656c0.317895-0.32512 8.229136-8.395308 45.41197-45.578141l67.88134-67.884953A31.998984 31.998984 0 1 1 828.693489 240.429485l-67.892177 67.88134c-31.020013 31.023625-41.644196 41.759794-44.241539 44.393262l-0.697201 0.722488a31.908673 31.908673 0 0 1-22.863126 9.591025z"
                fill="#999999"></path>
            </svg>
            <div class="common-icon-container" v-show="thinkingStatus === 2">
              <span class="text text-margin" title="插入" @click="handleOperation('insert')">
                <i class="common-icon common-icon-replace"></i>
              </span>
              <span class="text" title="替换" @click="handleOperation('replace')">
                <i class="common-icon common-icon-replace2"></i>
              </span>
              <span class="text text-margin" title="复制" @click="handleOperation('copy', $event)">
                <i class="common-icon common-icon-copy"></i>
              </span>
              <span class="text" title="删除" @click="handleOperation('delete')">
                <i class="common-icon common-icon-delete"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
//   import "tinymce/icons/default/icons";
import "tinymce/themes/silver";
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/preview";
import "tinymce/plugins/code";
import "tinymce/plugins/link";
import "tinymce/plugins/advlist";
import "tinymce/plugins/codesample";
import "tinymce/plugins/hr";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/autolink";
import "tinymce/plugins/directionality";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/template";
import "tinymce/plugins/charmap";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/autosave";
import "tinymce/plugins/autoresize";
const btnList = [
  {
    title: '续写',
    key: 'continution',
    config: {
      appId: 'cade0835c5a54f8682b6d1b170951407',
      secretKey: 'ff4e01f92151472a8a7b29030e679b7a'
    }
  },
  {
    title: '润色',
    key: 'polish',
    config: {
      appId: '006091de0a0b490fb936a7b785dbb2cc',
      secretKey: 'cc12fb3e0833428b8177f1c417b4cc17'
    }
  },
  {
    title: '扩写',
    key: 'extend',
    config: {
      appId: '21ba44712f40462c986eb601be13102e',
      secretKey: '3cae3e6febd3483ebf4e919a63d3aa04'
    }
  },
  {
    title: '缩写',
    key: 'abbreviation',
    config: {
      appId: '1783eb755e064bb68d126b6eeef581b3',
      secretKey: '6d2cd663f2f842b1bb92f4b171cba0b9'
    }
  }
]

const contentFormat = content => {
  $('#clipboardDiv').remove()
  const divEl = $('<div></div>').attr({ id: 'clipboardDiv' }).css({
    position: 'absolute',
    top: '-10000px',
    left: ' -10000px'
  }).html(content)
  $('body').append(divEl)
  if (window.getSelection && document.createRange) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(divEl[0]);
    selection.removeAllRanges();
    selection.addRange(range);
  } else if (document.body.createTextRange) { // 支持 IE < 9
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(divEl[0]);
    textRange.select();
  }
  var selectedText = "";
  if (window.getSelection) {
    selectedText = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    selectedText = document.selection.createRange().text;
  }
  return selectedText
}

let mdUtils = null


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
    },
    moduleObject: {
      type: Object,
      default: function () {
        return {}
      }
    },
    editorKey: {
      type: String,
      default: IDM.uuid()
    },
    toolbar: {
      type: Array,
      default: function () {
        return 'aiicon undo redo formatpainter clearcontent | blocks fontfamily fontselect fontsize | bold italic underline strikethrough forecolor | h1 h2 h3 | alignleft aligncenter alignright export prints bullist numlist | uploadfile savedoc makelayout print exportdoc'
      }
    },
    isTextSelection:{
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '360px'
    },
    writeMaxHeight: {
      type: String,
      default: '290px'
    },
    propAiIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      editor: null,
      html: "",
      writeContent: '',
      arrowDirection: '',
      thinkingStatus: 0, // 0: 未思考，1: 思考中，2: 思考完成
      currentType: '',
      isAiIcon: false
    }
  },
  components: {
    Editor
  },
  computed: {
    writeHtmlContent() {
      if(mdUtils) {
        return mdUtils.render(this.writeContent)
      }else {
        return this.writeContent
      }
    },
  },
  async created() {
    IDM.http.importFiles(IDM.url.getModuleAssetsWebPath(`/js/clipboard.min.js`, this.moduleObject))
    await IDM.http.importFiles(IDM.url.getModuleAssetsWebPath(`/js/markdown-it.min.js`, this.moduleObject))
    mdUtils = window.markdownit({ breaks: true, html: true })
    this.isAiIcon = this.propAiIcon && top.aiParams && top.aiParams.aiEnabled
  },
  watch: {
    html(newV) {
      this.$emit('input', newV)
    },
    state() {
      this.html = this.value
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },

  methods: {
    initOptions(){
      return {
        height: this.height,
        entity_encoding: 'raw',
        auto_focus: true,
        menubar: false,
        toolbar_mode: "wrap",
        plugins: ["formatpainter", 'table', "fullscreen", "powerpaste"],
        statusbar: false,
        toolbar: this.toolbar,
        content_style: 'html{height: calc(100% - 2rem);}body{font-family: Microsoft Yahei; min-height: 100%},img{max-width:100%;height:auto;},.mce-content-body::-webkit-scrollbar {display: none;},.mce-content-body{-ms-overflow-style: none;}.hidden-scroll{-ms-overflow-style: none;overflow: -moz-scrollbars-none;}.hidden-scroll::-webkit-scrollbar {width: 0!important}',
        font_size_formats: '初号=44pt 小初=36pt 一号=26pt 小一=24pt 二号=22pt 小二=18pt 三号=16pt 小三=15pt 四号=14pt 小四=12pt 五号=10.5pt 小五=9pt 六号=7.5pt 小六=6.5pt 七号=5.5pt 八号=5pt 5pt 5.5pt 6.5px 7.5pt 8pt 9pt 10pt 10.5pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 26pt 28pt 36pt 48pt 56pt 72pt',
        font_family_formats: '微软雅黑=Microsoft Yahei;苹方=PingFangSC-Regular;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei;楷体=KaiTi;方正小标宋=FZXBSJW-GB1-0,方正小标宋,sans-serif;Andale Mono=andale mono,monospace;Arial=arial,helvetica,sans-serif;Arial Black=arial black,sans-serif;Book Antiqua=book antiqua,palatino,serif;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,palatino,serif;Helvetica=helvetica,arial,sans-serif;Impact=impact,sans-serif;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco,monospace;Times New Roman=times new roman,times,serif;Trebuchet MS=trebuchet ms,geneva,sans-serif;Verdana=verdana,geneva,sans-serif;Webdings=webdings;Wingdings=wingdings,zapf dingbats',
        language: "zh_CN",
        powerpaste_word_import: 'merge',
        paste_webkit_styles: "color font-size",
        paste_retain_style_properties: "color font-size",
        language_url: IDM.url.getModuleAssetsWebPath(`/static/tinymce/langs/zh_CN.js`, this.moduleObject),// "./js/tinymce/lang/zh_CN.js",
        skin_url: IDM.url.getModuleAssetsWebPath(`/static/tinymce/skins/ui/oxide`, this.moduleObject), //'/tinymce/skins/ui/oxide',
        content_css: '',
        branding: false,
        resize: false,
        br_in_pre: true,
        placeholder: '请在此输入内容，选择右侧AI功能可辅助您快速写作',
        setup: (editor) => {
          this.editor = editor
          editor.ui.registry.addButton("continution", {
          text: `续写`,
          onAction: it => this.handleSelectToolbar("continution")
        })
        editor.ui.registry.addButton("polish", {
          text: `润色`,
          onAction: it => this.handleSelectToolbar("polish")
        })
        editor.ui.registry.addButton("extend", {
          text: `扩写`,
          onAction: it => this.handleSelectToolbar("extend")
        })
        editor.ui.registry.addButton("abbreviation", {
          text: `缩写`,
          onAction: it => this.handleSelectToolbar("abbreviation")
        })
        if(this.isAiIcon) {
          editor.ui.registry.addButton("aiicon", {
            text: ``,
            icon: "aiicon",
            onAction: it => {
              // editor.execCommand("mceInsertContent", false, '<img src="your-image-url" alt="图片描述" />')
              this.openAiDialog()
            },
          })
        }
        if(this.isTextSelection) {
          editor.ui.registry.addContextToolbar("textselection", {
            predicate: node => {
              return !editor.selection.isCollapsed() && !['TABLE', 'TBODY', 'TR', 'BR', 'TD', 'IMG'].includes(node.nodeName)
            },
            items: "continution | polish | extend | abbreviation",
            position: "selection",
            scope: "node",
          })
        }
        },
      }
    },
    openAiDialog() {
      let _this = this
      top._printContent = _this.html
      top.layer.open({
        title: '智能写作',
        area: ['80vw', '735px'],
        type: 2,
        content: IDM.url.getWebPath('/p1000/idm/index.html#/preview/250811102118Xjl4uIsYIJtCo133A4A'),
        end:function() {
          _this.html = top._printContent
          top._printContentCB && top._printContentCB(top._printContent)
        }
      });
    },
    getCurrentTypeField(key) {
      const item = btnList.find(item => item.key === this.currentType)
      return item ? item[key] : ''
    },
    doCopy(content, event) {
      if(!content) return
      content = contentFormat(content)
      console.log(event.target, 'target')
      let clipboard = new window.ClipboardJS(event.target, {
        text: () => content
      });
      clipboard.on('success', () => {
        top.layer.msg('复制成功', {icon: 1})
        clipboard.destroy()
      });

      clipboard.on('error', () => {
        top.layer.msg('复制失败', {icon: 2})
        clipboard.destroy()
      });
      clipboard.onClick(event)
    },
    async handleOperation(type, evt) {
      const selectContent = this.editor.selection.getContent({format: 'text'})
      switch (type) {
        case 'insert':
          if(selectContent.length === 0) {
            return top.layer.msg('请在左侧的编辑框中选择需要替换的段落！', {icon: 2})
          }
          this.editor.selection.setContent(this.editor.selection.getContent() + this.writeHtmlContent)
          break;
        case 'replace':
          if(selectContent.length === 0) {
            return top.layer.msg('请在左侧的编辑框中选择需要替换的段落！', {icon: 2})
          }
          this.editor.selection.setContent(this.writeHtmlContent)
          break;
        case 'copy':
          this.doCopy(this.writeHtmlContent, evt)
          break;
        case 'delete':
          this.arrowDirection = ''
          break;

      }
    },
    handleSelectToolbar(type) {
      const content = this.editor.selection.getContent({format: 'text'})
      if (content.length <= 100) {
        top.layer.msg('请填写100字以上的内容!', {icon: 2})
        return
      }
      this.arrowDirection = 'left'
      this.currentType = type
      this.handleDoWrting()

    },
    handleDoWrting(){
      const content = this.editor.selection.getContent({format: 'text'})
      this.thinkingStatus = 1
      this.writeContent = ''
      let eventSource = null
      IDM.http.post('/ctrl/AIRich/saveContent', {
        content: content,
        config: JSON.stringify(this.getCurrentTypeField('config'))
      }).done(res => {
        if (res.code == 200) {
          if (eventSource) {
            eventSource.close()
          }
          const uuid = res.data, url = IDM.url.getWebPath("ctrl/AIRich/continueWrite?uuid=" + uuid)
          if (window.EventSource) {
            eventSource = new EventSource(url);
            eventSource.onmessage = (event) => {
              let respStr = event.data.replace(/^data:\s?/, ''), resp = null
              try {
                resp = JSON.parse(respStr)
                if (resp) {
                  let data = resp.data
                  this.writeContent += data.answer || ''
                  if (data.exec_elapsed_secs) {
                    eventSource.close()
                    this.thinkingStatus = 2
                  }
                }
              } catch (error) {
                console.error(error)
              }
            }
            eventSource.onerror = () => {
              eventSource.close()
              top.layer.msg('SSE 连接出错!', {icon: 2})
              console.error('SSE 连接出错!');
            };
          }
        } else {
          top.layer.msg(res.message || '操作失败，请稍后再试！', {icon: 2})
        }
      })
    },
    handleRightFold() {
      this.arrowDirection = this.arrowDirection === 'right' ? 'left' : 'right'
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
<style lang="scss">
.is-ai-icon .tox-toolbar__group:first-child .tox-tbtn:first-child {
  .tox-tbtn__icon-wrap {
    background-image: url("../assets/ai.png");
    background-size: 70% 70%;
    background-position: center;
    background-repeat: no-repeat;
  }
  svg {
    opacity: 0;
  }
}
</style>
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

.middle-line {
  position: relative;
}
.editor-element {
  flex: 1;
}

.arrow-icon-container {
  position: absolute;
  top: calc(50% - 35px);
  left: -8px;
  width: 20px;
  height: 80px;
  background-color: #eaecf6;
  transform: translateY(-50%) perspective(.5em) rotateY(-4deg);
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  z-index: 99;
}

.arrow-icon-container.arrow-left .arrow-icon {
  transform: rotate(180deg);
}

.arrow-icon {
  width: 14px;
  height: 14px;
  position: absolute;
  top: 38%;
  left: 2px;
}

.main-box-right {
  width: 410px;
  overflow: hidden;
  background-color: #fff;
  margin-left: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  flex-shrink: 0;
  border-left: 3px solid #eaecf6;
}

.just-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cursor {
  cursor: pointer;
}

.editor-container {
  display: flex;
}

.main-box-right-header svg {
  margin-right: 6px;
}

.main-box-right-header-left {
  color: #999;
}

.write-box {
  flex: 1;
  overflow: auto;
}

.write-box-content {
  margin-top: 15px;
  position: relative;
  border: 1px solid #e9eaed;
  border-radius: 10px;
  padding: 15px;
  max-height: 290px;
  overflow: auto;
}

.think-title {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #999;
}

.think-title svg {
  margin-right: 5px;
}


.write-content-main {
  margin-top: 10px;
}

.loading-icon {
  animation: rotating 2s linear infinite;
  margin-top: 15px;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.common-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 4px;
  font-size: 20px;
}

.common-icon-container {
  text-align: right;
  margin-top: 5px;
}

.common-icon.common-icon-copy {
  background: url("../assets/images/copy.png") no-repeat center;
  background-size: 88%;
}

.common-icon.common-icon-delete {
  background: url("../assets/images/delete.png") no-repeat center;
  background-size: 88%;
}

.common-icon.common-icon-replace {
  background: url("../assets/images/replace.png") no-repeat center;
  background-size: 85%;
}

.common-icon.common-icon-replace2 {
  background: url("../assets/images/replace2.png") no-repeat center;
  background-size: 92%;
}
</style>