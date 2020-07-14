<template>
  <div class="pdf_wrap">
    <!-- <iframe :src="`${this.domain}${requestPath.file}?fileName=${this.videoAndPdf}&isOnLine=true`" frameborder="0" class="iframe"> </iframe> -->
    <div v-if="pdfAndPath" v-html="iframeHtml" style="width:100%;height:100%" >
		</div>
    <div class="back_btn" @click="goBack"><van-icon name="arrow-left" />返回</div>
    <!-- <iframe id='previewPdf' :src="'/static/pdf/web/viewer.html?file=' + `${this.domain}/${this.pdfAndPath}`" height="100%"
            width="100%" frameborder="0">
    </iframe> -->
  </div>
</template>
<script>
import { Toast,Icon } from 'vant';
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
import { getClassifyList } from '@/api/index';
import { getPathAPI } from '@/api/index';
export default {
  name: 'pdf',
  components: {
  "van-icon":Icon
  },
  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
      videoAndPdf:"",
      pdfAndPath:'' ,
      iframeHtml:''
    }
  },
  created () {},
  mounted () { 
     this.videoAndPdf=this.$route.query.videoAndPdf;
     this.getPath();
  },
  methods: {
    getPath(){
      let toastPage = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
      getPathAPI({fileName:this.videoAndPdf}).then(res => {
          if (res.data.status) {
            this.pdfAndPath=res.data.data;
            this.iframeHtml= `<iframe src='/static/pdf/web/viewer.html?file=${this.domain}/${this.pdfAndPath}' frameborder='0' width='100%' height='100%'></iframe>`
            toastPage.clear();
          } 
        })

    },
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.pdf_wrap{
  width: 100%;
  height: 100%;
  position: relative;
  .iframe{
    width: 100%;
    height: 100%;
  }
  .back_btn{
    width: 70px;
    height: 40px;
    font-size: 14px;
    padding-left: 10px;
    line-height: 40px;
    color: #fff;
    border-top-left-radius: 40px ;
    border-bottom-left-radius: 40px ;
    background-color: rgba(2, 197, 199,0.8);
    position: absolute;
    bottom: 80px;
    right: 0px;
    display: flex;
    align-items: center;
    .van-icon {
      // vertical-align: middle;
      margin-right: 2px
    }
  }
}
</style>