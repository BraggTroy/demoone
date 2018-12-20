<script>
  /*关联表单组件 外部效果仅一个触发按钮， 点击按钮显示操作对话框
  在对话框中搜索，筛选，勾选想要关联的表单，点击确定，将选中的数据以数组的形式返回*/
  import FormChose from './formChose.vue'
  import FormList from './form-list.vue'

  function fn () {}
  export default {
    name: '',
    components: {
      FormChose, FormList
    },
    data () {
      return {
        chosenForms: [], // 被选中的全部表单
        tempIndex: 1,
      }
    },
    props: {
      formType: '',
      listType: {
        type: String,
        default: 'normal'
      },
      value: {
        type: Array,
        default () { return [] }
      },
      onClose: {
        type: Function,
        default: fn()
      },
      onConfirm: {
        type: Function,
        default: fn()
      },
      onPreview: {
        type: Function,
        default: fn()
      },
      onRemove: {
        type: Function,
        default: fn()
      },
      showFormList: {
        type: Boolean,
        default: true
      },
    },

    watch: {
      value: {
        immediate: true,
        handler (value) {
          this.chosenForms = value.map(item => {
            item.uid = item.uid || (Date.now() + this.tempIndex++)
            return item
          })
        }
      }
    },

    methods: {
      handleOpen () {
        this.$refs['link-form'].zgjLinkFormVisible = true
      },
      handleConfirm (list) {
        this.chosenForms = list.map(item => {
          item.uid = Date.now() + this.tempIndex++
          return item
        })

        this.onConfirm && this.onConfirm(this.chosenForms)
      },
      handleDelete (item, index) {
        this.chosenForms.splice(index, 1)
        this.onRemove(item, this.chosenForms)
      }
    },

    render (h) {

      let {
        handleOpen
      } = this

      let formList
      if (this.showFormList) {
        // 待完善
        formList = (
          <FormList
            formsList={this.chosenForms}
            listType={this.listType}
            handlePreview={this.onPreview}
            handleRemove={this.handleDelete}
          ></FormList>
        )
      }

      // 基础data
      const data = {
        'class': {
          'zgj-link-form-enter': true
        },
        on: {
          click: handleOpen
        }
      }

      // FormChose的data
      const fdata = {
        props: {
          formType: this.formType,
          formsList: this.chosenForms,
          handleClose: this.onClose,
          handleConfirm: this.handleConfirm
        },
        ref: 'link-form'
      }

      const component = <FormChose {...fdata}></FormChose>

      return (
        <div class='zgj-link-form'>
          { this.listType === 'list' ? '' :
            <div {...data}>
              {this.$slots.default}
            </div>
          }
          { formList }
          { this.listType === 'list' ? '' : component }
        </div>
      )
    }
  }
</script>

<style scoped>
  .zgj-link-form-enter{
    display: inline-block;
    font-size: 14px;
  }
</style>
