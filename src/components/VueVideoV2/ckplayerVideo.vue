<!-- ckplayer 播放器 -->
<template>
  <div class="ckplayer-vidoe-wrap" >
    <div class="ckplayerVideo" id="ckplayerVideo" ref="ckplayerVideo" style="width: 100%; height: 4.8rem;"></div>
    <div v-if="poster && videoCover" @click="handleClickPoster" class="video-poster">
      <img :src="poster"/>
    </div>
  </div>
</template>
<script >
  import { playerConfig } from './config'

  export default{
    data() {
      return {
        playerConfig: playerConfig,
        /*currentVideo:[
          // ['http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4', 'video/mp4', '中文标清', 0]
        ], // 当前需要播放的视频信息 ['videoUrl','video/m3u8']*/
        currentVideo: '',
        player: null,
        // poster: '', // 视频封面
      }
    },
    props: ['videoSrc','videoType','disabled', 'poster', 'videoCover'],
    watch: {
      'videoSrc': function () {
        this.playVideo()
      },
      
    },
    methods: {
      handleClickPoster() {
        this.poster = '';
        this.player.videoPlay()
      },
      initCkplayer(playerConfig = this.playerConfig) {
        // this.player = null;
        // this.player = new ckplayer(playerConfig);
       
        playerConfig.autoplay = true;
        this.player = null;
        this.player = new ckplayer(playerConfig);
        //this.player.videoSeek(230);
        this.player.embed(playerConfig);
        this.player.addListener('play', this.playHandler); //监听播放状态
        this.player.addListener('error', this.errorHandler); //监听播放状态
        this.player.addListener('duration', this.durationHandler); //监听总时间
        this.player.addListener('time', this.timeHandler); //监听播放时间
        this.player.addListener('seekTime', this.seekTimeHandler);//监听跳转时间
        this.player.addListener('paused',this.pausedHandler);//监听暂停
        this.player.addListener('ended', this.endedHandler);//监听播放结束
      },
      
      endedHandler () {
        this.$emit('endedFun')
      },
      seekTimeHandler(time) {
        console.log('seekTime:'+time)
        // this.$emit('videoSeekTime', fleg)
      },
      pausedHandler(fleg){
        this.$emit('videoPause',fleg)
        //console.log('paused:'+time)
      },
      durationHandler(duration){
        this.$emit('videoDuration',duration)
        //console.log('总时间（秒）：' + duration)
      },
      timeHandler(time) {
        this.$emit('videoTime',time)
        //console.log('当前播放时间（秒）：' + time)   
      },
      playHandler() {
        //this.$emit('videoPlay')
        // if (!this.disabled) {
        //   this.$toast('您尚未购买，暂无播放权限')
        //   this.player.videoPause();
        //   //this.$emit('videoPlay')
        //   return;
        // } else {
        //   this.$emit('videoPlay')
        // }
        this.poster = '';
      },
      errorHandler() {
        console.log('视频加载出错')
      },
      playVideo() {
        const videoType = this.videoType || 'video/mp4'
        this.currentVideo = '';
        const video = `${this.videoSrc}`
        this.currentVideo = video

        this.playerConfig.video = '';
        this.playerConfig.video = video

        this.initCkplayer()
      },
    },
    mounted() {
      const poster = this.poster||'';
      if (poster) {
        this.playerConfig.poster = poster
      }
      this.player = new ckplayer();
      (this.videoSrc || this.currentVideo.lenth) && this.playVideo();
    }
  }
</script>
<style lang="less">
  .ckplayer-vidoe-wrap{
    width: 100%;
    margin: 0px auto 0.4rem;
    min-height: 100px;
    position: relative;
    .video-poster{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      img{
        width: 100%;
        height: 100%;
        // min-width: 600px;
      }
    }
  }
</style>