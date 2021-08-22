<template>

  <div class="about">
    <div class="login">
      <el-form ref="form" :model="form" >
        <el-form-item>
          <el-input class="username" v-model="form.username" placeholder="UserName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="password" type="password" v-model="form.password" placeholder="PassWord"></el-input>
        </el-form-item>
        <el-form-item align="top">
          <el-col :span="8" >
            <el-image class="verifyCode" :src="form.codeImg" @click="refreshCode" />
          </el-col>
          <el-col :span="2">
            <p></p>
          </el-col>
          <el-col :span="14">
            <el-input v-model="form.verifyCode" placeholder="Code"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        verifyCode: '',
        codeImg: '',
        codeToken: '',
      }
    }
  },
  methods: {
    onLogin() {
      let that = this;
      that.$store.commit("saveToken", "");//清掉 token
      this.$api.post(
          "Login",
          {
            grant_type: 'password',
            username: that.form.username,
            password: that.form.password,
            verifyCode: that.form.verifyCode,
            codeToken: that.form.codeToken
          },
          r => {
            if (r) {
              var token = r.access_token;
              that.$store.commit("saveToken", token);//保存 token
              localStorage.setItem("Flag", "isLogin");
              this.$router.push({path: '/Manage'});
            }
            else {
              console.log(r);
              this.$message({
                type: "error",
                message: "Error!",
                showClose: true
              });
            }
          }
      );
    },
    refreshCode() {//获取验证码图片
      let that = this;
      that.$axios.get(
        "api/VerifyCode/GenerateCode",
        {responseType: 'arraybuffer'}
      )
      .then(function (response) {
        that.form.codeToken = response.headers['content-disposition'];
        that.form.codeImg = 'data:image/jpeg;base64,' + that.arrayBufferToBase64(response.data);
      })
    },
    arrayBufferToBase64 (buffer) {
      var binary = ''
      var bytes = new Uint8Array(buffer)
      var len = bytes.byteLength
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return window.btoa(binary)
    },
  },
  created() {
    if (window.localStorage.Token&&window.localStorage.Token.length>=128){
      this.isLogin=true;
    }
    this.refreshCode();
  }
}
</script>

<style>
  .about
  {
    padding:150px 0px 200px 0px;
  }
  .el-image{
    margin-top: 0;
  }
  .verifyCode
  {
    padding: 0;
    height: 38px;
    border-radius: 5px;
    line-height: 38px;
    border-color: #ffffff;
    border-width: 1px;
    border-style: dashed;
  }
  .login{
   margin: 0 auto;
   opacity: 0.9;
   border-radius: 10px;
   border-style: dashed;
   background-color: whitesmoke;
   padding: 20px;
   width: 280px;
  }
</style>