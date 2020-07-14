<template>
  <div class="column_wrap">
    <div class="bg_top">
        <nav class="nav_wrap">
          <van-nav-bar  @click-left="onClickLeft">
            <!-- <span slot="title" class="title">业务经办</span> -->
            <van-icon name="arrow-left" size="18" slot="left" color="#fff"/>
          </van-nav-bar>
        </nav>
        <div class="guide_wrap">   导语：为贯彻《国务院关于进一步做好稳就业工作的意见》（国发〔2019〕28号）提出“实施基层公共就业服务经办能力提升计划”，根据人力资源和社会保针对新型冠状病毒感染的肺炎疫情防控工作需要，在疫情防控以及今后一段时间内，以基层公共就业服务业务工作为基础，对工作中所涉及的业务经办、就业服通用能力、重点工作和企业复工指导等进行在线培训，以提升基层就业服务工作人员标准化专业化服务水平。
        </div>
    </div>
    <div class="link_wrap">
      <div class="block" v-for="(item,index) in listArr" :key="index" @click="linkDetails(item)">{{item.showName}}</div>
    </div>
   
  </div>
</template>
<script>
import { Icon ,NavBar } from 'vant';
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
import { getClassifyListAPI } from '@/api/index';
export default {
  name: 'column',
  components: {
   "van-icon":Icon,
   "van-nav-bar":NavBar,
  },
  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
      listArr: [
        // {name:"业务经办"},
        // {name:"就业服务"},
        // {name:"通用能力"},
        // {name:"重点工作"},
        // {name:"企业复工指导"},
      ],
      classifyList:[]
    }
  },
  created () {},
  mounted () { 
    this.getClassify()
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    getClassify(){
      getClassifyListAPI().then(res=>{
        if (res.data.code==0) {
          if (res.data.data.length > 0 && res.data.data) {
            this.listArr = res.data.data;
          }
        } else {
          Toast.fail('检索信息获取失败');
        }
      })
    },
    linkDetails(item){
      this.$router.push({path:'/list',query:{code:item.code,showName:item.showName}});
    }
  }
}
</script>

<style lang="less" scoped>
.column_wrap{
  .bg_top{
    height: 5.8rem;
    background-image:url(~@/assets/images/top_bg.png);
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .van-nav-bar{
    background-color: transparent !important;
    // background-image: linear-gradient(to right, #02C5C7 , #02B8BC);
  }
  .van-hairline--bottom::after{
    border-color: transparent;
  }
  .guide_wrap{
    padding: 0rem 0.32rem;
    color:#fff ;
    font-size: 0.28rem;
    line-height: 0.52rem; 
  }
  .link_wrap{
    padding-top: 0.7rem;
    padding-bottom: 0.56rem;
    background-color: #fff;
    border-radius:0.3rem 0.3rem 0 0;
    margin-top:-0.4rem;
    .block{
      width: 5.4rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      color: #02B0B2;
      font-weight: bold;
      border: 0.02rem solid #02BCBE;
      border-radius: 0.8rem;
      margin:0 auto 0.56rem;
      box-shadow: 0.0rem 0.1rem 0.2rem #dedcdc;
    }
  }
}
</style>