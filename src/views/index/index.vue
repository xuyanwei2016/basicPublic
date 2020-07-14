<template>
  <div class="indexBox" ref="wrapper" @click="linkTo">
    <!-- <h3 @click="linkTo">首页</h3> -->
    <img class="img" src="~@/assets/images/bg_index.jpg" alt="">
  </div>
</template>
<script>
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";

export default {
  name: 'index',
  components: {
   
  },
  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
     
    }
  },
  created () {},
  mounted () { 
  },
  methods: {
    linkTo(){
      this.$router.push('/column')
    }
  }
}
</script>

<style lang="less" scoped>
.indexBox{
  width: 100%;
  // height: 100%;
  .img{
    width: 100%;
    height: auto;
  }
  //  background-image:url(~@/assets/images/bg_index.jpg);
  //   background-size: 100% 100%;
  //   background-repeat: no-repeat;
}
</style>