<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module"
    :id="moduleObject.id"
    :idm-ctrl-id="moduleObject.id">
    <div class="iprintaction" ref="iprintaction">
      <div
        class="print-num"
        :style="{ 'right': propData.numRight, 'top': propData.numTop }"
      >共<span>{{ numAll }}</span>条信息</div>
      <a-spin class="icloud-listright" :spinning="loading">
      <div class="print-name textcenter">{{ printData.journalNameText }}</div>
      <div class="print-term textcenter">
        <span class="print-rint">{{ printData.unit }}</span>
        <div class="print-year">
          <PrintSelect
            v-model="printData.termyear"
            :state="editSelect"
            :option="selectOption"
            width="100px"
            :disabled="!isEdit"
            @change="PrintSave"
          ></PrintSelect>
          第
          <PrintSelect
            v-model="printData.term"
            :state="editSelect"
            :option="termOption"
            width="80px"
            :disabled="!isEdit"
            @change="PrintSave"
          ></PrintSelect>
          期
        </div>
        <span class="print-rint">{{ handleFormatYear(printData.year) }}</span>
      </div>
      <!--栏目-->
      <div class="column-li" v-for="(item, index) in printData.columns" :key="index">
        <div class="column-name textcenter" >
          <!-- <a-icon :type="item.isShow ? 'minus' : 'plus'" /> -->
          <svg-icon class="themeColor" icon-class="shu"></svg-icon>
          <span class="themeColor" v-if="item.isColumnInput">{{ item.columnName }}</span>
          <a-input
            v-else
            ref="columnInput"
            class="column-name-input"
            v-model="item.columnName"
            @click.stop="()=>{}"
            @blur="handleColumnInput(item)"
          />
          <span class="themeColor" v-if="item.articles" style="padding-left: 5px;">({{ item.articles?.length }})</span>
          <!--收缩-->
          <span class="columnnone pd-le20" @click.stop="handleColumnName(item)">
            <img :src="item.isShow?hideimg:showimg" alt="">
          </span>
          <!--删除栏目-->
          <span class="columnnone pd-le20" @click.stop="delteColumn(index)" v-if="isEdit">
            <img src="../assets/delete.png" alt="">
          </span>
          <!--编辑栏目-->
          <span class="columnnone pd-le20" @click.stop="editColumnName(item)" v-if="isEdit">
            <img src="../assets/edit.png" alt="">
          </span>
        </div>
        <!--模块-->
        <template v-if="item.isShow">
          <draggable
            tag="div"
            chosen-class="iprint-ghost"
            force-fallback="true"
            v-model="item.articles"
            animation="300"
            draggable=".item"
            handle=".defaultTypeTag"
            @start="dragStart"
            @end="dragEnd"
            :disabled="editStateBtn.show">
              <div class="column-p item"
                :class="subitem.editState?'':'boxshadow'"
                v-for="(subitem, subindex) in item.articles"
                :key="subindex"
                @contextmenu="(event) => showContentMenu(event, item, subitem, subindex)">
                <div class="column-p-title cursorpoin" @click="handleColumnName(subitem)">
                  <span class="forbid">
                    <a-icon class="column-icon" :type="subitem.isShow ? 'caret-right' : 'caret-down'" />
                    <PrintInput
                      v-model="subitem.reportFileBt"
                      :state="subitem.editState"
                      inputWidth="300px"
                      :disabled="!isEdit"
                      @edit="(e) => handleEdit(e, subitem)"
                    ></PrintInput>
                  </span>
                  <div class="defaultTypeTag" @click.stop="handleMoveModule(subitem)" v-if="isEdit">
                    <img src="../assets/drag.png" />
                  </div>
                </div>
                <template v-if="subitem.isShow">
                  <PrintTextarea
                    class="column-p-content forbid"
                    v-model="subitem.content"
                    :state="subitem.editState"
                    :disabled="!isEdit"
                    @edit="(e) => handleEdit(e, subitem)"
                  ></PrintTextarea>
                  <PrintInput
                    class="column-p-unit forbid"
                    v-model="subitem.reportDeptText"
                    inputWidth="200px"
                    :addBor="propData.addPart"
                    :disabled="!isEdit"
                    :state="subitem.editState"
                    @edit="(e) => handleEdit(e, subitem)"
                  ></PrintInput>
                </template>
                <div class="textright" v-if="!subitem.editState">
                  <a-button value="small" type="primary" @click="handleSveState">保存</a-button>
                </div>
              </div>
          </draggable>
        </template>
      </div>
      <!--鼠标右键菜单-->
      <div class="column-menu" v-show="menuObj.show" @mouseleave="hideMenu" :style="{ 'left': menuObj.x+'px', 'top': menuObj.y+'px' }">
        <div class="menu-li" v-for="(item, index) in menuList" :key="index" @click="handleMenu(item)">
          <svg-icon v-if="item.svg" :icon-class="item.svgname"></svg-icon>
          <a-icon v-else :type="item.icon" />
          <span>{{ item.name }}</span>
        </div>
      </div>
      <!--确定取消-->
      <!-- <div class="editStateBtn" v-show="editStateBtn.show" :style="{ 'left': editStateBtn.x+'px', 'top': editStateBtn.y+'px' }">
        <a-button value="small" @click="handleSveState">保存</a-button>
      </div> -->
      </a-spin>
    </div>
    <!--栏目排序弹框-->
    <Dialog
      v-show="dialogObj.show"
      :title="dialogObj.title"
      :visible.sync="dialogObj.show"
      :confirmLoading="dialogObj.confirmLoading"
      :ok="handleDialogOk"
      :footerDisabled="!isEdit"
      width="400px"
    >
    <div class="printContent">
      <div class="printtitle">{{ printData.name }}第{{ printData.term }}期</div>
      <template v-if="!isEdit">
        <div class="printli" v-for="(item, index) in printDataCopy.columns" :key="index">
          <span>{{ item.columnName }}</span>
        </div>
      </template>
      <template v-else>
        <draggable
          v-model="printDataCopy.columns"
          tag="div"
          chosen-class="iprint-ghost"
          force-fallback="true"
          animation="300"
          >
          <div class="printli" v-for="(item, index) in printDataCopy.columns" :key="index">
            <span>{{ item.columnName }}</span>
            <img src="../assets/drag.png" />
            <!-- <svg-icon icon-class="move" className="svgmove"></svg-icon> -->
          </div>
        </draggable>
      </template>
    </div>
  </Dialog>
  </div>
</template>

<script>
import { getMockPrintAction } from '../utils/mock'
import IPrintAction from '../mixins/IPrintAction'
import Dialog from '../commonComponents/dialog.vue'
import PrintInput from '../commonComponents/printInput.vue'
import PrintTextarea from '../commonComponents/printTextarea.vue'
import PrintSelect from '../commonComponents/printSelect.vue'
export default {
  name: 'IPrintAction',
  components: {
    Dialog,
    PrintInput,
    PrintTextarea,
    PrintSelect,
  },
  mixins: [IPrintAction],
  data () {
    return {
      selectOption: [],
      termOption: [],
      editSelect: false,
      editState: true, // true：默认文字 false：编辑状态
      editShow: false,
      printData: {},
      loading: false,
      editStateBtn: { // 按钮状态
        show: false,
        x: 0,
        y: 0
      },
      menuObj: {
        x: 0,
        y: 0,
        show: false
      },
      // 是否可编辑 true 可编辑 false 不可编辑  默认可编辑
      isEdit: true,
      oprateObj: {},
      printDataCopy: {},
      dialogObj: {
        title: "栏目排序",
        show: false,
        confirmLoading: false
      },
      menuList: [
        {
          id: 'see',
          name: '查看原文',
          svg: true,
          svgname: 'see'
        },
        {
          id: 'add',
          name: '添加信息',
          svg: false,
          icon: 'plus-circle'
        },
        {
          id: 'delete',
          name: '移除信息',
          svg: false,
          icon: 'close'
        },
        {
          id: 'move',
          name: '移动位置',
          svg: true,
          svgname: 'move'
        }
      ]
    }
  },
  computed: {
    numAll() {
      let num = 0;
      this.printData.columns?.forEach(item => {
        num += item?.articles?item?.articles.length:0
      })
      return num
    },
    showimg() {
      let defaultimg = require('../assets/showBox.png')
      return IDM.url.getModuleAssetsWebPath(defaultimg, this.moduleObject)
    },
    hideimg() {
      let defaultimg = require('../assets/hideBox.png')
      return IDM.url.getModuleAssetsWebPath(defaultimg, this.moduleObject)
    }
  },
  mounted() {
    this.moduleObject = this.$root.moduleObject;
    this.windowMountAttribute()
    this.isEditFunc()
    this.init()
    let {period, num} = this.handleGetYearyQi()
    if (period) {
      period = period.map(item => ({value: item, label: `${item}年`}))
    }
    if (num) {
      num = num.map(item => ({value: item, label: item}))
    }
    this.selectOption = period
    this.termOption = num
  },
  methods: {
    // 是否可编辑
    isEditFunc() {
      if (this.propData.handleIsEditFunc && this.propData.handleIsEditFunc.length > 0) {
        let name = this.propData.handleIsEditFunc[0].name
        this.isEdit = window[name] && window[name].call(this, {
          _this: this
        });
      } else {
        this.isEdit = true
      }
    },
    handleFormatYear(year) {
      if (year) {
        let ti = year.split('-')
        return `${ti[0]}年${ti[1]}月${ti[2]}日`
      }
      return year
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
    getMockData() {
      this.printData = getMockPrintAction()
      this.setData()
    },
    // 设置数据
    setData() {
      this.printData?.columns.forEach(item => {
        this.$set(item, 'isShow', true)
        this.$set(item, 'isColumnInput', true)
        if (item.articles) {
          item.articles.forEach(k => {
            this.$set(k, 'isShow', true)
            this.$set(k, 'editState', true)
          })
        }
      })
      try{
        let name = 'handleAddLogic';
        window[name] && window[name].call(this, {
          _this: this,
          data: this.printData
        });
      } catch(e) {
        console.log(e,'增加逻辑')
      }
      this.printDataCopy = JSON.parse(JSON.stringify(this.printData))
    },
    initData() {
      if (this.moduleObject.env !== 'production') {
        this.getMockData()
        return
      }
      switch(this.propData.dataSourceType) {
        case 'datasource': {
          if (this.propData.dataSource) {
            IDM.datasource.request(this.propData.dataSource[0]?.id, {
              moduleObject: this.moduleObject
              }, (data) => {
                this.PrintGetData(data)
            })
          }
        }
          break
        case 'customFunction':{
          if (this.propData.handleCustomFun && this.propData.handleCustomFun.length > 0) {
            let name = this.propData.handleCustomFun[0].name
            let obj = window[name] && window[name].call(this, {
              _this: this
            });
            this.PrintGetData(obj)
          }
        }
          break
      }
    },
    init() {
      this.handleStyle()
      this.initData()
      this.ThemeListAttrToStyle()
    }
  }
}
</script>

<style lang="scss">
.printAction{
  .ant-modal-footer{
    border: 0;
    text-align: center;
    div{
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
  .ant-modal-header{
    background-color: #F2F2F2;
  }
  .ant-modal-title{
    font-size: 20px;
  }
  .ant-modal-close-x{
    font-size: 20px;
  }
}
</style>

<style lang="scss" scoped>
.iprintaction{
  position: relative;
  margin: 0 auto;
  ::v-deep p{
    padding: 0;
    margin: 0;
  }
  .textright{
    text-align: right;
  }
  .print-num{
    position: absolute;
    span{
      padding: 0 4px;
      color: #FF0100;
    }
  }
  .boxshadow{
    padding: 10px;
    border-radius: 3px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  }
  & > div{
    // cursor: pointer;
  }
  .column-icon{
    color: #ccc;
    font-size: 20px;
  }
  .textcenter{
    text-align: center;
  }
  .iprint-ghost{
    opacity: 0.5;
    background: #fff !important;
  }
  .cursorpoin{
    cursor: pointer;
  }
  .column-name-input{
    width: 200px;
  }
  .columnnone{
    vertical-align: top;
    display: none;
  }
  .pd-le20{
    padding-left: 18px;
    vertical-align: middle;
  }
  .print-term{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    position: relative;
  }
  .print-year{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .columnborder{
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 2px;
  }
  .print-name, .column-p-unit{
    width: 100%;
  }
  .column-p-unit{
    text-align: right;
    padding: 10px 0 10px 0;
    ::v-deep input{
      text-align: right
    }
  }
  .column-p-content{
    text-align: justify;
  }
  .column-li{
    padding-top: 20px;
    .column-name{
      padding-bottom: 3px;
      text-align: left;
      border-bottom: 1px solid #0086D9;
      transition: all 1s;
      .columnnone{
        cursor: pointer;
      }
      &:hover{
        .columnnone{
          display: inline-block;
        }
      }
    }
    .column-p{
      margin-top: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #E6E6E6;
    }
    .column-p:last-child{
      border: 0
    }
    .column-p-title{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .column-p-title span{
      width: 95%;
    }
    .column-p-title span:hover{
      color: #ea9f9f;
    }
  }
  .editStateBtn{
    position: absolute;
  }
  // 菜单
  .column-menu{
    width: 121px;
    height: 170px;
    background-color: #fff;
    box-shadow: 0px 0px 2px 0px #ccc7c7;
    border: 1px solid #e5dede;
    border-radius: 3px;
    position: absolute;
    top: 0;
    cursor: pointer;
    .menu-li{
      height: 42px;
      line-height: 42px;
      padding: 0 15px;
      &:hover{
        background-color: rgba(0,0,0,0.1);
      }
      svg, i{
        font-size: 18px;
        vertical-align: middle;
      }
      span{
        padding-left: 5px;
      }
    }
  }
}
.svgmove{
  font-size: 24px;
}
// 栏目弹框排序
.printContent{
  color: #333333;
  .printtitle{
    font-size: 18px;
  }
  .printli{
    font-size: 16px;
    padding-top: 10px;
    // display: flex;
    cursor: pointer;
    // justify-content: space-between;
    span{
      display: inline-block;
      width: calc(100% - 19px)
    }
    img{
      display: inline-block;
      width: 18px;
      vertical-align: top;
    }
  }
}
</style>
