<template>
  <!-- 我的订单列表页面 -->
  <div class="page-order-list">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <!-- 订单按状态切换 -->
    <van-tabs v-model="status" @click="tabChange">
      <van-tab
        v-for="(value, key, index) in constants.ORDER_STATUS"
        :title="value"
        :name="key"
        :key="index"
      ></van-tab>
    </van-tabs>
    <!-- 订单记录 -->
    <div class="order-list">
      <div class="order-item" v-for="item in dataList" :key="item.sn">
        <div class="order-head">
          <div class="order-num">订单号：{{ item.sn }}</div>
          <div class="order-status text-warning">
            {{ constants.ORDER_STATUS[item.status] }}
          </div>
        </div>
        <router-link
          :to="{ name: 'SightDetail', params: { id: item.sight_id } }"
        >
          <div class="order-body">
            <div class="left">
              <van-image
                width="100"
                height="100"
                :src="item.order_item.flash_img"
              />
            </div>
            <div class="right">
              <div class="title">{{ item.order_item.flash_name }}</div>
              <div class="remark">{{ item.order_item.remark }}</div>
            </div>
          </div>
        </router-link>
        <div class="order-footer">
          <div>总共{{ item.buy_count }}件商品 合计 ￥{{ item.buy_amount }}</div>
          <van-button
            round
            size="small"
            type="warning"
            v-if="item.status == constants.ORDER_STATUS_PAY"
            @click="goPay(item)"
            >去支付</van-button
          >
          <van-button
            round
            size="small"
            type="warning"
            v-if="
              item.status == constants.ORDER_STATUS_DONE ||
                item.status == constants.ORDER_STATUS_CANCEL
            "
            @click="deleteOrder(item)"
            >删除订单</van-button
          >
          <!-- <router-link> -->
            <van-button round size="small" type="info">订单详情</van-button>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { OrderApis } from "@/utils/apis";
import { ajax } from "@/utils/ajax";
import * as constants from "@/utils/constants";

export default {
  data() {
    return {
      status: 1,
      dataList: [],
      constants
    };
  },
  watch: {
    $route() {
      this.loadData();
    }
  },
  methods: {
    goPay(item) {
      this.$router.push({ name: "OrderPay", params: { sn: item.sn } });
    },
    deleteOrder(item) {
      // 弹框确认
      this.$dialog
        .alert({
          title: "温馨提示",
          message: "删除订单将无法恢复，确认删除订单？"
        })
        .then(() => {
          // 调用接口
          const url = OrderApis.orderDetailUrl.replace("#{sn}", item.sn);
          ajax({
            method: "delete",
            url: url,
            headers: {
              authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
          }).then(res => {
            // 告诉用户已经删除成功了
            // 隐藏界面上的显示
            if (res.data.code === 0) {
              this.$notify({
                type: "success",
                message: "删除成功"
              });
              item.sn = "";
            } else {
              this.$notify({
                type: "success",
                message: "删除出错，请检查您是否已删除订单"
              });
            }
            this.$router.go(-1);
          });
        });
    },
    tabChange(name, value) {
      console.log(name, value);
      this.$router.push({ name: "OrderList", params: { status: name } });
    },
    loadData() {
      this.status = this.$route.params.status;
      console.log(this.status);
      this.dataList = [];
      this.getDataList();
    },
    goBack() {
      // this.$router.go(-1);
      this.$router.push({ name: "Mine" });
    },
    // 查询订单列表
    getDataList() {
      ajax({
        method: "get",
        url: OrderApis.orderListUrl,
        params: {
          status: this.status
        },
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      }).then(({ data }) => {
        console.log(this.status);
        this.dataList = data.objects;
      });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less">
.page-order-list {
  .order-list {
    padding: 10px;
    .order-item {
      background-color: #fff;
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 10px;
      .order-status {
        color: #ff976a;
      }

      .order-head {
        display: flex;
        justify-content: space-between;
        .order-num {
          font-size: 12px;
        }
        .order-status {
          font-size: 15px;
        }
      }
      .order-body {
        padding: 10px 0;
        display: flex;
        .left {
          width: 100px;
          height: 100px;
        }
        .right {
          flex: 1;
          text-align: left;
          padding-left: 10px;
          .title {
            font-size: 16px;
            padding: 5px 0;
          }
          .remark {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .order-footer {
        text-align: right;
        font-size: 12px;
        .van-button {
          margin-right: 5px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
