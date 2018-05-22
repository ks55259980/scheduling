<template>
    <div class="sidebar">
        <div style="text-align: center;padding:0 0 20px;background: white;">
          <img src="../../../static/images/leftTop.png" style="width: 100%;height: 75px;"/>
          <p style="font-size: 40px;background: white;">{{time}}</p>
          <p>2018 May 22nd</p>
        </div>
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
          <el-menu-item index="DashBoard">
            <span class="sb-icon"><i class="material-icons">home</i></span>
            <span class="sb-cn">DashBoard</span>
          </el-menu-item>

          <el-menu-item index="Formula">
            <span class="sb-icon"><i class="material-icons">perm_data_setting</i></span>
            <span class="sb-cn">配方</span>
          </el-menu-item>

          <el-menu-item index="Scheduling">
            <span class="sb-icon"><i class="material-icons">pie_chart</i></span>
            <span class="sb-cn">生产计划</span>
          </el-menu-item>

          <el-menu-item index="PIWatch">
            <span class="sb-icon"><i class="material-icons">content_paste</i></span>
            <span class="sb-cn">PI监视</span>
          </el-menu-item>

          <el-menu-item index="UserManage">

            <span class="sb-icon"><i class="material-icons">border_all</i></span>
            <span class="sb-cn">设置</span>
          </el-menu-item>

            <!--<el-submenu index="2">-->
                <!--<template slot="title">-->
                    <!--<span class="sb-icon"><i class="material-icons">perm_data_setting</i></span>-->
                    <!--<span class="sb-cn">产品管理</span>-->
                <!--</template>-->
                <!--<el-menu-item index="Products">产品管理</el-menu-item>-->
                <!--<el-menu-item index="Factory">工厂管理</el-menu-item>-->
                <!--<el-menu-item index="TodoList">TodoList</el-menu-item>-->
            <!--</el-submenu>-->

            <!--<el-submenu index="3">-->
                <!--<template slot="title">-->
                    <!--<span class="sb-icon"><i class="material-icons">pie_chart</i></span>-->
                    <!--<span class="sb-cn">活动管理</span>-->
                <!--</template>-->
                <!--<el-menu-item index="BasicCharts">活动管理</el-menu-item>-->
            <!--</el-submenu>-->

            <!--<el-submenu index="4">-->
                <!--<template slot="title">-->
                    <!--<span class="sb-icon"><i class="material-icons">content_paste</i></span>-->
                    <!--<span class="sb-cn">二维码管理</span>-->
                <!--</template>-->
                <!--<el-menu-item index="FormInput">二维码生成</el-menu-item>-->
                <!--<el-menu-item index="FormLayouts"> 二维码核销</el-menu-item>-->
            <!--</el-submenu>-->

             <!--<el-submenu index="5">-->
                <!--<template slot="title">-->
                    <!--<span class="sb-icon"><i class="material-icons">border_all</i></span>-->
                    <!--<span class="sb-cn">资金管理</span>-->
                <!--</template>-->
                <!--<el-menu-item index="BasicTables"> Basic Tables</el-menu-item>-->

            <!--</el-submenu>-->

        </el-menu>
    </div>
</template>
<script>
export default {
  data () {
    return {
      time: ''

    }
  },
  computed:{
      onRoutes(){
          return this.$route.path.replace('/','');
      }
  },
  created () {
    this.getCurrentTime()
    this.getTime()
  },
  methods: {
    getTime () {
      var that = this
      setInterval(function () {
        that.getCurrentTime()
      }, 1000 * 60)
    },
    getCurrentTime () {
      var that = this
      var date = new Date()
      var year = date.getFullYear() // 获取当前年份
      var mon = date.getMonth() + 1 // 获取当前月份
      var da = date.getDate() // 获取当前日
      //      var day1 = date.getDay() // 获取当前星期几
      var h = date.getHours() // 获取小时
      var m = date.getMinutes() // 获取分钟
      //      var s = date.getSeconds() // 获取秒 year + '.' + mon + '.' + da + ' ' +
      if (m <= 9) {
        m = '0' + m
      }
      that.time = h + ':' + m
//      this.todayDay = this.$t('day')[day1 - 1]
    }
  }
}
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 66px;
        bottom:0;
        background: #324157;

    }
    .sidebar > ul {
        height:100%;
    }

   .el-menu-item, .el-submenu__title{
       font-size:14px;

   }

    .material-icons {font-size:12px;}
</style>
