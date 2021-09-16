<template>
  <div class="page-mine">
    <van-nav-bar title="个人中心" fixed />
    <div class="user-header">
      <div class="avatar" v-if="user.avatar">
        <img :src="user.avatar" alt="" />
      </div>
      <!--如果没有头像则显示默认头像-->
      <div class="avatar" v-else>
        <img src="/static/mine/avatar.png" alt="" />
      </div>
      <div>
        <p>欢迎您 {{ user.nickname }}</p>
        <a href="#" class="btn-link" @click="logout">退出登录</a>
      </div>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <router-link :to="{name:'OrderList', params:{status: constants.ORDER_STATUS_ALL}}">
          <van-icon name="records" />
          <span>全部订单</span>
        </router-link>
      </van-col>
      <van-col span="6">
        <router-link :to="{name:'OrderList', params:{status: constants.ORDER_STATUS_PAY}}">
          <van-icon name="pending-payment" />
          <span>待支付</span>
        </router-link>
      </van-col>
      <van-col span="6">
        <router-link :to="{name:'OrderList', params:{status: constants.ORDER_STATUS_DONE}}">
          <van-icon name="tosend" />
          <span>已完成</span>
        </router-link>
      </van-col>
      <van-col span="6">
        <router-link :to="{name:'OrderList', params:{status: constants.ORDER_STATUS_CANCEL}}">
          <van-icon name="logistics" />
          <span>已取消</span>
        </router-link>
      </van-col>
    </van-row>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Footer from "@/components/common/Footer";
import { AccountsApis } from "@/utils/apis";
import { ajax } from "@/utils/ajax";
import * as constants from "@/utils/constants";

export default {
  components: {
    Footer
  },
  data() {
    return {
      constants
    };
  },
  methods: {
    // 调用用户详细信息接口
    getUserinfo() {
      /* ajax.get(AccountsApis.userInfoUrl).then(({ data }) => {
        console.log("mine:", data);
        this.$store.commit("updateUserinfo", data);
      }); */
      ajax({
        method: "get",
        url: AccountsApis.userInfoUrl,
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      }).then(({ data }) => {
        //console.log("mine:", data);
        this.$store.commit("updateUserinfo", data);
      });
    },
    logout() {
      this.$notify({
        message: "欢迎下次再来",
        type: "success"
      });
      this.$store.commit("deleteUserInfo");
      window.localStorage.removeItem("token");
      this.$router.push({ name: "Home" });
    }
  },
  computed: mapState(["user"]),
  mounted() {
    this.getUserinfo();
  }
};
</script>

<style lang="less">
.page-mine {
  .van-nav-bar--fixed {
    background-color: transparent;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .user-header {
    background: url(/static/mine/bg.jpg) no-repeat center;
    background-size: 100% auto;
    color: #fff;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .avatar {
      margin-top: 30px;
    }
    .avatar img {
      width: 80px;
      height: 80px;
    }
  }
  .user-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
  .btn-link {
    color: #fff;
  }
}
</style>
