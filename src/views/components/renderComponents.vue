<script>
export default {
  props: ["itemAttr"],
  render(createElement) {
    var self = this;
    return createElement(
      this.itemAttr.tagName,
      {
        style: this.itemAttr.style,
        //动态绑定class，同:class
        class: {
          isAbsolute: true
        },
        //普通html特性
        attrs: {
          // href: "",
          // target: "_blank",
          // draggable: this.itemAttr.draggable
        }
        //给div绑定click事件
        // on: {
        //   click: () => {}
        // },
        // 仅用于组件，用于监听原生事件，而不是组件内部使用
        // `vm.$emit` 触发的事件。
        /* nativeOn: {
          click: () => {}
        } */
      },
      this.itemAttr.text
    );
  }
};
</script>

<style scoped>
.isAbsolute {
  position: absolute;
}
</style>

