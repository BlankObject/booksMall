const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	
	//首页商品数据
	//请求默认数据
	let getSlides = (params = {}) => vm.$u.get('/api/index', params);
	//请求sort和分页数据
	let getSortGoods=(key,index)=>vm.$u.get(`/api/index?${key}=${index}`) //接口有点问题
	// let getSortGoods1=(par)=>vm.$u.get(`/api/index`,par)
	//获取商品详情数据和分类数据
	let getGoodsDetail=(id)=>vm.$u.get(`/api/goods/${id}`)
	let getGoodsDetail1=(par)=>vm.$u.get(`/api/goods`,par)
	//用户收藏商品
	let collectGoods=(id)=>vm.$u.post(`/api/collects/goods/${id}`)
	//获取收藏列表
	let getCollectList=()=>vm.$u.get(`/api/collects`)
	
	
	
	//购物车
	//购物车列表
	let getCartList=()=>vm.$u.get(`/api/carts?include=goods`)
	
	//user数据
	//登录
	let userLogin=(user)=>vm.$u.post(`/api/auth/login`,user)
	//获取用户数据
	let getUserData=()=>vm.$u.get(`/api/user`)
	
	
	/**
	 * 地址数据
	 */
	let getAddressList=()=>vm.$u.get(`/api/address`)
	//增加地址
	let setAddress=(data)=>vm.$u.post(`/api/address`,data)
	//获取地址详情
	let getAddressODetail=(id)=>vm.$u.get(`/api/address/${id}`)
	//更新地址
	let updateAddressODetail=(id,data)=>vm.$u.put(`/api/address/${id}`,data)
	
	/**
	 * 订单列表数据
	 * 获取列表数据
	 */
	let getOrderList=(str)=>vm.$u.get(`/api/orders?include=${str}`)
	// let getOrder=(str)=>vm.$u.get(`/api/orders?status=5`)
	//订单详情
	let getOrderDetail=(id)=>vm.$u.get(`/api/orders/${id}`)
	
	
	/**
	 * 用户信息更新
	 */
	//获取上传头像token
	let getOssToken=()=>vm.$u.get(`/api/auth/oss/token`)
	//请求更新头像
	let updateTitleImg=(key)=>vm.$u.post(`/api/user/avatar`,{...key,_method:'PATCH'}) //patch
	//更新用户昵称
	let updateName=(name)=>vm.$u.put(`/api/user`,{name})
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {getSlides, getSortGoods,userLogin,getUserData,getGoodsDetail,collectGoods,getCartList,getGoodsDetail1,getOrderList,
	getOrderDetail,getCollectList,getAddressList,setAddress,getAddressODetail,updateAddressODetail,getOssToken,updateTitleImg,updateName,
	getCartList
	}
}

export default{
	install
}