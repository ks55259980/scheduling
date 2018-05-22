<template>
    <div>
      <el-row>
        订单号：{{orderNum}}
      </el-row>
      <el-row>
        <hr/>
      </el-row>
      <el-row>
        <el-form size="mini" class="wy-form" :model="newPlanData" status-icon ref="ruleForm" >
          <el-row>
          <el-form-item label="生产线" prop="name" labelWidth="100px">
            <el-select v-model="newPlanData.line" :disabled="planListLength > 0" @change="lineSelChange" placeholder="请选择">
              <el-option
                v-for="item in lineoptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单类型" prop="name" labelWidth="100px">
            <el-select v-model="newPlanData.type" disabled placeholder="请选择">
              <el-option
                v-for="item in typeoptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="计划模式" prop="name" labelWidth="100px">
              <el-select v-model="newPlanData.mode" :disabled="planListLength > 0" placeholder="请选择" @change="modeSelChange">
                <el-option
                  v-for="item in modeoptions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生产时间" prop="time" labelWidth="100px">
              <el-date-picker
                :readonly="timeReadOnly"
                v-model="newPlanData.time"
                type="datetime"
                placeholder="选择日期时间"
                :disabled="planListLength > 0">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitPlanBtnClick" :disabled="addPlanDisabled()">提交计划</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
      <el-row :gutter="20" class="custom-tree-container">
        <el-col :md="12" class="block">
          <el-card class="box">
            <p>批次列表
              <!--<el-button style="float: right;"-->
              <!--v-show="(planListLength == 0)"-->
              <!--@click="deleteDown()"-->
              <!--size="mini">-->
              <!--</el-button>-->
            </p>
            <hr/>
            <el-table
              :data="planList"
              size="mini"
              stripe
              height="400"
              style="width: 100%">
              <el-table-column
                prop="text"
                label="批次名" min-width="120">
              </el-table-column>
              <el-table-column
                prop="start_date"
                label="开始时间" min-width="125">
              </el-table-column>
              <el-table-column
                prop="volume"
                label="数量/HL">
                <template slot-scope="scope">
                  {{scope.row.volume/100000}}
                </template>
              </el-table-column>
              <el-table-column
                prop="duration"
                label="耗时/h">
                <template slot-scope="scope">
                  {{getTwo(scope.row.duration/60.0)}}
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="80">
                <template slot-scope="scope">
                  <!--<el-button-->
                    <!--icon="el-icon-upload2"-->
                    <!--circle-->
                    <!--size="mini"-->
                    <!--@click="handleUp(scope.$index, scope.row)">-->

                  <!--</el-button>-->
                  <!--<el-button-->
                    <!--icon="el-icon-download"-->
                    <!--circle-->
                    <!--size="mini"-->
                    <!--type="danger"-->
                    <!--@click="handleDown(scope.$index, scope.row)">-->
                  <!--</el-button>-->
                  <!--<el-button-->
                    <!--:disabled="!((planListLength-1) == scope.$index) || (planList[planListLength-1].name == '收线')"-->
                    <!--icon="el-icon-plus"-->
                    <!--circle-->
                    <!--type="primary"-->
                    <!--@click="deleteDown(scope.$index, scope.row)">-->
                  <!--</el-button>-->
                  <el-button
                    :disabled="!((planListLength-1) == scope.$index)"
                    icon="el-icon-delete"
                    circle
                    type="danger"
                    @click="deleteDown(scope.$index, scope.row)">
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :md="12" class="block">
          <el-card class="box">
            <p>创建批次</p>
            <hr/>
            <el-row>
              <el-form size="mini" class="wy-form" :model="newPlanData" status-icon :rules="rules" ref="ruleForm" >
                <el-row>
                  批次号：{{pid}}
                  <el-form-item label="" prop="name" labelWidth="10px">
                    <el-select v-model="ptype" :disabled="planListLength == 0"  @change="ptypeSelChange" placeholder="请选择" style="width: 100px;">
                      <el-option
                        v-for="item in ptypeoptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disable"
                        >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="SKU:" prop="name" labelWidth="100px">
                    <el-select v-model="newPlanData.sku" placeholder="请选择" @change="skuSelChange">
                      <el-option
                        v-for="item in skuoptions"
                        :key="item.code"
                        :label="item.code"
                        :value="item.skuId">
                        <span style="float: left">{{ item.code }}</span>&nbsp;&nbsp;
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.skuId }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-row>
                <el-row v-show="!numDisabled">
                  <el-form-item label="数量:" labelWidth="50px">
                    <el-input-number v-model="newPlanData.num" :disabled="numDisabled" controls-position="right" @change="numhandleChange" :min="1"></el-input-number>
                  </el-form-item>
                  <el-form-item label="单位:" labelWidth="100px">
                    <el-select v-model="newPlanData.unit" placeholder="请选择" class="unit">
                      <el-option
                        v-for="item in unitoptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="配方:" labelWidth="50px">
                    <el-input disabled :value="newPlanData.pname" label=""></el-input>
                  </el-form-item>
                  <el-form-item label="耗时:" labelWidth="70px">
                    <el-input disabled :value="getTwo(newPlanData.ptime)"></el-input>
                    <!--<el-select v-model="newPlanData.type" placeholder="请选择">-->
                      <!--<el-option-->
                        <!--v-for="item in typeoptions"-->
                        <!--:key="item.code"-->
                        <!--:label="item.name"-->
                        <!--:value="item.code">-->
                      <!--</el-option>-->
                    <!--</el-select>-->
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-button type="primary" icon="el-icon-back" size="mini" :disabled="(!addPlanDisabled()) || (this.newPlanData.line == '') || (this.newPlanData.time == '') || (this.newPlanData.pname == '无配方' || this.newPlanData.pname == '查询中...')" @click="addPBtnClick">添加批次</el-button>
                </el-row>
              </el-form>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      readonly: true,
      orderNum: '待生成',
      newPlanData: {
        line: '',
        type: '1',
        time: '',
        mode: '2',
        num: '',
        unit: '1',
        sku: '',
        pname: '未查询',
        ptime: '',
        skuName: '',
        lineName: ''
      },
      ptype: '2', // 批次类型
      peifang: {}, // 添加批次时查出来的配方
      capacity: '', //当前选中的sku在生产线的效率
      numDisabled: false,
      rules: {
        name: [
          { required: true, message: '请选择名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ]
      },
      lineoptions: [],
      modeoptions: [{code: '1', name: 'as soon as possible'}, {code: '2', name: '定时'}],
      typeoptions: [{code: '1', name: '生产'}, {code: '2', name: '清洗'}, {code: '3', name: '大修'}],
      unitoptions: [{code: '1', name: 'HL'}],
      ptypeoptions: [{code: '2', name: '开线', disable: true}, {code: '3', name: '换线'}, {code: '4', name: '收线'}],
      skuoptions: [],
      lastOrder: {},
      timeReadOnly: false,
      planList: [],
      obj:{
        x:1,
        y:2
      }
    }
  },
  computed: {
    planListLength () {
      if (this.planList.length == 0) {
        this.ptype = '2'
      } else if (this.planList.length == 1) {
        this.ptype = '3'
      }
      return this.planList.length
    },
    pid () {
      return (this.ptype-1).toString() + this.zeroFit(this.planListLength)
    }
  },
  watch: {
    ptype () {
      if (this.ptype == '3') {
        this.getRecipeMsg()
      }
    }
  },
  created () {
    this.getProductionLineList()
  },
  methods: {
    submitPlanBtnClick () {
      var durTime = 0
      for (var i = 0; i < this.planList.length; i++) {
        durTime = durTime + this.planList[i].duration
      }
      this.$ajax.post('/order/create', {
        orderName: this.orderNum,
        productLine: this.newPlanData.line,
        orderType: this.newPlanData.type,
        startDate: new Date(this.planList[0].start_date).valueOf(),
        duration: parseInt(durTime),
        batchList: JSON.stringify(this.planList)
      }).then(response => {
        console.log(response.data)
        if(response.data.code === 200) {
          alert('好险，侥幸成功了')
        } else {
          alert('不知道当讲不当讲，失败了')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addPBtnClick () {
      var dic = {
        create_date: this.getCurrentTime(true),
        duration: this.newPlanData.ptime * 60,
        recipeId: this.peifang.id, // 配方id
        start_date: '', // 开始时间
        text: this.pid + '_' + this.newPlanData.lineName + '_' + this.newPlanData.skuName, // 批次号
        volume: this.newPlanData.num * 100 * 1000, // 数量
        sku: this.newPlanData.sku
      }
      this.planList.push(dic)
      this.compotedStartTime()
    },
    compotedStartTime () {
      // 每一次添加都重新计算所有的时间
      // 如果as soon=1 最后一次订单有 不需要gettime 2018-12-12 订单没有 1526558092130 如果类型=2 需要gettime
      for (var i = 0; i < this.planList.length; i++) {
        if (i == 0) { // 第一条数据 取生产开始的时间
          if (this.newPlanData.mode == '1' && this.lastOrder.order) {
            // 如果有上一次订单time
            this.planList[i].start_date = this.newPlanData.time
          } else {
            var time = this.chuoToTime(this.newPlanData.time.getTime())
            this.planList[i].start_date = time
          }
        } else {
          this.planList[i].start_date = this.chuoToTime(new Date(this.planList[i-1].start_date).valueOf() + (this.planList[i-1].duration * 60 * 1000))
        }
      }
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
    getSku () {
      this.$ajax.get(`SKU/select?productLine=${this.newPlanData.line}`)
        .then(response => {
          this.skuoptions = response.data.data
          this.newPlanData.sku = ''
        })
        .catch(error => {
          console.log(error)
        })
    },
    getLastOrderMsg () {
      this.$ajax.get(`order/selectLastOneByProductLine?productLine=${this.newPlanData.line}`)
        .then(response => {
          this.lastOrder = response.data.data
          if (this.lastOrder.order) {
            if (this.lastOrder.order.text.substring(0,6) == this.getCurrentTime(false).substring(0,6)) {
              var num = parseInt(this.lastOrder.order.text.substring((this.lastOrder.order.text.length-2),this.lastOrder.order.text.length)) +1
              if (num < 10) {
                num = '0' + num
              }
              this.orderNum = this.getCurrentTime(false) + this.newPlanData.lineName + num
            } else {
              this.orderNum = this.getCurrentTime(false) + this.newPlanData.lineName + '01'
            }
          } else {
            this.orderNum = this.getCurrentTime(false) + this.newPlanData.lineName + '01'
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRecipeMsg () {
      var url = `/recipe/select?productLine=${this.newPlanData.line}&recipeType=${this.ptype}&newSKU=${this.newPlanData.sku}`
      if (this.planListLength > 0) {
        url = `/recipe/select?productLine=${this.newPlanData.line}&recipeType=${this.ptype}&newSKU=${this.newPlanData.sku}&oldSKU=${this.planList[this.planList.length-1].sku}`
      }
      this.newPlanData.pname = '查询中...'
      this.$ajax.get(url)
        .then(response => {
          console.log(response)
          if(response.data.code == 200) {
            if (response.data.data.length > 0) {
              this.newPlanData.pname = response.data.data[0].text
              this.peifang = response.data.data[0]
              if (this.ptype == '4') {
                this.newPlanData.ptime = response.data.data[0].duration/60.0
              } else {
                this.newPlanData.ptime = response.data.data[0].duration/60.0 + (this.newPlanData.num/this.capacity)
              }
            } else {
              this.newPlanData.pname = '无配方'
              this.newPlanData.ptime = ''
            }
          }
        })
        .catch(error => {
          this.newPlanData.pname = '无配方'
          this.newPlanData.ptime = ''
          console.log(error)
        })
    },
    lineSelChange (value) {
      this.newPlanData.lineName = this.getLineName(value)
      this.getLastOrderMsg()
      this.getSku()
    },
    numhandleChange (value) {
      if (this.ptype == '4') {
        this.newPlanData.ptime = this.peifang.duration/60.0
      } else {
        this.newPlanData.ptime = this.peifang.duration/60.0 + (this.newPlanData.num/this.capacity)
      }
    },
    modeSelChange (value) {
      if (value === '1') {
        this.timeReadOnly = true
        if (this.lastOrder.order) {
          this.newPlanData.time = this.chuoToTime(new Date(this.lastOrder.order.start_date).valueOf() + (this.lastOrder.order.duration * 60 * 1000))
        } else {
          this.newPlanData.time = new Date()
        }
      } else {
        this.timeReadOnly = false
        this.newPlanData.time = ''
      }
    },
    ptypeSelChange (value) {
      if (value == '4') {
        this.getRecipeMsg()
        this.numDisabled = true
      } else {
        this.numDisabled = false
      }
    },
    skuSelChange (value) {
      this.capacity = ''
      this.getSkuName(value)
      if (value) {
        this.getRecipeMsg()
        this.getCapaCity(value)
      }
    },
    getCapaCity (value) {
      for (var i = 0; i < this.skuoptions.length; i++) {
        if (this.skuoptions[i].skuId == value) {
          this.capacity = this.skuoptions[i].capacity
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
    getSkuName (skuId) {
      for (var i = 0; i < this.skuoptions.length; i++) {
        if (this.skuoptions[i].skuId == skuId) {
          this.newPlanData.skuName = this.skuoptions[i].code
        }
      }
    },
    handleUp(index,row) {
      console.log('上移', index,row)
      console.log(this.planList[index])
      if (index > 0) {

        let upDate = this.planList[index - 1]
        this.planList.splice(index - 1, 1)
        this.planList.splice(index,0, upDate)
      } else {
        alert('已经是第一条，不可上移')
      }
    },
    deleteDown(index,row){
      console.log('删除',index,row)
      this.planList.splice(index, 1)
    },
    handleDown(index,row){
      console.log('下移',index,row)
      if ((index + 1) === this.planList.length){
        alert('已经是最后一条，不可下移')
      } else {
        console.log(index);
        let downDate = this.planList[index + 1]
        this.planList.splice(index + 1, 1)
        this.planList.splice(index,0, downDate)
      }
    },
    zeroFit (num) {
      if ((num+1) < 10) {
        return '0' + (num+1)
      } else {
        return num + 1
      }
    },
    getTwo (value) {
      if (value) {
        var f = parseFloat(value);
        return f.toFixed(4);
      } else {
        return 0
      }
    },
    addPlanDisabled () {
      if (this.planListLength) {
        return !(this.planList[this.planListLength-1]['text'].substr(0, 1) == '3')
      } else {
        return true
      }
    },
    getCurrentTime (value) {
      var date = new Date();//当前时间
      var month = this.zeroFill(date.getMonth() + 1) //月
      var day = this.zeroFill(date.getDate()) //日
      var hour = this.zeroFill(date.getHours()) //时
      var minute = this.zeroFill(date.getMinutes()) //分
      var second = this.zeroFill(date.getSeconds()) //秒
      //当前时间
      if (value) {
        var curTime = date.getFullYear() + "-" + month + "-" + day
          + " " + hour + ":" + minute + ":" + second
        return curTime
      } else {
        return date.getFullYear() + month + day
      }
    },
    zeroFill (i) {
      if (i >= 0 && i <= 9) {
        return "0" + i
      } else {
        return i
      }
    },
    chuoToTime (time) {
      var date = new Date(time)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = this.zeroFill(date.getDate()) + ' '
      var h = this.zeroFill(date.getHours()) + ':'
      var m = this.zeroFill(date.getMinutes()) + ':'
      var s = this.zeroFill(date.getSeconds())
      return Y+M+D+h+m+s
    }
  }
}
</script>
<style>
  .unit {
    width: 80px;
  }
  .box {
    min-height: 400px;
    max-height: 400px;
  }
  /*.custom-tree-node {*/
    /*display: flex;*/
    /*display: -webkit-flex; !* Safari *!*/
    /*align-items: center;*/
    /*!*justify-content: space-between;*!*/
    /*justify-content: center;*/
    /*font-size: 14px;*/
    /*border: 1px solid black;*/
    /*border-radius: 3px;*/
  /*}*/
  /*.block {*/
    /*flex:1;*/
    /*display: inline-block;*/
  /*}*/
</style>
