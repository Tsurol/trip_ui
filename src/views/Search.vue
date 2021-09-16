<template>
  <!--景点搜索页面-->
  <div class="page-search">
    <!-- 标题 -->
    <van-nav-bar
      title="搜索景点"
      left-text="返回"
      left-arrow
      @click-left="goBack"
      style="background:transparent"
      v-if="isHome"
    />
    <van-nav-bar title="搜索景点" v-else />
    <!-- 搜索框 -->
    <van-search
      v-model="sightName"
      show-action
      label="景点"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @clear="clear"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <h2 v-if="isHot">热门推荐</h2>
    <h2 v-if="isTop">精选景点</h2>
    <!-- 景点列表 -->
    <div class="sight-list">
      <ListSight v-for="sight in dataList" :key="sight.id" :item="sight" />
    </div>
    <!-- 分页 -->
    <!-- <van-pagination
      v-model="currentPage"
      :total-items="totalItems"
      :items-per-page="perPage"
    /> -->
    <!-- 页脚 -->
    <Footer v-if="!isHome"/>
  </div>
</template>

<style lang="less">
.page-search {
  h2 {
    font-size: 16px;
    text-align: left;
    padding: 5px 10px;
    margin: 0;
  }
  .sight-list {
    padding: 10px 10px 5px;
    background-color: #fff;
    margin-bottom: 50px;
  }
}
</style>

<script>
import ListSight from "@/components/common/ListSight";
import Footer from "@/components/common/Footer";
import { ajax } from "@/utils/ajax";
import { SightApis } from "@/utils/apis";

export default {
  name: "Search",
  components: {
    ListSight,
    Footer
  },
  data() {
    return {
      // 景点名称
      sightName: "",
      // 景点列表的数据
      dataList: [],
      // 总记录数
      totalItems: 0,
      // 当前的页码
      currentPage: 1,
      // 每页数据的大小
      perPage: 5,
      isHot: "",
      isTop: ""
    };
  },
  computed: {
    // 是否从首页过来的
    isHome () {
      return this.isHot||this.isTop;
    }
  },
  methods: {
    /**
     * 景点列表接口
     */
    goBack() {
      // 返回上次访问的页面
      this.$router.go(-1);
    },
    getDataList() {
      ajax
        .get(SightApis.sightListUrl, {
          params: {
            page: this.currentPage,
            name: this.sightName,
            is_top: this.isTop,
            is_hot: this.isHot
          }
        })
        .then(({ data }) => {
          this.dataList = data.objects;
          // this.totalItems = data.meta.total_count;
          // this.currentPage = data.meta.current_page;
        });
    },
    clear() {
      this.dataList = [];
      this.getDataList();
    },
    onSearch() {
      console.log("onSearch");
      // 判断搜索内容是否为空
      if (!this.sightName) {
        this.$toast("请输入搜索词");
        return;
      }
      // 重置数据
      this.dataList = [];
      this.currentPage = 1;
      // 执行查询
      this.getDataList();
    }
  },
  created() {
    this.isHot = this.$route.query.isHot;
    this.isTop = this.$route.query.isTop;
    this.getDataList();
  }
};
</script>
