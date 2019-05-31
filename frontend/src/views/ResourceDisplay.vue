<template>
  <div style="margin-top: 30px; padding: 0 25% 0 25%; text-align: left">
    <div style="width: 100%">
      <a :href="url" style="font-size: 32px; font-weight: bold; line-height: 120%">{{title}}</a>
      <el-row style="text-align: left; width: 100%; padding: 40px 0 5px 0">
        <el-col :span="3">
          <span style="color: darkgrey">作者:</span>
        </el-col>
        <el-col :span="21">
          <li style="display: inline-block" v-for="(author, index) in authors" :key="index">
            <span style="padding-right: 10px; color: #409EFF">
              <el-link :underline="false" @click="jump(author)">{{author}}</el-link>
            </span>
          </li>
        </el-col>
      </el-row>
      <el-row style="text-align: left; width: 100%; padding: 5px 0 5px 0">
        <el-col :span="3">
          <span style="color: darkgrey;">摘要:</span>
        </el-col>
        <el-col :span="21">
          <p style="color: dimgray; display: -webkit-box;-webkit-box-orient: vertical;
              -webkit-line-clamp: 4;overflow: hidden">{{abstract}}</p>
        </el-col>
      </el-row>
      <el-row style="text-align: left; width: 100%; padding: 5px 0 5px 0">
        <el-col :span="3">
          <span style="color: darkgrey;">关键词:</span>
        </el-col>
        <el-col :span="21">
          <li style="display: inline-block" v-for="(item, index) in keywords" :key="index">
            <span style="padding-right: 20px; color: #409EFF">
              <el-link :underline="false" @click="jump2(item)">{{item}}</el-link>
            </span>
          </li>
        </el-col>
      </el-row>
      <el-row style="text-align: left; width: 100%; padding: 5px 0 5px 0">
        <el-col :span="3">
          <span style="color: darkgrey;">DOI:</span>
        </el-col>
        <el-col :span="21">
          <p style="color: dimgray; display: -webkit-box;-webkit-box-orient: vertical;
              -webkit-line-clamp: 4;overflow: hidden">{{doi}}</p>
        </el-col>
      </el-row>
      <el-row style="text-align: left; width: 100%; padding: 5px 0 5px 0">
        <el-col :span="3">
          <span style="color: darkgrey;">被引量:</span>
        </el-col>
        <el-col :span="21">
          <span style="color: #409EFF">{{citation}}</span>
        </el-col>
      </el-row>
      <el-row style="padding-top: 20px">
        <el-button type="warning" icon="el-icon-star-off" round @click="get_collection_list()">收藏</el-button>
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
        <a :href="url" style="padding-left: 10px">
          <el-button type="warning" icon="el-icon-download" round>下载</el-button>
        </a>
      </el-row>
    </div>
    <Comment></Comment>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
export default {
  name: 'ResourceDisplay',
  data () {
    return {
      title: '',
      paper_id: '',
      authors: '',
      abstract: '',
      keywords: [],
      url: '',
      doi: '',
      citation: '',
      collection: false,
      paperListCollection: {
        data: [],
        columns: [
          { field: 'paperListName', title: '名称' }
        ]
      }
    }
  },
  components: {
    Comment
  },
  mounted: function () {
    this.title = this.$route.query.title
    this.paper_id = this.$route.query.paper_id
    this.authors = this.$route.query.authors
    this.url = this.$route.query.url
    this.abstract = this.$route.query.abstract
    this.keywords = this.$route.query.keywords
    this.doi = this.$route.query.doi
    this.citation = this.$route.query.citation
  },
  methods: {
    jump (f) {
      this.$router.push({path: '/scholar', query: {id: f}})
    },
    jump2 (f) {
      this.$router.push({path: '/search', query: {id: f}})
    },
    get_collection_list () {
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
      })
    },
    collect (paperListID) {
      let postData = {
        'userID': parseInt(this.$store.state.userID),
        'paperListID': paperListID,
        'cmd': 'ADD',
        'paperID': this.paper_id
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
  }
}
</script>

<style scoped>

</style>
