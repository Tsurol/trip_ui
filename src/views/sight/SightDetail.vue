<template>
  <!-- 景点详情 -->
  <div class="page-sight-detail">
    <!-- 页面头部 -->
    <van-nav-bar
      left-text="返回"
      left-arrow
      fixed
      @click-left="goBack"
      style="background:transparent"
    />
    <!-- 景点大图 -->
    <div class="sight-banner">
      <van-image width="100%" height="100%" :src="sightDetail.banner_img" />
      <div class="tips">
        <router-link
          class="pic-sts"
          :to="{ name: 'SightImage', params: { id } }"
        >
          <van-icon name="video-o" />
          <span>{{ sightDetail.image_count }} 图片</span>
        </router-link>
        <div class="title">{{ sightDetail.name }}</div>
      </div>
    </div>
    <!-- 评分，景点介绍 -->
    <div class="sight-info">
      <div class="left" @click="goPage()">
        <div class="left-item">
          <strong>{{ sightDetail.score }}</strong>
          <small>很棒</small>
        </div>
        <van-icon name="arrow" />
        <div class="info-tips">{{ sightDetail.comment_count }}条评论</div>
      </div>
      <div class="right">
        <div class="right-item">
          <span>景点介绍</span>
        </div>
        <div class="info-tips">
          开放时间，贴士
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 地址信息 -->
    <van-cell
      :title="sightDetail.full_address"
      icon="location-o"
      is-link
      :title-style="{ 'text-align': 'left' }"
    />
    <!-- 门票列表 -->
    <div class="sight-ticket">
      <van-cell title="门票" icon="label-o" title-style="text-align:left" />
      <div class="ticket-item" v-for="item in ticketList" :key="item.id">
        <div class="left">
          <div class="title">{{ item.name }}</div>
          <div class="tips">
            <van-icon name="underway-o" />
            <span>{{ item.desc }}</span>
          </div>
          <div class="tags">
            <van-tag mark type="primary">{{ item.entry_way }}</van-tag>
          </div>
        </div>
        <div class="right">
          <div class="price">
            <span>￥</span>
            <strong>{{ item.sell_price }}</strong>
          </div>
          <router-link :to="{ name: 'OrderSubmit', params: { id: item.id } }">
            <van-button
              type="warning"
              size="small"
              style="width:65px;height:30px"
              >预定</van-button
            >
          </router-link>
        </div>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="sight-comment">
      <van-cell
        title="热门评论"
        icon="comment-o"
        title-style="text-align:left"
      />
      <CommentItem v-for="item in commentList" :key="item.id" :item="item" />
      <router-link
        class="link-more"
        :to="{ name: 'SightComment', params: { id: id } }"
        >查看更多>></router-link
      >
    </div>
  </div>
</template>

<script>
// 评论项的组件
import CommentItem from "../../components/sight/CommentItem.vue";
import { SightApis } from "@/utils/apis";
import { ajax } from "@/utils/ajax";
export default {
  data() {
    return {
      id: "",
      // 景点详细信息
      sightDetail: [],
      // 门票列表
      ticketList: [],
      // 评论列表
      commentList: []
    };
  },
  components: {
    CommentItem
  },
  methods: {
    loadData() {
      this.id = this.$route.params.id;
      // 获取景点详细信息
      this.getSightDetail();
      // 门票列表
      this.getTicketList();
      // 评论列表
      this.getCommentList();
    },
    // 跳转到评论列表
    goPage(){
      this.$router.push({name: "SightComment", params: {id:this.id}});
    },
    goBack() {
      // 返回上次访问的页面
      this.$router.go(-1);
    },
    onChange(index) {
      this.index = index;
    },
    // 获取景点详细信息
    getSightDetail() {
      const url = SightApis.sightDetailUrl.replace("#{id}", this.id);
      ajax.get(url).then(({ data: { objects } }) => {
        this.sightDetail = objects[0];
      });
    },

    // 获取门票列表
    getTicketList() {
      const url = SightApis.sightTicketUrl.replace("#{id}", this.id);
      ajax.get(url).then(({ data: { objects } }) => {
        this.ticketList = objects;
      });
    },

    // 获取评论列表
    getCommentList() {
      const url = SightApis.sightCommentUrl.replace("#{id}", this.id);
      ajax.get(url).then(({ data: { objects } }) => {
        this.commentList = objects;
      });
    }
  },
  watch: {
    // 监听url发生变化则重新加载数据
    $route() {
      this.loadData();
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style lang="less">
.page-sight-detail {
  .sight-banner {
    position: relative;
    .tips {
      position: absolute;
      left: 10px;
      bottom: 10px;
      font-size: 16px;
      color: #fff;
      .pic-sts {
        padding: 1px;
        color: #fff;
        border-radius: 10px;
        font-size: 14px;
        background: rgb(0, 0, 0, 0.4);
      }
    }
  }
  .sight-info {
    display: flex;
    background-color: #fff;
    border: 1px solid #f6f6f6;
    .left {
      flex: 1;
      border-right: 1px solid #f6f6f6;
      position: relative;
      .left-item {
        text-align: left;
        padding: 5px 10px;
        strong {
          color: #ff8300;
        }
      }
      i {
        position: absolute;
        right: 5px;
        top: 5px;
      }
    }
    .right {
      flex: 1;
      position: relative;
      .right-item {
        text-align: left;
        padding: 5px 10px;
      }
      i {
        position: absolute;
        right: 5px;
        top: 5px;
      }
    }
    .info-tips {
      color: #999;
      font-size: 12px;
      text-align: left;
      padding: 5px 10px;
    }
  }
  .sight-ticket {
    margin-top: 10px;
    background-color: #fff;
    .ticket-item {
      display: flex;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f6f6f6;
      .left {
        text-align: left;
        padding: 5px 10px;
        flex: 1;
        .tips {
          font-size: 1px;
        }
      }
      .right {
        text-align: center;
        width: 100px;
        .price {
          color: #ff9800;
          font-size: 20px;
        }
      }
    }
  }
  .sight-comment {
    background-color: #fff;
    margin-top: 10px;
    padding-bottom: 20px;
    .link-more {
      display: block;
      color: #666;
      padding: 10px;
    }
    .link-more:hover {
      color: slateblue;
    }
  }
}
</style>
