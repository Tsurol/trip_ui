<template>
  <!-- 首页的热门推荐 -->
  <div class="home-hot-box">
    <!-- 顶上导航 -->
    <van-cell
      title="热门推荐"
      value="全部榜单"
      is-link
      title-style="text-align:left"
      icon="/static/home/hot/fire.png"
      style="padding:10px 0px"
      :to="{ name: 'Search', query: { isTop: 1 } }"
    />
    <!-- //顶上导航 -->
    <!-- 景点列表 -->
    <div class="box-main">
      <router-link
        class="hot-item"
        v-for="item in hotList"
        :key="item.id"
        :to="{ name: 'SightDetail', params: { id: item.id } }"
      >
        <div class="img">
          <span></span>
          <img :src="item.main_img" :alt="item.name" />
        </div>
        <h5 class="van-ellipsis">{{ item.name }}</h5>
        <div class="price-line">
          <span class="price">￥{{ item.min_price }}</span> 起
        </div>
      </router-link>
    </div>
    <!-- 景点列表 -->
  </div>
</template>

<script>
import { ajax } from "@/utils/ajax";
import { SightApis } from "@/utils/apis";

export default {
  name: "Hot",
  data() {
    return {
      hotList: []
    };
  },
  methods: {
    // 查询热门景点数据
    getHotList() {
      ajax
        .get(SightApis.sightListCacheUrl, {
          params: {
            is_hot: 1
          }
        })
        .then(({ data }) => {
          this.hotList = data.objects;
        });
    }
  },
  created() {
    // 获取热门景点列表接口数据
    this.getHotList();
  }
};
</script>

<style lang="less">
.home-hot-box {
  margin-top: 8px;
  background-color:#fff;
  padding: 0 10px;
  .box-main {
    display: flex;
    overflow-x: scroll;
    .hot-item {
      width: 100px;
      padding-right: 5px;
      .img {
        position: relative;
        span {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          display: inline-block;
          width: 42px;
          height: 20px;
        }
        img {
          width: 100px;
          height: 100px;
        }
      }
      // &表示上一层的css类
      &:nth-child(1) .img span {
        background: url("/static/home/hot/top1.png") no-repeat;
        background-size: 100% auto;
      }
      &:nth-child(2) .img span {
        background: url("/static/home/hot/top2.png") no-repeat;
        background-size: 100% auto;
      }
      &:nth-child(3) .img span {
        background: url("/static/home/hot/top3.png") no-repeat;
        // 宽度100%,高度自适应
        background-size: 100% auto;
      }
      &:nth-last-child(1) {
        padding-right: 0;
      }
      h5 {
        margin: 0;
        padding: 5px 0;
        color: #212121;
        font-size: 12px;
      }
      .price-line {
        color: #212121;
        font-size: 12px;
        .price {
          color: #f50;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
