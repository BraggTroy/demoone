<template>
  <div class="app-header">
    <div class="inner">
      <div class="logo-wrap">

      </div>
      <div class="menu-wrap">
        <ul>
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/">广场</router-link>
          </li>
          <li>
            <router-link to="/">分类</router-link>
          </li>
          <li>
            <router-link to="/">我的关注</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  .app-header{
    height: 60px;
    position: relative;
    line-height: 60px;
    border-bottom: 1px solid @border-color;
  }
  .inner{
    display: flex;
    display: -webkit-box;
    height: inherit;
  }
  .logo-wrap{
    width: 150px;
    height: inherit;
    background: url("../assets/logo.png") no-repeat center;
    background-size: auto 100%;
  }
  .menu-wrap{
    flex: 1;
  }
  .menu-wrap ul{
    text-align: right;
  }
  .menu-wrap ul li{display: inline-block; padding: 0 10px;}
  .menu-wrap ul li a{ display: inline-block;}

</style>
