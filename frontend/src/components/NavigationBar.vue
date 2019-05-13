<template lang="html">
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" style="float:right">
        <el-menu-item index="1" @click="loginDialogVisable = true" v-if="userID === null">登录/注册</el-menu-item>
        <el-submenu index="2" v-if="userID !== null">
          <template slot="title">{{username}}</template>
          <el-menu-item index="2-1">个人主页</el-menu-item>
          <el-menu-item index="2-2" @click="userID = null;usename = '' ">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside>
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              :collapse="false">
              <el-menu-item index="1">
                <i class="el-icon-search"></i>
                <span slot="title">搜索</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">学者主页</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">收藏</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-check"></i>
                <span slot="title">购买</span>
              </el-menu-item>
              <el-menu-item index="5">
                <i class="el-icon-setting"></i>
                <span slot="title">个人中心</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
    </el-container>
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
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style>
  .el-menu-item{
    position: relative;
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
