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
      <span>热点信息</span>
    </el-divider>
    <div>
      <el-carousel indicator-position="outside" type="card">
        <el-carousel-item v-for="item in carousel" :key="item">
          <a :href="item['url']">
            <div style="
              width: 100%; height: 100%; display: block; position: relative"
                 :style="{backgroundImage: 'url(' + item['img'] + ')'}">
              <p style="color: white; font-size: 24px; position: absolute; bottom: 0; padding: 10px 10px 10px 10px; text-align: left">
                {{item['text']}}</p>
            </div>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>

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

  </div>
</template>

<script>
export default {
  name: 'Purchase',
  data () {
    return {
      input3: '',
      carousel: [
        {
          url: 'https://www.leiphone.com/news/201905/BqtdEApe6yLEX1s0.html',
          text: 'AI奇袭金融业，如何抢占下一个十年高地？| CCF-GAIR 2019',
          img: 'https://static.leiphone.com/uploads/new/homepagerecommend/pic/201905/5ce4ffd0d1041.jpg?imageMogr2/thumbnail/!510x322r/gravity/Center/crop/510x322/quality/90'
        },
        {
          url: 'https://www.leiphone.com/news/201906/LE5EiZjfWaATt7D1.html',
          text: 'IEEE突然宣布解除对华为编辑和同行评审活动的限制!',
          img: 'https://static.leiphone.com/uploads/new/article/pic/201906/5cf485e31b500.jpg?imageMogr2/thumbnail/!480x290r/gravity/Center/crop/480x290/quality/90'
        },
        {
          url: 'https://www.leiphone.com/news/201906/RWFjKq3dULaYrNmC.html',
          text: '2019 自然语言处理前沿论坛成功举办，百度 NLP 技术全揭秘',
          img: 'https://static.leiphone.com/uploads/new/article/pic/201906/5cf4912e4c054.jpg?imageMogr2/thumbnail/!480x290r/gravity/Center/crop/480x290/quality/90'
        }
      ]
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
