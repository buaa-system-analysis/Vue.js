<template>
  <div class="ui comments">
    <h3 class="ui dividing header">Comments</h3>
    <div class="comment" v-for="item in comments">
      <a class="avatar"><img :src="item['img']"></a>
      <div class="content">
        <a class="author">{{item['user']}}</a>
        <div class="metadata"><span class="date">{{item['time']}}</span></div>
        <div class="text">{{item['text']}}</div>
      </div>
    </div>
    <form class="ui reply form">
      <div class="field">
        <textarea v-model="reply"></textarea>
      </div>
      <div class="ui blue labeled submit icon button">
        <i class="icon edit" @click="add_reply"></i> Add Reply
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
          img: '/images/matt.jpg',
          user: 'Matt',
          time: '5:42 PM',
          text: 'How artistic!'
        }
      ]
    }
  },
  methods: {
    add_reply () {
    }
  }
}
</script>

<style scoped>

</style>
