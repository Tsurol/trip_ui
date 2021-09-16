<template>
  <div class="page-home">
    <!-- 顶部标题 -->
    <Header />
    <!-- 轮播图 -->
    <Banner />
    <!-- 热门景点推荐 -->
    <Hot />
    <!-- 精选景点 -->
    <Fine />
    <!-- 底部导航 -->
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios'
// import { ajax } from '@/utils/ajax'
import Header from "@/components/home/Header";
import Banner from "@/components/home/Banner";
import Hot from "@/components/home/Hot";
import Fine from "@/components/home/Fine";
import Footer from "@/components/common/Footer";

export default {
  name: "Home",
  components: {
    // 顶部标题
    Header,
    // 轮播图
    Banner,
    // 热门景点推荐
    Hot,
    // 精选景点
    Fine,
    // 底部导航
    Footer,
  }
};
</script>
