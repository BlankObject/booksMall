<template>
	<view class="container">
		<view class="title">
			<view class="text">The shopping cart</view>
			<view class="total">
				Total 5 item
			</view>
		</view>
		<view class="goods u-m-t-20">
			<scroll-view scroll-y="true" class="height">
				<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.id"
					@click="click" @open="open" :options="options" class="">
					<view class="item u-border-bottom">
						<image mode="aspectFill" :src="item.goods?item.goods.cover_url:''" />
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<view class="title-wrap info">
							<text class="title u-line-1">{{ item.goods?item.goods.title:'' }}</text>
							<view class="u-m-t-20">
								<u-number-box :step="1" v-model='item.num'></u-number-box>
							</view>
							<view class="u-m-t-20 price">
								¥{{ item.goods.price}}
							</view>
						</view>
						<view class="u-m-l-40 u-m-t-65">
							<u-radio-group v-model="item.checked" size='50' @click.native='change(index)'>
								<u-radio active-color='#008c8c'></u-radio>
							</u-radio-group>
						</view>
					</view>
				</u-swipe-action>
			</scroll-view>
		</view>
		<view class="u-m-t-30 floor">
			<view class="price">
				<view class="left">
					Price
				</view>
				<view class="right">
					¥520
				</view>
			</view>
			<view class="freight">
				<view class="left">
					Freight
				</view>
				<view class="right">
					1314
				</view>
			</view>
		</view>

		<view class="u-m-t-20 floor-2">
			<view class="total">
				<view class="">
					Total
				</view>
				<view class="">
					¥520
				</view>
			</view>
			<view class="">
				<view class="btn"><text>PROCEED</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import user from '../../utils/user.js'
	export default {
		data() {
			return {
				list: [],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
						text: '收藏',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				selectValue: 0,
				price: '',
				total: '',
				freight: ''
			}
		},
		onLoad() {
			this.getCarList()
		},
		onShow() {
			//获取当前页面栈 最后一页就是当前页面
			// console.log(result)
			//如果没有登录就重定向到登录页面
			user.isUserLogin()
		},
		methods: {
			getCarList() {
				this.$u.api.getCartList().then(res => {
					res.data.forEach(item=>{
						item.checked=item.is_checked
					})
					this.list = res.data
				})
			},
			async change(i) {
				let indexData = []
				let is_checked = this.list[i].is_checked
				console.log(is_checked)
				this.list.forEach((item,index) => {
					if (is_checked) {
						console.log(is_checked)
						if (i !== index && item.is_checked) {
							indexData.push(item.id)
						}
					} else {
						console.log(i)
						if (i==index||item.is_checked) {
							indexData.push(item.id)
						}
					}
					console.log(this.list[i])
				})
				console.log(indexData)
				const result=await this.$u.api.selectCar(indexData)
				if(result.statusCode==204){
					await this.getCarList()
				}
				console.log(this.list)
			},
			open(e) {
				console.log(e)
			},
			click(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.container {
		width: 100%;
		height: 100%;

		.title {
			margin-top: 10rpx;
			padding-left: 40rpx;

			.text {
				font-size: 50rpx;
				font-weight: 700;
				margin-bottom: 15rpx;
			}

			.total {
				font-size: 30rpx;
				font-size: 550;
			}
		}

		.height {
			height: 47vh;
		}

		.goods {
			border: 0.5px solid #ddd;
			padding-top: 30rpx;

			.item {
				display: flex;
				padding: 20rpx;

				.info {
					padding-top: 0;
					margin-top: -15rpx;
					// padding: 0;
					margin-left: 10rpx;
					padding-right: 30rpx;

					.price {
						font-weight: 600;
					}
				}
			}

			image {
				width: 180rpx;
				flex: 0 0 180rpx;
				height: 190rpx;
				margin-right: 20rpx;
				border-radius: 12rpx;
			}

			.title {
				display: inline-block;
				width: 360rpx;
				height: 40rpx;
				text-align: left;
				font-size: 28rpx;
				color: $u-content-color;
				margin-top: 20rpx;
				padding-left: 0;
			}
		}

		.floor {
			padding: 0 40rpx;
			border-bottom: 0.5px solid #ddd;

			.price,
			.freight {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;
			}
		}

		.floor-2 {
			margin-top: 30rpx;
			width: 100%;
			position: fixed;
			padding: 0 40rpx;
			bottom: 130rpx;

			.total {
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;
				font-size: 30rpx;
				font-weight: 600;
			}

			.btn {
				color: white;
				width: 98%;
				height: 90rpx;
				background-color: #333;
				border-radius: 40rpx;
				text-align: center;
				line-height: 90rpx;
				margin: 0 auto;
			}
		}
	}
</style>
