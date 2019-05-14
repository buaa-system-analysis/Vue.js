<template lang="html">
  <el-container style="height: 100%; width: 100%">
    <el-aside style="width: auto">
      <el-row style="height: 100%">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @click="setcollapse"
          :collapse="isCollapse"
          :collapse-transition="true"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" style="padding: 0">
            <div class="el-menu-item-div">
              <a href="/" style="display: block;width: inherit; height: inherit; padding-left: 10%; padding-right: 20%">
                <i class="el-icon-search"></i>
                <span slot="title" class="menu-item">搜索</span>
              </a>
            </div>
          </el-menu-item>
          <el-menu-item index="2" style="padding: 0">
            <div class="el-menu-item-div">
              <a href="/scholar" style="display: block;width: inherit; height: inherit; padding-left: 10%; padding-right: 20%">
                <i class="el-icon-reading"></i>
                <span slot="title" class="menu-item">学者主页</span>
              </a>
            </div>
          </el-menu-item>
          <el-menu-item index="3" style="padding: 0">
            <div class="el-menu-item-div">
              <a href="collection" style="display: block;width: inherit; height: inherit; padding-left: 10%; padding-right: 20%">
                <i class="el-icon-collection"></i>
                <span slot="title" class="menu-item">收藏</span>
              </a>
            </div>
          </el-menu-item>
          <el-menu-item index="4" style="padding: 0">
            <div class="el-menu-item-div">
              <a href="purchase" style="display: block;width: inherit; height: inherit; padding-left: 10%; padding-right: 20%">
                <i class="el-icon-goods"></i>
                <span slot="title" class="menu-item">购买</span>
              </a>
            </div>
          </el-menu-item>
          <el-menu-item index="5" style="padding: 0">
            <div class="el-menu-item-div">
              <a href="/user" style="display: block;width: inherit; height: inherit; padding-left: 10%; padding-right: 20%">
                <i class="el-icon-user"></i>
                <span slot="title" class="menu-item">个人中心</span>
              </a>
            </div>
          </el-menu-item>
        </el-menu>
      </el-row>
    </el-aside>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" mode="horizontal" style="float:right">
          <el-menu-item index="1" @click="loginDialogVisable = true" v-if="userID === null">登录/注册</el-menu-item>
          <el-submenu index="2" v-if="userID !== null">
            <template slot="title">{{username}}</template>
            <el-menu-item index="2-1">个人主页</el-menu-item>
            <el-menu-item index="2-2" @click="userID = null; usename = '' ">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
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
      isCollapse: false
    }
  },
  methods: {
    setcollapse () {
      this.isCollapse = true
    }
  }
}
</script>

<style>
  .el-menu-item-div{
    width: inherit;
    height: inherit;
  }
  .el-menu-vertical-demo{
    height: 100%;
  }
  .menu-item{
    color: white;
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
