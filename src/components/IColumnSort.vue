<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id" class="idm-column-sort-outer">
    <div class="printtitle">第{{ columnTerm }}期</div>
    <draggable v-model="columnList" tag="div" chosen-class="iprint-ghost" force-fallback="true" animation="300">
      <div class="printli" v-for="(item, index) in columnList" :key="index">
        <span>{{ item.journalColText }}</span>
        <img src="../assets/drag.png" />
        <!-- <svg-icon icon-class="move" className="svgmove"></svg-icon> -->
      </div>
    </draggable>
    <div class="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleConfirm">
        确定
      </a-button>
    </div>
  </div>
</template>

<script>
import { getMockColumnSort } from '../utils/mock'
export default {
  name: 'IPrintAction',
  components: {},
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {},
      columnList: [],
      printDataCopy: {},
      columnTerm: ''
    }
  },
  mounted() {
    this.moduleObject = this.$root.moduleObject;
    this.init()
  },
  methods: {
    handleCancel() {
      top?.window?.closeWin?.()
    },
    handleConfirm() {
      const data = this.columnList.map((item, index) => {
        return {
          ...item,
          colOrder: index + 1
        }
      })
      IDM.http
        .post("ctrl/journal/make/updateColumnSort ", data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .done((res) => {
          console.log(res, "保存成功")
          top?.window?.closeWin?.()
        })
        .error((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init()
    },
    handleStyle() {
      let styleObject = {},
        qiNumObject = {},
        unitObject = {},
        columnObject = {},
        numObject = {},
        articleTitleObject = {},
        articleObject = {},
        articleUnitObject = {},
        nameObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'width':
              styleObject['width'] = element;
              break
            case 'height':
              styleObject['height'] = element;
              break
            case 'ulbox':
              IDM.style.setBoxStyle(styleObject, element)
              break
            case 'bgColor':
              styleObject['background-color'] = element && element.hex8;
              break
            case 'boxShadow':
              styleObject['box-shadow'] = element;
              break
            case 'boxborder':
              IDM.style.setBorderStyle(styleObject, element);
              break
            case 'printName':
              IDM.style.setFontStyle(nameObject, element);
              break
            case 'printQinum':
              IDM.style.setFontStyle(qiNumObject, element);
              break
            case 'printUnit':
              IDM.style.setFontStyle(unitObject, element);
              break
            case 'printColumn':
              IDM.style.setFontStyle(columnObject, element);
              break
            case 'articleTitle':
              IDM.style.setFontStyle(articleTitleObject, element);
              break
            case 'articleStyle':
              IDM.style.setFontStyle(articleObject, element);
              break
            case 'articleUnitStyle':
              IDM.style.setFontStyle(articleUnitObject, element);
              break
            case 'numStyle':
              IDM.style.setFontStyle(numObject, element);
              break
            case 'articleBox':
              IDM.style.setBoxStyle(articleObject, element)
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iprintaction", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iprintaction .print-name", nameObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iprintaction .print-term .print-year", qiNumObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iprintaction .print-term .print-rint", unitObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iprintaction .column-name", columnObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iprintaction .column-p-title .forbid", articleTitleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iprintaction .column-p-content", articleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iprintaction .column-p-unit", articleUnitObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iprintaction .print-num", numObject);
    },
    getData() {
      this.columnTerm = top?.window?.getNum?.() || 0
      if (!this.moduleObject.env || this.moduleObject.env == "develop") {
        setTimeout(() => {
          this.columnList = getMockColumnSort()
        }, 500);
      } else if (this.moduleObject.env == "production") {
        const urlObject = IDM.url.queryObject();
        IDM.http
          .get("ctrl/journal/make/queryColumnSort", { pubId: urlObject.pk })
          .done((res) => {
            this.columnList = res.data
          })
          .error((error) => {
            this.loading = false;
            console.log(error);
          });
      }
    },
    init() {
      this.handleStyle()
      this.ThemeListAttrToStyle()
      this.getData()
    },
    /**
     * @Desc 设置主题
     */
    ThemeListAttrToStyle() {
      let themeList = this.propData.themeList;
      if (!themeList) {
        return
      }
      const themeNamePrefix =
        IDM.setting && IDM.setting.applications && IDM.setting.applications.themeNamePrefix
          ? IDM.setting.applications.themeNamePrefix
          : 'idm-theme-'
      for (var i = 0; i < themeList.length; i++) {
        var item = themeList[i]
        let bulletBgColorObj = {
          'color': item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
        }
        let timeDateStyle = {
          'border-bottom-color': item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
        }
        IDM.setStyleToPageHead(`.${themeNamePrefix}${item.key} #${(this.moduleObject.id || "module_demo")} .iprintaction .column-li .column-name .themeColor`, bulletBgColorObj)
        IDM.setStyleToPageHead(`.${themeNamePrefix}${item.key} #${(this.moduleObject.id || "module_demo")} .iprintaction .column-li .column-name`, timeDateStyle)
        IDM.setStyleToPageHead(`.${themeNamePrefix}${item.key} #${(this.moduleObject.id || "module_demo")} .iprintaction .print-num`, bulletBgColorObj)
        // IDM.setStyleToPageHead(`.${themeNamePrefix}${item.key} .printAction .ant-modal-title`, bulletBgColorObj)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 栏目弹框排序
.idm-column-sort-outer {
  color: #333333;
  padding: 20px 20px 0 20px;
  // height: 300px;

  .printtitle {
    font-size: 18px;
  }

  .printli {
    font-size: 16px;
    padding-top: 10px;
    // display: flex;
    cursor: pointer;

    // justify-content: space-between;
    span {
      display: inline-block;
      width: calc(100% - 19px)
    }

    img {
      display: inline-block;
      width: 18px;
      vertical-align: top;
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    .ant-btn {
      margin: 0 10px;
    }
  }
}
</style>
