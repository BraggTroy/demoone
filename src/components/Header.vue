<template>
  <div class="app-header box-shadow">
    <div class="inner">
      <div class="logo-wrap">
      </div>
      <div class="school">
        <el-select v-model="school" filterable remote reserve-keyword placeholder="查询已开通的学校"
                   :remote-method="remoteMethod" :loading="loading">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
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
      <div class="user-wrap border-box">
        <img :src="user.pic" class="user-pic">
        <router-link to="/person" class="user-name nowrap">{{user.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        user: {
          id: 1, name: '陈宝俊', pic: 'https://tvax1.sinaimg.cn/crop.0.0.996.996.180/e313fb69ly8fwzdmlurysj20ro0rodh4.jpg',
          created_time: '2018-12-16', role: 'super-admin', role_code: 1
        },
        school: '上海大学',
        loading: false,
        list: [],
        options: []
      }
    },
    methods: {
      remoteMethod (query) {
        if (query !== ''){
          this.options = [
            {value: '上海工程技术大学', label: '上海工程技术大学'},
            {value: '上海大学', label: '上海大学'},
            {value: '上海外国语大学', label: '上海外国语大学'},
            {value: '上海同济大学', label: '上海同济大学'},
          ]
        }else {
          this.options = []
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .app-header{
    height: 60px;
    position: relative;
    line-height: 60px;
    border-bottom: 1px solid @border-color;
    background: #fff;
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
  .school{
    width: 250px;
  }
  .menu-wrap{
    flex: 1;
  }
  .menu-wrap ul{
    text-align: right;
  }
  .menu-wrap ul li{display: inline-block; padding: 0 10px;}
  .menu-wrap ul li a{ display: inline-block;}

  .user-wrap{
    padding: 10px 15px;
    line-height: 40px;
  }
  .user-pic{ width: 40px; height: 40px; border-radius: 50%; float: left; margin-right: 10px;}
  .user-name{ display: inline-block; max-width: 150px;}
</style>
