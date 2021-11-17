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
						<image mode="aspectFill" :src="item.images" />
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<view class="title-wrap info">
							<text class="title u-line-1">{{ item.title }}</text>
							<view class="u-m-t-20">
								<u-number-box :step="1"></u-number-box>
							</view>
							<view class="u-m-t-20">
								¥520
							</view>
						</view>
						<view class="u-m-l-40 u-m-t-65">
							<u-radio-group v-model="selectValue" size='50'>
								<u-radio active-color='#008c8c' :name='index' @change='change'></u-radio>
							</u-radio-group>
						</view>
					</view>
				</u-swipe-action>
				<view class="">
					hello
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import user from '../../utils/user.js'
	export default {
		data() {
			return {
				list: [{
						id: 1,
						title: 'hello',
						images: '../../static/109951165817048673.jpg',
						show: false
					},
					{
						id: 2,
						title: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
						images: '../../static/109951165817048673.jpg',
						show: false
					},
					{
						id: 3,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: '../../static/109951165817048673.jpg',
						show: false,
					},
					{
						id: 4,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: '../../static/109951165817048673.jpg',
						show: false,
					}, {
						id: 5,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: '../../static/109951165817048673.jpg',
						show: false,
					},
					{
						id: 6,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: '../../static/109951165817048673.jpg',
						show: false,
					}, {
						id: 7,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: '../../static/109951165817048673.jpg',
						show: false,
					}
				],
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
				selectValue: 0
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
			getCarList(){
				this.$u.api.getCartList().then(res=>{
					console.log(res)
				})
			},
			change(name) {
				console.log(name)
				console.log(this.selectValue)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;

		.title {
			margin-top: 30rpx;
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
			height: 950rpx;
		}

		.goods {
			border: 0.5px solid #ddd;
			padding-top: 30rpx;

			.item {
				display: flex;
				padding: 20rpx;

				.info {
					padding-top: 0;
					margin-top: -25rpx;
					// padding: 0;
					margin-left: 0;
					padding-right: 30rpx;
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

	}
</style>
