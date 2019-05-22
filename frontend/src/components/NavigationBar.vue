<template lang="html">
  <el-container style="height: 100%; width: 100%">
    <el-container style="height: 100%; width: 100%">
      <Header></Header>
      <el-main>
        <router-view v-if="isRouterAlive"></router-view>
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
    <Aside></Aside>
  </el-container>
</template>

<script>
import Header from '@/components/Header'
import Aside from '@/components/Aside'
export default {
  name: 'Menu',
  data () {
    return {
      isCollapse: true,
      isRouterAlive: true
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  components: {
    Header,
    Aside
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style scoped>
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
  h3{
    color: #F56C6C;
  }
  .footcon{
    background-color: darkgray;
  }
  .foottext{
    color: #409EFF;
  }
</style>
