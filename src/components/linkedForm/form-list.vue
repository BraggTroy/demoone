<template>
  <div class="zgj__form_chosen">
    <transition-group
      tag="ul"
      class="chosen-form-ul"
      :class="'chosen-form-ul--' + listType"
      name="zgjflist">
      <li v-for="(item, index) in formsList" :key="index">
        <a class="form-item" @click="handleClick(item)">{{item.title}}</a>
        <i class="el-icon-close" v-if="listType !== 'list'" @click="handleDelete(item, index)"></i>
      </li>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {},
    data () {
      return {
        formingList: []
      }
    },
    props: {
      listType: '',
      formsList: {
        type: Array,
        default () {
          return []
        }
      },
      handlePreview: Function,
      handleRemove: Function,
    },

    methods: {
      handleClick (form) {
        this.handlePreview && this.handlePreview(form)
      },
      handleDelete (form, index) {
        this.handleRemove && this.handleRemove(form, index)
        this.$parent.$emit('remove', form)
      },
    },

  }
</script>

<style scoped lang="stylus">

  .zgjflist-enter-active, .zgjflist-leave-active {
    transition: all 3s;
  }
  .zgjflist-enter, .zgjflist-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }

  .zgj__form_chosen{}
  .chosen-form-ul{
    padding: 0;
    margin-top: 0;
  }
  .chosen-form-ul li{
    position: relative;
    width: 100%;
    line-height: 1.8;
    margin-top: 5px;
    transition(all .5s cubic-bezier(.55,0,.1,1));
  }
  .chosen-form-ul li:hover{
    background: #f5f7fa;
  }
  .chosen-form-ul li:first-child{
    margin-top: 10px;
  }
  .chosen-form-ul.chosen-form-ul--list li:first-child{
    margin-top: 0;
  }
  .chosen-form-ul li .form-item{
    margin-right: 35px;
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    padding-left: 4px;
    transition(color 0.3s);
  }
  .chosen-form-ul li .form-item:hover{
    color: themeColor;
  }
  .chosen-form-ul.chosen-form-ul--list li .form-item{
    margin-right: 5px;
  }
  .chosen-form-ul li .el-icon-close{
    position: absolute;
    right: 10px;
    top: 0;
    cursor: pointer;
    line-height: inherit;
    opacity: 0.5;
    display: none;
  }
  .chosen-form-ul li:hover .el-icon-close{
    display: inline-block;
  }
  .chosen-form-ul li .el-icon-close:hover{
    opacity: 1;
  }
</style>
