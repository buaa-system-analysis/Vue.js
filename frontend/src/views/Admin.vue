<template>
  <el-container style="width: 100%; height: 100%">
    <el-container v-if="login === false">
      <el-row style="text-align: center; width: 100%">
        <el-form ref="form" :model="form"
                 style="border-style: solid; border-width: 1px; border-color: dimgray; margin: 10% 40% 0 40%">
          <el-form-item style="padding: 10px 50px 10px 50px">
            <span style="font-size: 32px; color: darkorange">登录</span>
          </el-form-item>
          <el-form-item label="账号" style="padding: 10px 50px 0 50px">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" style="padding: 10px 50px 0 50px">
            <el-input v-model="form.password" :show-password="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="onSubmit">Sign In</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-container>
    <el-container v-if="login === true">
      <ul style="width: 100%">
        <li v-for="(item, index) in authentication" :key="index"
            style="text-align: left; margin-left: 20%; margin-right: 20%;
            padding: 10px 30px 10px 30px; border-style: solid; border-color: dimgray; border-width: 1px">
          <el-row>
            <el-col :span="4">
              <span style="color: dimgray">userID: </span>
              <span style="color: darkorange">{{item['userID']}}</span>
            </el-col>
            <el-col :span="20">
              <span style="color: dimgray">scholarID: </span>
              <span style="color: darkorange">{{item['scholarID']}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <span style="color: dimgray">Email: </span>
              <span style="color: darkorange">{{item['email']}}</span>
            </el-col>
            <el-col :span="4">
              <el-button v-if="item['status'] === 'unfinished'" type="warning" icon="el-icon-check" @click="verify(index)">确认申请</el-button>
              <el-button v-if="item['status'] === 'verified'" type="info" icon="el-icon-check" plain :disabled="true">已确认</el-button>
            </el-col>
          </el-row>
        </li>
      </ul>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      login: false,
      form: {
        username: '',
        password: ''
      },
      authentication: []
    }
  },
  methods: {
    onSubmit () {
      if (this.form.username === 'admin' && this.form.password === 'buaa') {
        this.$axios.post('/api/scholar/getAuth', '').then((response) => {
          let data = response.data['data']
          this.authentication = data['authenticationList']
        })
        this.login = true
      }
    },
    verify (index) {
      let postData = {
        'id': this.authentication[index]['_id']
      }
      this.$axios.post('/api/scholar/verification', postData).then((response) => {
        let data = response.data['data']
        if (data['flag']) {
          this.$message({
            message: '验证成功',
            type: 'success'
          })
        } else {
          this.$message.error('验证失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
