<template>
  <div class="ui comments">
    <h3 class="ui dividing header">Comments</h3>
    <div class="comment" v-for="(item, index) in comments" :key="index">
      <a class="avatar"><i class="el-icon-user-solid" style="color: darkorange; font-size: 30px"></i></a>
      <div class="content">
        <a class="author">{{item['userID']}}</a>
        <div class="metadata"><span class="date">{{item['time']}}</span></div>
        <div class="text">{{item['content']}}</div>
      </div>
    </div>
    <form class="ui reply form">
      <div class="field">
        <textarea id="commet_content"></textarea>
      </div>
      <div class="ui blue labeled submit icon button">
        <i class="icon edit" @click="add_reply"></i> <div @click="add_reply">Add Reply</div>
      </div>
    </form>
  </div>

</template>

<script>
export default {
  name: 'Comment',
  data () {
    return {
      comments: []
    }
  },
  mounted: function () {
    this.get_comment()
  },
  methods: {
    get_comment () {
      let postData = {
        'resourceID': this.$route.query.paper_id
      }
      this.$axios.post('/resource/get_comment', postData).then((response) => {
        let data = response.data
        if (data['code'] === 100) {
          this.comments = data['data']['result']
          for(var i = 0; i < this.comments.length; i++){
            postData = {
              'userID': parseInt(this.comments[i]['userID'])
            }
            this.$axios.post('/user/find', postData).then((response) => {
              let userID = response.data['data']['user']['_id'].toString()
              let username = response.data['data']['user']['username']
              for(var i = 0; i < this.comments.length; i++){
                if(this.comments[i]['userID'] === userID){
                  this.comments[i]['userID'] = username
                }
              }
            })
          }
        } else {
          this.$message.error('错误')
          return false
        }
      }).catch((response) => {
        console.log(response)
      })
    },
    add_reply () {
      if (this.$store.state.userID === null) {
        alert('请先登陆')
      } else if (document.getElementById('commet_content').value == null || document.getElementById('commet_content').value === '') {
        alert('请输入内容')
      } else {
        let postData = {
          'userID': this.$store.state.userID,
          'resourceID': this.$route.query.paper_id,
          'content': document.getElementById('commet_content').value
        }
        this.$axios.post('/resource/comment', postData).then((response) => {
          let data = response.data
          if (data['code'] === 100) {
            document.getElementById('commet_content').value = ''
          } else {
            this.$message.error('错误')
            return false
          }
        }).catch((response) => {
          console.log(response)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
