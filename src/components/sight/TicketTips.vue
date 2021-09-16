<template>
  <!-- 门票的预订须知弹框内容 -->
  <div class="ticket-tips-box">
    <h3 class="title">预定须知</h3>
    <div>
      <h4>有效期</h4>
      <p>{{ ticketdetail.expire_date }} 日内有效</p>
    </div>
    <div>
      <h4>退改政策</h4>
      <p>{{ ticketdetail.return_policy }}</p>
    </div>
    <div>
      <h4>发票</h4>
      <p v-if="ticketdetail.has_invoice">我公司提供发票</p>
      <p v-else>不提供发票</p>
    </div>
    <div>
      <h4>预订须知</h4>
      <div v-html="ticketdetail.tips" v-if="ticketdetail.tips"></div>
      <div v-else class="kown">暂无</div>
    </div>
    <div>
      <h4>入园方式</h4>
      <div class="entry_way">{{ ticketdetail.entry_way }}</div>
    </div>
    <div v-if="ticketdetail.remark">
      <h4>备注信息</h4>
      <div>{{ ticketdetail.remark }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ticketdetail"]
};
</script>

<style lang="less">
  .ticket-tips-box {
    padding: 10px;
    h3, h4, p {
      text-align: left;
    }
    p {
      color: #666;
    }
    .entry_way {
      text-align: left;
    }
    .title {
      text-align: center;
    }
    .kown {
      text-align: left;
    }
  }
</style>