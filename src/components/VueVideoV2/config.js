/**
 * @Author:      skyeGao
 * @Email:       yyjzp1314@126.com
 * @DateTime:    2019-03-29 11:24:39
 * @Description: video 配置 
 */

export const playerConfig = {
    h5container:'#ckplayerVideo',
    container: '.ckplayerVideo',
    variable: 'player',
    loaded: 'loadedHandler', //当播放器加载后执行的函数
    loop: false, //播放结束是否循环播放
    autoplay: true, //是否自动播放
    //duration: 500,         //设置视频总时间
    // cktrack: 'http://front-end.bjcnc.scs.sohucs.com/track-report-sit/ckplayer/material/srt.srt', //字幕文件
    poster: '', //封面图片 // http://zgsccbs.com/sc/2019/06/14/7f8c7df6701b45c3b5899e6421e54ac3/1.jpg
    /*preview: { //预览图片
      file: [
        'http://front-end.bjcnc.scs.sohucs.com/track-report-sit/ckplayer/material/mydream_en1800_1010_01.png',
        'http://front-end.bjcnc.scs.sohucs.com/track-report-sit/ckplayer/material/mydream_en1800_1010_02.png'
      ],
      scale: 2
    },*/
    config: '', //指定配置函数
    debug: true, //是否开启调试模式
    //flashplayer: true, //强制使用flashplayer
    drag: 'start', //拖动的属性
    seek: 0, //默认跳转的时间
    //playbackrate:1,//默认速度的编号，只对html5有效,设置成-1则不显示倍速
    //advertisements:'website:ad.json',
    //front:'frontFun',//上一集的操作函数
    //next:'nextFun',//下一集的操作函数
    /****************** 广告部分开始 ******************/
    adfront: 'http://www.ckplayer.com/yytf/swf/front001.swf,http://www.ckplayer.com/yytf/swf/front002.swf', //前置广告
    adfronttime: '15,15',
    adfrontlink: '',
    adpause: 'http://www.ckplayer.com/yytf/swf/pause001.swf,http://www.ckplayer.com/yytf/swf/pause002.swf',
    adpausetime: '5,5',
    adpauselink: '',
    adinsert: 'http://www.ckplayer.com/yytf/swf/insert001.swf,http://www.ckplayer.com/yytf/swf/insert002.swf',
    adinserttime: '10,10',
    adinsertlink: '',
    inserttime: '10,80',
    adend: 'http://www.ckplayer.com/yytf/swf/end001.swf,http://www.ckplayer.com/yytf/swf/end002.swf',
    adendtime: '15,15',
    adendlink: '',
    /****************** 广告部分结束 ******************/
    /*promptSpot: [ //提示点
      {
        words: '提示点文字01',
        time: 30
      },
      {
        words: '提示点文字02',
        time: 150
      }
    ],*/
    // mobileCkControls:true,//是否在移动端（包括ios）环境中显示控制栏
    //live:true,//是否是直播视频，true=直播，false=点播
    /*video: [
          ['http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4', 'video/mp4', '中文标清', 0],
          ['http://img.ksbbs.com/asset/Mon_1703/d0897b4e9ddd9a5.mp4', 'video/mp4', '中文高清', 0],
          ['http://img.ksbbs.com/asset/Mon_1703/eb048d7839442d0.mp4', 'video/mp4', '英文高清', 10],
          ['http://img.ksbbs.com/asset/Mon_1703/d30e02a5626c066.mp4', 'video/mp4', '英文超清', 0]
      ]*/
    video: [
      ['http://zgsccbs.com:8696/file/file/?fileName=1cfe1c68014549f5ad47c695d5b1bb5d','video/mp4']
    ],
    // video: [],
    // flashplayer: false, //设置成true则强制使用flashplayer
    // html5m3u8: true, //是否在pc端环境使用hls播放m3u8
    // hlsAutoPlay: false,
    // video: '',
    crossorigin: '*',
    logo: null,
    mobileAutoFull: false //全屏
}