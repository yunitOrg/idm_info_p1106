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
    <div class="InfoFlow" id="InfoFlow">
      <div class="item" v-for="(item) in info" :key="item.name" :id="item.name" :style="setStyle(item, 'item')">
        <div class="item-title" :style="setStyle(item, 'title')">{{ item.title }}</div>
        <div style="padding: 10px;">
          <p>文件标题：{{ item.filebt }}</p>
          <p>文件编号：{{ item.filehao }}</p>
          <p>发起时间：{{ item.sendTime }}</p>
          <p>发件人：{{ item.sendPeople }}</p>
          <p>流程状态：{{ item.type }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const globalConfig = {
  anchor: ['Bottom', 'Top', 'Left', 'Right'], // 锚点
  connector: ['Flowchart', { gap: 10, cornerRadius: 5, alwaysRespectStubs: true }], // 连线
  endpoint: "Blank", // 端点
  paintStyle: {
    strokeWidth: 2,
    stroke: "#44AEFF",
    dashstyle: "2 1",
    outlineStroke: "transparent",
    outlineWidth: 15
    // strokeStyle: '#346789', // 虚线颜色
    // lineWidth: 2, // 线宽
    // strokeDashArray: [15, 15] 
    // strokeStyle: '#1e8151',
    // stroke: '#7AB02C',
    // strokeWidth: 3,
    // fill: 'pink',
    // fillStyle: '#1e8151',
    // radius: 6,
    // lineWidth: 2,
    // strokeDashArray: [5, 5]
  }, // 绘图的样式
  connectorOverlays: [
    ['Arrow', {
      width: 10,
      length: 10,
      location: 1
    }],
    ['Arrow', {
      width: 10,
      length: 10,
      location: 0.2
    }],
    ['Arrow', {
      width: 10,
      length: 10,
      location: 0.7
    }],
    ['Label', {
      label: '',
      cssClass: '',
      labelStyle: {
        color: 'red'
      },
      events: {
        click: function (labelOverlay, originalEvent) {
          console.log('click on label overlay for :' + labelOverlay.component)
          console.log(labelOverlay)
          console.log(originalEvent)
        }
      }
    }]
  ],
  overlays: [
      ['Arrow', {width: 10, length: 10, location: 1}],
      // ['Label', {label: '<button class="delete-node-btn">X</button>', labelStyle: { color: 'red'}, events: {
      //   click: function (labelOverlay, originalEvent) {
      //     console.log(labelOverlay, originalEvent, "===")
      //   }
      // }}]
  ], // 连线样式
  connectorStyle: {
    lineWidth: 2,
    strokeStyle: '#61B7CF',
    joinstyle: 'round',
    fill: 'pink',
    outlineColor: '',
    outlineWidth: ''
    },
    connectorHoverStyle: {
      lineWidth: 2,
      strokeStyle: 'red',
      outlineWidth: 10,
      outlineColor: ''
    },
    hoverPaintStyle: { stroke: 'blue' },
    isSource: true,
  endpointStyle: { fill: 'lightgray', outlineStroke: 'darkgray', outlineWidth: 10 } // 端点样式
}
export default {
  name: 'InfoFlow',
  data() {
    return {
      info: [
        {
          name: 'div1',
          to: ['div2'],
          top: 300,
          left: 100,
          title: '项目管理',
          filebt: "这里是标题文件",
          filehao: '1232323',
          sendTime: '2023-04-15',
          sendPeople: '张三',
          type: '未流转',
          background: '#EEF8FF',
          status: 'success'
        },
        {
          name: 'div2',
          to: ['div3'],
          top: 300,
          left: 400,
          title: '人事管理',
          filebt: "这里是标题文件",
          filehao: '1232323',
          sendTime: '2023-04-15',
          sendPeople: '张三',
          type: '未流转',
          background: '#FFF5EE',
          status: 'success'
        },
        {
          name: 'div3',
          to: ['div4', 'div5'],
          top: 300,
          left: 700,
          title: '人事管理',
          filebt: "这里是标题文件",
          filehao: '1232323',
          sendTime: '2023-04-15',
          sendPeople: '张三',
          type: '未流转',
          background: '#FDE3DF',
          status: 'error'
        },
        {
          name: 'div4',
          to: [],
          top: 120,
          left: 998,
          title: '项目管理',
          filebt: "这里是标题文件",
          filehao: '1232323',
          sendTime: '2023-04-15',
          sendPeople: '张三',
          type: '未流转',
          background: '#EEF8FF',
          status: 'success'
        },
        {
          name: 'div5',
          to: ['div6','div7'],
          top: 462,
          left: 1000,
          title: '项目管理',
          filebt: "这里是标题文件",
          filehao: '1232323',
          sendTime: '2023-04-15',
          sendPeople: '张三',
          type: '未流转',
          background: '#EEF8FF',
          status: 'loading'
        },
        {
          name: 'div6',
          to: [],
          top: 323,
          left: 1291,
          title: '项目管理',
          filebt: "这里是标题文件",
          filehao: '1232323',
          sendTime: '2023-04-15',
          sendPeople: '张三',
          type: '未流转',
          background: '#EEF8FF',
          status: 'loading'
        },
        {
          name: 'div7',
          to: [],
          top: 608,
          left: 1292,
          title: '项目管理',
          filebt: "这里是标题文件",
          filehao: '1232323',
          sendTime: '2023-04-15',
          sendPeople: '张三',
          type: '未流转',
          background: '#EEF8FF',
          status: 'loading'
        }
      ],
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {}
    }
  },
  mounted() {
    this.moduleObject = this.$root.moduleObject;
    this.info.map(item => item = Object.assign(item, globalConfig))
    this.init()
  },
  methods: {
    setStyle(item, type) {
      let obj = {};
      switch (type) {
        case 'item':
          obj = {
            left: item.left + 'px',
            top: item.top + 'px',
            border: `1px solid ${item.background}`,
            background: item.background,
          }
          break;
        case 'title':
          obj = {
            borderBottom: `1px solid #e2e8ec`
          }
          break
      }
      return obj
    },
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init()
    },
    init() {
      let renderList = []
      console.log(this.info, 787)
      this.info.forEach(item => {
        if (item.to.length > 0) {
          item.to.forEach(v => {
            renderList.push({
              source: item.name, // 源节点
              target: v, // 目标节点
              anchor: item.anchor, // 锚点
              connector: item.connector, // 连线
              endpoint: item.endpoint, // 端点
              paintStyle: item.paintStyle,
              overlays: item.overlays, // 连线的样式
              // painStyle: item.painStyle, // 绘图的样式
              endpointStyle: item.endpointStyle, // 端点的样式
              connectorStyle: item.connectorStyle,
              // connectorOverlays: item.connectorOverlays,
              connectorHoverStyle: item.connectorHoverStyle,
              hoverPaintStyle: item.hoverPaintStyle,
              isSource: item.isSource
            })
          })
        }
      })
      window.jsPlumb.ready(() => {
        window.jsPlumb.setContainer('InfoFlow')
        renderList.forEach((item) => {
          window.jsPlumb.connect(item)
          window.jsPlumb.draggable(item.source)
          window.jsPlumb.draggable(item.target)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.InfoFlow{
  position: relative;
  width: 100%;
  height: 100vh;
  .item{
    position: absolute;
    width: 200px;
    border-radius: 5px;
    box-shadow: #eee 3px 3px 3px 3px;
    .item-title{
      line-height: 30px;
      text-align: center;
      color: #333;
    }
  }
}
</style>

