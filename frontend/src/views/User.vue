<template>
  <div style="width: 100%; height: 100%; text-align: center">
    <div style="width: 100%">
      <p style="color: black; font-size: 32px; margin: 0">个人信息</p>
      <p style="color: darkgray; font-size: 18px">您在 Barbeque 服务中使用的基本信息，例如您的姓名和照片</p>
    </div>
    <div style="width: 80%; border-width: 1px ; border-color: darkgray; margin-left: auto; margin-right: auto;
    border-style: solid ;border-radius: 5px; text-align: left; padding: 2% 0 0 2%">
      <p style="color: black; font-size: 24px">个人资料</p>
      <div class="info" style="height: 100px">
        <span class="fixedAttribute">照片</span>
        <span class="attribute" style="color: lightgrey; font-size: 14px">添加照片来个性化您的账号</span>
        <el-image
          style="width: 70px; height: 70px; float: right" :src="url"></el-image>
      </div>
      <div class="info" @click="VisibleEditName = true">
        <span class="fixedAttribute">姓名</span>
        <span class="attribute">{{Name}}</span>
        <span class="el-icon-edit"></span>
      </div>
      <div class="info" @click="VisibleEditBirth = true">
        <span class="fixedAttribute">生日</span>
        <span class="attribute">{{Birthday}}</span>
        <span class="el-icon-edit"></span>
      </div>
      <div class="info" @click="VisibleEditGender = true">
        <span class="fixedAttribute">性别</span>
        <span class="attribute">{{Gender}}</span>
        <span class="el-icon-edit"></span>
      </div>
      <div class="info" style="border-width: 0" @click="VisibleEditPassword = true">
        <span class="fixedAttribute">密码</span>
        <span class="attribute">********</span>
        <span class="el-icon-edit"></span>
      </div>
      
    </div>

    <p></p>

    <div style="width: 80%; border-width: 1px ; border-color: darkgray; margin-left: auto; margin-right: auto;
    border-style: solid ;border-radius: 5px; text-align: left; padding: 2% 0 0 2%">
      <p style="color: black; font-size: 24px">联系信息</p>
      <div class="info" @click="VisibleEditEmail = true">
        <span class="fixedAttribute">电子邮件</span>
        <span class="attribute">{{Email}}</span>
        <span class="el-icon-edit"></span>
      </div>
      <div class="info" style="border-width: 0" @click="VisibleEditPhone = true">
        <span class="fixedAttribute">电话</span>
        <span class="attribute">{{Phone}}</span>
        <span class="el-icon-edit"></span>
      </div>
    </div>

    <p></p>

    <div style="width: 80%; border-width: 1px ; border-color: darkgray; margin-left: auto; margin-right: auto;
    border-style: solid ;border-radius: 5px; text-align: left; padding: 2% 0 0 2%">
      <p style="color: black; font-size: 24px">个人简介</p>
      <div class="info" style="border-width: 0" @click="VisibleEditIntro = true">
        <span class="attribute">{{Introduction}}</span>
        <span class="el-icon-edit"></span>
      </div>
    </div>

    <p style="height: 10%"></p>
    <div style="width: 60%">
      <!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <el-dialog title="编辑信息" :visible.sync="VisibleEditName">
        <el-form :model="form" style="margin-left: 60px; margin-right: 60px">
          <el-form-item label="姓名">
            <el-input style="width: 90%" v-model="form.Name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="VisibleEditName = false">取 消</el-button>
          <el-button type="primary" @click="submitName">提 交</el-button>
        </div>
      </el-dialog>
      <!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <el-dialog title="编辑信息" :visible.sync="VisibleEditBirth">
        <el-form :model="form" style="margin-left: 60px; margin-right: 60px">
          <el-form-item label="生日">
            <el-input style="width: 90%" v-model="form.Birthday" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="VisibleEditBirth = false">取 消</el-button>
          <el-button type="primary" @click="submitBirth">提 交</el-button>
        </div>
      </el-dialog>
      <!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <el-dialog title="编辑信息" :visible.sync="VisibleEditGender">
        <el-form :model="form" style="margin-left: 60px; margin-right: 60px">
          <el-form-item label="性别">
            <el-input style="width: 90%" v-model="form.Gender" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="VisibleEditGender = false">取 消</el-button>
          <el-button type="primary" @click="submitGender">提 交</el-button>
        </div>
      </el-dialog>
      <!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <el-dialog title="编辑信息" :visible.sync="VisibleEditPassword">
        <el-form :model="form" style="margin-left: 60px; margin-right: 60px">
          <el-form-item label="密码">
            <el-input style="width: 90%" v-model="form.Password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="VisibleEditPassword = false">取 消</el-button>
          <el-button type="primary" @click="submitPassword">提 交</el-button>
        </div>
      </el-dialog>
      <!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <el-dialog title="编辑信息" :visible.sync="VisibleEditEmail">
        <el-form :model="form" style="margin-left: 60px; margin-right: 60px">
          <el-form-item label="邮箱">
            <el-input style="width: 90%" v-model="form.Email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="VisibleEditEmail = false">取 消</el-button>
          <el-button type="primary" @click="submitEmail">提 交</el-button>
        </div>
      </el-dialog>
      <!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <el-dialog title="编辑信息" :visible.sync="VisibleEditPhone">
        <el-form :model="form" style="margin-left: 60px; margin-right: 60px">
          <el-form-item label="电话">
            <el-input style="width: 90%" v-model="form.Phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="VisibleEditPhone = false">取 消</el-button>
          <el-button type="primary" @click="submitPhone">提 交</el-button>
        </div>
      </el-dialog>
      <!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <el-dialog title="编辑信息" :visible.sync="VisibleEditIntro">
        <el-form :model="form" style="margin-left: 30px; margin-right: 30px">
          <el-form-item label="个人简介">
            <el-input style="width: 85%"t v-model="form.Introduction" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="VisibleEditIntro = false">取 消</el-button>
          <el-button type="primary" @click="submitIntro">提 交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      url: 'assets/logo.png',
      Name: '李昕航',
      Birthday: '1998年9月7日',
      Gender: '女',
      Email: '848318504@qq.com',
      Phone: '15652575233',
      Introduction: '爆肝工程师一枚',
      VisibleEditName: false,
      VisibleEditBirth: false,
      VisibleEditGender: false,
      VisibleEditPassword: false,
      VisibleEditEmail: false,
      VisibleEditPhone: false,
      VisibleEditIntro: false, 
      form: {
        Introduction: '',
        Password: '',
        Name: '',
        Birthday: '',
        Gender: '',
        Email: '',
        Phone: '',
      }
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      let postData = {
        'userID': parseInt(this.$store.state.userID)
      }
      this.$axios.post('/user/find', postData).then((response) => {
        if(response.data['code'] == 100) {
          let _user = response.data['data']['user']
          console.log(_user)
          this.Name = _user['name']
          this.Birthday = _user['birthday']
          this.Gender = _user['sex']
          this.Introduction = _user['introduction']
          this.Phone = _user['phone']
          this.Email = _user['email']
        }
      })
      return 0
    },
    submitName() {
      let postData = {
        'scholarID': parseInt(this.$store.state.userID),
        'info': {
          'name': this.form.Name
        }
      }
      this.$axios.post('/user/edit', postData).then((response) => {
        if(response.data['code'] == 100) {
          this.Name = this.form.Name
        }
      })
      this.VisibleEditName = false
    },
    submitBirth() {
      let postData = {
        'scholarID': parseInt(this.$store.state.userID),
        'info': {
          'birthday': this.form.Birthday
        }
      }
      this.$axios.post('/user/edit', postData).then((response) => {
        if(response.data['code'] == 100) {
          this.Birthday = this.form.Birthday
        }
      })
      this.VisibleEditBirth = false
    },
    submitGender() {
      let postData = {
        'scholarID': parseInt(this.$store.state.userID),
        'info': {
          'sex': this.form.Gender
        }
      }
      this.$axios.post('/user/edit', postData).then((response) => {
        if(response.data['code'] == 100) {
          this.Gender = this.form.Gender
        }
      })
      this.VisibleEditGender = false
    },
    submitEmail() {
      let postData = {
        'scholarID': parseInt(this.$store.state.userID),
        'info': {
          'email': this.form.Email
        }
      }
      this.$axios.post('/user/edit', postData).then((response) => {
        if(response.data['code'] == 100) {
          this.Email = this.form.Email
        }
      })
      this.VisibleEditEmail = false
    },
    submitPhone() {
      let postData = {
        'scholarID': parseInt(this.$store.state.userID),
        'info': {
          'phone': this.form.Phone
        }
      }
      this.$axios.post('/user/edit', postData).then((response) => {
        if(response.data['code'] == 100) {
          this.Phone = this.form.Phone
        }
      })
      this.VisibleEditPhone = false
    },
    submitIntro() {
      let postData = {
        'scholarID': parseInt(this.$store.state.userID),
        'info': {
          'introduction': this.form.Introduction
        }
      }
      this.$axios.post('/user/edit', postData).then((response) => {
        if(response.data['code'] == 100) {
          this.Introduction = this.form.Introduction
        }
      })
      this.VisibleEditIntro = false
    },
    submitPassword() {
      let postData = {
        'scholarID': parseInt(this.$store.state.userID),
        'info': {
          'password': this.form.Password
        }
      }
      this.$axios.post('/user/edit', postData).then((response) => {
        if(response.data['code'] == 100) {
          // this.password = this.form.Password
        }
      })
      this.VisibleEditPassword = false
    }
  }
}
</script>

<style scoped>
  .info{
    text-align: left;
    width: 100%;
    border-width: 0 0 1px 0;
    border-color: darkgray;
    border-style: solid;
    padding: 2%;
  }
  .info:hover{
    background-color: rgba(237,233,233,0.96);
    cursor: pointer;
  }
  .fixedAttribute{
    display: inline-block;
    width: 30%;
    color: darkgray;
    font-size: 14px;
    font-weight: bold;
  }
  .attribute{
    display: inline-block;
    width: 50%;
    color: black;
    font-size: 18px;
  }
  .el-icon-edit{
    color: darkgray;
    float: right;
  }
</style>
