<template>
  <div class="array_add">
    <button class="control" @click="AddOne">+1</button>
    <span v-for="(item,index) of ArrayAdd" :key="index">{{item}}</span>
    <button class="control" @click="LessOne">-1</button>
  </div>
</template>

<script>
let ArrayAdd = [1, 2, 3, 4, 5, 6, 7, 8];
export default {
  name: "ArrayAdd",
  data() {
    return {
      ArrayAdd
    };
  },
  mounted() {
    this.resultArr();
  },
  methods: {
    resultArr() {
      this.ArrayAdd = this.ArrayAdd.slice(0, this.ArrayAdd.length);
    },
    AddOne() {
      if (this.ArrayAdd[this.ArrayAdd.length - 1] < 20) {
        this.ArrayAdd = this.ArrayAdd.map(item => item + 1);
      }
    },
    LessOne() {
      if (this.ArrayAdd[0] > 1) {
        this.ArrayAdd = this.ArrayAdd.map(item => item - 1);
      }
    }
  }
};
</script>

<style scoped>
.control {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  margin: 0 10px;
  user-select: none;
  background: #ccc;
}
span {
  display: inline-block;
  width: 20px;
  height: 15px;
  line-height: 15px;
  text-align: center;
}
</style>
