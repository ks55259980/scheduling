<template>
  <div>
    <!--<v-pageTitle vtitle="FormLayouts"></v-pageTitle>-->
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <!--<el-button style="float: right; padding: 7px 0 0" >操作按钮</el-button>-->
          <el-tabs v-model="activeName">
            <el-tab-pane label="计划追踪" name="first">
              <gantt class="gantt" :tasks="tasks" :config="config" ref="gantt" :baseline="baseline"></gantt>
              <!--<div class="gantt" ref="gantt3"></div>-->
              <!--<div style="border-bottom: 1px #cecece solid;border-right: 1px #cecece solid;border-left: 1px #cecece solid;">我们都是中国人🇨🇳</div>-->
            </el-tab-pane>
            <!--<el-tab-pane label="操作记录" name="second">987654345</el-tab-pane>-->
            <el-tab-pane label="新建计划" name="third">
              <new-plan></new-plan>
            </el-tab-pane>
          </el-tabs>
          <!--<hr>-->
        </el-card>
      </el-col>
    </el-row>

  </div>

</template>

<script>
  import vPageTitle from '../common/pageTitle.vue'
  import newPlan from './NewPlan.vue'
  import Gantt from '../gantt/Gantt.vue'

  export default {
    components:{
      vPageTitle,
      newPlan,
      Gantt
    },
    data () {
      return {
        activeName: 'first',
        tasks: {
          data: []
        },
        interval: '',
        config: {
          xml_date: '%Y-%m-%d %H:%i',
          scale_unit: "hour",
          step: 1,
          date_scale: "%g %a",
          min_column_width: 20,
          duration_unit: "minute",
          duration_step: 1,
          scale_height: 75,
          row_height: 30,
          fit_tasks: true,
          drag_project: true,
          readonly: true,
          task_height: 16,
          row_height: 40,
          subscales: [
            {unit: "day", step: 1, date: "%j %F, %l"},
            {unit: "minute", step: 5, date: "%i"}
          ]
        },
        baseline: 'Planned'
      }
    },
    mounted: function () {
    },
    created () {
      this.getOrderList()
    },
    methods: {
      getOrderList () {
        this.$ajax.get('order/selectBySelective')
          .then(response => {
            if (response.data.code == 200) {
              if (response.data.data.length > 0) {
                this.tasks.data.push(response.data.data[0]) // response.data.data.length-1
                this.getOrderDetail(this.tasks.data[0].id)
                this.getIntervalTrue()
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getIntervalTrue () {
        var that = this
        this.interval = setInterval(function(){
          that.getOrderDetail(that.tasks.data[0].id)
        },5000*60)
      },
      getOrderDetail (value) {
        this.$ajax.get(`order/selectById?id=${value}`)
          .then(response => {
            this.tasks.data = this.tasks.data.concat(response.data.data)
            this.$refs.gantt.clearAll()
            this.$refs.gantt.parse(this.tasks)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    beforeDestroy: function () {
      var that = this
      clearInterval(that.interval)
      this.$refs.gantt.clearAll()
    }
  }
</script>

<style scoped>
  .gantt{
    width: 100%;
    height: 400px;
  }
  /*.el-col{*/
    /*margin-bottom:16px;*/
  /*}*/
  .box-card{
    min-height: 600px;
  }
  /*.box-card hr{*/
    /*height:1px;*/
    /*border:none;*/
    /*border-top:1px  dashed #ccc;*/
    /*margin-bottom:10px;*/
    /*margin-top:6px;*/
  /*}*/
  /*.card-a{*/
    /*height:300px;*/
  /*}*/

</style>
