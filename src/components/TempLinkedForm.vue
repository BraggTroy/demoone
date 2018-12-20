<template>
  <!--关联表单-->
  <div style="padding: 15px;">
    <el-row :gutter="15" type="flex">
      <el-col :span="12">
        <LinkedForm
          :formType="'rt_leave'"
          :on-confirm="handleConfirm"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-close="handleClose"
          :listType="listType"
          :value="linkedList">
          <el-button class="bg-purple hover" type="btn" icon="el-icon-circle-plus">关联表单</el-button>
        </LinkedForm>
      </el-col>
      <el-col :span="12">
        <LinkedForm
          :formType="'rt_leave'"
          :on-confirm="handleConfirm"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-close="handleClose"
          :value="linkedList"
          >
          <el-button class="bg-purple hover" type="btn" icon="el-icon-circle-plus">关联表单</el-button>
        </LinkedForm>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :span="24">
        <div style="background: #fff; padding: 15px;">
          <h4>使用说明：</h4>

          <p>1、引入： import LinkedForm from '../components/linkedForm/index.vue'</p>
          <p>2、使用： < LinkedForm>< /LinkedForm></p>

          <h4>属性与方法说明：</h4>

          <table class="use-table" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
              <th>属性名称</th>
              <th>说明</th>
              <th>类型</th>
              <th>可选值</th>
              <th>默认值</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>formType</td><td>要查询出来的表单的类别</td><td>String</td><td>-</td><td>-</td></tr>
            <tr><td>on-confirm</td><td>点击弹窗中确定</td><td>function(formList)</td><td>-</td><td>-</td></tr>
            <tr><td>on-preview</td><td>已选中的展示在页面上的表单名称点击</td><td>function(form)</td><td>-</td><td>-</td></tr>
            <tr><td>on-remove</td><td>已选中的展示在页面上的表单移除事件</td><td>function(form, formList)</td><td>-</td><td>-</td></tr>
            <tr><td>on-close</td><td>关闭弹窗事件，一般较少用到</td><td>function()</td><td>-</td><td>-</td></tr>
            <tr><td>listType</td><td>关联表单的类型</td><td>String</td><td>normal，list</td><td>normal</td></tr>
            <tr><td>value</td><td>默认情况下，回显的列表数据</td><td>Array</td><td>-</td><td>[]</td></tr>
            <tr><td>showFormList</td><td>是否显示已选择表单的列表</td><td>Boolean</td><td>-</td><td>true</td></tr>
            </tbody>
          </table>


        </div>
      </el-col>
    </el-row>

    <div>
      <xmp>
        < LinkedForm
          :formType="'rt_leave'"
          :on-confirm="handleConfirm"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-close="handleClose"
          :value="linkedList">
          < el-button class="bg-purple hover" type="btn" icon="el-icon-circle-plus">关联表单< /el-button>
        < /LinkedForm>
      </xmp>
    </div>
  </div>
</template>

<script>
  import LinkedForm from '../components/linkedForm/index.vue'
  import ElRow from 'element-ui/packages/row/src/row'

  export default {
    name: '',
    components: {
      ElRow,
      LinkedForm},
    data () {
      return {
        linkedList: [
          {id: 1, title: '小霍的请假单', type: 'rt_leave'},
          {id: 3, title: '小霍的请假单3小霍的请假单3小霍的请假单3小霍的请假单3小霍的请假单3小霍的请假单3小霍的请假单3小霍的请假单3小霍的请假单3', type: 'rt_leave'}
        ],
        listType: 'list',
        showFormList: false
      }
    },
    methods: {
      handleConfirm (list) {
        console.log(list)
      },
      handleClose () {
        console.log("关闭了弹窗")
      },
      handlePreview (item) {
        console.log(item)
      },
      handleRemove (item, list) {
        console.log(item)
        console.log(list)
      },
    }
  }
</script>

<style scoped lang="stylus">
  .use-table {
    width: 100%;
  }

  .use-table tr th,
  .use-table tr td {
    padding: 10px 4px;
    border-bottom: 1px solid borderColor;
    text-align: center;
  }

</style>
