<template>
  <div id="app">
    <div class="header">
      <nav-top></nav-top>
    </div>
    <div class="main">
      <!-- <nav-left></nav-left> -->
      <router-view class="router_view"></router-view>
    </div>
  </div>
</template>

<script>
import NavTop from "common/components/NavTop";
import NavLeft from "common/components/NavLeft";

export default {
  data() {
    return {};
  },
  components: {
    NavTop,
    NavLeft
  }
};
</script>

<style>
.header {
  display: none;
}
.main {
  height: 100%;
}
.main > div {
  display: inline-block;
  vertical-align: top;
}
.nav_left {
  width: 320px;
}
.router_view {
  width:100%;
  height: 100%;
}
</style>
