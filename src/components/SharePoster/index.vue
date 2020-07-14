<template>
  <div class="share_poster"
       ref="sharePoster">
    <div class="poster_bg">
      <div class="poster_title">
        <h3 class="name">{{posterDate.name}}</h3>
        <p class="time"> 12月21日上午08：30</p>
        <p class="describe">年前结账必听，年后发展必看</p>
      </div>
      <img class="header_icon"
           ref="headerIcon"
           :src="headerImg"
           v-if="headerImg">
    </div>
    <div class="msg_wrap">
      <div class="poster_txt">
        <h3>{{nickName}}</h3>
        <p>邀请您一起学习好知识</p>
        <p>长按扫码听课</p>
      </div>
      <div class="prcode_wrap">
        <div id="qrcode"></div>
      </div>
    </div>
    <div class="tip">长按图片，保存或发送给朋友</div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas';
import QRCode from "qrcodejs2"
import Cookies from 'js-cookie'
export default {
  name: "sharePosters",
  props: {
    posterDate: {
      type: Object
    },
  },
  data () {
    return {
      headerImg: '',
      nickName: '',
      getBase64Header: "",
      link: 'https://baidu.com',
    }
  },
  created () {
    this.headerImg = localStorage.getItem('img');
    this.nickName = localStorage.getItem('nickName');
  },
  mounted () {
    this.link = window.location.href;
    this.$nextTick(function () {
      //this.headerImg = this.headerImg + "png"
      this.getBase64(this.headerImg)

    })
    this.$nextTick(function () {
      this.qrcode()
    })
  },
  methods: {
    renderPic () {
      this.shareClick()//图片canvas生成
    },
    //  生成二维码
    qrcode () {
      let that = this;
      let qrcode = new QRCode('qrcode', {
        width: 80,
        height: 80,        // 高度
        text: this.link,   // 二维码内容
        // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f',   // 背景色
        // foreground: '#ff0'    // 前景色
      })

    },
    convertCanvasToImage (canvas) {//将canvas转换成图片
      var src = canvas.toDataURL("image/png");
      return src;
    },
    shareClick () {//弹框内容生产图片
      let domPoster = this.$refs.sharePoster;
      let _this = this;
      //console.log(domPoster, 'share_poster')
      html2canvas(domPoster, {
        allowTaint: true,//设置支持外链
        // scale: 3,
        useCORS: true,
        backgroundColor: null,
        height: domPoster.offsetHeight,
        width: domPoster.offsetWidth,
        dpi: window.devicePixelRatio * 2,
        scale: 2
      }).then(function (canvas) {
        //console.log(canvas, 'canvas')
        let src = _this.convertCanvasToImage(canvas)
        domPoster.innerHTML = '<img class="poster_pic" src="' + src + '" alt=""  style="width:100%;height:100%" crossorigin="anonymous">'
        //domPoster.appendChild(canvas);
      });
    },
    ImageToCanvas (image) {
      var canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext("2d").drawImage(image, 0, 0);//0, 0参数画布上的坐标点，图片将会拷贝到这个地方
      return canvas;
    },
    getBase64 (imgUrl) {//转base64插入用户头像，imgUrl为图片链接
      window.URL = window.URL || window.webkitURL;
      let _this = this;
      let xhr = new XMLHttpRequest();
      //console.log(xhr)
      xhr.open("get", imgUrl, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (this.status == 200) {
          var blob = this.response;
          let oFileReader = new FileReader();
          oFileReader.onloadend = function (e) {
            _this.headerImg = e.target.result;
            //console.log(e.target.result, '333333')//输出转化结果
          };
          oFileReader.readAsDataURL(blob);
        }
      }
      xhr.send();
    }
  }
}
</script>
<style scoped lang="scss">
.share_poster {
  width: 6.2rem;
  height: 9.6rem;
  background-color: #fff;
  .header_icon {
    width: 1.16rem;
    height: 1.16rem;
    border-radius: 50%;
    margin-top: 3.2rem;
    margin-bottom: 0.25rem;
    position: absolute;
    bottom: -0.72rem;
    left: 0.4rem;
  }
  .poster_bg {
    width: 6.2rem;
    height: 6.2rem;
    text-align: center;
    background-image: url(~@/assets/images/share_bg.png);
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
  }
  .poster_title {
    padding-top: 1.4rem;
    .name {
      font-size: 0.48rem;
      color: #f1d726;
      font-size: Bold;
      margin-bottom: 0.4rem;
    }
    .time {
      margin-bottom: 0.28rem;
      display: inline-block;
      border-radius: 0.44rem;
      height: 0.44rem;
      line-height: 0.42rem;
      border: 0.02rem solid #fff;
      font-size: 0.24rem;
      padding: 0 0.56rem;
      color: #fff;
    }
    .describe {
      color: #f1d726;
      font-size: 0.28rem;
      font-weight: bold;
    }
  }
  .msg_wrap {
    width: 6.2rem;
    height: 2.6rem;
    padding: 0rem 0.4rem 0rem 0.48rem;

    margin-top: 0.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .poster_txt {
    color: #9c9d9c;
    font-size: 0.28rem;
    line-height: 0.56rem;
  }
  .tip {
    color: #b4b4b4;
    font-size: 0.28rem;
    text-align: center;
  }
}
</style>
