export const  request=(config)=>{

  return new Promise((resolve,reject)=>{
    wx.request({
      ...config,
      success:(res)=>{
        resolve(res)
      },
      fail:(res)=>{
        reject(res)
      }
    })
  })
}