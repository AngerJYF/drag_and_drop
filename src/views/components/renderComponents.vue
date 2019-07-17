<script>
// import MyComponent from "./ChangeSize";
import { maxBy, minBy, cloneDeep } from "lodash";
import VueDragResize from "vue-drag-resize";
import { mapState, mapMutations } from "vuex";

const defaultWidth = 100;
const defaultHeight = 100;

export default {
  props: ["itemAttr", "auxiliaryLine"],
  data() {
    return {
      dataIndex: -1
    };
  },
  computed: {
    ...mapState({
      saveDataArr(state) {
        return state.TransferData.saveDataArr;
      }
    })
  },
  render(createElement) {
    var self = this;
    return createElement(
      VueDragResize,
      {
        style: this.itemAttr.style,
        on: {
          clicked: e => {
            // console.log("e", e.target);
            // console.log("e", e.currentTarget);
            let index = e.currentTarget.getAttribute("data-index");
            console.log(index);
            this.dataIndex = index;
          },
          resizing: this.resizing,
          dragging: this.resizing,
          dragstop: this.dragstop
        },
        attrs: {}
      },
      [
        createElement(
          this.itemAttr.tagName,
          {
            style: this.itemAttr.style,
            class: {
              isAbsolute: true
            }
          },
          this.itemAttr.text
        )
      ]
    );
  },
  methods: {
    clickHandler() {},
    // 改变大小
    resizing(newRect) {
      const Rect = cloneDeep(newRect);
      Rect.width = newRect.width - defaultWidth;
      Rect.height = newRect.height - defaultHeight;
      this.setDataById({
        index: this.dataIndex,
        value: Rect
      });
    },
    dragstop() {
      this.setDataOnStop();
    },
    ...mapMutations(["setDataById", "setDataOnStop"])
  }
};
</script>

<style scoped>
.isAbsolute {
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>

