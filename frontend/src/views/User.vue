<template>
  <div style="width: 100%; height: 100%">
    <div style="width: 100%">
      <p style="color: black; font-size: 32px; margin: 0">个人信息</p>
      <p style="color: darkgray; font-size: 18px">您在 Google 服务中使用的基本信息，例如您的姓名和照片</p>
    </div>
    <div style="width: 100%; border-width: 1px ; border-color: darkgray;
    border-style: solid ;border-radius: 5px; text-align: left; padding: 2% 0 0 2%">
      <p style="color: black; font-size: 24px">个人资料</p>
      <div class="info">
        <span class="fixedAttribute">照片</span>
        <span class="attribute">添加照片来个性化您的账号</span>
      </div>
      <div class="info">
        <span class="fixedAttribute">姓名</span>
        <span class="attribute">李昕航</span>
      </div>
      <div class="info">
        <span class="fixedAttribute">生日</span>
        <span class="attribute">1998年9月7日</span>
      </div>
      <div class="info">
        <span class="fixedAttribute">性别</span>
        <span class="attribute">男</span>
      </div>
      <div class="info" style="border-width: 0">
        <span class="fixedAttribute">密码</span>
        <span class="attribute">********</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User'
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
    font-weight: bold;
  }
</style>
