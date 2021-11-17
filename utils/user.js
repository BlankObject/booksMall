export default{
	//把手机号码中间四位替换星号
	hiddenPhone(phone){
		return phone.toString().replace(/^(\d{3})\d*(\d{4})$/,'$1****$2')
	},
	//判断用户是否登录
	isUserLogin(){
		if(!uni.getStorageSync('token')){
			uni.showToast({
				title:'请先登录',
				icon:'none'
			})
			let result=getCurrentPages()
			// console.log(result)
			let len=result.length-1
			uni.setStorageSync('page',result[len].route)
			setTimeout(()=>{
				uni.redirectTo({
					url:'/pages/login/login',
				})
			},1500)
		}
	}
}