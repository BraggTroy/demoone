<template>
  <div class="index-banner">
    <el-carousel trigger="hover" height="520px">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <div class="inner-banner" :style="{'background-image': 'url(' + item.url +')'}">

        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: "Banners",
    components: {},
    data() {
      return {
        list: [
          {id: 1, url: './static/img/banner-1.jpg'},
          {id: 2, url: './static/img/banner-2.jpg'},
          {id: 1, url: './static/img/banner-1.jpg'},
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .inner-banner {
    height: 100%;
    background-position: center;
    background-size: auto 100%;
    background-repeat: no-repeat;
    position: relative;
    /*background-color: #fff;*/
  }
</style>
