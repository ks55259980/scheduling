<template>
  <div>
    <el-dialog title="新建产品" :visible.sync="dialogVisible" :before-close="hide">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="不超过20个汉字"></el-input>
        </el-form-item>
        <el-form-item label="产品条码" prop="code">
          <el-input v-model="ruleForm.name" placeholder="数字或字母的组合"></el-input>
        </el-form-item>
        <el-form-item label="保质期" prop="date">
          <el-input v-model.number="ruleForm.date" placeholder="必须是数字格式"><template slot="append">天</template></el-input>
        </el-form-item>
        <el-form-item label="产品图标" prop="icon">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品图片" prop="pictures">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList2"
            :limit="1"
            :on-exceed="handleExceed"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传三张jpg/png文件，且每张不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品简介" prop="intro" >
          <el-input type="textarea" placeholder="请输入产品简介，150字以内" v-model="ruleForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="产品描述" prop="desc">
          <el-input type="textarea" placeholder="请输入产品描述，300字以内" v-model="ruleForm.desc"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    props:['dialogFormVisible'],
    data() {
      return {
//        dialogVisible:false,
        form: {
          name: '',
          code: '',
          date: '',
          icon: '',
          pictures: '',
          intro: [],
          desc: ''
        },
        formLabelWidth: '120px',
        ruleForm: {
          name: '',
          code: '',
          date: '',
          icon: '',
          pictures: '',
          intro: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          date: [
            { type: 'number', message: '保质期必须为数字值', trigger: 'blur'}
          ],
          icon: [
            { required: true, message: '请上传产品图标', trigger: 'blur' }
          ],
          intro:[
            { required: true, message: '请输入产品简介',trigger: 'blur'},
            { min: 5, max: 300, message: '长度在 5 到 300 个字符', trigger: 'blur' }
          ],
          desc:[
            { required: true, message: '请输入产品描述',trigger: 'blur'},
            { min: 5, max: 300, message: '长度在 5 到 300 个字符', trigger: 'blur' }
          ]

        },
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        fileList2: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ]
      }
    },

    computed: {
      dialogVisible: {
        get:function () {
          console.log(this.dialogFormVisible);
          return this.dialogFormVisible;
        },
//        set:function (newValue) {
//          alert('345');
//          this.$emit('hide');
//        }
      }
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
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      hide:function () {
        this.$emit('dialogHide');
      }
    }
  }
</script>
