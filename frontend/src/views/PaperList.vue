<template>
<div style="margin-top: 30px; padding: 0 25% 0 25%; text-align: left">
  <div style="width: 100%">
    <p style="color: black; font-size: 24px; float: left; width:100%">
      李昕航发表的论文
    </p>
    <p style="color: black; font-size: 24px; float: left; width:100%">
      <el-button type="warning" icon="el-icon-star-off" round>订阅</el-button>
      <el-divider></el-divider>
    </p>
  </div>
  <div>
    <ul>
      <li v-for="(item, index) in paperListData.slice(10*(currentPage-1), 10*currentPage)" :key="index">
        <div style="width: 100%; padding-top: 20px;
        border-color: darkgray; border-style: solid; border-width: 0 0 1px 0;text-align: left">
          <el-link :underline="false" v-on:click="jump(index)"
                    style="display: block; font-size: 24px; height: min-content; margin: 5px; line-height: 120%">{{item['title']}}</el-link>
          <p style="color: black; display: -webkit-box;
            -webkit-box-orient: vertical; -webkit-line-clamp: 4;overflow: hidden;">
            <li style="display: inline-block" v-for="author in item['authors']" :key='author'>
              <span style="padding-left: 5px; padding-right: 5px; color: black">{{author}}</span>
            </li>
          <p style="color: darkgrey; display: -webkit-box;
            -webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden; margin: 5px">
            {{item['abstract']}}
          </p>
          <el-row style="padding: 10px 0 10px 0">
            <el-button type="warning" icon="el-icon-star-off" round>取消收藏</el-button>
            <el-button type="warning" icon="el-icon-chat-line-square" round>引用</el-button>
            <a :href="item['fulltextURL']" style="padding-left: 10px">
              <el-button type="warning" icon="el-icon-download" round>下载</el-button>
            </a>
          </el-row>
        </div>
      </li>
    </ul>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :total="total"
        @current-change="current_change"
        :current-page="currentPage">
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'paperList',
  data () {
    return {
      currentPage: 1,
      paperListData: [
        {
          'title': 'Attention is all you need',
          'year': '2018',
          'authors': ['Xinhang Li'],
          'publishment': 'AAAI'
        },
        {
          'title': 'Attention is all you need',
          'year': '2018',
          'authors': ['Xinhang Li'],
          'publishment': 'AAAI'
        }
      ]
    }
  },
  methods: {
    search () {
      let postData = {
        'keyword': this.$route.query.id
      }
      this.$axios.post('/api/search/paper', postData).then((response) => {
        this.paperList = response.data['data']['result']
      })
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    jump: function (index) {
      let data = this.paperListData[(this.currentPage - 1) * 10 + index]
      let routeData = this.$router.resolve({
        path: '/resource',
        query: {
          title: data['title'],
          paper_id: data['paper_id'],
          url: data['fulltextURL'],
          authors: data['authors'],
          abstract: data['abstract'],
          keywords: data['field'],
          doi: data['publishment'],
          citation: data['citation']
        }
      })
      window.open(routeData.href, '_blank')
    }
  },
  computed: {
    total: function () {
      return this.paperListData.length
    }
  }
}
</script>

<style>

</style>
