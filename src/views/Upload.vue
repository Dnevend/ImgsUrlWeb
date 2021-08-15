<template>
  <div class="upload">

    <div>
      <img class="uploadImg" :src="imgUrl" >
    </div>

    <el-row style="margin-top: 10px;">
      <el-input class="url" v-model="imgUrl" placeholder="URL" style="width: 300px;" ></el-input>
      <el-button v-clipboard:copy="imgUrl" v-clipboard:success="onCopy">Copy</el-button>
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

  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: '',
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
  }
  .upload-main{
    opacity: 0.1;
  }
</style>

