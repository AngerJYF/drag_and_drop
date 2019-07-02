
export default {
  state: {
    saveDataArr: []
  },
  mutations: {
    transferData(state, value) {
      state.saveDataArr.push(value);
    }
  }
}