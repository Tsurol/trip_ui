<template>
  <!-- 景点列表 -->
  <router-link
    class="sight-item"
    :to="{ name: 'SightDetail', params: { id: item.id } }"
  >
    <img :src="item.main_img" :alt="item.name" />
    <div class="right">
      <h5>{{ item.name }}</h5>
      <van-rate v-model="item.score" readonly color="#ffd21e" />
      <div class="tips">{{ item.comment_count }}人点评 | 100%满意</div>
      <div class="tips-location">{{ item.province }} - {{ item.city }}</div>
      <div class="line-price">￥{{ item.min_price }}起</div>
    </div>
  </router-link>
  <!-- //景点列表 -->
</template>

<script>
export default {
  name: "ListSight",
  props: ["item"]
};
</script>

<style lang="less">
.sight-item {
  display: flex;
  border-bottom: 1px solid #f6f6f6;
  margin-top: 10px;
  img {
    width: 100px;
    height: 100px;
  }
  .right {
    position: relative;
    text-align: left;
    flex-grow: 1;
    padding-left: 5px;
    h5 {
      margin: 0;
      font-size: 14px;
      color: #212121;
      padding: 5px 0;
    }
    .tips {
      font-size: 12px;
      color: #666;
    }
    .tips-location {
      font-size: 12px;
      color: #999;
    }
    .line-price {
      color: #f50;
      font-weight: 700;
      font-size: 16px;
      position: absolute;
      display: inline-block;
      right: 10px;
      top: 25px;
    }
  }
}
</style>
