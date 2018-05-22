<template>
  <div>
    <!--<v-pageTitle vtitle="配方"></v-pageTitle>-->
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="PI监视" name="first">
          <el-row>
            <el-col :span="24">
              <el-card class="box-card" style="min-height: 500px;">
                <!--分配权限-->
                <!--<hr>-->
                <el-row>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <div class="box-card card-a-a">
                      <!--&nbsp;&nbsp;&nbsp;&nbsp;角色列表-->
                      <!--<hr>-->
                      <!--<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
                      <p style="text-align: center;color: #ccc; font-size: 60px;">PI Watch</p>
                      <br/>
                      <p style="text-align: right;color: #ccc; font-size: 40px;">PI Watch</p>
                      <br/>
                      <p style="text-align: left;color: #ccc; font-size: 40px;">Nothing</p>
                      <p style="text-align: center;color: #ccc; font-size: 80px;">👀</p>
                      <p style="text-align: right;color: #ccc; font-size: 60px;">Nothing</p>
                      <p style="text-align: left;color: #ccc; font-size: 40px;">PI Watch</p>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <div class="box-card">
                      <!--&nbsp;&nbsp;&nbsp;&nbsp;权限列表-->
                      <!--<hr>-->
                      <!--<el-tree-->
                        <!--:data="data2"-->
                        <!--show-checkbox-->
                        <!--node-key="id"-->
                        <!--ref="tree"-->
                        <!--default-expand-all-->
                        <!--:default-checked-keys="checkedData"-->
                        <!--:props="defaultProps"-->
                      <!--&gt;-->
                      <!--</el-tree>-->
                      <p style="text-align: center;color: #ccc; font-size: 60px;">Nothing</p>
                      <!--<p style="text-align: left;color: #ccc; font-size: 20px;">PI</p>-->
                      <br/>
                      <br/>
                      <p style="text-align: right;color: #ccc; font-size: 60px;">Wacth</p>
                      <p style="text-align: left;color: #ccc; font-size: 40px;">PI Watch</p>
                      <p style="text-align: center;color: #ccc; font-size: 80px;">PI</p>
                      <p style="text-align: right;color: #ccc; font-size: 60px;">Nothing</p>
                      <p style="text-align: left;color: #ccc; font-size: 40px;">PI Watch</p>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!--<el-tab-pane label="用户管理" name="second">-->
          <!--<div style="margin: 10px 0;">-->
            <!--<el-button type="primary" size="small" @click="showDialog">+ 新建用户</el-button>-->
            <!--<el-input size="small"-->
                      <!--placeholder="输入用户名称" style="width: 240px;margin-left: 20px;">-->
              <!--<el-button slot="append" icon="search"></el-button>-->
            <!--</el-input>-->
          <!--</div>-->
          <!--<new-product :dialogFormVisible='dialogVisible' v-on:dialogHide="hideDialog"></new-product>-->

          <!--<div>-->
            <!--<el-table stripe size="small" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">-->
              <!--<el-table-column type="selection" width="50">-->
              <!--</el-table-column>-->

              <!--<el-table-column prop="num" label="编号" width="90">-->
              <!--</el-table-column>-->

              <!--<el-table-column prop="status" label="用户名" show-overflow-tooltip>-->
              <!--</el-table-column>-->

              <!--<el-table-column prop="name" label="工厂" show-overflow-tooltip>-->
              <!--</el-table-column>-->

              <!--<el-table-column prop="status" label="员工姓名" show-overflow-tooltip>-->
              <!--</el-table-column>-->

              <!--<el-table-column prop="num" label="工号" show-overflow-tooltip>-->
              <!--</el-table-column>-->

              <!--<el-table-column prop="hsku" label="部门" show-overflow-tooltip>-->
              <!--</el-table-column>-->

              <!--<el-table-column prop="line" label="区域" show-overflow-tooltip>-->
              <!--</el-table-column>-->

              <!--<el-table-column prop="type" label="班组" show-overflow-tooltip>-->
              <!--</el-table-column>-->

              <!--<el-table-column prop="hsku" label="岗位" show-overflow-tooltip>-->
              <!--</el-table-column>-->

              <!--<el-table-column prop="hsku" label="机台" show-overflow-tooltip>-->
              <!--</el-table-column>-->



              <!--&lt;!&ndash;<el-table-column prop="status" label="创建人" width="100" show-overflow-tooltip>&ndash;&gt;-->
              <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
              <!--<el-table-column label="角色" min-width="150">-->
                <!--<template scope="scope">-->
                  <!--<el-select v-model="scope.row.rule" @change="ruleChange" size="mini" placeholder="请选择">-->
                    <!--<el-option-->
                      <!--v-for="item in data"-->
                      <!--:key="item.id"-->
                      <!--:label="item.label"-->
                      <!--:value="item.id">-->
                    <!--</el-option>-->
                  <!--</el-select>-->
                <!--</template>-->
              <!--</el-table-column>-->

            <!--</el-table>-->
            <!--<div style="margin-top: 20px">-->
              <!--<el-button @click="toggleSelection([tableData3[1], tableData3[2]])">删除</el-button>-->
              <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
              <!--<el-pagination-->
                <!--background-->
                <!--layout="prev, pager, next"-->
                <!--:total="10" style="display: inline-block;float: right;">-->
              <!--</el-pagination>-->
            <!--</div>-->
          <!--</div>-->
        <!--</el-tab-pane>-->
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import vPageTitle from '../common/pageTitle.vue';
  import NewProduct from './NewProduct.vue';
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElCard from "../../../node_modules/element-ui/packages/card/src/main.vue";
  export default {
    data() {
      return {
        tableData3: [{
          num: '120001',
          date: '2016-05-03',
          name: 'PUT',
          status:'李开开',
          type: 'A',
          line: 'CL01',
          qsku: '操作工',
          hsku: '包装',
          rule: 1
        }, {
          num: '120001',
          date: '2016-05-02',
          name: 'PUT',
          address: '旺旺雪饼，好吃不贵，一起回味童年',
          status:'张成龙',
          type: 'A',
          line: 'CL01',
          qsku: '操作工',
          hsku: '包装',
          rule: 1
        }, {
          num: '120001',
          date: '2016-05-04',
          name: 'PUT',
          address: '够辣够酸爽',
          status:'李思思',
          type: 'A',
          line: 'CL01',
          qsku: '操作工',
          hsku: '包装',
          rule: 1
        }, {
          num: '120001',
          date: '2016-05-01',
          name: 'PUT',
          address: '一起哈啤',
          status:'盛夏',
          type: 'B',
          line: 'CL01',
          qsku: '操作工',
          hsku: 'TS',
          rule: 1
        },{
          num: '120001',
          date: '2016-05-08',
          name: 'PUT',
          address: '灰常可爱时尚唯美',
          status:'秋阳',
          type: 'C',
          line: 'CL01',
          qsku: '操作工',
          hsku: '酿造',
          rule: 1
        }, {
          num: '120001',
          date: '2016-05-06',
          name: 'PUT',
          status:'田壮壮',
          type: 'B',
          line: '',
          qsku: '操作工',
          hsku: '酿造',
          rule: 1
        }, {
          num: '120001',
          date: '2016-05-07',
          name: 'PUT',
          address: '暖和暖和够暖和',
          status:'小晓',
          type: 'C',
          line: '',
          qsku: '操作工',
          hsku: 'TS',
          rule: 1
        }, {
          num: '120001',
          date: '2016-05-07',
          name: 'PUT',
          status:'见清',
          type: 'C',
          line: 'CL01',
          qsku: '操作工',
          hsku: 'TS',
          rule: 1
        }, {
          num: '120001',
          date: '2016-05-07',
          name: 'PUT',
          status:'李元元',
          type: 'A',
          line: '',
          qsku: '操作工',
          hsku: '糖化',
          rule: 1
        }, {
          num: '120001',
          date: '2016-05-07',
          name: 'PUT',
          status:'哈哈',
          type: 'C',
          line: 'CL01',
          qsku: '操作工',
          hsku: 'ES',
          rule: 1
        }],
        multipleSelection: [],
        dialogVisible: false,
        activeName: 'first',
//        props: {
//          label: 'name',
//          children: 'zones'
//        },
//        count: 1,
        data2: [{
          id: 1,
          label: 'DashBoard',
          children: [{
            id: 6,
            label: '查看'
          }]
        }, {
          id: 2,
          label: '配方',
          children: [{
            id: 7,
            label: '配方列表',
            children: [{
              id: 14,
              label: '查看'
            }, {
              id: 15,
              label: '新建'
            }, {
              id: 16,
              label: '编辑'
            }, {
              id: 17,
              label: '删除'
            }]
          }, {
            id: 8,
            label: '操作记录',
            children: [{
              id: 18,
              label: '查看'
            }]
          }]
        }, {
          id: 3,
          label: '生产计划',
          children: [{
            id: 9,
            label: '计划跟踪',
            children: [{
              id: 19,
              label: '查看'
            }, {
              id: 20,
              label: '新建'
            }, {
              id: 21,
              label: '编辑'
            }, {
              id: 22,
              label: '删除'
            }]
          }, {
            id: 10,
            label: '操作记录',
            children: [{
              id: 23,
              label: '查看'
            }]
          }]
        }, {
          id: 4,
          label: 'PI监视',
          children: [{
            id: 11,
            label: 'PI列表',
            children: [{
              id: 23,
              label: '查看'
            }]
          }]
        }, {
          id: 5,
          label: '设置',
          children: [{
            id: 12,
            label: '权限设置',
            children: [{
              id: 24,
              label: '查看'
            }, {
              id: 25,
              label: '新建'
            }, {
              id: 26,
              label: '编辑'
            }, {
              id: 27,
              label: '删除'
            }]
          }, {
            id: 13,
            label: '用户管理',
            children: [{
              id: 28,
              label: '查看'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        checkedData: [1, 2],
        data: [{
          id: 1,
          label: '超级管理员'
        },{
          id: 2,
          label: '部门管理员（TS)'
        },{
          id: 3,
          label: '部门管理员（包装）'
        },{
          id: 4,
          label: '部门管理员（酿造）'
        },{
          id: 5,
          label: '计划管理员（TS）'
        },{
          id: 6,
          label: '计划管理员（包装）'
        },{
          id: 7,
          label: '计划管理员（酿造）'
        },{
          id: 8,
          label: '普通用户'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        ruleValue: ''
      }
    },
    methods: {
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
        this.dialogVisible = true;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      // 角色列表的节点被点击
      handleNodeClick(data) {
        console.log(data);
        this.$refs.tree.setCheckedKeys([3]);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region1' }, { name: 'region2' }]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++
            }, {
              name: 'zone' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      },
      ruleChange (row) {
        alert(1)
      }
    },
    components:{
      ElCard,
      ElButton,
      vPageTitle,
      NewProduct
    }
  }
</script>

<style>
  .box-card{
    font-size:12px;
  }
  .box-card hr{
    height:1px;
    border:none;
    border-top:1px  dashed #ccc;
    margin-bottom:10px;
    margin-top:6px;
  }

  .card-a{
    border-right: 1px #ccc dashed;
  }
  .el-tree{
    width: 100%;
    overflow:scroll;
    max-height: 400px;
    min-height: 400px;
  }
</style>


