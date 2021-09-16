<template>
  <!-- 首页的轮播图 -->
  <div class="home-banner-box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="banner in bannerList" :key="banner.id">
        <img :src="banner.img" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { ajax } from "@/utils/ajax";
import { SystemApis } from "@/utils/apis";

export default {
  name: "Banner",
  data() {
    return {
      bannerList: []
    };
  },
  methods: {
    // 获取轮播图数据
    getDataList() {
      ajax.get(SystemApis.sliderListUrl, {
        params: {
          types: 10
        }
      }).then(res => {
        // console.log("res:", res);
        this.bannerList = res.data.objects;
      });
    }
  },
  created() {
    this.getDataList();
  }
};
</script>

<style lang="less">
.home-banner-box {
  img {
    width: 100%;
    height: auto;
  }
}
</style>
