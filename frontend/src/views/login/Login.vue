<template>
  <div>
    <div class="login-wrap" v-if="showLogin">
      <h3>登录</h3>
      <p v-if="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入用户名" v-model="username">
      <input type="password" placeholder="请输入密码" v-model="password">
      <button v-on:click="login">登录</button>
      <span v-on:click="ToRegister">没有账号？马上注册</span>
    </div>

    <div class="register-wrap" v-else>
      <h3>注册</h3>
      <p v-if="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入用户名" v-model="newUsername">
      <input type="password" placeholder="请输入密码" v-model="newPassword">
      <input type="email" placeholder="请输入邮箱" v-model="newEmail">
      <button v-on:click="register">注册</button>
      <span v-on:click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>
</template>

<style>
.login-wrap {
  text-align: center;
}
input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}
p {
  color: red;
}
button {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  border: none;
  background-color: #41b883;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}
span {
  cursor: pointer;
}
span:hover {
  color: #41b883;
}
</style>

<script>
export default {
  data () {
    return {
      showLogin: false,
      // showReg: false,
      showTishi: false,
      tishi: '',
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      newEmail: ''
    }
  },
  methods: {
    login () {
      if (this.username === '' || this.password === '') {
        alert('请输入用户名或密码')
      } else {
        let data = { username: this.username, password: this.password }
        /* 接口请求 */
        this.$http
          .post('http://localhost:5015/api/user/login', data)
          .then(res => {
            if (res.code === 100) {
              alert('登录成功')
            } else if (res.code === 101) {
              alert('登录时发生其他错误')
            } else if (res.code === 102) {
              alert('登录时未找到⽤户名')
            } else if (res.code === 103) {
              alert('登录密码错误')
            } else {
              alert('登录发生位置错误' + res)
            }
          })
      }
    },
    ToRegister () {
      // this.showReg = true
      this.showLogin = false
    },
    ToLogin () {
      // this.showReg = false
      this.showLogin = true
    },
    register () {
      if (this.newUsername === '' || this.newPassword === '' || this.email === '') {
        alert('请输入用户名、密码或邮箱')
      } else {
        let data = {'username': this.newUsername, 'password': this.newPassword, 'email': this.newEmail}
        this.$http.post('http://localhost:5015/api/user/register', data).then((res) => {
          if (res.code === 100) {
            alert('注册成功')
            this.showLogin = true
          } else if (res.code === 104) {
            alert('注册失败')
          }
        })
      }
    }
  }
}

</script>
