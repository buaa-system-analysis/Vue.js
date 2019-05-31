<template>
  <el-aside style="width: auto; height: 100%; position: absolute; padding: 0" @mouseenter.native="isCollapse=false"
            @mouseleave.native="isCollapse=true">
    <el-row style="height: 100%">
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        background-color="#EDE9E9"
        text-color="#fff"
        style="margin-right:10px"
        :collapse="isCollapse">
        <el-menu-item style="padding: 0; height: 61px;">
          <a href="/">
            <div style="height: 100%; width: 100%; background-color: darkorange">
              <i class="el-icon-menu" style="color: white"></i>
            </div>
          </a>
        </el-menu-item>
        <el-menu-item index="1" style="padding: 0">
          <div class="el-menu-item-div">
            <a href="/home" style="display: inline-block;width: 100%; height: 100%;">
              <i class="el-icon-search" style="color: darkorange"></i>
              <span slot="title" class="menu-item">搜索</span>
            </a>
          </div>
        </el-menu-item>
        <el-menu-item index="2" style="padding: 0">
          <div class="el-menu-item-div">
            <a href="scholar" style="display: inline-block;width: 100%; height: 100%;">
              <i class="el-icon-reading" style="color: darkorange"></i>
              <span slot="title" class="menu-item">学者主页</span>
            </a>
          </div>
        </el-menu-item>
        <el-menu-item index="3" style="padding: 0">
          <div class="el-menu-item-div">
            <a href="collection" style="display: inline-block;width: 100%; height: 100%;">
              <i class="el-icon-collection" style="color: darkorange"></i>
              <span slot="title" class="menu-item">收藏</span>
            </a>
          </div>
        </el-menu-item>
        <el-menu-item index="5" style="padding: 0">
          <div class="el-menu-item-div">
            <a href="user" style="display: inline-block;width: 100%; height: 100%;">
              <i class="el-icon-user" style="color: darkorange"></i>
              <span slot="title" class="menu-item">个人中心</span>
            </a>
          </div>
        </el-menu-item>
      </el-menu>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      isCollapse: true
    }
  }
}
</script>

<style scoped>
  .el-menu-item-div{
    width: 100%;
    height: 100%;
    display: inline-block;
    text-align: left;
    margin-left: 10px;
  }
  .el-menu-vertical-demo{
    height: 100%;
    width: auto;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 120px;
    height: 100%;
  }
  .menu-item{
    color: #475669;
  }
</style>
