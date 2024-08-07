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
    <div class="igoodInfo">
      <div class="goodinfo-li" v-for="(item, index) in list" :key="index">
        <div class="goodinfo-left ">
          <img :src="item.img" alt="">
        </div>
        <div class="goodinfo-right mtl10">
          <div>
            <div class="goodinfo-title">{{ item.title }}</div>
            <p>{{ item.desc }}</p>
          </div>
          <div class="goodinfo-option">
            <span v-for="(btn, btnindex) in item.option" :key="btnindex">{{ btn.name }}</span>
          </div>
        </div>
        <span class="goodinfo-tag">{{ item.tag }}</span>
      </div>
    </div>
    <hr>
    <!--自定义指令：1、自动聚焦 2、接受一个参数作为textarea的行数 3、当textarea内容超出行数则自动增加textarea的行数 4、textarea失焦时自动恢复原来参数指定的行数-->
    <div class="goodinfo-textarea">
      <a-textarea v-focus v-model="textareaInput" placeholder="请输入内容"></a-textarea>
    </div>
    <hr>
    <!--编写一个省市县三级联动的下拉框组合控件-->
    <div class="select-box">
      <select id="myselect" v-model="select" @change="(e) => hadnleChange(e, 1)">
        <option :vlaue="item.name" v-for="(item, index) in treeList" :key="index" >{{ item.name }}</option>
      </select>
      <select v-show="selectTree.length" @change="(e) => hadnleChange(e, 2)">
        <option v-for="(item, index) in selectTree" :key="index">{{ item.name }}</option>
      </select>
      <select v-if="childTree.length">
        <option :vlaue="item.name" v-for="(item, index) in childTree" :key="index">{{ item.name }}</option>
      </select>
    </div>
    <hr>
    <!--有这样三个组件，父、子、孙组件 父组件：IGoodInfo  子组件: Son  孙组件：grandson-->
    <div class="container">
      <h2>标题</h2>
      <Son
        :size="size"
        :zoominBtnName="zoominBtnName"
        :zoomoutBtnName="zoomoutBtnName"
        @add="handleAdd"
        @reduce="hadnleReduce"
      />
    </div>
  </div>
</template>

<script>
import Son from '../commonComponents/son.vue';
export default {
  name: 'IGoodInfo',
  components: {
    Son
  },
  data () {
    return {
      size: 16,
      zoominBtnName: '增加',
      zoomoutBtnName: '减少',
      select: [],
      selectTree: [],
      childTree: [],
      textareaInput: "",
      treeList: [
        {
          name: "河南省",
          children: [
            {
              name: "郑州市",
              children: [
                {
                  name: '中原区'
                }
              ]
            },
            {
              name: '洛阳市',
              children: [
                {
                  name: '西宫区'
                }
              ]
            }
          ]
        }
      ],
      list: [
        {
          tag: '标签',
          img: require('../assets/logo.png'),
          title: '标题',
          desc: "描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息",
          option: [
            {
              name: '副标题',
              id: 'sort'
            },
            {
              name: '副标题',
              id: 'group'
            }
          ]
        }
      ],
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {}
    }
  },
  mounted() {
    this.moduleObject = this.$root.moduleObject;
    this.init()
  },
  methods: {
    hadnleChange(e, type) {
      this.handleFindval(e.target.value, type)
    },
    handleFindval(name, type) {
      let chooseItem = this.handleTreeGetChooseId(this.treeList, name);
      if (type == 1){
        this.selectTree = chooseItem.children
        let findChildTree = this.handleTreeGetChooseId(this.treeList, chooseItem.children[0].name)
        this.childTree = findChildTree.children
      } else if (type == 2) {
        this.childTree = chooseItem.children
      }
    },
    // 增加
    handleAdd() {
      this.size++
    },
    // 减少
    hadnleReduce() {
      this.size--
    },
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init()
    },
    // 获取id 对应数据
    handleTreeGetChooseId(tree, chooseId) {
      for(let i=0; i<tree.length; i++) {
        let item = tree[i];
        if (item.name == chooseId) {
          return item
        } else {
          if (item.children) {
            let node = this.handleTreeGetChooseId(item.children, chooseId);
            if (node) {
              return node
            }
          }
        }
      }
    },
    init() {
    }
  }
}
</script>

<style lang="scss" scoped>
.igoodInfo{
  width: 500px;
  padding: 20px;
  background-color: #fff;
  .mtl10{
    margin-left: 10px;
  }
 .goodinfo-li{
    user-select: none;
    display: flex;
    padding: 10px;
    position: relative;
    box-sizing: border-box;
    border-radius: 3px;
    box-shadow: 0px  0px 20px 0px #ccc;
    .goodinfo-left{
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 100px;
        height: 100px;
      }
    }
    .goodinfo-right{
      width: 80%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .goodinfo-title{
        font-weight: 600;
        font-size: 16px;
        font-family: ui-monospace;
      }
      p{
        font-size: 16px;
        color: #ccc;
        padding-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .goodinfo-option{
      width: 100%;
      text-align: right;
      span+span{
        margin-left: 10px;
      }
      span{
        cursor: pointer;
        padding: 4px 3px;
        border: 1px solid #369B36;
        border-radius: 5px;
        color: #529129;
        font-size: 16px;
      }
    }
    .goodinfo-tag{
      font-size: 16px;
      width: 50px;
      background-color: #FF0000;
      color: #fff;
      position: absolute;
      left: 5px;
      text-align: center;
      line-height: 30px;
      border-radius: 0 50px 50px 0;
    }
 }
}
// textarea
.goodinfo-textarea{
  width: 500px;
  textarea{
    width: 100%;
  }
}
.select-box{
  display: flex;
  select{
    margin-left: 20px;
  }
}
</style>
