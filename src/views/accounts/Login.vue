<template>
  <!--用户登录-->
  <div class="page-account-login">
    <!--导航条-->
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
      style="background:transparent"
    />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        clearable
        :rules="ruleUsername"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        clearable
        maxlength="30"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- 文字提示 -->
    <div class="tips">
      登录表示同意 <a href="#">用户使用协议</a>及<a>隐私条款</a>
    </div>
    <div class="tips">
      没有账号？
      <router-link :to="{ name: 'AccountRegister' }">点击注册>></router-link>
    </div>
    <!-- 版权信息 -->
    <Copyright />
  </div>
</template>
<script>
import Copyright from "@/components/common/Copy_right";
import { ajax } from "@/utils/ajax";
import { AccountsApis } from "@/utils/apis";
export default {
  components: {
    Copyright
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    Authication() {
      // ajax({
      //   method: "post",
      //   data: {
      //     username: this.username,
      //     password: this.password
      //   },
      //   headers: {
      //     authorization: `Bearer ${jwt_token}`
      //   }
      // })
      ajax
        .post(AccountsApis.userLoginUrl, {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.data.code === 0) {
            // 将用户信息存入vuex
            console.log(res.data.access);
            // 将access token存入本地存储
            window.localStorage.setItem("token",res.data.access);
            this.$store.commit("updateUserinfo", res.data);
            // 跳转到个人中心
            this.$router.replace({ name: "Mine" });
            this.$toast("登录成功");
          } else {
            // this.$toast(`${res.data.error_code}, ${res.data.error_msg}`);
            this.$toast("请输入正确的用户名和密码");
            console.log(res.data.error_msg);
          }
        });
    },
    // 提交表单
    onSubmit() {
      console.log("提交登录表单");
      this.Authication();
    }
  },
  data() {
    return {
      access: "",
      refresh: "",
      username: "",
      password: "",
      userinfo: "",
      // 用户名的验证规则
      ruleUsername: [
        { required: true, message: "请填写用户名" },
        {
          pattern: /(^1[3-9]\d{9}$)|(^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+){0,4}@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+){0,4}$)/,
          message: "请填写正确的手机号或邮箱"
        }
      ]
    };
  }
};
</script>
