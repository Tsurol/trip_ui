<template>
  <!-- 评论列表中每一项 -->
  <div class="comment-item-box">
    <div class="cmt-header">
      <div class="rate">
        <van-rate
          v-model="item.score"
          readonly
          allow-half
          void-icon="star"
          void-color="#eee"
          size="15px"
        />
      </div>
      <div class="user">{{ item.user.nickname }} {{ item.created_at }}</div>
    </div>
    <!-- 评论内容 -->
    <div class="cmt-content">
      <p>{{ item.content }}</p>
    </div>
    <!-- 评论的图片列表 -->
    <div class="cmt-imgs" @click="show = true">
      <van-image
        width="100"
        height="100"
        v-for="img in item.images"
        :key="img.id"
        :src="img.img"
      />
    </div>
    <!-- 图片预览 -->
    <van-image-preview v-model="show" :images="imageUrls" @change="onChange">
      <template v-slot:index>第{{ index + 1 }}页</template>
    </van-image-preview>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      value: 4.5,
      show: false,
      index: 0,
    };
  },
  computed: {
    // 图片大图预览需要处理的数据
    imageUrls () {
      return this.item.images.map(i => i.img);
    }
  },
  methods: {
    onChange(index) {
      this.index = index;
    }
  }
};
</script>

<style lang="less">
.comment-item-box {
  padding: 10px 10px;
  border-bottom: 1px solid #f6f6f6;

  .cmt-header {
    display: flex;
    justify-content: space-between;

    .user {
      font-size: 13px;
    }
  }
  .cmt-content {
    color: #616161;
    padding: 5px 0;
    text-align: left;
    font-size: 13px;
    line-height: 2;
  }
  .cmt-imgs {
    padding: 5px;
    text-align: left;
    .van-image {
      margin-right: 10px;
    }
  }
}
</style>
