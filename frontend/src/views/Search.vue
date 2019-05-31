<template >
    <div style="display: inline-block; width: 50%; vertical-align: top; ">
      <ul v-loading="loading" element-loading-text="拼命加载中">
        <li style="text-align: left; padding:0 0 10px 10px"><p style="font-size: 12px; color: darkgrey">找到约{{total}}条结果</p></li>
        <li v-for="(item, index) in paperList.slice(10*(currentPage-1), 10*currentPage)" :key="index">
          <div style="width: 100%; padding-top: 20px;
          border-color: darkgray; border-style: solid; border-width: 0 0 1px 0;text-align: left">
            <el-link :underline="false" v-on:click="jump(index)"
                     style="display: block; font-size: 24px; height: min-content; margin: 5px; line-height: 120%">
              {{item['title']}}
            </el-link>
            <p style="color: black; display: -webkit-box;
                -webkit-box-orient: vertical; -webkit-line-clamp: 4;overflow: hidden;">
            <li style="display: inline-block" v-for="author in item['authors']" :key='author'>
              <span style="padding-left: 5px; padding-right: 5px; color: black">
                <el-link :underline="false" @click="jump2(author)">{{author}}</el-link>
              </span>
            </li>
            <p style="color: darkgrey; display: -webkit-box;
                -webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden; margin: 5px">
              {{item['abstract']}}
            </p>
            <el-row style="padding: 10px 0 10px 0">
              <el-button type="warning" icon="el-icon-star-off" round @click="get_collection_list(item['_id'])">收藏</el-button>
              <el-dialog title="收藏" :visible.sync="collection" width="30%">
                <el-table size="medium" :data="paperListCollection.data" border style="width: 100%" highlight-current-row>
                  <el-table-column type="index"></el-table-column>
                  <el-table-column v-for="(v,i) in paperListCollection.columns" :prop="v.field" :label="v.title" :key="(v,i)">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">{{scope.row['paperListName']}}</el-button>
                  </template>
                  </el-table-column>
                  <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button size="small"  @click="collect(scope.row['paperListID'])" >收藏</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>
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
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      currentPage: 1,
      paperID: '',
      paperList: [],
      collection: false,
      paperListCollection: {
        data: [],
        columns: [
          { field: 'paperListName', title: '名称' }
        ]
      },
      loading: true
    }
  },
  mounted: function () {
    if (this.$route.query.id != null) {
      this.search()
    }
    else {
      this.loading = false
    }
  },
  methods: {
    search () {
      let postData = {
        'keyword': this.$route.query.id
      }
      this.$axios.post('/api/search/paper', postData).then((response) => {
        this.paperList = response.data['data']['result']
        this.loading = false
      })
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    jump: function (index) {
      let data = this.paperList[(this.currentPage - 1) * 10 + index]
      let routeData = this.$router.resolve({
        path: '/resource',
        query: {
          title: data['title'],
          paper_id: data['_id'],
          url: data['fulltextURL'],
          authors: data['authors'],
          abstract: data['abstract'],
          keywords: data['field'],
          doi: data['publishment'],
          citation: data['citation']
        }
      })
      window.open(routeData.href, '_blank')
    },
    jump2 (f) {
      this.$router.push({path: '/scholar', query: {id: f}})
    },
    get_collection_list (index) {
      this.paperListCollection.data = []
      let postData = {
        'userID': parseInt(this.$store.state.userID),
        'paperListID': 0
      }
      this.$axios.post('/api/collection/get_paper_list', postData).then((response) => {
        for (let i = 0; i < response.data['data']['paperList']['mylist'].length; i++) {
          let j = {
            'id': i,
            'paperListName': response.data['data']['paperList']['mylist'][i]['name'],
            'paperListID': response.data['data']['paperList']['mylist'][i]['_id']
          }
          this.paperListCollection.data.push(j)
        }
        this.collection = true
        this.paperID = index
      })
    },
    collect (paperListID) {
      let postData = {
        'userID': parseInt(this.$store.state.userID),
        'paperListID': paperListID,
        'cmd': 'ADD',
        'paperID': this.paperID
      }
      this.$axios.post('/api/collection/paper', postData).then((response) => {
        let data = response.data
        if (data['code'] === 100) {
          this.$message({
            message: '收藏成功',
            type: 'success'
          })
        } else {
          this.$message.error('收藏失败')
        }
      })
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
