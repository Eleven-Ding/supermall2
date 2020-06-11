// pages/goods_detail/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsobj:{}
  },
   Goods:{},
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id)
  },
  //获取商品详情数据
  async getGoodsDetail(goods_id){
    const res=await request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
      data:{
        goods_id:goods_id,
      }
    })
    this.Goods=res.data.message
    this.setData({
      goodsobj:res.data.message,
    })
  },
  handlePreview(){
    const url=this.data.goodsobj.pics.map(v=>v.pics_mid)
    wx.previewImage({
      urls: url,
      current:url[0]
    })
  }, 
  handleCartAdd(){

    console.log('加入')
    //获取缓存中的购物车数组
    let cart=wx.getStorageSync("cart")||[];
    //判断是否存在与购物车中
    console.log(cart)
    let index=cart.findIndex(v=>v.goods_id===this.Goods.goods_id)
    if(index===-1){
      //第一次添加
      this.Goods.num=1
      this.Goods.checked=true
      cart.push(this.Goods)
    }else{
      cart[index].num++
    }
    //重新添加
    wx.setStorageSync("cart", cart)
    wx.showToast({
      title: '添加成功',
      icon:"success",
      mask:true,
      duration:500
    })
  }
})