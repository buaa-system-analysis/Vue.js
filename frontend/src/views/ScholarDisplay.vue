<template>
  <div style="padding: 0 15% 0 15%">
    <el-row>
      <el-col :span="4">
        <el-row><i class="el-icon-s-custom" style="color: darkorange; font-size: 150px"></i></el-row>
        <el-row>
            <el-button style="background-color: darkorange; color: white" round>认证</el-button>
        </el-row>
        <el-row>
          <el-button style="background-color: white; color: darkorange" round>关注</el-button>
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
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Patent">

        </el-tab-pane>
        <el-tab-pane label="Project">

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
      scholarPaper: []
    }
  },
  methods: {
    getScholarInfo () {
      let postData = {
        'scholarID': parseInt(this.$route.query.ID)
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
        this.scholarPaper = scholarInfo['papers']
      })
    }
  },
  mounted: function () {
    this.getScholarInfo()
  }
}
</script>

<style scoped>

</style>
