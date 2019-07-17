<template>
  <div class="layout">
    <!-- <ele></ele> -->
    <div class="sidebar">
      <span draggable="true" @dragstart="dragStart" class="text_box" data-tags="label">文本框</span>
    </div>
    <div class="show_view" @dragover="dragover" @drop="drop">
      <RenderCom
        :is-conflict-check="true"
        :snap="true"
        @boxStyle="getBoxStyle"
        v-for="(item,index) of getSaveData"
        :key="index"
        :itemAttr="item"
        :auxiliaryLine="auxiliary_line"
        :data-index="index"
        @click.native="changeVuexData(index)"
      ></RenderCom>
    </div>
    <div class="edit_model">
      <div class="attr_edit" v-if="currentIndex>=0">
        <div v-for="(item,key) in getSaveData[currentIndex].style" :key="key">
          <p>{{Mapping[key]}}</p>
          <br />
          <el-input
            placeholder="请输入内容"
            :value="getSaveData[currentIndex].style[key]"
            @input="changeVal($event,currentIndex,key)"
          ></el-input>
          <br />
          <br />
        </div>
      </div>
      <div v-for="(item,el) in getSaveData[currentIndex]" v-if="el=='text'" :key="el">
        <p>{{Mapping[el]}}</p>
        <br />
        <el-input
          placeholder="请输入内容"
          :value="getSaveData[currentIndex][el]"
          @input="changeText($event,currentIndex)"
        ></el-input>
        <br />
        <br />
      </div>

      <br />
      <div class="save_changes">
        <el-button type="primary" plain @click="saveChanges">保存设置</el-button>
      </div>
    </div>
    <live-people></live-people>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import LivePeople from "@/common/components/Live2d";
// import "@/common/js/canvas-nest.min.js";
import RenderCom from "./components/renderComponents";
import ArrayAdd from "./components/ArrayAdd";
import ChangeSize from "./components/ChangeSize";

let Mapping = {
  left: "距离父容器左边距离(X):",
  top: "距离父容器顶部距离(Y):",
  text: "文本内容:",
  fontSize: "字体大小:",
  width: "宽度",
  height: "高度"
};

export default {
  name: "Layout",
  components: {
    LivePeople,
    RenderCom
  },
  data() {
    return {
      setLeft: "",
      setTop: "",
      textContent: "",
      fontSize: "",
      currentIndex: -1,
      Mapping,
      auxiliary_line: false,
      getStyleData: ""
    };
  },
  computed: {
    // 获取 vuex 存储的值   this.getSaveData
    ...mapState({
      getSaveData(state) {
        return state.TransferData.saveDataArr;
      }
    })
  },
  methods: {
    // 获取更改 vuex 数据的方法
    ...mapMutations(["transferData"]),

    getBoxStyle(val) {
      this.getStyleData = val;
    },
    // 修改样式
    changeVal(e, index, key) {
      if (Object.keys(this.Mapping).includes(key) == true) {
        this.getSaveData[index].style[key] = "";
        this.getSaveData[index].style[key] = e;
      }
    },
    // 修改文本
    changeText(e, index) {
      this.getSaveData[index].text = "";
      this.getSaveData[index].text = e;
    },
    // 1.设置元素为可拖放
    // 2.元素被拖动时，会发生什么
    dragStart(e) {
      // dataTransfer.setData() 方法设置被拖数据的数据类型和值：
      e.dataTransfer.setData("tags", e.currentTarget.getAttribute("data-tags"));
    },
    // 3.放到何处
    dragover(e) {
      e.preventDefault();
    },
    // 4.进行放置
    drop(e) {
      // e.preventDefault();

      let getTags = e.dataTransfer.getData("tags");
      let sidebarWidth = document.getElementsByClassName("sidebar")[0]
        .offsetWidth;
      let getPageX = e.pageX - sidebarWidth;
      let getPageY = e.pageY;

      let component = {
        tagName: getTags,
        draggable: true,
        text: "默认",
        style: {
          left: getPageX + "px",
          top: getPageY + "px",
          fontSize: "20px",
          width: "50px",
          height: "50px"
        }
      };

      this.transferData(component);
      this.changeVuexData(this.getSaveData.length - 1);
    },
    // 获取 || 更改 vuex 中的值
    changeVuexData(val) {
      this.oneIndex = val;
      this.currentIndex = val;
      this.setLeft = this.getSaveData[val].style["left"];
      this.setTop = this.getSaveData[val].style["top"];
      this.fontSize = this.getSaveData[val].style["fontSize"];
      this.textContent = this.getSaveData[val].text;
    },
    saveChanges() {
      console.log("vuex's data:", JSON.parse(JSON.stringify(this.getSaveData)));
    }
  },
  watch: {}
};
</script>

<style scoped>
/* .isAbsolute >>> .vdr {
  top: 0 !important;
  left: 0 !important;
} */
.layout > div {
  height: 100%;
  display: inline-block;
  vertical-align: top;
  border-right: 1px solid #ccc;
}
.layout .sidebar,
.layout .edit_model {
  position: relative;
  width: 300px;
  background: rgba(187, 187, 187, 0.1);
}
.layout .show_view {
  overflow: hidden;
  width: calc(100% - 600px);
}
.sidebar span {
  user-select: none;
  width: 100px;
  height: 30px;
  line-height: 30px;
  margin: 10px 5px;
  text-align: center;
  display: inline-block;
  border: 1px solid #ccc;
}
.sidebar,
.edit_model,
.show_view {
  position: relative;
}
.show_view span {
  position: absolute;
}
.edit_model {
  padding: 10px;
}
.save_changes {
  text-align: center;
}
</style>
