//1小时20分13秒===>1:20:13

export function toTimeFilter(timeStr1) {
  let timeStr = timeStr1 + '';
  if (timeStr.indexOf("分") != -1) {
    let res = timeStr.toString().replace("小时", ':').replace('分', ":");
    res = res.slice(0, res.length - 1);
    let resArr = res.split(":");
    let backRes = '';
    resArr.forEach((list) => {
      if (list < 10) {
        list = "0" + list
      }
      backRes += list + ':';
    })
    return backRes.slice(0, backRes.length - 1);
  } else {
    let res = timeStr.slice(0, timeStr.length - 1);
    if (res < 10) {
      res = "00:0" + res
    } else {
      res = "00:" + res
    }
    return res;
  }

}
//播放次数格式化
export function toCountFilter(count) {
  let clickNum = Number(count);
  if (clickNum >= 10000) {
    clickNum = (clickNum / 10000).toFixed(1) + "W+"
  } else {
    clickNum = clickNum;
  }
  return clickNum
}
