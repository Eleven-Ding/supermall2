// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allchecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
  
    //判断有没有收货地址
    const address=wx.getStorageSync('address')
    //获取缓存中购物车数据
    const cart=wx.getStorageSync('cart')||[]
    //判断全选
    this.update()
    //赋值
    //计算全选
    let allchecked=false
    if(cart.length!==0)
     allchecked=cart.every(item=>{
      return item.checked
    }) 
    this.setData({
      address,
      cart,
      allchecked,
    })
  },
  //商品的选中 
   handleChange(e){
     //拿到被修改的商品对象
     const goods_id=e.currentTarget.dataset.id
     let {cart}=this.data
     //找到对象
     let index=cart.findIndex(v=>v.goods_id===goods_id)
     //根据索引来拿对象
     cart[index].checked=!cart[index].checked
     //存入储存
     this.setData({
       cart
     })
     wx.setStorageSync('cart', cart)
     this.update()

  } , 
  handleChoseAddress(){
    console.log('获取收货地址')
    //获取用户地址
    wx.chooseAddress({
      success:(result)=>{
        console.log(result) 
    //存储收获地址
      wx.setStorageSync("address",result)
      }
    })
  },
  update(){
    const cart=wx.getStorageSync('cart')||[]
    let allchecked=false
    if(cart.length!==0)
     allchecked=cart.every(item=>{
      return item.checked
    }) 
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
      totalPrice,
      allchecked
    })
  },
  handleAllcheck(){
    //先设置全选取反
    const allchecked=!this.data.allchecked
    this.setData({
      allchecked:allchecked
    })
    //把里面全部的改成false
    let {cart}=this.data
    cart=cart.map(v=>{
       v.checked=allchecked
       return v
    })
    //设置data
    this.setData({
      cart
    })
    //存入储存
    wx.setStorageSync('cart', cart)
    //重新计算
    this.update()
    
  },
  handleCount(e){
    const count=e.currentTarget.dataset.count
    const goods_id=e.currentTarget.dataset.id
    
    let {cart}=this.data
    //拿到对应的对
    let index=cart.findIndex(v=>v.goods_id===goods_id)
    //修改里面的num
    if(cart[index].num>1){//商品大于1个时 才可以随意加减
      cart[index].num+=parseInt(count)
    }else if(cart[index].num===1&&parseInt(count)===1){
      cart[index].num++
    }else if(cart[index].num===1&&parseInt(count)===-1){
      //弹出提示框 确认是否删除
      wx.showModal({
      title: '提示', 
      content: '确定删除吗？',
      success:  (sm)=> {
        if (sm.confirm) {
          cart.splice(index,1)
          //更新数据
          this.setData({
            cart
          })
          wx.setStorageSync('cart', cart)
          //更新底部
          this.update()
      
          } else if (sm.cancel) {
            console.log('用户点击取消') 
          }
        }
      })
    }

     
    //存入data
    this.setData({
      cart
    })
    //存入储存
    wx.setStorageSync('cart', cart)
    //更新底部
    this.update()

  },
  pay(){
    //有没有地址信息
    const address=wx.getStorageSync('address')||[]
    //console.log(address)
    const {cart}=this.data
    if(!address.userName){
      wx.showToast({
        title: '请填写地址信息!',
        icon:"none"
      })
    }else if(!this.data.totalNum){
      wx.showToast({
        title: '没选商品，你买锤子',
        icon:"none"
      })
    }else{
      //跳转到支付界面
      wx.navigateTo({
        url: '/pages/pay/index',
      })
    }

    
    //有没有商品
  }

})