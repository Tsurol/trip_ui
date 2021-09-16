<template>
  <!--用户注册  -->
  <div class="page-accounts-register">
    <!--导航条-->
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
      style="background:transparent"
    />
    <!-- 表单 -->
    <van-form>
      <van-field
        v-model="form.username"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        clearable
        :rules="ruleUsername"
      />
      <van-field
        v-model="form.code"
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #button>
          <SendCode ref="refCode" :username="form.username" />
        </template>
      </van-field>
      <van-field
        v-model="form.nickname"
        name="用户昵称"
        label="用户昵称"
        placeholder="昵称"
        clearable
        maxlength="32"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        clearable
        minlength="4"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="form.confirePassword"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        clearable
        :rules="rulePassword"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click.prevent="onSubmit"
          >注册</van-button
        >
      </div>
    </van-form>
    <!-- 文字提示 -->
    <div class="tips">
      注册表示同意 <a href="#">用户使用协议</a>及<a>隐私条款</a>
    </div>
    <div class="tips">
      已有账号？
      <router-link :to="{ name: 'AccountLogin' }">点击登录>></router-link>
    </div>
    <!-- 版权信息 -->
    <Copyright />
  </div>
</template>

<script>
import Copyright from "@/components/common/Copy_right";
import SendCode from "@/components/common/SendCode";
import { ajax } from "@/utils/ajax";
import { AccountsApis } from "@/utils/apis";
export default {
  components: {
    Copyright,
    SendCode
  },
  data() {
    return {
      form: {
        username: "",
        nickname: "",
        code: "",
        password: "",
        confirePassword: ""
      },
      // 重复密码验证
      rulePassword: [
        {
          required: true,
          message: "请重复一次密码"
        },
        {
          validator: () => this.form.password === this.form.confirePassword,
          message: "两次密码输入不一致"
        }
      ],
      // 手机号验证
      ruleUsername: [
        {
          pattern: /^1[3-9]\d{9}$/,
          message: "请填写正确的手机号"
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    Authication_reg() {
      console.log(this.form);
      ajax
        .post(AccountsApis.userRegisterUrl, {
          phone: this.form.username,
          password: this.form.password,
          nickname: this.form.nickname,
          code: this.form.code
        })
        // .then(res => {
        //   console.log("res:", res);
        //   console.log("res.code:", res.data.code);
        //   if (res.data.code === 0) {
        //     // this.$router.replace({ name: "Mine" });
        //     this.$router.replace({ name: "Home" });
        //     this.$toast("注册成功");
        //   } else {
        //     this.$toast("注册失败");
        //   }
        // });
        .then(res => {
          if (res.data.code === 0) {
            // 将用户信息存入vuex
            console.log(res.data.access);
            window.localStorage.setItem("token", res.data.access);
            this.$store.commit("updateUserinfo", res.data);
            // 跳转到个人中心
            this.$router.replace({ name: "Mine" });
            this.$toast("注册成功，已帮您自动登录");
          } else {
            // this.$toast(`${res.data.error_code}, ${res.data.error_msg}`);
            this.$toast("请输入正确的验证码");
            console.log(res.data.error_msg);
          }
        });
    },
    // 提交表单
    onSubmit() {
      console.log("提交登录表单");
      this.Authication_reg();
    }
  }
  // // 手机号变化时重置验证码组件
  // onUsernameChange() {
  //   this.$refs.refCode.reset();
  // }
};
</script>
