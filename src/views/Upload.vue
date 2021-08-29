<template>
  <div class="upload">

    <div>
      <img class="uploadImg" :src="imgUrl" >
    </div>

    <el-row style="margin-top: 10px;">
      <el-input class="url" v-model="imgUrl" placeholder="URL" style="width: 300px;" ></el-input>
      <br/>
      <div class="action">
        <el-button v-clipboard:copy="imgUrl" v-clipboard:success="onCopy">Copy</el-button>
        <el-button v-clipboard:copy="imgUrl" v-clipboard:success="onQrShow">QR.</el-button>
      </div>
    </el-row>

    <div class="upload-container">
      <el-upload
          class="upload-main"
          action="action"
          list-type="picture-card"
          :http-request="UploadImage">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>

<!--    <div class="welcome">-->
<!--      <p style="font-size: 46px; color: #008800;"><b>W e l c o m !</b></p>-->
<!--    </div>-->

    <div class="statement">
      注意：使用此网站功能时，代表您已了解<a href="#" class="statementContent" @click="showStatement">《使用协议》</a>
    </div>

    <el-dialog
        title="Qr Code."
        :visible.sync="qrDialogVisible"
        :show-close="true"
        :modal-append-to-body="false"
        width="60%">
      <vue-qr :logo-src="logoSrc" :text="imgUrl" class="qrImg"></vue-qr>
    </el-dialog>

    <el-dialog
        title="《使用协议》"
        :visible.sync="statementDialogVisible"
        :show-close="false"
        :modal-append-to-body="false"
        width="60%"
        center>
      <div class="statementlist">
        <div>
          <ul>
            <li>不得上传色情、暴力、政治等内容</li>
            <li>不得上传侵犯版权、个人隐私权等内容</li>
            <li>图片不得用于博彩、棋牌、网赚等网站</li>
            <li>违反以上规定直接删除图片不另行通知</li>
            <li>图片长期保存，直到网站无法维持</li>
          </ul>
        </div>

        <div class="github"><a href="https://github.com/Dnevend/ImgsUrlWeb" target="_blank">项目开源地址</a></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="statementDialogVisible = false">我已了解</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import vueQr from 'vue-qr';
import '../assets/css/animation.css';
export default {
  components: {
    vueQr
  },
  data() {
    return {
      imgUrl: '',
      statementDialogVisible: false,
      qrDialogVisible: false,
      logoSrc: require("../assets/favicon.png")
    }
  },
  methods: {
    UploadImage(param){
      let that = this;
      const formData = new FormData()
      formData.append('file', param.file)
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      };//添加请求头
      this.$axios.post('api/Files/uploadImg', formData, config).then(
          response => {
            if(response.data.success)
            {
              this.imgUrl = response.data.response;
              that.$store.commit("setUrl", this.imgUrl);
            }
            else
            {
              this.$message({
                showClose: true,
                message: response.data.msg
              });
            }
          }
      )
    },
    onCopy()
    {
      this.$message({
        showClose: true,
        message: 'Copyed'
      });
    },
    onQrShow()
    {
      this.qrDialogVisible = true;
    },
    showStatement()
    {
      this.statementDialogVisible = true;
    }
  },
  mounted() {
    this.imgUrl = this.$store.getters.imgUrl;
  }
}
</script>

<style>
  .upload{
    margin-top: 100px;
  }
  .uploadImg{
    border-style: dashed;
    width: 320px;
    box-shadow: 0 2px 15px 0 rgba(50, 100, 50, 0.5);
  }
  .upload-container{
    margin-top: 10px;
    -webkit-animation: bounce-top 0.9s both;
    animation: bounce-top 0.9s both;
  }
  .upload-main{
    opacity: 0.1;
  }
  .action
  {
    margin-top: 10px;
  }
  .statement
  {
    position: fixed;
    bottom: 0px;
    right: 15px;
    /*width: 100%;*/
    color: #E9EEF3;
    font-size: 12px;
    margin-bottom: 70px;
    -webkit-animation: text-flicker-in-glow 4s linear both;
    animation: text-flicker-in-glow 4s linear both;
  }
  .statementContent
  {
    color: #008800;
    font-style:italic;
    text-decoration: none;
  }
  .statementlist
  {
    width: 100%;
    text-align: center;
  }
  .statementlist ul
  {
    display: inline-block;
    margin: 0;
    padding: 0;
  }
  .statementlist ul li
  {
    text-align:left;
  }
  .github
  {
    margin-top: 20px;
  }
  .el-dialog--center .el-dialog__body {
    text-align: center;
  }
  .qrImg
  {
    width: auto;
    height: auto;
    min-height: 100px;
    min-width: 100px;
  }
  .welcome {
    -webkit-animation: blur-out-contract 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
    animation: blur-out-contract 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  }
</style>

