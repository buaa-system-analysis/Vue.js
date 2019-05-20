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
                <span v-for="f in field" :key="f" style="color: black">{{f}} / </span>
              </el-col>
            </el-row>
            <el-row style="padding-bottom: 5px">
              <el-col :span="4"><p style="color: dimgray">研究内容:</p></el-col>
              <el-col :span="20">
                <span style="color: black; display: -webkit-box;-webkit-box-orient: vertical;
              -webkit-line-clamp: 4;overflow: hidden">{{content}}</span>
              </el-col>
            </el-row>
            <el-row style="padding-bottom: 5px">
              <el-col :span="4"><p style="color: dimgray">主页链接:</p></el-col>
              <el-col :span="20">
                <el-link>{{homepage}}</el-link>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-timeline>
              <el-timeline-item v-for="item in experience" :key="item" :timestamp="item['time']"
                                placement="top" type="warning">
                <span style="color: #475669">{{item['exp']}}</span>
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>

        </el-row>
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
      searchScholarName: '',
      scholarname: '李昕航',
      org: '北京航空航天大学',
      citation: '10',
      pub: '3',
      hindex: '2',
      gindex: '5',
      field: ['人工智能', '机器学习', '金融科技'],
      content: 'We review recent research results pertaining to GaN, AIN and InN, focusing on present-day techniques and future prospects. ' +
        'The molecular beam epitaxy and metal-organic vapor phase epitaxy growth techniques, as they have been applied to the nitrides, are described. ' +
        'New developments in plasma-based sources and substrates are covered. ' +
        'We also discuss the most recent developments towards an... [Show full abstract]',
      homepage: 'https://www.baidu.com',
      experience: [
        {
          time: '2019/4',
          exp: '清华大学交叉信息研究院'
        },
        {
          time: '2018/11',
          exp: '北京大学信息科学学院'
        }
      ],
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
      const searchText = this.searchScholarName
      this.$router.push({path: '/scholar', query: {id: searchText}})
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
