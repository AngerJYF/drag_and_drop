<template>
  <div class="layout">
    <!-- <ele></ele> -->
    <div class="sidebar">
      <span draggable="true" @dragstart="dragStart" class="text_box" data-tags="label">文本框</span>
    </div>
    <div class="show_view" @dragover="dragover" @drop="drop">
      <RenderCom
        v-for="(item,index) of getSaveData"
        :key="index"
        :itemAttr="item"
        :data-index="index"
        @click.native="changeVuexData(index)"
      ></RenderCom>
        <!-- @mousedown.native="changeAxios($event,index)" -->
      <!-- <ArrayAdd></ArrayAdd> -->
    </div>
    <div class="edit_model">
      <div class="attr_edit" v-if="currentIndex>=0">
        <div v-for="(item,key) in getSaveData[currentIndex].style" :key="key">
          <p>{{Mapping[key]}}</p>
          <br>
          <el-input
            placeholder="请输入内容"
            :value="getSaveData[currentIndex].style[key]"
            @input="changeVal($event,currentIndex,key)"
          ></el-input>
          <br>
          <br>
        </div>
      </div>
      <div v-for="(item,el) in getSaveData[currentIndex]" v-if="el=='text'" :key="el">
        <p>{{Mapping[el]}}</p>
        <br>
        <el-input
          placeholder="请输入内容"
          :value="getSaveData[currentIndex][el]"
          @input="changeText($event,currentIndex)"
        ></el-input>
        <br>
        <br>
      </div>

      <br>
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

let Mapping = {
  left: "距离父容器左边距离(X):",
  top: "距离父容器顶部距离(Y):",
  text: "文本内容:",
  fontSize: "字体大小:",
  width: "宽度"
};

export default {
  name: "Layout",
  components: {
    LivePeople,
    RenderCom,
    ArrayAdd
  },
  data() {
    return {
      setLeft: "",
      setTop: "",
      textContent: "",
      fontSize: "",
      currentIndex: -1,
      Mapping
    };
  },
  methods: {
    // 获取更改 vuex 数据的方法
    ...mapMutations(["transferData"]),
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
    
    /* changeAxios(e, val) {
      console.log("e", e);
      console.log("index", val);
      function move(e) {
        console.log("e", e);
      }
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", move);
      });
      console.log(this.getSaveData[val].style["left"]);
      this.setLeft = this.getSaveData[val].style["left"];
      this.setTop = this.getSaveData[val].style["top"];
      this.fontSize = this.getSaveData[val].style["fontSize"];
      this.textContent = this.getSaveData[val].text;
    }, */
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
      console.log("getTags:===>", getTags);
      let sidebarWidth = document.getElementsByClassName("sidebar")[0]
        .offsetWidth;

      let component = {
        tagName: getTags,
        draggable: true,
        text: "默认",
        style: {
          left: e.clientX - sidebarWidth + "px",
          top: e.clientY + "px",
          fontSize: "20px",
          width: "100px"
        }
      };

      this.transferData(component);
      this.showAttrData();
      this.changeVuexData(this.getSaveData.length - 1);
    },
    // 获取 || 更改 vuex 中的值
    changeVuexData(val) {
      this.currentIndex = val;
      this.setLeft = this.getSaveData[val].style["left"];
      this.setTop = this.getSaveData[val].style["top"];
      this.fontSize = this.getSaveData[val].style["fontSize"];
      this.textContent = this.getSaveData[val].text;
    },
    showAttrData() {
      this.setLeft = this.getSaveData[this.getSaveData.length - 1].style[
        "left"
      ];
      this.setTop = this.getSaveData[this.getSaveData.length - 1].style["top"];
      this.fontSize = this.getSaveData[this.getSaveData.length - 1].style[
        "fontSize"
      ];
      this.textContent = this.getSaveData[this.getSaveData.length - 1].text;
    },
    saveChanges() {
      console.log("vuex's data:", JSON.parse(JSON.stringify(this.getSaveData)));
    }
  },
  computed: {
    // 获取 vuex 存储的值   this.getSaveData
    ...mapState({
      getSaveData(state) {
        return state.TransferData.saveDataArr;
      }
    })
  },
  watch: {}
};
</script>

<style scoped>
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
