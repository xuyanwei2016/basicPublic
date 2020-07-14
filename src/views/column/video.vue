<template>
  <div class="video_wrap">
   <!-- <van-icon class="left_icon" name="arrow-left" size="18" color="#fff" @click="onClickLeft"/> -->
    <v-video-v2
      videoSrc="http://117.78.46.153/file/file/?fileName=9232ae7493554d78b621a3fb495373e8&isOnLine=true"
     />
  </div>
</template>
<script>
//videoType="video/m3u8"
//:videoSrc="`${this.domain}/${this.videoAndPath}`"
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
import { getPathAPI } from '@/api/index';
import VueVideoV2 from '@/components/VueVideoV2/ckplayerVideo'
import { Icon ,NavBar,List ,Toast } from 'vant';
//`${this.domain}${requestPath.file}?fileName=${this.videoAndPdf}&isOnLine=true`
export default {
  name: '',
  components: {
  'v-video-v2': VueVideoV2,
  "van-icon":Icon,
   "van-nav-bar":NavBar,
  },
  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
      uploadUrl:uploadUrl,
      videoAndPdf:"",
      videoAndPath:''
    }
  },
  created () {},
  mounted () {
    this.videoAndPdf=this.$route.query.videoAndPdf;
    this.getPath();
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    getPath(){
      getPathAPI({fileName:this.videoAndPdf}).then(res => {
          this.loading = true;
          //${this.uploadUrl}${this.videoFilePath}
          if (res.data.status) {
            this.videoAndPath=res.data.data;
            const num = this.videoAndPath.indexOf('.')
            this.videoAndPath =this.videoAndPath.slice(0,num)+'/index.m3u8'
          } else {
            Toast.fail('检索信息获取失败');
          }
        })

    }
  }
}
</script>

<style lang="less" scoped>
.video_wrap{
  width: 100%;
  height: 100%;
  background-color: #222124;
  display: flex;
  align-items: center;
  .left_icon{
    position: absolute;
    top:14px;
    left:16px;
  }
  .van-nav-bar{
    background-color: transparent
  }
   .van-hairline--bottom::after{
    border-color: transparent;
  }
}
</style>
