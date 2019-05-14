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
          style="width: 70px; height: 70px; float: right" :src="url" :fit="cover"></el-image>
      </div>
      <div class="info">
        <span class="fixedAttribute">姓名</span>
        <span class="attribute">{{Name}}</span>
        <span class="el-icon-edit"></span>
      </div>
      <div class="info">
        <span class="fixedAttribute">生日</span>
        <span class="attribute">{{Birthday}}</span>
        <span class="el-icon-edit"></span>
      </div>
      <div class="info">
        <span class="fixedAttribute">性别</span>
        <span class="attribute">{{Gender}}</span>
        <span class="el-icon-edit"></span>
      </div>
      <div class="info" style="border-width: 0">
        <span class="fixedAttribute">密码</span>
        <span class="attribute">{{Password}}</span>
        <span class="el-icon-edit"></span>
      </div>
    </div>

    <p></p>

    <div style="width: 80%; border-width: 1px ; border-color: darkgray; margin-left: auto; margin-right: auto;
    border-style: solid ;border-radius: 5px; text-align: left; padding: 2% 0 0 2%">
      <p style="color: black; font-size: 24px">联系信息</p>
      <div class="info">
        <span class="fixedAttribute">电子邮件</span>
        <span class="attribute">{{Email}}</span>
        <span class="el-icon-edit"></span>
      </div>
      <div class="info" style="border-width: 0">
        <span class="fixedAttribute">电话</span>
        <span class="attribute">{{Phone}}</span>
        <span class="el-icon-edit"></span>
      </div>
    </div>

    <p></p>

    <div style="width: 80%; border-width: 1px ; border-color: darkgray; margin-left: auto; margin-right: auto;
    border-style: solid ;border-radius: 5px; text-align: left; padding: 2% 0 0 2%">
      <p style="color: black; font-size: 24px">个人简介</p>
      <div class="info" style="border-width: 0">
        <span class="attribute">{{Introduction}}</span>
        <span class="el-icon-edit"></span>
      </div>
    </div>

    <p style="height: 10%"></p>

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
      Gender: '********',
      Email: '848318504@qq.com',
      Phone: '15652575233',
      Introduction: '爆肝工程师一枚'
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
