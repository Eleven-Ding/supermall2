// pages/auth/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {

  },
  async handleGetUserInfo(e){
    //console.log(e)
    //获取用户信息
    const {encryptedData,rawData,iv,signature}=e.detail
    //获取小程序登录成功后的code
    let code=""
    wx.login({
      success:res=>{
         code=res.code
   
        //获取token
      } 
    })
    const loginParams={encryptedData,rawData,iv,signature,code}
    const res=await request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin",
      data:loginParams,
      method:"post"
    })
    //在这里删除缓存中的支付的商品
    let newCart=wx.getStorageSync('cart').filter(v=>!v.checked)
    wx.setStorageSync("cart",newCart)
    wx.showToast({ 
      title: '支付成功',
    })
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/cart/index',
      })
    }, 1000);

  }
}) 