<template>
  <div style="margin-top: 30px; padding: 0 15% 0 15%">
    <el-tabs v-model="activeName">
      <el-tab-pane label="学者主页" name="first">
        <p style="color: black; font-size: 24px; float: left;">学者查询</p>
        <div class="ui icon input" style="width: 80%">
          <el-input v-model="searchScholarName" placeholder="请输入学者姓名...">
            <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
          </el-input>
        </div>
        <ul style="text-align: left; padding: 0 0 0 0">
          <li style="padding:0 0 10px 10px"><p style="font-size: 12px; color: darkgrey">为您找到以下结果:</p></li>
          <li v-for="(item, index) in scholarList.slice(6*currentPage-6, 6*currentPage)" :key="index"
              style="line-height: 150%; padding-bottom: 30px; width: 50%; display: inline-block; vertical-align: top">
            <el-row>
              <el-col :span="4">
                <i class="el-icon-s-custom" style="color: darkorange; font-size: 60px"></i>
              </el-col>
              <el-col :span="14">
                <el-row style="color: black; font-size: 18px">{{item['name']}}</el-row>
                <el-row style="color: black">{{item['organization']}}</el-row>
                <el-row>
                  <el-col :span="6" style="color: darkgray">h-index:</el-col>
                  <el-col :span="6" style="color: black">{{item['h_index']}}</el-col>
                  <el-col :span="6" style="color: darkgray">被引次数:</el-col>
                  <el-col :span="6" style="color: black">{{item['citation']}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" style="color: darkgray">研究领域:</el-col>
                  <el-col :span="18" style="color: black">
                    <span>{{item['fields'][0]}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-button style="background-color: darkorange; color: white" round v-on:click="jump(index)" >查看</el-button>
              </el-col>
            </el-row>
          </li>
        </ul>
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :hide-on-single-page="true"
            :page-size="6"
            :total="total"
            @current-change="current_change"
            :current-page="currentPage">
          </el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label="我的主页" name="second">
        <el-row>
          <el-col :span="4">
            <el-row><i class="el-icon-s-custom" style="color: darkorange; font-size: 150px"></i></el-row>
            <el-row>
              <el-button style="background-color: darkorange; color: white"
              icon="el-icon-edit" round>编辑</el-button>
            </el-row>
          </el-col>
          <el-col :span="12" style="text-align: left">
            <el-row>
              <p style="color: black; font-size: 32px">{{scholarname}}</p>
            </el-row>
            <el-row style="padding: 10px 0 20px 0">
              <p style="color: #475669">{{org}}</p>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p style="color: dimgray">被引频次</p>
              </el-col>
              <el-col :span="6">
                <p style="color: dimgray">成果数</p>
              </el-col>
              <el-col :span="6">
                <p style="color: dimgray">H指数</p>
              </el-col>
              <el-col :span="6">
                <p style="color: dimgray">G指数</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p style="color: black; font-size: 18px">{{citation}}</p>
              </el-col>
              <el-col :span="6">
                <p style="color: black; font-size: 18px">{{pub}}</p>
              </el-col>
              <el-col :span="6">
                <p style="color: black; font-size: 18px">{{hindex}}</p>
              </el-col>
              <el-col :span="6">
                <p style="color: black; font-size: 18px">{{gindex}}</p>
              </el-col>
            </el-row>
            <el-row style="padding: 20px 0 5px 0">
              <el-col :span="4"><p style="color: dimgray">领域:</p></el-col>
              <el-col :span="20">
                <span v-for="(f, index) in field" :key="f" style="color: black">{{f}}
                  <span v-if="index != field.length-1">/ </span>
                </span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-tabs :tab-position="'left'">
            <el-tab-pane label="Paper">
              <el-row style="text-align: left; padding-bottom: 20px" v-for="item in scholarPaper" :key="item">
                <el-col :span="20">
                  <el-row style="color: black; font-size: 16px; font-weight: bold; padding-bottom: 5px">
                    {{item['title']}}
                  </el-row>
                  <el-row style="color: #475669; font-size: 12px">
                    <span v-for="(author, index) in item['authors']" :key="author" style="color: black">{{author}}
                      <span v-if="index != item['authors'].length-1">,  </span>
                    </span>
                  </el-row>
                </el-col>
                <el-col :span="4">
                  <el-button type="warning" icon="el-icon-trash" round>删除</el-button>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="Patent">

            </el-tab-pane>
            <el-tab-pane label="Project">

            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="我关注的学者" name="third">
        <el-row v-if="subscribeList.length == 0" style="color: darkgray; font-size: 24px; padding-top: 50px">
          您未关注任何学者
        </el-row>
        <ul style="text-align: left; padding: 0 0 0 0">
          <li v-for="(item, index) in subscribeList" :key="index"
              style="line-height: 150%; width: 50%; display: inline-block; vertical-align: top">
            <el-row>
              <el-col :span="4">
                <i class="el-icon-s-custom" style="color: darkorange; font-size: 60px"></i>
              </el-col>
              <el-col :span="14">
                <el-row style="color: black; font-size: 18px">{{item['name']}}</el-row>
                <el-row style="color: black">{{item['organization']}}</el-row>
                <el-row>
                  <el-col :span="6" style="color: darkgray">被引次数:</el-col>
                  <el-col :span="6" style="color: black">{{item['citation']}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" style="color: darkgray">研究领域:</el-col>
                  <el-col :span="18" style="color: black">
                    <span>{{item['fields'][0]}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-button style="background-color: darkorange; color: white"
                           icon="el-icon-check" round v-on:click="unsubscribe(index)">已关注</el-button>
                <el-button style="background-color: darkorange; color: white; margin: 5px 0 0 0"
                           round v-on:click="jump2(index)">前往查看</el-button>
              </el-col>
            </el-row>
          </li>
        </ul>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Scholar',
  inject: ['reload'],
  data () {
    return {
      searchScholarName: '',
      scholarname: '',
      org: '',
      citation: '',
      pub: '',
      hindex: '',
      gindex: '',
      field: [],
      scholarPaper: [],
      activeName: 'first',
      currentPage: 1,
      scholarList: [],
      subscribeList: []
    }
  },
  methods: {
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    jump: function (index) {
      let data = this.scholarList[(this.currentPage - 1) * 6 + index]
      let routeData = this.$router.resolve({
        path: '/scholarDisplay',
        query: {
          ID: data['_id']
        }
      })
      window.open(routeData.href, '_blank')
    },
    jump2: function (index) {
      let data = this.subscribeList[index]
      let routeData = this.$router.resolve({
        path: '/scholarDisplay',
        query: {
          ID: data['_id']
        }
      })
      window.open(routeData.href, '_blank')
    },
    search () {
      const searchText = this.searchScholarName
      this.$router.push({path: '/scholar', query: {id: searchText}})
      window.location.reload()
    },
    getScholarList () {
      let postData = {
        'keyword': this.$route.query.id
      }
      this.$axios.post('/api/scholar/find_by_kwd', postData).then((response) => {
        this.scholarList = response.data['data']['scholarInfo']
      })
    },
    getSubscribeList () {
      let postData = {
        'userID': parseInt(this.$store.state.userID)
      }
      this.$axios.post('/api/collection/get_subscribe_list', postData).then((response) => {
        this.subscribeList = response.data['data']['subscribeList']
      })
    },
    getUserScholarInfo () {
      let postData = {
        'userID': parseInt(this.$store.state.userID)
      }
      let user = {}
      this.$axios.post('/api/user/find', postData).then((response) => {
        user = response.data['data']['user']
        let postData2 = {
          'scholarID': parseInt(user['scholarID'])
        }
        this.$axios.post('/api/scholar/find_by_id', postData2).then((response) => {
          let scholarInfo = response.data['data']['scholarInfo']
          this.scholarname = scholarInfo['name']
          this.org = scholarInfo['organization']
          this.citation = scholarInfo['citation']
          this.pub = scholarInfo['papers'].length
          this.hindex = scholarInfo['h_index']
          this.gindex = scholarInfo['g_index']
          this.field = scholarInfo['fields']
          this.scholarPaper = scholarInfo['papers']
        })
      })
    },
    unsubscribe () {
      let postData = {
        'userID': parseInt(this.$store.state.userID),
        'scholarID': parseInt(this.$route.query.ID),
        'cmd': false
      }
      this.$axios.post('/api/collection/subscribe', postData).then((response) => {
        window.location.reload()
      })
    }
  },
  mounted: function () {
    this.getUserScholarInfo()
    this.getSubscribeList()
    if (this.$route.query.id != null) {
      this.getScholarList()
    }
  },
  computed: {
    total: function () {
      return this.scholarList.length
    }
  }
}
</script>

<style scoped>

</style>
