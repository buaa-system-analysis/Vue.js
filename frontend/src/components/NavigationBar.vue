<template lang="html">
  <el-container style="height: 100%; width: 100%">
    <el-aside style="width: auto" @mouseenter.native="isCollapse=false"
              @mouseleave.native="isCollapse=true">
      <el-row style="height: 100%">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          background-color="#EDE9E9"
          text-color="#fff"
          :collapse="isCollapse">
          <el-menu-item style="padding: 0; height: 85px;">
            <div style="height: 100%; width: 100%; background-color: darkorange">

            </div>
          </el-menu-item>
          <el-menu-item index="1" style="padding: 0">
            <div class="el-menu-item-div">
              <a href="/" style="display: inline-block;width: 100%; height: 100%;">
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
          <el-menu-item index="4" style="padding: 0">
            <div class="el-menu-item-div">
              <a href="purchase" style="display: inline-block;width: 100%; height: 100%;">
                <i class="el-icon-goods" style="color: darkorange"></i>
                <span slot="title" class="menu-item">购买</span>
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
    <el-container>
      <el-header>
        <div style="width: 100%;height: 100%; text-align: left; padding: 20px">
          <div style="width: 30%; display: inline-block"><img src="assets/logo.png"></div>
          <div class="ui icon input" style="width: 50%">
            <input type="text" placeholder="Search...">
            <i class="search icon"></i>
          </div>
        </div>
        <el-divider></el-divider>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer class="footcon">
        <el-row>
          <el-col :span="12">
          <span>
            <h3>关于我们</h3>
            <p>愿原力与你同在</p>
          </span>
          </el-col>
          <el-col :span="6">
          <span>
            <h3>联系我们</h3>
            <p>hestiaskylee@gmail.com | +86 156-5257-5233</p>
          </span>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
        <el-row>
          <p class="foottext">@2019 Barbeque Copyright</p>
        </el-row>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  el: '#Menu',
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
  }
}
</script>

<style>
  .el-menu-item-div{
    width: 100%;
    height: 100%;
    display: inline-block;
    text-align: left;
    margin-left: 10px;
  }
  .el-menu-vertical-demo{
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 120px;
    height: 100%;
  }
  .menu-item{
    color: #475669;
  }
  h3{
    color: #F56C6C;
  }
  .footcon{
    background-color: darkgray;
  }
  .foottext{
    font-family: "Microsoft YaHei", "微软雅黑";
    color: #409EFF;
  }
</style>
