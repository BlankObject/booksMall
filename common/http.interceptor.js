// config = {
// 	baseUrl: '', // 请求的本域名
// 	method: 'POST',
// 	// 设置为json，返回后会对数据进行一次JSON.parse()
// 	dataType: 'json',
// 	showLoading: true, // 是否显示请求中的loading
// 	loadingText: '请求中...', // 请求loading中的文字提示
// 	loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
// 	originalData: false, // 是否在拦截器中返回服务端的原始数据
// 	loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
// 	// 配置请求头信息
// 	header: {
// 		'content-type': 'application/json;charset=UTF-8'
// 	},
// }
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'https://api.shop.eduwork.cn',
		loadingText: '努力加载中~',
		loadingTime: 800,
		originalData: true,
		header: {
		 		'content-type': 'application/json;charset=UTF-8'
		},
		// 设置自定义头部content-type
		// header: {
		// 	'content-type': 'xxx'
		// }
		// ......
	});
	//请求拦截
	Vue.prototype.$u.http.interceptor.request = (config) => {
		const token = uni.getStorageSync('token');
	    // console.log(token)
		config.header.Authorization ="Bearer "+token
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		if(config.url == '/auth/login') config.header.noToken = true;
		// 最后需要将config进行return
		return config;
	}
	// //响应拦截
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// console.log(res.code)
		if(res.statusCode == 200) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			return res.data;
		} else if(res.statusCode == 201||res.statusCode==204) {
			return res;
		}else if(res.statusCode==401){
			// 假设201为token失效，这里跳转登录
			vm.$u.toast('验证失败，请重新登录');
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
				vm.$u.route('/pages/login/login')
			}, 1500)
			//创建成功
			return res
		}
		 else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	}
	
	//增加patch请求
	vm.$u.patch=(url,params={})=>{
		const _params={
			...params,
			_method:'PATCH'
		}
		return vm.$u.post(url,_params)
	}
}

export default {
	install
}