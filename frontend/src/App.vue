<template>
  <div id="app" class="isComponent">
    <!-- <el-button type="primary" class="test">字体测试</el-button> -->
    <router-view></router-view>
    <!-- <router-view name="index"></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body, #app {
  height: 100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 0px;
}
</style>
