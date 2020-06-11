// pages/category/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenu:[],
    //右侧
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  },
  
  //接口返回数据
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断本地存储中有没有旧的数据
    //没有就重新发
    //有就用本地的
    const Cates=wx.getStorageSync("cates")
    if(!Cates){
    this.getCates()
    }else{
      if(Date.now()-Cates.time>1000*60){
        this.getCates()
      }else{
      this.setData({
        leftMenu:Cates.data.map(item=>{
          return item.cat_name
        }),
        rightContent:Cates.data[this.data.currentIndex].children
      })
      }
    }
  },
  //获取分类数据
  async getCates(){
    // request({
    //   url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
    // }).then(res=>{
    //   this.Cates=res.data.message
    //   //把接口数据存到本地存储
    //   wx.setStorageSync("cates", {
    //     time:Date.now(),
    //     data:this.Cates
    //   })
    //   //构造左侧大菜单
    //   let left=this.Cates.map(item=>{
    //     return item.cat_name
    //   })
    //   //构造右侧商品数据
    //   let right=this.Cates[this.data.currentIndex].children//这个右侧的数据根据index来改变
    //   // 设置设置数据
    //   this.setData({
    //     leftMenu:left,
    //     rightContent:right
    //   })
    // })
    //1.使用es7的async 和await发送异步请求
    const res=await request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
    })
       this.Cates=res.data.message
      //把接口数据存到本地存储
      wx.setStorageSync("cates", {
        time:Date.now(),
        data:this.Cates
      })
      //构造左侧大菜单
      let left=this.Cates.map(item=>{
        return item.cat_name
      })
      //构造右侧商品数据
      let right=this.Cates[this.data.currentIndex].children//这个右侧的数据根据index来改变
      // 设置设置数据
      this.setData({
        leftMenu:left,
        rightContent:right
      })

  },
  changeIndex(options){
    //console.log(options)
    const index=options.currentTarget.dataset.index
    let right=this.Cates[index].children//这个右侧的数据根据index来改变
    this.setData({
      currentIndex:index,
      rightContent:right,
          //重新设置右侧
       scrollTop:0

    })


  }
})