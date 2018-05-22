<template>
  <div>
    <!--<v-pageTitle vtitle="DashBoard"></v-pageTitle>-->
    <!--<div class="clear"></div>-->
    <el-card class="planCard">
      <div slot="header">
        <span>计划跟踪</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="gantt" ref="gantt1"></div>
    </el-card>

    <el-card>
      <div slot="header" class="clearfix">
        <p>观察列表（2018年5月2日）<span><small class="warninDiv"> 警告&nbsp;</small></span><span><small class="dangerDiv"> 危险</small></span></p>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="品种">
        </el-table-column>
        <el-table-column
          prop="data1"
          label="00:00">
        </el-table-column>
        <el-table-column
          prop="data2"
          label="01:00">
        </el-table-column>
        <el-table-column
          prop="data3"
          label="02:00">
        </el-table-column>
        <el-table-column
          prop="data4"
          label="03:00">
        </el-table-column>
        <el-table-column
          prop="data5"
          label="04:00">
        </el-table-column>
        <el-table-column
          prop="data6"
          label="05:00">
        </el-table-column>
        <el-table-column
          prop="data7"
          label="06:00">
        </el-table-column>
        <el-table-column
          prop="data8"
          label="07:00">
        </el-table-column>
        <el-table-column
          prop="data9"
          label="08:00">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'dhtmlx-gantt'
//  import vPageTitle from '../common/pageTitle.vue';
  export default {
    name: 'gantt1',
    components:{
//      vPageTitle
    },
    data () {
      return {
        tasks: {
            data: [
            ],
            links: [
            ]
        },
        tableData: [{
          date: '2016-05-02',
          name: '温度',
          data1: '12',
          data2: '12',
          data3: '12',
          data4: '12',
          data5: '12',
          data6: '23',
          data7: '12',
          data8: '1',
          data9: '12'
        }]
      }
    },

    mounted: function () {
//      gantt.config.readonly = true
      gantt.config.scale_unit = "day" // 即X轴的单位，包括："minute", "hour", "day", "week", "month", "year"
      gantt.config.readonly = true
      gantt.config.xml_date="%Y-%m-%d %H:%i"
      gantt.init(this.$refs.gantt1)
      gantt.parse(this.tasks)
    },
    beforeDestroy: function () {
      gantt.clearAll()
    },
  }
</script>

<style>
  @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
  .planCard{
    margin-bottom: 15px;
  }
  .gantt{
    width: 100%;
    height: 400px;
  }
  .warninDiv:before{
    content: '';
    width:10px;
    height: 10px;
    background: red;
    display: inline-block;
  }
  .dangerDiv:before{
    content: '';
    width:10px;
    height: 10px;
    background: yellow;
    display: inline-block;
  }
  .el-card__body{
    /*background: #eee;*/
  }
</style>
