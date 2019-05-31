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
        <ul v-loading="loading" element-loading-text="拼命加载中" style="text-align: left; padding: 0 0 0 0">
          <li style="padding:0 0 10px 10px"><p style="font-size: 12px; color: darkgrey">为您找到以下结果:</p></li>
          <el-row v-if="scholarList.length == 0" style="color: darkgray; font-size: 24px; padding-top: 50px; text-align: center">
            未搜索到相关学者
          </el-row>
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
                    <span>
                      <el-link :underline="false" @click="jump3(item['fields'][0])">{{item['fields'][0]}}</el-link>
                    </span>
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
                <span v-for="(f, index) in field" :key="f" style="color: black">
                  <el-link :underline="false" @click="jump3(f)">{{f}}</el-link>
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
              <el-row style="text-align: left">
                <el-col :span="20">123
                </el-col>
                <el-col :span="4">
                  <el-button style="background-color: darkorange; color: white"
                             icon="el-icon-plus" plain @click="VisibleAddPaper = true">添加文献</el-button>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row style="text-align: left; padding-bottom: 20px" v-for="(item, index) in scholarPaper" :key="item">
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
                  <el-button style="background-color: darkorange; color: white"
                             icon="el-icon-trash" round @click="deletePaper(index)">删除</el-button>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-dialog title="添加文献" :visible.sync="VisibleAddPaper">
              <el-form :model="form" style="margin-left: 60px; margin-right: 60px">
                <el-form-item label="标题">
                  <el-input style="width: 70%" v-model="paperTitle"
                            autocomplete="off" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                  <el-input style="width: 70%" v-model="paperAuthors"
                            autocomplete="off" placeholder="多个作者以, 分隔"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="VisibleAddPaper = false">取 消</el-button>
                <el-button type="primary" @click="addPaper">提 交</el-button>
              </div>
            </el-dialog>

            <el-tab-pane label="Patent">
              <el-row style="text-align: left">
                <el-col :span="20">123
                </el-col>
                <el-col :span="4">
                  <el-button style="background-color: darkorange; color: white"
                             icon="el-icon-plus" plain @click="VisibleAddPatent = true">添加专利</el-button>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row style="text-align: left; padding-bottom: 20px" v-for="(item, index) in scholarPatent" :key="item">
                <el-col :span="20">
                  <el-row style="color: black; font-size: 16px; font-weight: bold; padding-bottom: 5px">
                    {{item['title']}}
                  </el-row>
                  <el-row style="color: #475669; font-size: 12px">
                    <span v-for="(author, index) in item['authors']" :key="author" style="color: black">{{author}}
                      <span v-if="index != item['authors'].length-1">,  </span>
                    </span>
                  </el-row>
                  <el-row>
                    <el-col :span="3" style="color: dodgerblue; font-size: 12px">Application Date:</el-col>
                    <el-col :span="4" style="color: #475669; font-size: 12px">{{item['date']}}</el-col>
                    <el-col :span="3" style="color: dodgerblue; font-size: 12px">Patent Number:</el-col>
                    <el-col :span="6" style="color: #475669; font-size: 12px">{{item['patentNumber']}}</el-col>
                  </el-row>
                </el-col>
                <el-col :span="4">
                  <el-button style="background-color: darkorange; color: white"
                             icon="el-icon-trash" round @click="deletePatent(index)">删除</el-button>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-dialog title="添加专利" :visible.sync="VisibleAddPatent">
              <el-form :model="form" style="margin-left: 60px; margin-right: 60px">
                <el-form-item label="标题">
                  <el-input style="width: 70%" v-model="patentTitle"
                            autocomplete="off" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                  <el-input style="width: 70%" v-model="patentAuthors"
                            autocomplete="off" placeholder="多个作者以, 分隔"></el-input>
                </el-form-item>
                <el-form-item label="日期">
                  <el-input style="width: 70%" v-model="patentDate"
                            autocomplete="off" placeholder="请输入专利申请日期(eg. 2019-06-01)"></el-input>
                </el-form-item>
                <el-form-item label="专利号">
                  <el-input style="width: 70%" v-model="patentNumber"
                            autocomplete="off" placeholder="请输入专利号(eg. CN123456789"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="VisibleAddPatent = false">取 消</el-button>
                <el-button type="primary" @click="addPatent">提 交</el-button>
              </div>
            </el-dialog>

            <el-tab-pane label="Project">
              <el-row style="text-align: left">
                <el-col :span="20">123
                </el-col>
                <el-col :span="4">
                  <el-button style="background-color: darkorange; color: white"
                             icon="el-icon-plus" plain @click="VisibleAddProject = true">添加项目</el-button>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row style="text-align: left; padding-bottom: 20px" v-for="(item, index) in scholarProject" :key="item">
                <el-col :span="20">
                  <el-row style="color: black; font-size: 16px; font-weight: bold; padding-bottom: 5px">
                    {{item['title']}}
                  </el-row>
                  <el-row style="color: #475669; font-size: 12px">
                    <span v-for="(author, index) in item['authors']" :key="author" style="color: black">{{author}}
                      <span v-if="index != item['authors'].length-1">,  </span>
                    </span>
                  </el-row>
                  <el-row>
                    <el-col :span="3" style="color: dodgerblue; font-size: 12px">Project Duration:</el-col>
                    <el-col :span="8" style="color: #475669; font-size: 12px">{{item['date']}}</el-col>
                  </el-row>
                </el-col>
                <el-col :span="4">
                  <el-button style="background-color: darkorange; color: white"
                             icon="el-icon-trash" round @click="deleteProject(index)">删除</el-button>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-dialog title="添加项目" :visible.sync="VisibleAddProject">
              <el-form :model="form" style="margin-left: 60px; margin-right: 60px">
                <el-form-item label="标题">
                  <el-input style="width: 70%" v-model="projectTitle"
                            autocomplete="off" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                  <el-input style="width: 70%" v-model="projectAuthors"
                            autocomplete="off" placeholder="多个作者以, 分隔"></el-input>
                </el-form-item>
                <el-form-item label="日期">
                  <el-input style="width: 70%" v-model="projectDate"
                            autocomplete="off" placeholder="请输入项目起止日期(eg. 2019-06-01～2019-06-30)"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="VisibleAddProject = false">取 消</el-button>
                <el-button type="primary" @click="addProject">提 交</el-button>
              </div>
            </el-dialog>

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
                    <span>
                      <el-link :underline="false" @click="jump3(item['fields'][0])">{{item['fields'][0]}}</el-link>
                    </span>
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
      loading: true,
      scholarID: 0,
      scholarname: '',
      org: '',
      citation: '',
      pub: '',
      hindex: '',
      gindex: '',
      field: [],
      scholarPaper: [],
      scholarPatent: [],
      scholarProject: [],
      activeName: 'first',
      currentPage: 1,
      scholarList: [],
      subscribeList: [],
      VisibleAddPaper: false,
      VisibleAddPatent: false,
      VisibleAddProject: false,
      VisibleEditScholarInfo: false,
      paperTitle: '',
      paperAuthors: '',
      patentTitle: '',
      patentAuthors: '',
      patentDate: '',
      patentNumber: '',
      projectTitle: '',
      projectAuthors: '',
      projectDate: ''
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
    jump3 (f) {
      this.$router.push({path: '/search', query: {id: f}})
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
        this.loading = false
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
          'scholarID': user['scholarID']
        }
        this.$axios.post('/api/scholar/find_by_id', postData2).then((response) => {
          let scholarInfo = response.data['data']['scholarInfo']
          this.scholarID = scholarInfo['_id']
          this.scholarname = scholarInfo['name']
          this.org = scholarInfo['organization']
          this.citation = scholarInfo['citation']
          this.pub = scholarInfo['papers'].length
          this.hindex = scholarInfo['h_index']
          this.gindex = scholarInfo['g_index']
          this.field = scholarInfo['fields']
          let papers = scholarInfo['papers']
          for (var i = 0; i < papers.length; i++) {
            let postData = {
              'id': papers[i]['title']
            }
            this.$axios.post('/api/search/paper_id', postData).then((response) => {
              let data = response.data['data']['result']
              if (data != null) {
                this.scholarPaper[i] = data
              }
            })
          }
          this.scholarPatent = scholarInfo['patents']
          this.scholarProject = scholarInfo['projects']
        })
      })
    },
    unsubscribe () {
      let postData = {
        'userID': parseInt(this.$store.state.userID),
        'scholarID': this.$route.query.ID,
        'cmd': false
      }
      this.$axios.post('/api/collection/subscribe', postData).then((response) => {
        window.location.reload()
      })
    },
    editInfo () {

    },
    addPaper () {
      let papers = this.scholarPaper
      let paper = {
        'title': this.paperTitle,
        'authors': [this.paperAuthors]
      }
      papers[papers.length++] = paper
      let postData = {
        'scholarID': this.scholarID,
        'info': {
          'papers': papers
        }
      }
      this.$axios.post('/api/scholar/edit', postData).then((response) => {
        window.location.reload()
        this.activeName = 'second'
      })
      this.VisibleAddPaper = false
    },
    addPatent () {
      let patents = this.scholarPatent
      let patent = {
        'title': this.patentTitle,
        'authors': [this.patentAuthors],
        'date': this.patentDate,
        'patentNumber': this.patentNumber
      }
      patents[patents.length++] = patent
      let postData = {
        'scholarID': this.scholarID,
        'info': {
          'patents': patents
        }
      }
      this.$axios.post('/api/scholar/edit', postData).then((response) => {
        window.location.reload()
        this.activeName = 'second'
      })
      this.VisibleAddPatent = false
    },
    addProject () {
      let projects = this.scholarProject
      let project = {
        'title': this.projectTitle,
        'authors': [this.projectAuthors],
        'date': this.projectDate
      }
      projects[projects.length++] = project
      let postData = {
        'scholarID': this.scholarID,
        'info': {
          'projects': projects
        }
      }
      this.$axios.post('/api/scholar/edit', postData).then((response) => {
        window.location.reload()
        this.activeName = 'second'
      })
      this.VisibleAddProject = false
    },
    deletePaper (index) {
      let papers = this.scholarPaper
      papers.splice(index, 1)
      let postData = {
        'scholarID': this.scholarID,
        'info': {
          'papers': papers
        }
      }
      this.$axios.post('/api/scholar/edit', postData).then((response) => {
        window.location.reload()
        this.activeName = 'second'
      })
      this.VisibleAddPaper = false
    },
    deletePatent (index) {
      let patents = this.scholarPatent
      patents.splice(index, 1)
      let postData = {
        'scholarID': this.scholarID,
        'info': {
          'patents': patents
        }
      }
      this.$axios.post('/api/scholar/edit', postData).then((response) => {
        window.location.reload()
        this.activeName = 'second'
      })
      this.VisibleAddPatent = false
    },
    deleteProject (index) {
      let projects = this.scholarProject
      projects.splice(index, 1)
      let postData = {
        'scholarID': this.scholarID,
        'info': {
          'projects': projects
        }
      }
      this.$axios.post('/api/scholar/edit', postData).then((response) => {
        window.location.reload()
        this.activeName = 'second'
      })
      this.VisibleAddProject = false
    }
  },
  mounted: function () {
    this.getUserScholarInfo()
    this.getSubscribeList()
    if (this.$route.query.id != null) {
      this.getScholarList()
    }
    else {
      this.loading = false
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
