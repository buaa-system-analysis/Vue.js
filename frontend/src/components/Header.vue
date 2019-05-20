<template>
  <el-header>
    <div style="width: 100%; padding: 0 20px 0 20px">
      <el-menu mode="horizontal">
        <el-menu-item index="0">
        <div class="block" style="height: 100% ;width:30%; margin-left: 50%">
          <router-link to='/'>
            <img src="../assets/timg.jpg" height="55px">
          </router-link>
        </div>
        </el-menu-item>
        <el-menu-item index="2" @click="loginDialogVisable = true" v-if="this.$store.state.userID === null" style="float:right">登录/注册</el-menu-item>
        <el-submenu index="2" v-else style="float:right">
          <template slot="title">{{this.$store.state.username}}</template>
          <el-menu-item index="2-1">个人中心</el-menu-item>
          <el-menu-item index="2-2">已购买文献</el-menu-item>
          <el-menu-item index="2-3" @click="logout">退出登录</el-menu-item>
        </el-submenu>
        <el-menu-item index="1" style="float:right" v-if="this.$route.path !== '/'">
          <el-input v-model="input3">
            <el-button slot="append" icon="el-icon-search" @click="jump">搜索</el-button>
          </el-input>
        </el-menu-item>
        <el-dialog title="登录/注册" :visible.sync="loginDialogVisable" width="30%">
          <el-tabs v-model="whichDialogTab" stretch>
            <el-tab-pane label="登录" name="login">
              <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="loginForm.password" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="float: left;" @click="login()">提交</el-button>
                  <el-button type="info" style="float: left;">忘记密码</el-button>
                  <el-button type="warning" style="float: left;" @click="whichDialogTab = &quot;register&quot;">没有账号？注册</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
              <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="registerForm.email"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="registerForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password1">
                  <el-input v-model="registerForm.password1" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                  <el-input v-model="registerForm.password2" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="float: left;" @click="register()">提交</el-button>
                  <el-button type="warning" style="float: left; " @click="whichDialogTab = &quot;login&quot;">已有账号？登录</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-dialog>
      </el-menu>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.password2 !== '') {
          this.$refs.registerForm.validateField('passward2')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loginDialogVisable: false,
      whichDialogTab: 'login',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
      registerForm: {
        email: '',
        username: '',
        password1: '',
        password2: ''
      },
      registerRules: {
        email: [
          {type: 'string', required: true, pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$', message: '请输入正确的邮箱格式'}
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        password1: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        password2: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      userID: this.$store.state.userID,
      username: '',
      input3: '',
      select: ''
    }
  },
  methods: {
    jump () {
      const searchText = this.input3
      this.$router.push({path: '/search', query: {id: searchText}})
      window.location.reload()
    },
    login () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          let postData = {
            'username': this.loginForm.username,
            'password': this.loginForm.password
          }
          this.$axios.post('/user/login', postData).then((response) => {
            let data = response.data
            if (data['code'] === 100) {
              this.username = this.loginForm.username
              this.userID = data['data']['userID']
              this.loginDialogVisable = false
              localStorage.setItem('username', this.loginForm.username)
              this.$store.commit('SET_Username', this.loginForm.username)
              localStorage.setItem('userID', data['data']['userID'])
              this.$store.commit('SET_UserID', data['data']['userID'])
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
    },
    register () {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          let postData = {
            'username': this.registerForm.username,
            'password': this.registerForm.password1,
            'email': this.registerForm.email
          }
          this.$axios.post('/user/register', postData).then((response) => {
            let data = response.data
            if (data['code'] === 100) {
              this.username = this.registerForm.username
              this.userID = data['data']['userID']
              this.loginDialogVisable = false
            } else if (data['code'] === 104) {
              this.$message.error('注册失败')
              return false
            }
          })
        } else {
          return false
        }
      })
    },
    logout () {
      localStorage.removeItem('userID')
      this.$store.commit('SET_UserID', null)
    }
  }
}
</script>

<style scoped>

</style>
