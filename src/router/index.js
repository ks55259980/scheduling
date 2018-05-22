import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/common/Home';
// import DashBoard from '@/components/page/DashBoard';
// import AmCharts from '@/components/page/BasicCharts';
// import FormInput from '@/components/page/FormInput';
// import FormLayouts from '@/components/page/FormLayouts';
// import BasicTables from '@/components/page/BasicTables';
// import EditorPage from '@/components/page/EditorPage';
// import MarkdownPage from '@/components/page/MarkdownPage';
// import TodoList from '@/components/page/TodoListPage';
// import Products from '@/components/page/Products';
// import Factory from '@/components/page/Factory';
import DashBoard from '@/components/page/DashBoard1';
import Formula from '@/components/page/Formula';
import UserManage from '@/components/page/UserManage';
import Scheduling from '@/components/page/Scheduling';
import PIWatch from '@/components/page/PIWatch';

Vue.use(Router)

export default new Router({
  mode:'history',
  base:__dirname,
  routes: [
    {
      path: '/',
      component: Home,
      children:[
        {
          path:'',
          component:DashBoard
        },{
          path:'/DashBoard',
          component:DashBoard
        },{
          path:'/Formula',
          component:Formula
        },{
          path:'/UserManage',
          component:UserManage
        },{
          path:'/Scheduling',
          component:Scheduling
        },{
          path:'/piwatch',
          component:PIWatch
        }
      ]
    }
  ]
})
