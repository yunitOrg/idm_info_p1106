<template>
  <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
    <PrintTextarea :propData="propData" :state="false" ref="printTextarea" writeMaxHeight="621px" :moduleObject="moduleObject" height="691px"
      toolbar="undo redo formatpainter clearcontent | blocks fontfamily fontselect fontsize | bold italic underline strikethrough forecolor | h1 h2 h3 | alignleft aligncenter alignright export prints bullist numlist | uploadfile savedoc makelayout print exportdoc"
      v-model="html" :isTextSelection="true" :propAiIcon="false"></PrintTextarea>
  </div>
</template>
<script>
import PrintTextarea from '../commonComponents/printTextarea.vue'
export default {
  name: 'IPrintActionEditor',
  components: {
    PrintTextarea
  },
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        fontContent: "Hello Word"
      },
      html: ''
    }
  },
  watch: {
    html: {
      handler(newVal) {
        top._printContent = newVal
      }
    }
  },
  created() {
    this.moduleObject = this.$root.moduleObject;
  },
  mounted() {
    if (top._printContent) {
      this.$refs.printTextarea.html = top._printContent
    }
  },
  methods: {
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
    },
    reload() {
      //请求数据源
      this.initData();
    },
    initData() {
    },
    receiveBroadcastMessage(object) {
      console.log("组件收到消息", object)
      if (object.type && object.type == "linkageShowModule") {
        this.showThisModuleHandle();
      } else if (object.type && object.type == "linkageHideModule") {
        this.hideThisModuleHandle();
      }
    },
    setContextValue(object) {
      console.log("统一接口设置的值", object);
      if (object.type != "pageCommonInterface") {
        return;
      }
      //这里使用的是子表，所以要循环匹配所有子表的属性然后再去设置修改默认值
      if (object.key == this.propData.dataName) {
        // this.propData.fontContent = this.getExpressData(this.propData.dataName,this.propData.dataFiled,object.data);
        this.$set(this.propData, "fontContent", this.getExpressData(this.propData.dataName, this.propData.dataFiled, object.data));
      }
    },
    sendBroadcastMessage(object) {
      window.IDM.broadcast && window.IDM.broadcast.send(object);
    },
    /**
   * 通用的url参数对象
   * 所有地址的url参数转换
   */
    commonParam() {
      let urlObject = IDM.url.queryObject();
      var params = {
        pageId:
          window.IDM.broadcast && window.IDM.broadcast.pageModule
            ? window.IDM.broadcast.pageModule.id
            : "",
        urlData: JSON.stringify(urlObject),
      };
      return params;
    },
  }
};
</script>