<template>
  <div id="app">
    <keep-alive>    
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

//import { getsignatureAPI } from "@/API.js"
import wx from 'weixin-js-sdk'

export default {
  name: 'App',
  mounted(){
    //this.getSignature()
  },
  watch: {
    // $route(to,from) {
    //   if(this.$route.meta.title){
    //      document.title=this.$route.meta.title;
    //   }
    // }
  },
  methods:{
    getSignature() {//获取签名
      const urlPath = window.location.href.split("#")[0]
      getsignatureAPI({url:urlPath}).then(res => {
        
        if(res.data.code == 0){

          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
            signature: res.data.data.signature, // 必填，签名
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
          });
          wx.ready(function() {
            // alert('ready')
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
            //对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            //获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title: '短视频丨2019个税新法规60讲（免费送10讲）', // 分享标题
                desc: '深度参与新个税全面修订，全场景案例解读', // 分享描述
                link: window.location.href.split('#')[0], // 分享链接
                imgUrl: 'http://www.zgsccbs.com/120-120.jpg', // 分享图标
                type: "", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                      // 用户确认分享后执行的回调函数
                    // alert('已分享');
                },
                cancel: function() {
                      // 用户取消分享后执行的回调函数
                }
            });

            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: '短视频丨2019个税新法规60讲（免费送10讲）', // 分享标题
              link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:'http://www.zgsccbs.com/120-120.jpg', // 分享图标
              success: function (res) {
                // 用户确认分享后执行的回调函数
                // alert("分享到朋友圈成功返回的信息为:",res);
                // alert("分享成功!")
              },
              cancel: function (res) {
                // 用户取消分享后执行的回调函数
                // alert("取消分享到朋友圈返回的信息为:",res);
              }
            });

            wx.error(function(res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                // alert("验证失败");
            });


          })
        }
      })
    }
  }
}
</script>