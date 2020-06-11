// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    //判断有没有收货地址
    const address=wx.getStorageSync('address')
    //获取缓存中购物车数据
    const cart=wx.getStorageSync('cart').filter(v=>v.checked)
    //判断全选
    this.update()
    //赋值
    //计算全选
    this.setData({
      address,
      cart
    })
  },
  update(){
    const cart=wx.getStorageSync('cart')||[]
    let totalPrice=0
    let totalNum=0
    cart.forEach(element => {
      if(element.checked){
      totalPrice+=element.num*element.goods_price
      totalNum+=element.num
      }
    });
    this.setData({
      totalNum,
      totalPrice
    })
  },
  handleOrderpay(){
    //判断缓存中有没有token
    const token=wx.getStorageSync('token')  
    if(!token){//不存在
      //跳转到授权页面
      wx.navigateTo({
        url: '/pages/auth/index',
      })
    }else{
      console.log("存在token了")
    }
  }
})