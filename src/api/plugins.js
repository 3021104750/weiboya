export const plugins = {
  /* 
    dom元素内容 显示提示
    @params target：dom元素节点
            innerValue：innerHtml提示内容
   */
  domShowTimeout(target, innerValue) {
    target.textContent = innerValue;
    target.style.display = 'block';
    setTimeout(() => {
      target.style.display = 'none';
    }, 2000);
  },

  /* 
    放大图片
    @parmas e: $event
   */
  scalePic(e) {
    // 获取自定义属性 判断图片是否已经放大
    let f = e.target.dataset.flag;
    if (f === 'false') {
      // 使图片定位到屏幕中间
      var newLeft =
        window.screen.availWidth / 2 -
        e.target.getBoundingClientRect().left -
        200;
      var newTop =
        window.screen.availHeight / 2 -
        e.target.getBoundingClientRect().top -
        200;
      e.target.style.left = newLeft + 'px';
      e.target.style.top = newTop + 'px';
      e.target.style.width = '400px';
      e.target.style.height = '400px';
      e.target.style.zIndex = '98';
      // 创建遮罩层
      var mask = document.createElement('div');
      e.target.parentNode.appendChild(mask);
      // 添加遮罩层样式
      mask.style.cssText =
        'position: fixed; top: 0; left: 0; width: 100%; height: 100%;  z-index: 97; background-color: rgba(0,0,0,.6);';
      // 图片放大后 禁止屏幕滚动
      document.body.style.overflow = 'hidden';
      f = 'true';
      e.target.dataset.flag = f;
    } else if (f === 'true') {
      e.target.style.cssText = '';
      // 图片变小后 移出遮罩层
      e.target.parentNode.removeChild(e.target.parentNode.lastChild);
      // 屏幕可以滚动
      document.body.style.overflow = 'visible';
      f = 'false';
      e.target.dataset.flag = f;
    }
  },

  /* 
    点赞
    @parmas e: $event
   */
  getlike(e) {
    var f = e.target.parentNode.dataset.flag; // 获取自定义属性 判断是否点赞
    if (f === 'false') {
      e.target.style.color = '#ff8200';
      // 如果没有点赞 则再判断点击的是 i 还是 span
      if (e.target.nodeName === 'I') {
        e.target.nextSibling.style.color = '#ff8200';
        e.target.nextSibling.textContent++;
      } else if (e.target.nodeName === 'SPAN') {
        e.target.previousSibling.style.color = '#ff8200';
        e.target.textContent++;
      }
      f = 'true';
      e.target.parentNode.dataset.flag = f; // 修改自定义属性值
    } else {
      e.target.style.color = '';
      // 如果有点赞 则再判断点击的是 i 还是 span
      if (e.target.nodeName === 'I') {
        e.target.nextSibling.style.color = '';
        e.target.nextSibling.textContent--;
      } else if (e.target.nodeName === 'SPAN') {
        e.target.previousSibling.style.color = '';
        e.target.textContent--;
      }
      f = 'false';
      e.target.parentNode.dataset.flag = f; // 修改自定义属性值
    }
  },

  /* 
    关闭或打开评论区
    @parmas e: $event
            id: item.id 第几个li里评论的
   */
  openCommentsList(e, id) {
    var f = e.target.parentNode.dataset.flag; // 获取自定义属性 判断评论区是否打开
    if (f === 'false') {
      e.target.style.color = '#ff8200';
      if (e.target.nodeName === 'I') {
        e.target.nextSibling.style.color = '#ff8200';
      } else if (e.target.nodeName === 'SPAN') {
        e.target.previousSibling.style.color = '#ff8200';
      }
      f = 'true';
      e.target.parentNode.dataset.flag = f;
      document.getElementsByClassName('comments-list')[id - 1].style.display =
        'block';
    } else {
      this.hasOpenCommentsList = true;
      e.target.style.color = '';
      if (e.target.nodeName === 'I') {
        e.target.nextSibling.style.color = '';
      } else if (e.target.nodeName === 'SPAN') {
        e.target.previousSibling.style.color = '';
      }
      f = 'false';
      e.target.parentNode.dataset.flag = f;
      document.getElementsByClassName('comments-list')[id - 1].style.display =
        'none';
    }
  },

  /* 
    转发
    @parmas e: $event
   */
  transmit(e) {
    let f = e.target.parentNode.dataset.flag; // 获取自定义属性 判断是否点击转发
    if (f === 'false') {
      if (e.target.nodeName === 'I' || e.target.nodeName === 'SPAN') {
        // 显示
        e.target.parentNode.lastChild.style.display = 'flex';
        e.target.style.color = '#ff8200';
        if (e.target.nodeName === 'I') {
          e.target.nextSibling.style.color = '#ff8200';
        } else if (e.target.nodeName === 'SPAN') {
          e.target.previousSibling.style.color = '#ff8200';
        }
        f = 'true';
        e.target.parentNode.dataset.flag = f;
      }
    } else {
      if (e.target.nodeName === 'I' || e.target.nodeName === 'SPAN') {
        // 隐藏
        e.target.parentNode.lastChild.style.display = 'none';
        e.target.style.color = '';
        if (e.target.nodeName === 'I') {
          e.target.nextSibling.style.color = '';
        } else if (e.target.nodeName === 'SPAN') {
          e.target.previousSibling.style.color = '';
        }
        f = 'false';
        e.target.parentNode.dataset.flag = f;
      }
    }
  }
}

/* 
    获取当前 年月日 和 时分秒
    @return 年-月-日 时:分:秒
   */
export const getTime = () => {
  let time = new Date();
  let year = time.getFullYear();
  year = year.toString().substring(2, 4);
  let month = time.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  let date = time.getDate();
  date = date < 10 ? '0' + date : date;
  let hour = time.getHours();
  hour = hour < 10 ? '0' + hour : hour;
  let minute = time.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  let second = time.getSeconds();
  second = second < 10 ? '0' + second : second;
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}

/* 
  防抖
  @param  fn 回调函数
          delay 延迟时间
  @return 返回一个函数 设置定时器返回一个回调
*/
export const debounce = (fn, delay = 600) => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay)
  }
}

/* 
  节流 时间戳
  @param  fn 回调函数
          delay 延迟时间
  @return 返回一个函数 如果现在时间剪去过去时间大于delay 返回一个回调
*/
export const throttle = (fn, delay = 600) => {
  let last = 0;
  return function () {
    let now = +new Date();
    if (now - last > delay) {
      fn.apply(this, arguments);
      last = now;
    }
  }
}

/*
  节流 定时器
  @param  fn 回调函数
          delay 延迟时间
  @return 返回一个函数 设置定时器返回一个回调
 */
// export const throttle = (fn, delay = 600) => {
//   let flag = true;
//   return function () {
//     if (flag) {
//       setTimeout(() => {
//         fn, apply(this, arguments);
//         flag = true;
//       }, delay)
//     }
//     flag = false;
//   }
// }