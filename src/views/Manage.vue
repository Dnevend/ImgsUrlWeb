<template>
  <div class="manage">
    <div class="params">
      <h3><a @click="showSettingParams" href="#">Settings</a> | <a @click="onExit" href="#">Exit</a></h3>
    </div>

    <el-dialog
        title="系统参数设置"
        width="300px"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        :open="showSettingParams">
      <el-form :model="form">
        <el-form-item label="参数名" :label-width="formLabelWidth">
          <el-select v-model="form.value" placeholder="请选参数"
                     @change="onOptionChange($event)">
            <el-option v-for="item in form.settingParams"
                       :key="item.id"
                       :label="item.label"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值" :label-width="formLabelWidth">
          <el-input v-model="form.label" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">设 置</el-button>
      </div>
    </el-dialog>

    <div class="dataTable">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
        <el-form-item label="时间范围" required>
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker type="date" placeholder="起始日期" v-model="ruleForm.startDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker type="date" placeholder="截止日期" v-model="ruleForm.stopDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>

      <el-pagination
          class="pagination-top"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :total="total"
          :page-sizes="[5, 10, 20, 30, 50]"
          :page-size="5"
          layout="total, sizes, prev, pager, next">
      </el-pagination>

      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            align="center"
            prop="imgUrl"
            label="图片"
            width="300">
          <template slot-scope="scope">
            <span class="title-img">
              <img :src="scope.row.imgUrl" :alt="scope.row.remark" class="table-img">
            </span>
          </template>
        </el-table-column>
        <el-table-column
            prop="UpTime"
            label="日期">
        </el-table-column>
        <el-table-column
            prop="Uploader"
            label="上传者">
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button @click="showImg(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="removeImg(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

<!--      <el-pagination-->
<!--          class="pagination-top"-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--          background-->
<!--          :total="total"-->
<!--          :page-sizes="[5, 10, 20, 30, 50]"-->
<!--          :page-size="5"-->
<!--          layout="total, sizes, prev, pager, next">-->
<!--      </el-pagination>-->
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      tableData: [
        {
          imgUrl: '',
          UpTime: '',
          Uploader: '',
          remark: ''
        },
      ],

      dialogTableVisible: false,
      dialogFormVisible: false,
      settingParams: [],
      form: {
        settingParams: [{id: 0, label: ''}],
        region: '',
        name: '',
        value: '',
        desc: ''
      },
      formLabelWidth: '60px',

      ruleForm: {
        startDate: '',
        stopDate: '',
      },

      page: 1,
      pageSize: 5,
      total: 0
    }
  },
  methods: {
    onExit() {
      localStorage.removeItem("Flag")
      this.$store.commit("saveToken", "");//清掉 token
      this.$router.push({path: '/Login'});
    },
    showSettingParams() { //获取参数列表
      this.dialogFormVisible = true;
      let that = this;
      this.$api.post(
          'api/setting/GetAllSettingParams',
          {},
          r => {
            that.form.settingParams = [];
            r.response.forEach(function (obj) {
              let param = { id: obj.id, label: obj.Param, value: obj.value }
              that.form.settingParams.push(param)
            })
          }
      );
    },
    onSearch() { //查询
      let that = this;
      this.$api.post(
          'api/FilesUrl/GetAllFilesUrlList',
          { page: this.page, pageSize: this.pageSize },
          r => {
            // console.log(r.response)
            that.total = r.response.total
            r.response.imgList.forEach((obj) => {
              obj.imgUrl = that.$imgUrlRoot + obj.Url
            })
            that.tableData = r.response.imgList
          }
      );
    },
    showImg(row) {
      console.log(row);
    },
    removeImg(row) {
      console.log(row);
    },
    onOptionChange(event){
      console.log('optionchange', event)
    },
    handleSizeChange(val)
    {
      this.pageSize = val
      this.onSearch()
    },
    handleCurrentChange(val){
      this.page = val
      this.onSearch()
    }
  },
  mounted() {
    this.onSearch();
  }
}
</script>

<style>
  .manage {
    padding:50px 0px 200px 0px;
  }
  .params {
    text-align: right;
    padding-left: 50px;
    padding-right: 50px;
  }
  .dataTable {
    padding: 20px;
  }
  .pagination-top {
    margin-bottom: 10px;
  }
  .pagination-bottom {
    margin-top: 10px;
  }
  .table-img {
    width: 300px;
  }
  .demo-form-inline label{
    color: #ffffff;
  }
</style>

