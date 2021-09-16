<template>
  <!-- 订单确认及支付 -->
  <div class="page-order-pay">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="订单支付"
      left-text="返回"
      right-text="取消订单"
      left-arrow
      @click-left="goBack"
      @click-right="onCancelOrder"
    />
    <!-- 订单号 -->
    <van-cell
      title="订单号"
      :value="sn"
      :title-style="{ 'text-align': 'left' }"
    />
    <!-- 描述信息 -->
    <div class="order-info">
      <div class="left">
        <h3>{{ orderDetail && orderDetail.order_items.flash_name }}</h3>
        <div style="color: gray; font-size:15px">
          <van-icon name="clock-o" />
          {{ orderDetail && orderDetail.order_items.remark }}
        </div>
        <div class="tips">短信接收</div>
      </div>
      <!-- <div class="right">
        <van-icon name="arrow" />
      </div> -->
    </div>
    <!-- //描述信息 -->
    <!-- 提交表单 -->
    <van-submit-bar
      :price="orderDetail && orderDetail.order.buy_amount * 100"
      button-text="立即支付"
      @submit="onSubmit"
    />
  </div>
</template>
<script>
import { OrderApis } from "@/utils/apis";
import { ajax } from "@/utils/ajax";
import * as constants from "@/utils/constants";

export default {
  data() {
    return {
      // 订单流水号
      sn: "",
      // 订单信息
      /* orderDetail: {
        order_items: {
          flash_name: ""
        }
      }, */
      orderDetail: 0
    };
  },
  methods: {
    // 获取订单的详细信息
    getOrderDetail() {
      const url = OrderApis.orderDetailUrl.replace("#{sn}", this.sn);
      ajax({
        method: "get",
        url: url,
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      }).then(({ data }) => {
        this.orderDetail = data;
      });
    },
    /**
     * 确认支付
     */
    onSubmit() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: `确认支付${this.orderDetail.order.buy_amount}吗？`
        })
        .then(() => {
          // 调用接口
          const url = OrderApis.orderDetailUrl.replace("#{sn}", this.sn);
          ajax({
            method: "post",
            url: url,
            headers: {
              authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
          }).then(() => {
            // 提示语
            this.$notify({
              type: "success",
              message: "支付成功,已为您跳转到订单列表"
            });
          });
          // 跳转我的订单列表
          this.$router.replace({
            name: "OrderList",
            params: { status: constants.ORDER_STATUS_ALL }
          });
        });
    },
    /**
     * 后退
     */
    goBack() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "您还没有支付，确认放弃支付吗？"
        })
        .then(() => {
          this.$router.go(-1);
          // on confirm
        });
    },
    /**
     * 取消订单
     */
    onCancelOrder() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "确认取消该订单？"
        })
        .then(() => {
          const url = OrderApis.orderDetailUrl.replace("#{sn}", this.sn);
          // put方式调用
          ajax({
            method: "put",
            url: url,
            headers: {
              authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
          }).then(res => {
            console.log(res);
            if (res.data.code === 0) {
              this.$notify({
                type: "success",
                message: "订单已成功取消"
              });
            } else {
              this.$notify({
                type: "warning",
                message: "取消出错，请检查您是否已取消订单"
              });
            }
            this.$router.go(-1);
          });
        });
    }
  },
  created() {
    // 订单流水号
    this.sn = this.$route.params.sn;
    // 获取订单信息
    this.getOrderDetail();
  }
};
</script>
<style lang="less">
.page-order-pay {
  // 订单信息
  .order-info {
    display: flex;
    padding: 10px;
    background-color: #fff;
    margin-top: 10px;

    .left {
      flex: 1;
      text-align: left;
      h3 {
        padding: 5px 0;
        padding-bottom: 15px;
        margin: 0;
      }
    }
    .right {
      width: 80px;
      text-align: right;
    }
  }
  .van-cell__value {
    // font-size: 13.5px;
    flex: 3;
  }
  .tips {
    margin-top: 10px;
  }
}
</style>
