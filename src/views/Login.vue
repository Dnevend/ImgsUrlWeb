<template>

  <div class="about">
    <div class="login">
      <el-form ref="form" :model="form" >
        <el-form-item>
          <el-input v-model="form.username" placeholder="UserName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="form.password" placeholder="PassWord"></el-input>
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
      }
    }
  },
  methods: {
    onLogin() {
      let that = this;
      that.$store.commit("saveToken", "");//清掉 token
      this.$api.post(
          "Login",
          { grant_type: 'password', username: that.form.username, password: that.form.password },
          r => {
            if (r) {
              var token = r.access_token;
              that.$store.commit("saveToken", token);//保存 token
              localStorage.setItem("Flag", "isLogin");
              this.$router.push({path: '/Manage'});
            }
            else {
              this.$message({
                type: "error",
                message: "Error!",
                showClose: true
              });
            }
          }
      );
    }
  },
  created() {
    if (window.localStorage.Token&&window.localStorage.Token.length>=128){
      this.isLogin=true;
    }
  }
}
</script>

<style>
  .about
  {
    padding:200px 0px 200px 0px;
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