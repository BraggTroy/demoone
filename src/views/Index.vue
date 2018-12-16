<template>
  <div class="app-container index-container">
    <Header></Header>
    <div class="index-body">
      <Banners></Banners>

    </div>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Banners from './index/Banners'

  export default {
    name: "Index",
    components: {Header, Banners},
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  .index-container {

  }
</style>
