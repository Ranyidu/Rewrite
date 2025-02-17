/*************************************

项目名称：美图秀秀 解锁SVIP
下载地址：https://t.cn/AiN3YLHl
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/((h5|api)\.xiuxiu|api-sub|api\.posters)\.meitu\.com\/.+\/(vip|user|h\d|center|home) url script-response-body https://raw.githubusercontent.com/Ranyidu/Rewrite/main/mtxx.js

[mitm]
hostname = *.xiuxiu.meitu.com, api.posters.meitu.com, api-sub.meitu.com

*************************************/


var body = JSON.parse($response.body);
const hysj = '/vip/prompt/query.json';
const hyxx = '/vip/vip_show.json';
const user = '/user/show.json';
const hyzl = '/vip/new_sub_detail.json';
const hymb = '/vip/vip_navigation.json';
const group = '/user/vip_info_by_group.json';
const vip = '/center/user_info.json';
const sjs = '/user/info_by_entrance.json';
const sjshf = '/home/home.json';
const kta = 'https://api.posters.meitu.com/center/user_rights.json';
const ktb = 'https://api.posters.meitu.com/center/user_rights_consume.json';


if ($request.url.indexOf(hysj) != -1){
  body.data = {
    "home_btn_prompt" : "立即查看",
    "if_transfer" : 0,
    "pay_interval" : 3000,
    "beautify_prompt" : "",
    "home_prompt" : "会员有效期至2099/09/09",
    "svip_bubble_text" : "粉钻SVIP：有效期至2099/09/09\n粉钻VIP：有效期至2099/09/99",
    "beautify_btn_prompt" : "",
    "request_time" : 1666666666666
  };
}

if ($request.url.indexOf(hyxx) != -1){
  body.data = {
    "id": "666666666666666666",
    "id_str": "666666666666666666",
    "valid_time": 4092599349,
    "uid" : 1666666666,
    "sub_type": 3,
    "expire_days": -66666,
    "screen_name": "",
    "avatar_url": "",
    "in_valid_time": 4092599349,
    "gid": 1234567890,
    "s": 1,
    "vip_type": 101,
    "platform": 2,
    "sub_name": "包年",
    "renew": 2,
    "is_valid_user": 1,
    "create_time": 1666666666,
    "sub_biz_type": 1,
    "is_expire": 0,
    "in_valid_time" : 4092599349
  };
}

if ($request.url.indexOf(user) != -1){
  body.data.vip_type = 101;
  body.data.vip_icon = "https://xximg1.meitudata.com/6948531747980333892.png";
  body.data.follower_count = 999000;
  body.data.fan_count = 999000;
  body.data.be_like_count = 999000;
}

if ($request.url.indexOf(hyzl) != -1){
  delete body.data.materials;
  delete body.data.prices;
  delete body.data.new_version_rotograms;
  body.data.vip_sign_info = {
      "sub_type" : 3,
      "renew_status" : 1,
      "show_auto_renew" : 1,
      "next_withhold_amount" : 16800,
      "withhold_currency_symbol" : "¥",
      "next_withhold_date" : "2099-09-09",
      "pay_channel" : "苹果支付",
      "do_pop_up" : false
    };
  body.data.vip_power_num = 999999;
  body.data.new_power_num = 999999;
  body.data.welfare_center_num = 999999;
  body.data.exchange_vip = 0;
  body.data.platform = 2;
  body.data.renew = 1;
  body.data.is_new_vipsub = 0;
  body.data.s = 1;
  body.data.expire_days = -66666;
  body.data.sub_type = 3;
  body.data.old_vip_type = 4;
  body.data.valid_time = 4092599349;
  body.data.invalid_time = 4092599349;
  body.data.is_expire = 0;
  body.data.rights_page_vip_btn_title = "立即解锁";
  body.data.rights_page_svip_btn_title = "立即解锁";
  body.data.hbp_vip = {
      "sub_type" : 3,
      "valid_time" : 4092599349,
      "renew" : 1,
      "expire_days" : -66666,
      "is_expire" : 0,
      "in_valid_time" : 4092599349,
      "s" : 0
    };
  body.data.sub_biz_type = 1;
  body.data.vip_type = 101;
  body.data.xx_vip = {
      "sub_type" : 3,
      "valid_time" : 4092599349,
      "renew" : 1,
      "expire_days" : -66666,
      "is_expire" : 0,
      "in_valid_time" : 4092599349,
      "s" : 0
    };
}

if ($request.url.indexOf(hymb) != -1){
  delete body.data.rights;
  delete body.data.navigation_card_list;
  delete body.data.config_list;
  delete body.data.pendant;
  body.data.vip_type = 101;
  body.data.display_vip_time = 1;
  body.data.display_vip_type = 2;
  body.data.hbp_vip = {
      "id" : "666666666666666666",
      "id_str" : "666666666666666666",
      "valid_time" : 4092599349,
      "uid" : 1666666666,
      "sub_type" : 3,
      "sub_biz_type" : 1,
      "avatar_url" : "",
      "is_expire" : 0,
      "expire_days" : -66666,
      "gid" : 1234567890,
      "vip_type" : 101,
      "platform" : 2,
      "sub_name" : "包年",
      "renew" : 2,
      "s" : 0,
      "is_valid_user" : 1,
      "create_time" : 1666666666,
      "screen_name" : "",
      "in_valid_time" : 4092599349
    };
body.data.xx_vip = {
      "id" : "666666666666666666",
      "id_str" : "666666666666666666",
      "valid_time" : 4092599349,
      "uid" : 1666666666,
      "sub_type" : 3,
      "sub_biz_type" : 1,
      "avatar_url" : "",
      "is_expire" : 0,
      "expire_days" : -66666,
      "gid" : 1234567890,
      "vip_type" : 101,
      "platform" : 2,
      "sub_name" : "包年",
      "renew" : 2,
      "s" : 0,
      "is_valid_user" : 1,
      "create_time" : 1666666666,
      "screen_name" : "",
      "in_valid_time" : 4092599349
   };
}

if ($request.url.indexOf(group) != -1){
  body.data = {
    "active_sub_type" : 2,
    "account_type" : 1,
    "sub_type_name" : "续期",
    "active_sub_order_id" : "666666666666666666",
    "trial_period_invalid_time" : "4092599349000",
    "current_order_invalid_time" : "4092599349000",
    "active_order_id" : "666666666666666666",
    "limit_type" : 0,
    "active_sub_type_name" : "续期",
    "use_vip" : true,
    "have_valid_contract" : false,
    "derive_type_name" : "普通会员",
    "derive_type" : 1,
    "in_trial_period" : true,
    "is_vip" : true,
    "membership" : {
      "id" : "7",
      "display_name" : "",
      "level" : 2,
      "level_name" : "高级会员"
    },
    "active_promotion_status_list" : [
      2,
      6
    ],
    "sub_type" : 3,
    "account_id" : "1666666666",
    "invalid_time" : "4092599349000",
    "valid_time" : "4092599349000",
    "active_product_id" : "0",
    "active_promotion_status" : 2,
    "show_renew_flag" : false
  };
}

if ($request.url.indexOf(vip) != -1){
  body.data.vip_end_time = 4092599349;
  body.data.is_vip = true;
}

if ($request.url.indexOf(sjs) != -1){
  body.data = {
    "vip_info" : {
      "active_sub_type" : 2,
      "account_type" : 1,
      "sub_type_name" : "续期",
      "active_sub_order_id" : "666666666666666666",
    "trial_period_invalid_time" : "4092599349000",
    "current_order_invalid_time" : "4092599349000",
      "active_order_id" : "666666666666666666",
      "limit_type" : 0,
      "active_sub_type_name" : "续期",
      "use_vip" : true,
      "have_valid_contract" : false,
      "derive_type_name" : "普通会员",
      "derive_type" : 1,
      "in_trial_period" : true,
      "is_vip" : true,
      "membership" : {
        "id" : "7",
        "display_name" : "",
        "level" : 2,
        "level_name" : "高级会员"
      },
      "active_promotion_status_list" : [
        2,
        6
      ],
      "sub_type" : 3,
      "account_id" : "1666666666",
      "invalid_time" : "4092599349000",
      "valid_time" : "4092599349000",
      "active_product_id" : "0",
      "active_promotion_status" : 2,
      "show_renew_flag" : false
    },
    "account_type" : 1,
    "account_id" : "1666666666",
    "rights_info" : [
      {
        "show_tips" : "抠图剩余张数：9999999 张 >",
        "commodity_unit" : "2",
        "link_words" : "9999999 张 >",
        "commodity_id" : "shejishi.cutout",
        "commodity_count" : 9999999
      }
    ]
  };
}

if ($request.url.indexOf(sjshf) != -1){
  delete body.data.banner;
}

if ($request.url.indexOf(kta) != -1){
  body.data = {
    "cutout" : {
      "num_left" : 9999999
    }
  };
}

if ($request.url.indexOf(ktb) != -1){
  body.data = {
    "consume_result" : true
  };  
}

$done({body : JSON.stringify(body)});
