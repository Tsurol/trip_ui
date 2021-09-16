<template>
  <!-- 景点评论 -->
  <div class="page-sight-comment">
    <!-- 页面头部 -->
    <van-nav-bar
      left-text="返回"
      left-arrow
      title="景点评论"
      @click-left="goBack"
      style="background:transparent"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="sight-comment"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getCommentList"
      >
        <CommentItem v-for="(item, index) in commentList" :key="index" :item="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import CommentItem from "../../components/sight/CommentItem.vue";
import { SightApis } from "@/utils/apis";
import { ajax } from "@/utils/ajax";

export default {
  components: {
    CommentItem
  },
  data() {
    return {
      commentList: [],
      currentPage: 1,
      // 正在加载中
      loading: false,
      // 所有的内容加载完成
      finished: false,
      // 是否正在下拉刷新
      refreshing: false,
    };
  },
  methods: {
    goBack() {
      // 返回上次访问的页面
      this.$router.go(-1);
    },
    // 下拉刷新执行
    onRefresh() {
      // 清空数据
      this.commentList = [];
      this.currentPage = 1;
      this.finished = false;
      this.error = false;
      // 重新加载数据
      this.getCommentList();
    },
    // 获取评论列表
    getCommentList() {
      const url = SightApis.sightCommentUrl.replace("#{id}", this.id);
      ajax
        .get(url, {
          params: {
            // 当前页码
            page: this.currentPage
          }
        })
        .then(({ data: { meta, objects } }) => {
          this.commentList = this.commentList.concat(objects);
          // 加载状态结束
          this.loading = false;
          // 设置下一页的页码
          this.currentPage = meta.current_page + 1;
          // 数据全部加载完成,当前页码=总页数
          if (meta.current_page === meta.page_count) {
            this.finished = true;
          }
          this.refreshing = false;
        })
        .catch(() => {
          this.loading = false;
          this.refreshing = false;
        });
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    // this.getCommentList();
  }
};
</script>

<style lang="less">
.page-sight-comment {
  background-color: #fff;
}
</style>
