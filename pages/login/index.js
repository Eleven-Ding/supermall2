// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getUserInfo(e){
    console.log(e)
    const {userInfo}=e.detail
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack()
  }
})