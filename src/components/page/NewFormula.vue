<template>
  <div>
    <el-dialog title="新建配方" :visible.sync="dialogVisible" :before-close="hide">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="配方名称" prop="name">
          <el-input v-model="ruleForm.name" width="80px;" placeholder="不超过20个汉字"></el-input>
        </el-form-item>
        <el-form-item label="配方类型">
          <el-checkbox-group >
            <el-checkbox label="开线" name="type"></el-checkbox>
            <el-checkbox label="换线" name="type"></el-checkbox>
            <el-checkbox label="收线" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <!--<div class="gantt1" ref="gantt1"></div>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">创建配方</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'dhtmlx-gantt'
  export default {
    props:['dialogFormVisible'],
    data() {
      return {
//        dialogVisible:false,
        form: {
          name: ''
        },
        formLabelWidth: '120px',
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        },
        tasks: {
          data: [
            {id: 1, text: 'Task #1', start_date: '15-04-2017', duration: 3, progress: 0.6},
            {id: 2, text: 'Task #2', start_date: '18-04-2017', duration: 3, progress: 0.4}
          ],
          links: [
            {id: 1, source: 1, target: 2, type: '0'}
          ]
        },
      }
    },
    computed: {
      dialogVisible: {
        get:function () {
          console.log(this.dialogFormVisible);
          return this.dialogFormVisible;
        }
      }
    },
    mounted: function () {
//      gantt.init(this.$refs.gantt1)
//      gantt.parse(this.tasks)
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      hide:function () {
        this.$emit('dialogHide');
      }
    }
  }
</script>
<style>
  @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
  .gantt1{
    width: 100%;
    height: 400px;
  }
</style>
