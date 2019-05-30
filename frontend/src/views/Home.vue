<template>
  <div style="margin-top: 30px; padding: 0 17% 0 17%">
    <el-row>
      <el-col :span="4">
        <span style="color: black; font-size: 24px">文献搜索</span>
      </el-col>
      <el-col :span="20">
        <el-input placeholder="请输入内容" v-model="input3">
          <el-button slot="append" icon="el-icon-search" @click="jump">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-divider>
      <span>合作机构</span>
    </el-divider>

    <div class="ui cards" style="width: 100%; margin: 5px; text-align: left">
      <div class="card">
        <div class="content">
          <img class="left floated mini ui image" src="../assets/wiley.png" style="width: 80px">
          <div style="text-align: left; cursor: pointer;">
            <div style="color: black; font-size: 16px; font-weight: bold">John Wiley & Sons Inc</div>
            <div style="color: grey; font-size: 12px">提供专业文献：约350万篇</div>
          </div>
          <div class="description" style="text-align: left">
            Wiley作为一家国际性公司，始终致力于帮助机构与个人拓展通向成功所需的知识与技能。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <img class="left floated mini ui image" src="../assets/cambridge.png" style="width: 80px">
          <div style="text-align: left; cursor: pointer;">
            <div style="color: black; font-size: 16px; font-weight: bold">Cambridge</div>
            <div style="color: grey; font-size: 12px">提供专业文献：约200万篇</div>
          </div>
          <div class="description" style="text-align: left">
            剑桥大学出版社成立于1534年，为英国剑桥大学之分支机构；是历史最悠久及规模最大的出版社之一。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <img class="left floated mini ui image" src="../assets/taylor.png" style="width: 80px">
          <div style="text-align: left; cursor: pointer;">
            <div style="color: black; font-size: 16px; font-weight: bold">Taylor & Francis</div>
            <div style="color: grey; font-size: 12px">提供专业文献：约350万篇</div>
          </div>
          <div class="description" style="text-align: left">
            Taylor & Francis 集团是世界领先的学术出版社，每年出版2500余种期刊，5000多本新书，共有11万多册专业图书在售。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <img class="left floated mini ui image" src="../assets/ingenta.png" style="width: 80px">
          <div style="text-align: left; cursor: pointer;">
            <div style="color: black; font-size: 16px; font-weight: bold">Ingenta</div>
            <div style="color: grey; font-size: 12px">提供专业文献：约450万篇</div>
          </div>
          <div class="description" style="text-align: left">
            Ingenta 是世界领先的内容方案提供商。通过提供整套的商业产品、内容与广告服务以及客户支持与专业服务，Ingenta为出版行业全流程提供解决方案。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <img class="left floated mini ui image" src="../assets/karger.png" style="width: 80px">
          <div style="text-align: left; cursor: pointer;">
            <div style="color: black; font-size: 16px; font-weight: bold">Karger</div>
            <div style="color: grey; font-size: 12px">提供专业文献：约15万篇</div>
          </div>
          <div class="description" style="text-align: left">
            Karger是一家瑞士医学和科技出版公司，它致力于以高质量的出版物服务科学团体的信息需求，内容涵盖所有医学领域。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <img class="left floated mini ui image" src="../assets/scientific.png" style="width: 80px">
          <div style="text-align: left; cursor: pointer;">
            <div style="color: black; font-size: 16px; font-weight: bold">World Scientific</div>
            <div style="color: grey; font-size: 12px">提供专业文献：约14万篇</div>
          </div>
          <div class="description" style="text-align: left">
            世界科技出版公司（World Scientific Publishing Company）是当今亚太地区规模最大的英文科技出版公司，也是世界科技出版公司之一 。
          </div>
        </div>
      </div>
    </div>

    <div>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Purchase',
  data () {
    return {
      input3: ''
    }
  },
  methods: {
    jump () {
      const searchText = this.input3
      this.$router.push({path: '/search', query: {id: searchText}})
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
