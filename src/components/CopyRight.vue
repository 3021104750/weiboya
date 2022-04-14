<template>
  <div class="copyright">
    <ul>
      <li>
        <div class="copyright-head">帮助中心</div>
        <div class="copyright-body">
          <a href="javascrip:;">微博客服</a
          ><a href="javascrip:;">自动客服中心</a
          ><a href="javascrip:;">常见问题</a>
        </div>
      </li>
      <li>
        <div class="copyright-head">合作与服务</div>
        <div class="copyright-body">
          <a href="javascrip:;">合作热线</a><a href="javascrip:;">微博营销</a
          ><a href="javascrip:;">开放平台</a><a href="javascrip:;">更多</a>
        </div>
      </li>
      <li>
        <div class="copyright-head">举报中心</div>
        <div class="copyright-body">
          <a href="javascrip:;">违规投诉</a><a href="javascrip:;">处理大厅</a
          ><a href="javascrip:;">舞弊举报</a><a href="javascrip:;">更多</a>
        </div>
      </li>
      <li>
        <div class="copyright-head">关于微博</div>
        <div class="copyright-body">
          <a href="javascrip:;">Weibo</a><a href="javascrip:;">客户端下载</a
          ><a href="javascrip:;">微博招聘</a><a href="javascrip:;">备案信息</a>
        </div>
      </li>
      <li>
        <div class="copyright-right">
          <i class="icon-sina-weibo"></i>
          <p>Copyright @ 2009-2002WEIBO</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CopyRight",
};
</script>

<style lang="less" scoped>
ul {
  width: 250px;
  padding-top: 10px;
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-bottom: 4px;
    .copyright-head {
      font-size: 12px;
      color: #666;
      margin-bottom: 5px;
    }
    .copyright-body {
      display: flex;
      justify-content: space-between;
      a {
        font-size: 12px;
        color: #333;
        &:hover {
          color: #989898;
        }
      }
    }
    &:last-child {
      font-size: 12px;
    }
    .copyright-right {
      display: flex;
      align-items: center;
      color: #666;
      i {
        margin-right: 5px;
        font-size: 16px;
      }
      .icon-sina-weibo:before {
        content: "\ea9a";
        color: #f00;
      }
    }
  }
}
</style>