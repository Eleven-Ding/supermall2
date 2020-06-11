// pages/search/index.js
import {request} from '../../request/index'
Page({
  data: {
    goods:[]
  },
  Timeid:-1,
  onLoad: function (options) {

  },
  handleInput(e){
    //console.log(e)
    //获取输入框的值
    const  {value}=e.detail
    //判断合法性
    if(!value.trim()){
      return 
    }
    clearTimeout(this.Timeid)
    //发送请求获取数据
   //加防抖
   wx.showToast({
     title: '加载中...',
     icon:"loading",
     duration:900
   })
   this.Timeid=setTimeout(() => {
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",
      data:{
        query:value
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        goods:res.data.message
      })
    })
   }, 800);
  } ,
  clear(){
    this.setData({
      goods:[]
    })
  }
})