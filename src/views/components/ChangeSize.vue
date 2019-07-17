<template>
  <div>
    <div class="box" ref="box">
      拖拽改变大小
      <div
        @mousedown="changeSize($event,index)"
        @mouseup="setPageX($event,index)"
        v-for="(item,index) of 8"
        :key="index"
        class="drapBox"
        :class="generateClassName(index)"
        :ref="generateClassName(index)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeSize",
  data() {
    return {
      ParentWidth: 0,
      ParentHeight: 0,
      startPageX: 0,
      endPageX: 0
    };
  },
  watch: {
    ParentWidth(val) {
      console.log(val);
    },
    ParentHeight(val) {
      console.log(val);
    }
  },
  methods: {
    generateClassName(index) {
      return "box" + (index + 1);
    },
    setPageX(e, index) {
      this.endPageX = e.pageX - 300;
    },
    changeSize(e, index) {
      let drapParent = this.$refs.box;
      let drapChild = document.getElementsByClassName("drapBox")[index];
      let drapParentHeight = drapParent.offsetHeight;
      let drapParentWidth = drapParent.offsetWidth;
      let b = index + 1;
      this.startPageX = e.pageX - 300;
      document.onmousemove = function(ev) {
        let e = ev || event;

        let resultX =
          e.pageX - 300 - drapParent.offsetLeft > 0
            ? e.pageX - 300 - drapParent.offsetLeft
            : 0;
        let resultY =
          e.pageY - drapParent.offsetTop > 0
            ? e.pageY - drapParent.offsetTop
            : 0;
        let offsetLeft = e.pageX - 300 < 0 ? 0 : e.pageX - 300;
        let offsetTop = e.pageY < 0 ? 0 : e.pageY;

        switch (b) {
          case 1:
            drapParent.style.width = resultX + "px";
            drapParent.style.height = resultY + "px";
            console.log("1");
            break;
          case 2:
            drapParent.style.width = resultX + "px";
            console.log("2");
            break;
          case 3:
            drapParent.style.left = e.pageX - 300 + "px";
            console.log("3");
            break;
          case 4:
            drapParent.style.height = resultY + "px";
            console.log("4");
            break;
          case 6:
            drapParent.style.left = offsetLeft + "px";
            // drapParent.style.width = drapParentWidth + offsetLeft + "px";
            console.log("4");
            break;
          case 8:
            drapParent.style.top = offsetTop + "px";
            // drapParent.style.width = drapParentWidth + offsetLeft + "px";
            console.log("4");
            break;
        }
      };

      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };

      /*  if (index + 1 == 1) {
        drapChild.addEventListener("mousedown", e => {
          function move(e) {
            let widthBox = (drapParent.style.width =
              (e.pageX - 300 - drapParent.offsetLeft > 0
                ? e.pageX - 300 - drapParent.offsetLeft
                : 0) + "px");
            let heightBox = (drapParent.style.height =
              (e.pageY - drapParent.offsetTop > 0
                ? e.pageY - drapParent.offsetTop
                : 0) + "px");
          }
          document.addEventListener("mousemove", move);
          document.addEventListener("mouseup", function() {
            document.removeEventListener("mousemove", move);
          });
        });
      } else if (index + 1 == 2) {
        drapChild.addEventListener("mousedown", e => {
          function move(e) {
            drapParent.style.width =
              (e.pageX - 300 - drapParent.offsetLeft > 0
                ? e.pageX - 300 - drapParent.offsetLeft
                : 0) + "px";
          }

          document.addEventListener("mousemove", move);
          document.addEventListener("mouseup", function() {
            document.removeEventListener("mousemove", move);
          });
        });
      } else if (index + 1 == 4) {
        drapChild.addEventListener("mousedown", e => {
          function move(e) {
            drapParent.style.height =
              (e.pageY - drapParent.offsetTop > 0
                ? e.pageY - drapParent.offsetTop
                : 0) + "px";
          }

          document.addEventListener("mousemove", move);
          document.addEventListener("mouseup", function() {
            document.removeEventListener("mousemove", move);
          });
        });
      }*/
    }
  },
  watch: {
    startPageX(val) {
      console.log("startPageX", val);
    },
    endPageX(val) {
      console.log("endPageX", val);
    }
  }
};
</script>

<style scoped>
.box {
  left: 30px;
  top: 30px;
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgb(230, 230, 230);
}
.drapBox {
  position: absolute;
  width: 5px;
  height: 5px;
  background: rgba(0, 81, 255, 0);
}
.box1 {
  cursor: nw-resize;
  bottom: 0;
  right: 0;
  z-index: 2;
}
.box3 {
  cursor: ne-resize;
  bottom: 0;
  left: 0;
  z-index: 2;
}
.box5 {
  cursor: nw-resize;
  top: 0;
  left: 0;
  z-index: 2;
}
.box7 {
  cursor: ne-resize;
  top: 0;
  right: 0;
  z-index: 2;
}
.box2 {
  cursor: e-resize;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 3px;
}
.box4 {
  cursor: n-resize;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
}
.box6 {
  cursor: e-resize;
  top: 0;
  left: 0;
  height: 100%;
  width: 3px;
}
.box8 {
  cursor: n-resize;
  top: 0;
  right: 0;
  width: 100%;
  height: 3px;
}
</style>
