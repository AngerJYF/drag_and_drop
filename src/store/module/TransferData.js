import { maxBy, minBy, cloneDeep } from "lodash";

export default {
  state: {
    saveDataArr: [],
    oldDataArr: []
  },
  mutations: {
    transferData(state, value) {
      const newValue = cloneDeep(value)
      state.saveDataArr.push(value);
      state.oldDataArr.push(newValue);
    },
    setDataById(state, data) {
      const odlData = state.oldDataArr[data.index].style;
      const left = parseInt(odlData.left) + data.value.left + 'px';
      const top = parseInt(odlData.top) + data.value.top + 'px';
      const width = parseInt(odlData.width) + data.value.width + 'px';
      const height = parseInt(odlData.height) + data.value.height + 'px';
      state.saveDataArr[data.index].style.left = left;
      state.saveDataArr[data.index].style.top = top;
      state.saveDataArr[data.index].style.width = width;
      state.saveDataArr[data.index].style.height = height;
    },
    setDataOnStop(state) {
      // console.log(state.saveDataArr)
    }
  }
}