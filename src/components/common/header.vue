<template>
    <div class="header">
        <el-row :gutter="10">
            <!--Logo area-->
            <el-col :xs="12" :sm="12" :md="4">
                <div class="logo">
                    <span class="logo_prefix">Scheduling </span><span class="logo_suffix"> </span>
                </div>
            </el-col>

            <!--<el-col :xs="12" :sm="12" :md="{span:10,offset: 10}">-->
              <!--<div class="header-right">-->
                <!--<el-col :span="4">-->
                  <!--<span><i class="el-icon-message"></i>张三</span>-->
                <!--</el-col>-->
                <!--<el-col :span="4">-->
                  <!--<span><i class="el-icon-message"></i>张三</span>-->
                <!--</el-col>-->
                <!--<el-col :span="4">-->
                  <!--<span><i class="el-icon-message"></i>张三</span>-->
                <!--</el-col>-->
              <!--</div>-->
            <!--</el-col>-->

            <el-col :xs="12" :sm="12" :md="{span:6,offset:12}">
              <div class="header-right">
                <span><i class="el-icon-success"></i> 张三(管理员)</span>
                <span><i class="el-icon-location"></i> 包装 </span>
                <span><i class="el-icon-phone"></i> 230015(工号) </span>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="2">
              <el-button style="color: white;" type="text" icon="el-icon-upload2"> 退出登陆 </el-button>
            </el-col>

            <!--<el-col :xs="8" :sm="8" :md="{span:2,offset: 16}" >-->
                <!--<div class="header-right">-->
                   <!--<el-col :span="18">-->
                     <!--<span><i class="el-icon-message"></i>张三</span>-->
                        <!--这是消息的下拉列表 用了element里的 dropdown组件-->
                        <!--<el-dropdown menu-align="start" >-->
                            <!--<span>-->
                                <!--<el-badge :value="5" class="item">-->
                                    <!--<i class="el-icon-message"></i>-->
                                <!--</el-badge>-->
                            <!--</span>-->
                            <!--<el-dropdown-menu slot="dropdown" >-->
                                <!--<el-dropdown-item >-->
                                <!--<span class="pop-title">You have new messages! </span>-->
                                <!--</el-dropdown-item>-->

                                <!--<el-dropdown-item  v-for="dialog in dialogs" :key="dialog.time" divided>-->
                                    <!--<div class="pop-div">-->
                                        <!--<span class="pop-image">-->
                                            <!--<img :src="dialog.header" width="50px" >-->
                                        <!--</span>-->
                                        <!--<span class="pop-content">-->
                                        <!--{{dialog.content}}-->
                                        <!--</span>-->
                                        <!--<span class="pop-time">-->
                                            <!--{{dialog.time}}分钟前-->
                                        <!--</span>-->
                                    <!--</div>-->
                                <!--</el-dropdown-item>-->
                            <!--</el-dropdown-menu>-->
                        <!--</el-dropdown>-->
                   <!--</el-col>-->
                   <!--<el-col :span="8">-->
                     <!--<span><i class="el-icon-message"></i>张三</span>-->
                        <!--<el-dropdown menu-align="start"  >-->
                            <!--<span >-->
                                <!--<el-badge :value="3" class="item">-->
                                    <!--<i class="el-icon-date"></i>-->
                                <!--</el-badge>-->
                            <!--</span>-->
                            <!--<el-dropdown-menu slot="dropdown" >-->
                                <!--<el-dropdown-item >-->
                                <!--<span class="pop-title">You have new tasks! </span>-->
                                <!--</el-dropdown-item>-->
                                <!--<el-dropdown-item v-for="task in tasks" :key="task.id" divided>-->
                                    <!--<div class="task-div">-->
                                        <!--<span class="task-span task-tag">-->
                                        <!--<el-tag type="danger" v-if="task.rank==1">紧急</el-tag>-->
                                        <!--<el-tag type="warning" v-if="task.rank==2">重要</el-tag>-->
                                        <!--<el-tag type="success" v-if="task.rank==3">正常</el-tag>-->
                                        <!--</span>-->
                                        <!--<span class="task-span task-content">-->
                                        <!--{{task.content}}<br/>-->
                                        <!--<span class="task-time">截止：{{task.overTime}}</span>-->
                                        <!--</span>-->

                                        <!--<span class="task-span task-btn"><el-button type="primary" size="mini">完成</el-button></span>-->
                                    <!--</div>-->
                                <!--</el-dropdown-item>-->

                            <!--</el-dropdown-menu>-->
                        <!--</el-dropdown>-->
                   <!--</el-col>-->
                <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :xs="8" :sm="8" :md="2" >-->
              <!--<div class="header-right">-->
                <!--<span><i class="el-icon-date">退出登陆</i></span>-->
                  <!--<el-dropdown trigger="click" menu-align="start">-->
                      <!--<img src="../../../static/images/b_header.jpg" width="50px" />-->
                      <!--<el-dropdown-menu slot="dropdown">-->
                          <!--<el-dropdown-item >-->
                              <!--<div class="setting-div">-->
                                  <!--<span class="setting-icon"><i class="material-icons">account_box</i></span>-->
                                  <!--<span class="setting-string"> Profile  个人</span>-->
                              <!--</div>-->
                          <!--</el-dropdown-item>-->
                          <!--<el-dropdown-item divided>-->
                              <!--<div class="setting-div">-->
                                  <!--<span class="setting-icon"><i class="material-icons">settings</i></span>-->
                                  <!--<span class="setting-string"> Settings  设置</span>-->
                              <!--</div>-->

                          <!--</el-dropdown-item>-->
                          <!--<el-dropdown-item divided>-->
                              <!--<div class="setting-div">-->
                                  <!--<span class="setting-icon"><i class="material-icons">assignment_return</i></span>-->
                                  <!--<span class="setting-string"> Sign out  退出</span>-->
                              <!--</div>-->

                          <!--</el-dropdown-item>-->
                      <!--</el-dropdown-menu>-->
                  <!--</el-dropdown>-->
              <!--</div>-->
            <!--</el-col>-->
        </el-row>

    </div>
</template>

<script>
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
    import NewProduct from '../page/NewProduct.vue';
    import ElCol from "element-ui/packages/col/src/col";

    export default {
      components: {
        ElCol,
        ElButton,NewProduct},
      data() {
            return {
                dialogVisible:false,
                name: 'linxin',
                dialogs:[
                    {header:'../../static/images/b_header2.jpg',content:'你有一个新的核销消息。',time:'3'},
                    {header:'../../static/images/b_header3.jpg',content:'你有一个新的兑奖消息。',time:'15'},
                    {header:'../../static/images/b_header.jpg',content:'认证通过。',time:'18'},
                    {header:'../../static/images/b_header2.jpg',content:'认证不通过，查看原因。来自管理员。',time:'24'},
                    {header:'../../static/images/b_header3.jpg',content:'未认证，请及时认证。',time:'45'},
                ],
                tasks:[
                    {id:1,rank:1,content:'完成JSPangAdmin头部头部组件的编写。',overTime:'2017/3/9'},
                    {id:2,rank:2,content:'完成GitHub仓库的初始化工作。',overTime:'2017/3/15'},
                    {id:3,rank:3,content:'在阿里云进行网站备案，完成后通知组长。',overTime:'2017/3/20'}

                ]
            }
        },
        methods:{

        }
    }
</script>
<style scoped>
    .header {
        position: fixed;
        box-sizing: border-box;
        width: 100%;
        height:66px;
        font-size: 14px;
        line-height: 66px;
        background-color:#0096fa;
        /*background-color:#fff;*/
        box-shadow:2px 0 3px rgba(0,0,0,.5);
        z-index:1000;
        padding:0 32px 0 40px;
        overflow:hidden;

    }
    .header .logo{
        float: left;
        cursor:pointer;
        font-size: 22px;
    }
    .logo_prefix{
        /*color:#209e91;*/
      color: #fff;
    }
    .logo_suffix{
        color:#fff;
    }
    .header .search{
        float: left;
        color:#fff;
        font-size:14px;
    }
    .website span{
        display:inline-block;
        color:#209e91;
    }
    .website span:first-child{
        color:#fff;
    }
    .header-right{
        padding-top:25px;
        line-height:10px;
    }
    .header-right span{
        display:inline-block;
        margin-left:14px;
        /*font-size:18px;*/
        color:#fff;
        line-height:1px;
        height:18px;
        cursor:pointer;

    }
    /*.header-right span:hover{*/
        /*color:#209e91;*/
    /*}*/
    .user-header{
        line-height:10px;
        padding-top:7px;
        font-size:12px;
    }
    .user-header img{
        border-radius:50%;
        cursor:pointer;
    }
    .pop-image{
        display:block;
        float:left;
    }
    .pop-image img{
        border-radius:50%;
    }
    .pop-div{
        height:55px;
        clear:both;
    }
    .pop-content{
        display:block;
        font-size:12px;
        line-height:14px;
        padding-top:15px;
        margin-left:60px;
    }
    .pop-time{
        display:block;
        float:right;
        font-size:10px;
        color:#ccc;

    }
    .pop-title{
        font-size:12px;
        color:#209e91;
    }
    .task-div{
        clear:both;
        height:55px;
    }
    .task-span{
        display:block;
        float:left;
        font-size:12px
    }

    .task-content{
        width:160px;
        line-height:16px;
        margin-left:10px;
        padding:5px;
    }
    .task-time{
        clear:both;
        float:right;
        color:#ccc;

    }
    .setting-div{
        height:30px;
        line-height:30px;
        clear:both;
    }
    .setting-div span{
        display:block;
        float:left;
        font-size:12px;
    }
    .setting-icon{
        padding-top:3px;
        padding-right:3px;
    }

</style>
