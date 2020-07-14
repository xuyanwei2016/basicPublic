<template>
  <div class="wrap">
    <nav class="nav_wrap">
      <van-nav-bar @click-left="onClickLeft">
        <span slot="title" class="title">{{this.showName}}</span>
        <van-icon name="arrow-left" size="18" slot="left" color="#fff"/>
      </van-nav-bar>
    </nav>
    <div class="list_wrap">
     <van-list v-model="loading"
                :immediate-check="false"
                :finished="finished"
                finished-text="——这是我的底线——"
                @load="onLoad">
        <div class="block_wrap" v-for="(item,index) in list" :key="index" @click="linkDetails(item)">
          <span class="tag video_tag" v-if="item.resourceType==5">视频</span>
          <span class="tag pdf_tag" v-if="item.resourceType==10">PDF</span>
          <div class="name">{{item.name}}</div>
        </div>
        <!-- <div class="block_wrap">
          <span class="tag video_tag">视频</span>
          <p class="name">就业困难人员认定及就业援助社保补贴政策及常见问题解析</p>
        </div>
        <div class="block_wrap">
          <span class="tag pdf_tag">PDF</span>
          <p class="name">就业困难人员认定及就业援助社保补贴政策及常见问题解析</p>
        </div> -->
      </van-list>
    </div>
  </div>
</template>
<script>
import { Icon ,NavBar,List ,Toast } from 'vant';
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
import { getResListAPI } from '@/api/index';
export default {
  name: 'list',
  components: {
   "van-icon":Icon,
   "van-nav-bar":NavBar,
   "van-list":List
  },
  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
      isFirstEnter:false,
      list: [],
      total: 0,
      pageCount:0,
      showName:"",
      listQuery:{
        pageNum: 1,
        pageSize: 20,
        diyTypeCode:''
      },
      loading: false,
      finished: false
    }
  },
  activated() {
    if(!this.$route.meta.isBack|| this.isFirstEnter){
      this.list=[];// 把数据清空，可以稍微避免让用户看到之前缓存的数据
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      this.loading=false;
      this.finished=false;
      this.listQuery={
        pageNum: 1,
        pageSize: 20,
        diyTypeCode:''
      },
      this.listQuery.diyTypeCode=this.$route.query.code;
      this.showName=this.$route.query.showName; 
      this.getList ();
      // console.log(this.$route.meta.isBack,this.isFirstEnter,'this')
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack=false
    this.isFirstEnter=false;
   
  },
  created () {
    this.isFirstEnter=true;
    this.listQuery.diyTypeCode=this.$route.query.code;
    this.showName=this.$route.query.showName;
    this.getList ();
  },
  mounted () { 
    // console.log(this.$route.query.code,'this.$route.query.code')
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    getList () {
      let toastPage = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
      getResListAPI({ ...this.listQuery }).then(res=>{
        if (res.data.status) {
          if (res.data.data.list.length > 0 && res.data.data.list) {
            this.list = res.data.data.list;
            this.total = res.data.data.total || 0;
            this.pageCount = res.data.data.pages;
          }
          toastPage.clear();
        } else {
          Toast.fail('检索信息获取失败');
        }
      })
    },
    onLoad(){
      setTimeout(()=>{
        this.getMoreList();
      },500)
    },
    getMoreList () {
      console.log(this.listQuery.pageNum, this.pageCount,'8888')
      if (this.listQuery.pageNum < this.pageCount) {
        
        this.listQuery.pageNum++;
        getResListAPI({ ...this.listQuery }).then(res => {
          this.loading = true;
           
          if (res.data.status) {
            if (res.data.data.list.length > 0 && res.data.data.list) {
              this.list = [ ...this.list,...res.data.data.list];
              this.total = res.data.data.total || 0;
              // 加载状态结束
              this.loading = false;
            }
           
          } else {
            Toast.fail('检索信息获取失败');
          }
        })

      } else {//数据加载完成
        this.finished = true;
      }
    },
    linkDetails(item){
      if(item.resourceType==5){
        this.$router.push({path:'/video',query:{videoAndPdf:item.videoAndPdf}});
      }else if(item.resourceType==10){
        this.$router.push({path:'/pdf',query:{videoAndPdf:item.videoAndPdf}});
      }
      
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
  .van-nav-bar{
    background-image: linear-gradient(to right, #02C5C7 , #02B8BC);
  }
  .title{
    color: #fff;
    font-size: 0.32rem;
    font-weight: bold;
  }
  .tag{
    margin-top:0.1rem;
    display: inline-block;
    width: 0.7rem;
    line-height: 0.36rem;
    text-align: center;
    height: 0.36rem;
    font-size: 0.24rem;
    font-weight: bold;
    color: #fff;
    border-radius:0.33rem 0.33rem 0 0.33rem;
    
    &.video_tag{
      background-color: #3D71F0;
    }
    &.pdf_tag{
      background-color: #FA7459;
    }
  }
  .list_wrap{
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }
  .block_wrap{
    display: flex;
    padding: 0.3rem 0rem;
    .name{
      color: #333333;
      flex: 1;
      font-size: 0.3rem;
      font-weight: bold;
      line-height: 0.48rem;
      padding-left: 0.1rem;
      word-wrap:break-word
    }
  }
}
</style>