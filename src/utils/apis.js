/**
 * 存放项目中所有的接口地址
 */

const apiHost = "http://localhost:8080/api";

/**系统模块 */
const SystemApis = {
  // 轮播图列表接口
  sliderListUrl: apiHost + "/system/slider/list/"
};

/**景点模块 */
const SightApis = {
  // 景点列表接口
  sightListUrl: apiHost + "/sight/sight/list/",
  // 缓存优化后的景点列表接口
  sightListCacheUrl: apiHost + "/sight/sight/list/cache",
  // 景点详情
  sightDetailUrl: apiHost + "/sight/sight/detail/#{id}/",
  // 门票列表
  sightTicketUrl: apiHost + "/sight/ticket/list/#{id}/",
  // 评论列表
  sightCommentUrl: apiHost + "/sight/comment/list/#{id}/",
  // 景点图片列表
  sightImageUrl: apiHost + "/sight/image/list/#{id}/",
  // 门票详情
  ticketDetail: apiHost + "/sight/ticket/detail/#{id}/"
};

/**用户模块 */
const AccountsApis = {
  // 用户登录接口
  userLoginUrl: apiHost + "/accounts/login/",
  // 用户注册接口
  userRegisterUrl: apiHost + "/accounts/register/",
  // 发送验证码接口
  sendCodeUrl: apiHost + "/accounts/sendcode/phone/",
  // 用户个人信息接口
  userInfoUrl: apiHost + "/accounts/user/info/",
};

/**用户模块 */
const OrderApis = {
  // 订单列表
  orderListUrl: apiHost + "/order/order/list/",
  // 订单详情，订单支付，订单删除，订单取消
  orderDetailUrl: apiHost + "/order/order/detail/#{sn}/",
  // 订单提交
  ticketSubmitUrl: apiHost + "/order/order/ticket/submit/",
};

export { SystemApis, SightApis, AccountsApis,OrderApis };
