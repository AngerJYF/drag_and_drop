var config = {
  //oauth
  grant_type: "authorization_code",
  client_id: "elens-rbc",
  client_secret: "elens-rbc",
  redirect_uri: "http://101.254.159.164:5009/bjdiantai/index.html",
  login_url:"http://101.254.159.164:5009/bjdiantai_5600/oauth/authorize?client_id=elens-rbc&response_type=code&scope=all&redirect_uri=http://101.254.159.164:5009/bjdiantai/index.html",
  //用户相关 18088
  back_end:"http://101.254.159.164:5009/bjdiantai_5600",
  //资源服务
  back_end_user: "http://101.254.159.164:5009/bjdiantai_5700",
  // 填写staic文件的全路径  例如http://101.254.159.164:5009/bjdiantai_5600/staic
  // 线上需要t填写全路径
  json_url:'http://101.254.159.164:5009/bjdiantai/static',
  img_url:'/bjdiantai_5700',
  local_url:'/bjdiantai',
  home_url:'/',
  portrayal:'http://101.254.159.164:5009/rbc',//用户画像,
  login_out_url:'http://192.168.1.87:18088/auth/logout'//登出
}
window.OauthConfig = config;