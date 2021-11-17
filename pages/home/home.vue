<template>
	<view>
		<!-- <u-navbar :is-back="false" title="11111" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
				</view>
			</view>
		</u-navbar> -->
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" @click="login">
			<view class="u-m-r-20">
				<u-avatar :src="userData.avatar_url" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userData.name?userData.name:'null'}}</view>
				<view class="u-font-14 u-tips-color">邮箱号:{{userData.email?userData.email:'null'}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<!-- <u-icon name="scan" color="#969799" size="28"></u-icon> -->
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="我的订单" @click="jump('/pages/order/order')"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="heart" title="个人信息" @click="jump('/pages/personal-info/personal-info')"></u-cell-item>
				<u-cell-item icon="star" title="商品收藏" @click="jump('/pages/collect-goods/collect-goods')"></u-cell-item>
				<u-cell-item icon="map" title="收货地址" @click="jump('/pages/address/address')"></u-cell-item>
				<u-cell-item icon="coupon" title="优惠卡券"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置" @click="jump('/pages/settings/settings')"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				show:true,
				userData:{}
			}
		},
		onLoad() {
			this.userData=uni.getStorageSync('userData')??{}
		},
		async onShow() {
			//获取用户信息
			const userData=await this.$u.api.getUserData()
			this.userData=userData
		},
		methods: {
			jump(url){
				this.$u.route({
					url,
				})
			},
			login(){
				let token=uni.getStorageSync('userData')
				if(!token){
					this.$u.route({
						url:'/pages/login/login'
					})
				}else{
					uni.showToast({
						title:'已登录，如要重新登录，请到设置',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
