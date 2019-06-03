<template>
  <div style="padding: 0 15% 0 15%">
    <el-row>
      <el-col :span="4">
        <el-row><i class="el-icon-s-custom" style="color: darkorange; font-size: 150px"></i></el-row>
        <el-row>
          <el-button style="background-color: darkorange; color: white" round @click="VisibleAuth = true">认证</el-button>
          <el-dialog title="认证学者" :visible.sync="VisibleAuth">
            <el-form :model="form" style="margin-left: 60px; margin-right: 60px">
              <el-form-item label="邮箱">
                <el-input style="width: 70%" v-model="email"
                          autocomplete="off" placeholder="请输入您的邮箱"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="VisibleAuth = false">取 消</el-button>
              <el-button type="primary" @click="authenticate">提 交</el-button>
            </div>
          </el-dialog>
        </el-row>
        <el-row>
          <el-button v-if="state === false" style="background-color: white; color: darkorange" round @click="subscribe">关注</el-button>
          <el-button v-if="state === true" style="background-color: darkorange; color: white" round @click="unsubscribe">已关注</el-button>
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
              <el-link :underline="false" @click="jump(f)">{{f}}</el-link>
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
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Patent">
          <el-row style="text-align: left; padding-bottom: 20px" v-for="item in scholarPatent" :key="item">
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
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Project">
          <el-row style="text-align: left; padding-bottom: 20px" v-for="item in scholarProject" :key="item">
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
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ScholarDisplay',
  data () {
    return {
      scholarname: '',
      org: '',
      citation: '',
      pub: '',
      hindex: '',
      gindex: '',
      field: [],
      scholarPaper: [],
      state: false,
      VisibleAuth: false,
      email: ''
    }
  },
  methods: {
    getScholarInfo () {
      let postData = {
        'scholarID': this.scholarID
      }
      this.$axios.post('/api/scholar/find_by_id', postData).then((response) => {
        let scholarInfo = response.data['data']['scholarInfo']
        this.scholarname = scholarInfo['name']
        this.org = scholarInfo['organization']
        this.citation = scholarInfo['citation']
        this.pub = scholarInfo['papers'].length
        this.hindex = scholarInfo['h_index']
        this.gindex = scholarInfo['g_index']
        this.field = scholarInfo['fields']
        let papers = scholarInfo['papers']
        if (papers[0]['paper_id'] != null) {
          for (var i = 0; i < papers.length; i++) {
            let postData = {
              'id': papers[i]['paper_id']
            }
            this.$axios.post('/api/search/paper_id', postData).then((response) => {
              let data = response.data['data']['result']
              if (data != null) {
                this.scholarPaper[i] = data
              }
            })
          }
        } else {
          this.scholarPaper = papers
        }
        this.scholarPatent = scholarInfo['patents']
        this.scholarProject = scholarInfo['projects']
      })
    },
    subscribe () {
      let postData = {
        'userID': parseInt(this.$store.state.userID),
        'scholarID': this.scholarID,
        'cmd': true
      }
      this.$axios.post('/api/collection/subscribe', postData).then((response) => {
        window.location.reload()
      })
    },
    unsubscribe () {
      let postData = {
        'userID': parseInt(this.$store.state.userID),
        'scholarID': this.scholarID,
        'cmd': false
      }
      this.$axios.post('/api/collection/subscribe', postData).then((response) => {
        window.location.reload()
      })
    },
    dynamicShow () {
      let postData = {
        'userID': parseInt(this.$store.state.userID)
      }
      this.$axios.post('/api/collection/get_subscribe_list', postData).then((response) => {
        let data = response.data['data']['subscribeList']
        var i = 0
        for (i = 0; i < data.length; i++) {
          if (data[i]['_id'] === this.$route.query.ID) {
            this.state = true
          }
        }
      })
    },
    jump (f) {
      this.$router.push({path: '/search', query: {id: f}})
    },
    authenticate () {
      let postData = {
        'userID': parseInt(this.$store.state.userID),
        'scholarID': this.scholarID,
        'email': this.email
      }
      this.$axios.post('/api/scholar/auth', postData).then((response) => {
        if (response.data['data']['flag']) {
          this.$message({
            message: '提交认证申请成功',
            type: 'success'
          })
        } else {
          this.$message.error('提交认证申请失败')
        }
      })
    }
  },
  mounted: function () {
    this.getScholarInfo()
    this.dynamicShow()
  },
  computed: {
    scholarID: function () {
      if (this.$route.query.ID.length < 5) {
        return parseInt(this.$route.query.ID)
      } else {
        return this.$route.query.ID
      }
    }
  }
}
</script>

<style scoped>

</style>
