<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" v-model='name' placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="text" v-model="phone" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<input disabled type="text" placeholder-class="line" :placeholder="citys?citys:'省市区县、乡镇等'" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea type="text" v-model="address" placeholder-class="line" placeholder="街道、楼牌等" />
			</view>
			<!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="bottom">
			<!-- <view class="tag">
				<view class="left">标签</view>
				<view class="right">
					<text class="tags">家</text>
					<text class="tags">公司</text>
					<text class="tags">学校</text>
					<view class="tags plus"><u-icon size="22" name="plus"></u-icon></view>
				</view>
			</view> -->
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right"><switch color="red" :checked='default1' @change="setDefault" /></view>
			</view>
			<u-button type="primary" shape="square" :ripple="true" :custom-style="customStyle" @click='save'>save</u-button>
		</view>
		<u-picker mode="region" ref="uPicker" v-model="show" :params="params" @confirm="confirm"/>
	</view>
</template>

<script>
export default {
	name:'addSite',
	data() {
		return {
			show: false,
			name:'',
			phone:'',
			address:'',
			province:'',
			city:'',
			citys:'',
			area:'',
			is_default:0,
			default1:false,//默认布尔值false
			customStyle: {
				marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
				width:'300rpx'
			},
			params:{
				province: true,
				city: true,
				area: true
			},
			id:'',//更新地址携带的参数id
		};
	},
	onLoad(option) {
		// //把上次可能遗留的数据清空
		// this.id=''
		// this.name=''
		// this.phone=''
		// this.address=''
		// this.city=''
		// this.province=''
		// this.area=''
		// this.is_default=0
		console.log(option)
		if(option.id){
			this.id=option.id
			this.$u.api.getAddressODetail(option.id).then(res=>{
				console.log(res)
				this.name=res.name
				this.phone=res.phone
				this.address=res.address
				this.city=res.city
				this.province=res.province
				this.area=res.county
				this.is_default=res.is_default
				this.citys=res.province+res.city+res.county
				this.default1=res.is_default==1?true:false
				//console.log(this.default1)
			})
		}
	},
	methods: {
		setDefault(curr) {
			this.is_default=curr.detail.value?1:0
		},
		showRegionPicker() { 
			this.show = true;
		},
		confirm(value){
			console.log(value)
			this.city=value
			this.province=value.province.label
			this.city=value.city.label
			this.area=value.area.label
			this.citys=value.province.label+value.city.label+value.area.label
		},
		async save(){
			if(this.name.trim()&&this.phone.trim()&&this.address.trim()&&this.province.trim()
			&&this.city.trim()&&this.area.trim()){
				let data={
					name:this.name,
					phone:this.phone,
					address:this.address,
					province:this.province,
					city:this.city,
					county:this.area,
					is_default:this.is_default
				}
				if(this.id){
					this.$u.api.updateAddressODetail(this.id,data).then(res=>{
						if(res.statusCode==204){
							uni.showToast({
								title:'地址修改成功',
								icon:'none'
							})
							this.id=''
							this.name=''
							this.phone=''
							this.address=''
							this.city=''
							this.province=''
							this.area=''
							this.is_default=0
							setTimeout(()=>{
								this.$u.route({
									type:'navigateBack'
								})
							},1000)
						}
					}).catch()
				}else{
					const result=await this.$u.api.setAddress(data)
					if(result.statusCode==201){
						uni.showToast({
							title:'地址新增成功',
							icon:'none'
						})
						this.name=''
						this.phone=''
						this.address=''
						this.city=''
						this.province=''
						this.area=''
						this.is_default=0
					}else{
						uni.showToast({
							title:'地址保存失败，请重试',
							icon:'none'
						})
					}
				}
			}else{
				uni.showToast({
					title:'请先填写完信息',
					icon:'none'
				})
			}
		}
	}
};
</script>

<style lang="scss" scoped>
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.wrap {
	background-color: #f2f2f2;
	border-radius: 15rpx;
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
			}
		}
		
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		border-radius: 15rpx;
		margin-top: 20rpx;
		padding: 40rpx;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
}
</style>
