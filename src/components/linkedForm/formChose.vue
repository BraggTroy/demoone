<template>
  <el-dialog class="zgj-modal" @opened="dialogOpened"
    title="关联表单选择"
    :visible.sync="zgjLinkFormVisible"
    :show-close="showClose"
    :close-on-click-modal="showClose"
    :close-on-press-escape="showClose"
    width="650px"
    :before-close="handleClose">
    <div class="zgj__link__inner">
      <i class="el-icon-close close" @click="closeDialog"></i>
      <div class="search__box">
        <el-button  v-for="item in timeList"
                   :key="item.value"
                   :class="{'active': time === item.value}"
                   @click="timeChange(item.value)">
          {{item.name}}</el-button>

        <div class="type__select">
          <el-select v-model="type" clearable @change="typeChange">
            <el-option
              v-for="item in typeList"
              :label="item.name"
              :value="item.value"
              :key="item.value"></el-option>
          </el-select>
        </div>

        <div class="keywords">
          <el-form ref="form" label-width="0" @submit.native.prevent>
            <el-form-item>
              <el-input v-model="keywords" @keydown.native="keywordsChange"
                        suffix-icon="el-icon-search" placeholder="请输入主题"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!---->
      <div class="form__list_box">
        <div class="table-header text-center">
          主题
        </div>
        <div class="table-body scrollbar">
          <el-table
            ref="multipleForm"
            :data="formList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              width="auto">
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <el-pagination
        class="is-background"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirmDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'FormList',
    components: {},
    data () {
      return {
        timeList: [
          {name: '1个月', value: '1'},
          {name: '3个月', value: '3'},
          {name: '半年', value: '6'}
        ],
        time: '1',
        typeList: [
          {name: '请假', value: 'rt_leave'},
          {name: '外出', value: 'rt_out'},
          {name: '会议', value: 'rt_meeting'},
        ],
        type: '',
        keywords: '',
        zgjLinkFormVisible: false,
        formList: [], // 查询到的表单数据列表

        submitData: [], // 最终提交的数据
        pageSize: 20,
        currentPage: 1,
        total: 100,

        showClose: false
      }
    },
    props: {
      formType: '',
      listType: '',
      formsList: {
        type: Array,
        default () { return [] }
      },
      handleClose: Function,
      handleConfirm: Function
    },

    mounted () {
      if (this.formList.length === 0) {
        this.queryFormList()
      }

      this.$parent.$on('remove', data => {
        if (!this.$refs.multipleForm) { return false }
        for (let i = 0, len = this.formList.length; i < len; i++){
          if (this.formList[i].id === data.id){
            this.$refs.multipleForm.toggleRowSelection(this.formList[i], false);
            return false
          }
        }
      })
    },

    methods: {
      dialogOpened () {
        if (this.zgjLinkFormVisible) {
          if (this.formsList.length > 0) {
            if (this.formList.length > 0) {
              this.showChosen()
            } else {
              this.queryFormList(this.showChosen)
            }
          }
        }
      },

      // 时间条件改变
      timeChange (val) {
        this.time = val
        this.queryFormList()
      },
      // 类型条件改变
      typeChange (type) {
        console.log(type)
        this.queryFormList()
      },
      // 关键词查询
      keywordsChange (e) {
        if(e.keyCode === 13){
          console.log(this.keywords)
          this.queryFormList()
        }
      },
      // 执行查询
      queryFormList (callback) {
        let param = {
          formType: this.formType,
          time: this.time,
          type: this.type,
          keywords: this.keywords,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        }

        setTimeout( () => {
          this.formList = [
            {id: 1, title: '小霍的请假单', type: 'rt_leave'},
            {id: 2, title: '小霍的请假单2', type: 'rt_leave'},
            {id: 3, title: '小霍的请假单3小霍的请假单3小霍的请假单3小霍的请假单3小霍的请假单3小霍的请假单3小霍的请假单3小霍的请假单3小霍的请假单3', type: 'rt_leave'},
            {id: 4, title: '小霍的请假单4', type: 'rt_leave'},
            {id: 5, title: '小霍的请假单5', type: 'rt_leave'},
            {id: 6, title: '小霍的请假单6小霍的请假单6', type: 'rt_leave'}
          ]
          if (callback && typeof callback === 'function') {
            callback()
          }
        }, 150)


        this.$axios({
          url: '/test',
          method: 'GET',
          data: param
        }).then(res => {
          console.log(res)

        })

      },

      // 若有初始化数据，则回显
      showChosen () {
        let that = this
        this.formsList.forEach(item => {
          for (let i = 0, len = this.formList.length; i < len; i++){
            if (this.formList[i].id === item.id){
              that.$refs.multipleForm.toggleRowSelection(this.formList[i], true);
              return false
            }
          }
        })
      },

      // 选中数据同步
      handleSelectionChange (val) {
        this.submitData = val
      },

      handleSizeChange (val) {
        this.pageSize = val
//        this.queryFormList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
//        this.queryFormList()
      },
      // 关闭弹窗
      closeDialog () {
        this.zgjLinkFormVisible = false
        let that = this

        that.$refs.multipleForm.clearSelection();
        this.formList.forEach(item => {
          for (let i = 0, len = this.formsList.length; i < len; i++){
            if (this.formsList[i].id === item.id){
              that.$refs.multipleForm.toggleRowSelection(item, true);
              return false
            }
          }
        })


        this.handleClose && this.handleClose()
      },
      // 提交已选择的
      confirmDialog () {
        let res = this.submitData
        this.handleConfirm && this.handleConfirm(res)

        if (res && res.length > 0){
          this.zgjLinkFormVisible = false
        } else {
          this.zgjLinkFormVisible = false
          this.$refs.multipleForm.clearSelection();
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .zgj__link__inner{
    margin: -10px 0;
    position: relative;
  }
  .zgj__link__inner .close{
    position: absolute;
    font-size: 26px;
    top: -60px;
    right: 0;
    cursor: pointer;
    user-select: none;
    color: #909399;
  }
  .zgj__link__inner .close:hover{
    color: themeColor
  }
  .search__box .el-button.active{
    background: themeColor;
    border-color: themeColor;
    color: #fff;
  }
  .type__select{
    display: inline-block;
    width: 140px;
    margin-left: 6px;
  }
  .keywords{
    float: right;
    width: 150px;
  }
  .form__list_box{
    position: relative;
    border: 1px solid borderColor;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .form__list_box .table-header{
    padding: 10px;
    background: tableHover;
  }
  .form__list_box .table-body{
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
  }

</style>
