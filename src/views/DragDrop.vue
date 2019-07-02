<template>
  <div class="dragDrop">
    <!-- 左侧 标签 -->
    <div class="side_bar">
      <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="cloneDog"
        @change="log"
      >
        <div class="list-group-item" v-for="element in list1" :key="element.id">{{ element.name }}</div>
      </draggable>
    </div>

    <!-- 中间 显示 -->
    <div class="edit_content">
      <draggable
        class="dragArea list-group position_alone"
        :list="list2"
        group="people"
        @change="log"
      >
        <div
          class="list-group-item"
          @click="getDataAttr(element)"
          v-for="element in list2"
          :key="element.id"
        >{{ element.name }}</div>
      </draggable>
    </div>

    <!-- 右侧 属性 -->
    <div class="edit_attr">
      <div v-for="item of dataAttr" :key="item.id">
        <div>{{item.id}}</div>
        <!-- <div>{{item.name}}</div> -->
        <input type="text" v-model="changeVal">
      </div>
    </div>

    <!--     <rawDisplayer class="col-3" :value="list1" title="List 1"/>

    <rawDisplayer class="col-3" :value="list2" title="List 2"/>-->
  </div>
</template>

<script>
import draggable from "vuedraggable";

let idGlobal = 8;

export default {
  name: "DragDrop",
  display: "Custom Clone",
  order: 3,
  components: {
    draggable
  },
  data() {
    return {
      dataAttr: [],
      changeVal: "",
      list1: [
        { name: "dog 1", id: 1 },
        { name: "dog 2", id: 2 },
        { name: "dog 3", id: 3 },
        { name: "dog 4", id: 4 }
      ],
      list2: [
        { name: "cat 5", id: 5 },
        { name: "cat 6", id: 6 },
        { name: "cat 7", id: 7 }
      ]
    };
  },
  methods: {
    log: function(evt) {
      // window.console.log(evt);
      console.log(this.list2);
    },
    cloneDog({ id }) {
      return {
        id: idGlobal++,
        name: `cat ${id}`
      };
    },
    getDataAttr(element) {
      this.dataAttr = [];
      this.dataAttr.push(element);
    }
  },
  watch: {
    changeVal(val) {
      console.log(val);
      console.log(this.dataAttr);
      this.dataAttr[0].name = val;
    }
  }
};
</script>
<style scoped>
.side_bar,
.edit_content,
.edit_attr {
  vertical-align: top;
  display: inline-block;
  height: 100%;
}
.dragArea {
  height: 100%;
}
.side_bar {
  width: 200px;
  background: rgb(238, 238, 238);
}
.edit_attr {
  width: 300px;
}
.edit_content {
  width: calc(100% - 200px - 300px);
  background: rgb(206, 233, 248);
}
.list-group-item {
  height: 35px;
  margin: 2px 0;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 5px;
}
.position_alone {
  position: relative;
}
.position_alone .list-group-item {
  display: inline-block;
  /* position: absolute; */
}
input {
  border: 1px solid #ccc;
}
</style>