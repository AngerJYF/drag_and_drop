<template>
  <div class="nav_left">
    <p class="p_style" draggable="true" @dragstart="drag">拖拽的元素</p>
  </div>
</template>

<script>
export default {
  name: "NavLeft",
  methods: {
    drag(ev) {
      
      console.log(ev.dataTransfer.setData("Text", ev.target.className));
      ev.dataTransfer.setData("Text", ev.target.className);
    }
  }
};
</script>

<style scoped>
.p_style {
  font-size: 35px;
}
.nav_left {
  height: 100%;
  border-right: 1px solid #ccc;
}
</style>
