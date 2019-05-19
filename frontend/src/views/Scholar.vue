<template>
  <div style="margin-top: 30px; padding: 0 15% 0 15%">
    <el-tabs v-model="activeName">
      <el-tab-pane label="学者主页" name="first">
        <p style="color: black; font-size: 24px; float: left;">学者查询</p>
        <div class="ui icon input" style="width: 80%">
          <el-input v-model="scholarname" placeholder="请输入学者姓名...">
            <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
          </el-input>
        </div>
        <ul style="text-align: left; padding: 0 0 0 0">
          <li style="padding:0 0 10px 10px"><p style="font-size: 12px; color: darkgrey">为您找到以下结果:</p></li>
          <li v-for="(item, index) in scholarList.slice(6*currentPage-6, 6*currentPage)" :key="index"
              style="line-height: 150%; padding-bottom: 30px; width: 50%; display: inline-block">
            <el-row>
              <el-col :span="4">
                <i class="el-icon-s-custom" style="color: darkorange; font-size: 60px"></i>
              </el-col>
              <el-col :span="14">
                <el-row style="color: black; font-size: 18px">{{item['scholar']}}</el-row>
                <el-row style="color: black">{{item['org']}}</el-row>
                <el-row>
                  <el-col :span="6" style="color: darkgray">发表文章:</el-col>
                  <el-col :span="6" style="color: black">{{item['pub']}}</el-col>
                  <el-col :span="6" style="color: darkgray">被引次数:</el-col>
                  <el-col :span="6" style="color: black">{{item['citation']}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" style="color: darkgray">研究领域:</el-col>
                  <el-col :span="18" style="color: black">
                    <span  v-for="f in item['field']" :key="f" style="padding-right: 5px">{{f}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-button style="background-color: darkorange; color: white" round>查看</el-button>
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

      </el-tab-pane>

      <el-tab-pane label="我关注的学者" name="third">
        <ul style="text-align: left; padding: 0 0 0 0">
          <li v-for="(item, index) in subscribeList" :key="index"
              style="line-height: 150%; padding-bottom: 30px; width: 50%; display: inline-block">
            <el-row>
              <el-col :span="4">
                <i class="el-icon-s-custom" style="color: darkorange; font-size: 60px"></i>
              </el-col>
              <el-col :span="14">
                <el-row style="color: black; font-size: 18px">{{item['scholar']}}</el-row>
                <el-row style="color: black">{{item['org']}}</el-row>
                <el-row>
                  <el-col :span="6" style="color: darkgray">发表文章:</el-col>
                  <el-col :span="6" style="color: black">{{item['pub']}}</el-col>
                  <el-col :span="6" style="color: darkgray">被引次数:</el-col>
                  <el-col :span="6" style="color: black">{{item['citation']}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" style="color: darkgray">研究领域:</el-col>
                  <el-col :span="18" style="color: black">
                    <span  v-for="f in item['field']" :key="f" style="padding-right: 5px">{{f}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-button style="background-color: darkorange; color: white"
                           icon="el-icon-check" round>已关注</el-button>
                <el-button style="background-color: darkorange; color: white; margin: 5px 0 0 0" round>前往查看</el-button>
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
      scholarname: '',
      activeName: 'first',
      currentPage: 1,
      scholarList: [
        {
          scholar: 'Xinhang Li',
          org: 'Beihang University',
          pub: 618,
          citation: 10698,
          field: ['NLP', 'CV', 'ML']
        },
        {
          scholar: 'Xinhang Li',
          org: 'Beihang University',
          pub: 618,
          citation: 10698,
          field: ['NLP', 'CV', 'ML']
        },
        {
          scholar: 'Xinhang Li',
          org: 'Beihang University',
          pub: 618,
          citation: 10698,
          field: ['NLP', 'CV', 'ML']
        },
        {
          scholar: 'Xinhang Li',
          org: 'Beihang University',
          pub: 618,
          citation: 10698,
          field: ['NLP', 'CV', 'ML']
        },
        {
          scholar: 'Xinhang Li',
          org: 'Beihang University',
          pub: 618,
          citation: 10698,
          field: ['NLP', 'CV', 'ML']
        },
        {
          scholar: 'Xinhang Li',
          org: 'Beihang University',
          pub: 618,
          citation: 10698,
          field: ['NLP', 'CV', 'ML']
        },
        {
          scholar: 'Xinhang Li',
          org: 'Beihang University',
          pub: 618,
          citation: 10698,
          field: ['NLP', 'CV', 'ML']
        }
      ],
      subscribeList: [
        {
          scholar: 'Xinhang Li',
          org: 'Beihang University',
          pub: 618,
          citation: 10698,
          field: ['NLP', 'CV', 'ML']
        },
        {
          scholar: 'Xinhang Li',
          org: 'Beihang University',
          pub: 618,
          citation: 10698,
          field: ['NLP', 'CV', 'ML']
        }
      ]
    }
  },
  methods: {
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    search () {
      const searchText = this.scholarname
      this.$router.push({path: '/scholar', query: {id: searchText}})
      this.reload()
    },
    getScholarList () {
    }
  },
  mounted: function () {
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
