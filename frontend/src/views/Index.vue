<template>
  <el-container>
    <Header></Header>
    <el-container mode="horizontal">
      <div style="margin-top: 15px; width: 35% ;position: absolute;left:32%;top:20%;">
        <img src="../assets/logo.png">
        <el-input placeholder="请输入内容" v-model="input3" style="margin-top: 30px">
          <el-button slot="append" icon="el-icon-search" @click="jump">搜索</el-button>
        </el-input>
      </div>
    </el-container>
    <el-footer>
    </el-footer>
  </el-container>
</template>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>

<script>
import Header from '@/components/Header'
export default {
  data () {
    return {
      input3: '',
      select: ''
    }
  },
  components: {
    Header
  },
  methods: {
    jump () {
      const searchText = this.input3
      this.$router.push({path: '/search', query: {id: searchText}})
    }
  }
}
</script>
