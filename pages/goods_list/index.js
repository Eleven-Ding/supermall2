// pages/goods_list/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,value:"综合",isSelect:true},
      {id:1,value:"销量",isSelect:false},
      {id:2,value:"价格",isSelect:false},
    ],
    goods:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },//接口要的参数
    totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //在这里获取cid

    this.QueryParams.cid=options.cid
    //发送异步请求
    this.getGoodsList()

  },
  handleItemTap(options){
    const {index}=options.detail
    //改变当前index的isSelect
    //修改原数组
    let {tabs}=this.data
    tabs.forEach((v,i)=>i===index?v.isSelect=true:v.isSelect=false)
    this.setData({
      tabs
    })
  },
  //获取商品列表数据
  async getGoodsList(){
    wx.showLoading({
      title: '加载中。。',
    })
      const res=await request({
        url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
        data:this.QueryParams
      })
      wx.hideLoading()
      //console.log(res)
      const total=res.data.message.total
      this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
      //console.log(res.data.message.goods)
      let pp=this.data.goods.concat(res.data.message.goods)
      
      this.setData({
        goods:pp
      })
  },
  onReachBottom(){
    //先判断有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
    wx.showToast({
      title: ' 到底了!     ',
      icon:"none"
    })
  }else{
    this.QueryParams.pagenum++
    this.getGoodsList()
  }

    //没有就提示

    //有就push进去
  },
  onPullDownRefresh(){
    console.log('加载中')
    //先把数组都清空
    this.setData({
      goods:[]
    })
    //把页数重置为1
    this.QueryParams.pagenum=1
    //重新发送请求
    this.getGoodsList()
    wx.stopPullDownRefresh()
  }
})