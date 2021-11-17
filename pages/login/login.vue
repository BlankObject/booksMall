<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录图书城</view>
			<input class="u-border-bottom"  v-model="tel" placeholder="请输入邮箱号" />
			<!-- <view class="tips">未注册的手机号验证后自动创建美团账号</view> -->
			<input class="u-border-bottom rr" type="password" v-model="password" placeholder="请输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">邮箱注册</view>
				<view class="issue">遇到问题</view>
			</view>
		</view>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon"><u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
					微信
				</view>
				<view class="QQ item">
					<view class="icon"><u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
					QQ
				</view>
			</view>
			<view class="hint">
				登录代表同意
				<text class="link">用户协议、隐私政策，</text>
				并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
		<!-- 弹窗 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			tel: '',
			password:''
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.$u.test.email(this.tel)&&this.password) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	onShow() {
		// let result=getCurrentPages()
		// console.log(result)
	},
	methods: {
		async submit() {
			if(this.$u.test.email(this.tel)&&this.password.trim().length>0){
				const result=await this.$u.api.userLogin({
					email:this.tel,
					password:this.password
				})
				//缓存token
				uni.setStorageSync('token',result.access_token)
				//console.log(result)
				this.$refs.uToast.show({
					title: '登录成功',
					type: 'success'
				})
				//获取用户的数据
				const userData=await this.$u.api.getUserData()
				//console.log(userData)
				uni.setStorageSync('userData',userData)
				setTimeout(()=>{
					let page=uni.getStorageSync('page')
					console.log(page)
					if(page){
						uni.reLaunch({
							url:'/'+page
						})
					}else{
						uni.reLaunch({
							url:'/pages/index/index'
						})
					}
				},1000)
			}else{
				this.$refs.uToast.show({
					title: '账号或密码非法',
				 	type: 'warning'
				})
			}
		},
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;
		.rr{
			margin-top: 50rpx;
			margin-bottom: 60rpx;
		}
		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
