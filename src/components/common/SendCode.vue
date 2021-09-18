<template>
  <van-button
    size="small"
    type="primary"
    @click.prevent="sendcode()"
    :disabled="isCodeSend"
    >{{ sendBtnText }}</van-button
  >
</template>

<script>
import { ajax } from "@/utils/ajax";
import { AccountsApis } from "@/utils/apis";
export default {
  data() {
    return {
      // 是否已经发送验证码
      isCodeSend: false,
      sendBtnText: "发送验证码",
      counter: 30,
      timer: null,
      code: ""
    };
  },
  // username默认为注册时的手机号或邮箱号
  props: ["username"],
  methods: {
    // 倒计时函数
    countDown() {
      this.timer = setInterval(() => {
        this.sendBtnText = `(${this.counter}秒)后重新发送`;
        this.counter--;
        if (this.counter < 0) {
          this.reset();
        }
      }, 1000);
    },
    send_code() {
      ajax
        .get(AccountsApis.sendCodeUrl, {
          params: {
            email: this.username
          }
        })
        .then(res => {
          console.log("res:", res);
          console.log("res.code:", res.data.code);
          if (res.data.code === 0){
            this.$toast("请查收验证码");
            this.code = res.data.objects.code;
            console.log(this.code);
          }
        });
    },
    // 重置倒计时相关内容
    reset() {
      this.isCodeSend = false;
      this.sendBtnText = "点击发送验证码";
      if (this.timer) {
        clearInterval(this.timer);
        this.counter = 5;
        this.timer = null;
      }
    },
    // 发送验证码
    sendcode() {
      // 判断是否已输入邮箱
      if (!this.username) {
        this.$notify("请输入邮箱");
        return false;
      }
      this.isCodeSend = true;
      // 调用接口，发送验证码
      this.send_code();
      // 开启倒计时，60s之后才能再次点击
      this.countDown();
    }
  }
};
</script>
