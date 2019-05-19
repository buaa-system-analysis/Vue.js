<template>
  <div class="ui comments">
    <h3 class="ui dividing header">Comments</h3>
    <div class="comment" v-for="(item, index) in comments" :key="index">
      <a class="avatar"><img :src="item['img']"></a>
      <div class="content">
        <a class="author">{{item['user']}}</a>
        <div class="metadata"><span class="date">{{item['time']}}</span></div>
        <div class="text">{{item['text']}}</div>
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
      comments: [
        {
          uesrID: '123',
          resourceID: '123456',
          time: 'YYYY-MM-DD hh:mm:ss',
          content: 'ohhhhhhhh'
        }
      ]
    }
  },
  methods: {
    get_time () {
      var d = new Date()
      d = new Date(d.getTime() - 3000000)
      var time = d.getFullYear().toString() + '- ' + ((d.getMonth() + 1).toString().length === 2 ? (d.getMonth() + 1).toString() : '0' + (d.getMonth() + 1).toString()) + '-' + (d.getDate().toString().length === 2 ? d.getDate().toString() : '0' + d.getDate().toString()) + ' ' + (d.getHours().toString().length === 2 ? d.getHours().toString() : '0' + d.getHours().toString()) + ':' + ((parseInt(d.getMinutes() / 5) * 5).toString().length === 2 ? (parseInt(d.getMinutes() / 5) * 5).toString() : '0' + (parseInt(d.getMinutes() / 5) * 5).toString()) + ':00'
      return time
    },
    add_reply () {
      if (this.$store.state.userID === null) {
        alert('请先登陆')
      } else if (document.getElementById('commet_content').value == null || document.getElementById('commet_content').value === '') {
        alert('请输入内容')
      } else {
        this.comments.userID = this.$store.state.userID
        this.comments.resourceID = this.$route.query.paper_id
        this.comments.time = this.methods.get_time()
        this.comments.content = this.document.getElementById('commet_content').value
        this.$refs['comments'].validate((valid) => {
          if (valid) {
            let postData = {
              'userID': this.comments.userID,
              'resourceID': this.comments.resourceID,
              'time': this.comments.time,
              'content': this.comments.content
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
          } else {
            return false
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
