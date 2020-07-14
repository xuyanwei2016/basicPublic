<template>
  <div class="home_footer">
    <div class="block"
         v-for="(item,index) in footerArr"
         :key="item.index"
         @click="linkTo(item.path,index)"
         :class="[currentIndex==index?'activeClass':''] ">
      <!-- <img src="~@/assets/images/footer/me.png" alt=""> -->
      <img class="foot_icon"
           :src="item.activeSrc"
           :alt="item.name"
           v-if="currentIndex==index">
      <img class="foot_icon"
           :src="item.src"
           :alt="item.name"
           v-else>
      <span class="foot_name">{{item.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "homeFooter",
  props: ["activeIndex"],
  data () {
    return {
      currentIndex: this.activeIndex || 0,
      footerArr: [
        {
          name: "首页",
          path: "/",
          src: require('../../assets/images/footer/home.png'),
          activeSrc: require('../../assets/images/footer/home_h.png')
        }, {
          name: "课程",
          path: "/classPage",
          src: require('../../assets/images/footer/class.png'),
          activeSrc: require('../../assets/images/footer/class_h.png')
        }, {
          name: "学习中心",
          path: "/study",
          src: require('../../assets/images/footer/edu.png'),
          activeSrc: require('../../assets/images/footer/edu_h.png')
        }, {
          name: "我的",
          path: "/me",
          src: require('../../assets/images/footer/me.png'),
          activeSrc: require('../../assets/images/footer/me_h.png')
        }
      ]
    }
  },
  created () {
    // if(this.isIphoneX()){

    // }
    console.log(this.isIphoneX(), 'this.isIphoneX()')
  },
  mounted () {

  },
  methods: {
    linkTo (path, index) {
      //this.activeIndex=index;
      this.$router.push({ path: path })
    },
    isIphoneX () {
      return /iphone/gi.test(navigator.userAgent) && (window.screen.height === 812 && window.screen.width === 375)
    }
  }
}
</script>
<style scoped lang="scss">
// :style="{paddingBottom:(isIphoneX()?'0.2rem':'0.1rem')}"
.home_footer {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  height: 1.1rem;
  background-color: #fff;
  box-shadow: 0px -3px 8px #eee;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  .block {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    &.activeClass {
      .foot_name {
        color: #2a6ad7;
      }
    }
  }
  .foot_icon {
    width: 0.44rem;
    margin-bottom: 0.1rem;
  }
  .foot_name {
    font-size: 0.24rem;
    color: #9fa4b9;
  }
}
</style>
