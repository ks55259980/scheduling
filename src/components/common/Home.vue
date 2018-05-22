<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="parentContent">
          <div class="contentTop">
            <el-radio-group v-model="radioValue" size="medium">
              <el-radio-button label="包装"></el-radio-button>
              <el-radio-button label="酿造" disabled></el-radio-button>
              <el-radio-button label="TS" disabled></el-radio-button>
            </el-radio-group>
          </div>
          <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
          </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        components:{
          vHead, vSidebar
        },
        data () {
          return {
            radioValue: '包装'
          }
        }
    }
</script>
<style>

</style>
