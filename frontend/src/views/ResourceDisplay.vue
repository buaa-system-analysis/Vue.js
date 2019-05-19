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
            <span style="padding-right: 10px; color: #409EFF">{{author}}</span>
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
            <span style="padding-right: 20px; color: #409EFF">{{item}}</span>
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
        <el-button type="warning" icon="el-icon-star-off" round>收藏</el-button>
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
      title: 'Attention is all you need',
      paper_id: '123456',
      url: 'https://www.baidu.com',
      authors: 'Xinhang Li',
      abstract: 'We review recent research results pertaining to GaN, AIN and InN, focusing on present-day techniques and future prospects. ' +
        'The molecular beam epitaxy and metal-organic vapor phase epitaxy growth techniques, as they have been applied to the nitrides, are described. ' +
        'New developments in plasma-based sources and substrates are covered. ' +
        'We also discuss the most recent developments towards an... [Show full abstract]',
      keywords: [
        'Crystal structure',
        'Crystal growth',
        'EECS'
      ],
      doi: '10.1116/1.585897',
      citation: '1836'
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
  }
}
</script>

<style scoped>

</style>
