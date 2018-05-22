<template>
  <div>
    <!--<v-pageTitle vtitle="配方"></v-pageTitle>-->
    <el-card class="cardContent">
      <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="配方列表" name="first">
          <div style="margin: 10px 0;">
            <el-button size="small" type="primary" @click="showDialog">+ 新建配方</el-button>
            <el-input v-model="recipeName" size="small"
              placeholder="输入配方名称" style="width: 240px;margin-left: 20px;">
              <el-button slot="append" icon="el-icon-search" @click="searchBtnClick"></el-button>
            </el-input>
          </div>

          <new-formula :dialogFormVisible='dialogVisible' v-on:dialogHide="hideDialog"></new-formula>

          <div>
            <el-table stripe size="small" ref="multipleTable" :data="recipe" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <!--<el-table-column type="selection" width="50">-->
              <!--</el-table-column>-->

              <el-table-column prop="id" label="序号" min-width="100">
              </el-table-column>

              <el-table-column prop="text" label="配方名称" show-overflow-tooltip min-width="100">
              </el-table-column>

              <el-table-column prop="recipeType" label="配方类别" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{getRecipeTypeName(scope.row.recipeType)}}
                </template>
              </el-table-column>

              <el-table-column prop="productLine" label="生产线" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{getLineName(scope.row.productLine)}}
                </template>
              </el-table-column>

              <el-table-column prop="oldSku" label="前SKU" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.oldSku?getSkuName(scope.row, 'oldSku'):'-'}}
                </template>
              </el-table-column>

              <el-table-column prop="newSku" label="后SKU" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{getSkuName(scope.row, 'newSku')}}
                </template>
              </el-table-column>

              <el-table-column label="日期" min-width="120px">
                <template slot-scope="scope">{{ scope.row.create_date }}</template>
              </el-table-column>

              <el-table-column prop="status" label="创建人" width="100" show-overflow-tooltip>
                <template slot-scope="scope">张三</template>
              </el-table-column>
              <el-table-column label="操作" min-width="90"  fixed="right">
                <template scope="scope">
                  <el-button size="mini" disabled type="text">编辑/查看</el-button>
                  <el-button size="mini" type="text" @click="recipeListDel(scope.row)">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
            <div style="margin-top: 20px">
              <!--<el-button @click="toggleSelection([recipe[1], recipe[2]])">删除</el-button>-->
              <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
              <el-pagination
                background
                layout="prev, pager, next"
                :total="10" style="display: inline-block;float: right;">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="操作记录" name="second">
          <el-table stripe size="small" ref="multipleTable" :data="recipe" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="50">-->
            <!--</el-table-column>-->

            <el-table-column prop="id" label="序号">
            </el-table-column>

            <el-table-column prop="text" label="配方名称" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="recipeType" label="配方类别" show-overflow-tooltip>
              <template slot-scope="scope">
                {{getRecipeTypeName(scope.row.recipeType)}}
              </template>
            </el-table-column>

            <el-table-column prop="productLine" label="生产线" show-overflow-tooltip>
              <template slot-scope="scope">
                {{getLineName(scope.row.productLine)}}
              </template>
            </el-table-column>

            <el-table-column prop="oldSku" label="前SKU" show-overflow-tooltip>
              <template slot-scope="scope">
                {{getSkuName(scope.row, 'oldSku')}}
              </template>
            </el-table-column>

            <el-table-column prop="newSku" label="后SKU" show-overflow-tooltip>
              <template slot-scope="scope">
                {{getSkuName(scope.row, 'newSku')}}
              </template>
            </el-table-column>

            <el-table-column label="创建日期">
              <template slot-scope="scope">{{ scope.row.create_date }}</template>
            </el-table-column>

            <el-table-column prop="status" label="操作" width="100" show-overflow-tooltip>
              <template slot-scope="scope">新建</template>
            </el-table-column>

            <el-table-column prop="status" label="操作人" width="100" show-overflow-tooltip>
              <template slot-scope="scope">张三</template>
            </el-table-column>
            <!--<el-table-column label="操作" width="140"  fixed="right">-->
            <!--<template scope="scope">-->
            <!--<el-button size="small" type="success">详情</el-button>-->
            <!--<el-button size="small" type="primary">编辑</el-button>-->
            <!--<el-button size="small" type="danger">删除</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->

          </el-table>
          <div style="margin-top: 20px">
            <!--<el-button @click="toggleSelection([recipe[1], recipe[2]])">删除</el-button>-->
            <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
            <el-pagination
              background
              layout="prev, pager, next"
              :total="10" style="display: inline-block;float: right;">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新建配方" name="third">
          <div>
            <el-form size="mini" class="wy-form" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" >
              <!--<el-form-item label="配方名称" prop="name">-->
                <!--<el-input v-model="ruleForm.name" placeholder="不超过20个汉字"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="配方类型" prop="name">
                <el-select v-model="ruleForm.type" placeholder="请选择">
                  <el-option
                    v-for="item in typeoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disable">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生产线" prop="name">
                <el-select v-model="ruleForm.line" placeholder="请选择" @change="lineChange">
                  <el-option
                    v-for="item in lineoptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="前SKU" prop="name">
                <el-select v-model="ruleForm.qsku" placeholder="请选择" :disabled="ruleForm.type=='2'">
                  <el-option
                    v-for="item in skuoptions"
                    :key="item.skuId"
                    :label="item.code"
                    :value="item.skuId"
                    :loading="skuload">
                    <span style="float: left">{{ item.code }}</span>&nbsp;&nbsp;
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.skuId }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="后SKU" prop="name">
                <el-select v-model="ruleForm.hsku" placeholder="请选择">
                  <el-option
                    v-for="item in skuoptions"
                    :key="item.skuId"
                    :label="item.code"
                    :value="item.skuId"
                    :loading="skuload">
                    <span style="float: left">{{ item.code }}</span>&nbsp;&nbsp;
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.skuId }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="pushFormula" :loading="pushFormulaState">{{pushFormulaTitle}}</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="gantt6" ref="gantt6"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import 'dhtmlx-gantt'
  import vPageTitle from '../common/pageTitle.vue';
  import NewFormula from './NewFormula.vue';
  export default {
    data() {
      return {
        recipeName: '',
        recipe: [],
        multipleSelection: [],
        dialogVisible: false,
        activeName: 'third',
        formLabelWidth: '120px',
        ruleForm: {
          name: '',
          type: '',
          line: '',
          qsku: '',
          hsku: ''
        },
        typeoptions: [{value: '1',label: '设备配方',disable: true}, {value: '2',label: '开线'}, {value: '3',label: '换线'}, {value: '4',label: '收线'}],
        lineoptions: [],
        skuoptions: [],
        allskuoptions: [],
        skuload: false,
        rules: {
          name: [
            { required: true, message: '请输入配方名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        },
        tasksData: {
        },
        opts: [
          {key:1, label: "配方名称"},
          {key:2, label: "设备名称"},
          {key:3, label: "操作步骤"}
        ],
        equipmentopts: [],
        pushFormulaTitle: '创建配方'
      }
    },
    computed: {
      pushFormulaState () {
        if (this.pushFormulaTitle == '创建配方') {
          return false
        } else {
          return true
        }
      }
    },
    created () {
      this.getAllSku ()
      this.getProductionLineList()
      this.getEquipmentList()
      this.getRecipeListData()
    },
    mounted: function () {
      gantt.config.xml_date="%Y-%m-%d %H:%i"
      gantt.config.scale_unit = "hour" // 即X轴的单位，包括："minute", "hour", "day", "week", "month", "year"
      gantt.config.step = 1
      gantt.config.date_scale = "%g %a"
//      gantt.config.date_scale = "%F, %Y"
      gantt.config.min_column_width = 20
      gantt.config.duration_unit = "minute"
      gantt.config.duration_step = 1
      gantt.config.scale_height = 75
      gantt.config.row_height = 24
//      gantt.config.fit_tasks = true
//      gantt.config.drag_project = true
      gantt.config.readonly = false
      gantt.config.subscales = [
        {unit: "day", step: 1, date: "%j %F, %l"},
        {unit: "minute", step: 1, date: "%i"}
      ]

      gantt.config.lightbox.sections = [
        {name:"priority",    height:22, map_to:"priority", type:"select", options:this.opts},
        {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
        {name:"equipment",    height:22, map_to:"equipment", type:"select", options:this.equipmentopts},
        {name:"time",        height:72, map_to:"auto", type:"duration", time_format:["%d","%m","%Y","%H:%i"]}
      ]
      gantt.locale.labels.section_priority = "priority"
      gantt.locale.labels.section_equipment = "equipment"
      gantt.init(this.$refs.gantt6)
//      gantt.parse(this.tasks)
    },
    methods: {
      searchBtnClick () {
        this.getRecipeListData()
      },
      recipeListDel (data) {
        this.$confirm('此操作将永久删除该配方, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.delete(`recipe/delete?id=${data.id}`)
            .then(response => {
              if (response.data.code == 200) {
                this.getRecipeListData()
                this.$message({
                  type: 'info',
                  message: '删除成功!'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败了!'
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      getRecipeTypeName (code) {
        for (var i = 0; i < this.typeoptions.length; i++) {
          if (this.typeoptions[i].value == code) {
            return this.typeoptions[i].label
          }
        }
      },
      getLineName (code) {
        for (var i = 0; i < this.lineoptions.length; i++) {
          if (this.lineoptions[i].code == code) {
            return this.lineoptions[i].name
          }
        }
      },
      getSkuName (code, isNew) {
        for (var i = 0; i < this.allskuoptions.length; i++) {
          if (this.allskuoptions[i].skuId == code[isNew] && this.allskuoptions[i].productLine == code.productLine) {
            return this.allskuoptions[i].code
          }
        }
      },
      getRecipeListData () {
        var url = 'recipe/select'
        if (this.recipeName) {
          url = `recipe/select?recipeName=${this.recipeName}`
        }
        this.$ajax.get(url)
          .then(response => {
            if (response.data.code == 200) {
              this.recipe = response.data.data
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      hideDialog() {
        this.dialogVisible = false;
      },
      showDialog() {
//        this.dialogVisible = true;
        this.activeName = 'third'
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      beforeDestroy: function () {
        gantt.clearAll()
      },
      lineChange (value) {
        this.getSku()
      },
      getProductionLineList () {
        this.$ajax.get('enum/productionLine')
          .then(response => {
            this.lineoptions = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      getAllSku () {
        this.$ajax.get(`SKU/select`)
          .then(response => {
            this.allskuoptions = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      getSku () {
        this.skuload = true
        this.$ajax.get(`SKU/select?productLine=${this.ruleForm.line}`)
          .then(response => {
            this.skuload = false
            this.skuoptions = response.data.data
            this.qsku = ''
            this.hsku = ''
          })
          .catch(error => {
            console.log(error)
            this.skuload = false
          })
      },
      getEquipmentList () {
        this.$ajax.get('enum/requipment')
          .then(response => {
            for (var i = 0; i < response.data.data.length; i++) {
              var dic = {}
              dic.key = response.data.data[i].code
              dic.label = response.data.data[i].name
              this.equipmentopts.push(dic)
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      pushFormula () {
        if (!this.ruleForm.type){
          this.$message('请选择配方类型')
          return
        } else if (!this.ruleForm.line){
          this.$message('请选择生产线')
          return
        } else if (!this.ruleForm.hsku){
          this.$message('请选择后SKU')
          return
        } else if (!this.ruleForm.qsku && this.ruleForm.type != '2'){
          this.$message('请选择前SKU')
          return
        }
        var data = gantt.serialize().data
        if (data.length == 0) {
          this.$message('请添加配方信息')
          return
        }
        var recipeDic = {
          create_date: this.getCurrentTime(),
          newSku: this.ruleForm.hsku,
          oldSku: 0,
          productLine: this.ruleForm.line,
          recipeType: this.ruleForm.type,
          id: '',
          start_date: '',
          text: '',
          duration: ''
        }
        if (this.ruleForm.type != '2') {
          recipeDic.oldSku = this.ruleForm.qsku
        }
        var equipmentList = []
        var componentList = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].priority === '1') {
            recipeDic.id = data[i].id
            recipeDic.start_date = data[i].start_date
            recipeDic.text = data[i].text
            recipeDic.duration = data[i].duration
            recipeDic.priority = '1'
          }
          if (data[i].priority === '2') {
            equipmentList.push(data[i])
          }
          if (data[i].priority === '3') {
            componentList.push(data[i])
          }
        }
        if (equipmentList.length == 0) {
          this.$message('缺失设备配方信息，请检查')
          return
        }
        if (componentList.length == 0) {
          this.$message('缺失步骤配方信息，请检查')
          return
        }
        this.pushFormulaTitle = '创建中'
        this.$ajax.post('/recipe/create', {
          recipeStr: JSON.stringify(recipeDic),
          equipmentListStr: JSON.stringify(equipmentList),
          componentListStr: JSON.stringify(componentList)
        }).then(response => {
          this.pushFormulaTitle = '创建配方'
          if(response.data.code === 200) {
            this.activeName = 'first'
            this.getRecipeListData()
            this.$message({
              message: '新建配方成功',
              type: 'success'
            })
          } else {
            alert('不知道当讲不当讲，创建配方失败了')
          }
        }).catch(error => {
          console.log(error)
          this.pushFormulaTitle = '创建配方'
        })
      },
      getCurrentTime () {
        var date = new Date();//当前时间
        var month = this.zeroFill(date.getMonth() + 1) //月
        var day = this.zeroFill(date.getDate()) //日
        var hour = this.zeroFill(date.getHours()) //时
        var minute = this.zeroFill(date.getMinutes()) //分
        var second = this.zeroFill(date.getSeconds()) //秒
        //当前时间
        var curTime = date.getFullYear() + "-" + month + "-" + day
          + " " + hour + ":" + minute + ":" + second;
        return curTime;
      },
      zeroFill (i) {
        if (i >= 0 && i <= 9) {
          return "0" + i;
        } else {
          return i;
        }
      }
  },
    beforeDestroy: function () {
      gantt.clearAll()
    },
    components:{
      vPageTitle,
      NewFormula
    }
  }
</script>

<style>
  @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
  .gantt6{
    width: 100%;
    height: 400px;
  }
  .cardContent{
    min-height: 600px;
  }
  .wy-form{
    display: inline-block;
  }
  .wy-form .el-form-item {
    display: inline-block;
  }
</style>

