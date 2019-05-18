<template >
    <div style="display: inline-block; width: 50%; vertical-align: top; ">
      <ul>
        <li style="text-align: left; padding:0 0 10px 10px"><p style="font-size: 12px; color: darkgrey">找到约{{total}}条结果</p></li>
        <li v-for="item in paperList.slice(10*(currentPage-1), 10*currentPage)" :key="item">
          <div style="width: 100%; padding-top: 20px;
          border-color: darkgray; border-style: solid; border-width: 0 0 1px 0;text-align: left">
            <el-link :underline="false" style="display: block; font-size: 24px; height: min-content; margin: 5px; line-height: 120%">
              {{item['title']}}
            </el-link>
            <p style="color: black; display: -webkit-box;
              -webkit-box-orient: vertical; -webkit-line-clamp: 4;overflow: hidden;">
              <li style="display: inline-block" v-for="author in item['authors']">
                <span style="padding-left: 5px; padding-right: 5px; color: black">{{author}}</span>
              </li>
            </p>
            <p style="color: darkgrey; display: -webkit-box;
              -webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden; margin: 5px">
              {{item['abstract']}}
            </p>
            <el-row style="padding: 10px 0 10px 0">
              <el-button type="warning" icon="el-icon-star-off" round>收藏</el-button>
              <el-button type="warning" icon="el-icon-chat-line-square" round>引用</el-button>
              <el-button type="warning" icon="el-icon-download" round>下载</el-button>
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
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      currentPage: 1,
      paperList: []
    }
  },
  mounted: function () {
    if (this.$route.query.id != null) {
      this.search()
    }
  },
  methods: {
    search () {
      let postData = {
        'keyword': this.$route.query.id
      }
      this.$axios.post('/search/paper', postData).then((response) => {
        this.paperList = response.data['data']['result']
      })
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    }
  },
  computed: {
    total: function () {
      return this.paperList.length
    }
  }
}
</script>

<style scoped>

</style>
