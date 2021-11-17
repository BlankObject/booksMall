<template>
	<view class="container">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<u-dropdown ref="uDropdown" border-radius='20'>
					<u-dropdown-item v-model="value1" title="宝贝状态">
						<view class="slot-content color">
								<view class="u-text-center u-content-color u-m-t-20 u-m-b-20 boxs">
									<view class="box" v-for="(item,index) in stateList" :key="index">
										{{item.text}}
									</view>
								</view>
								<u-button type="primary" @click="closeDropdown" class="">确定</u-button>
						</view>
					</u-dropdown-item>
					<u-dropdown-item v-model="value2" title="收藏时间">
						<view class="slot-content color">
								<view class="u-text-center u-content-color u-m-t-20 u-m-b-20 boxs">
									<view class="box" v-for="(item,index) in time" :key="index">
										{{item.text}}
									</view>
								</view>
								<u-button type="primary" @click="closeDropdown" class="">确定</u-button>
						</view>
					</u-dropdown-item>
					<u-dropdown-item v-model="value3" title="全部分类">
						<view class="slot-content color">
								<view class="u-text-center u-content-color u-m-t-20 u-m-b-20 boxs">
									<view class="box" v-for="(item,index) in stateList" :key="index">
										{{item.text}}
									</view>
								</view>
								<u-button type="primary" @click="closeDropdown" class="">确定</u-button>
						</view>
					</u-dropdown-item>
		</u-dropdown>
		<view class="goods-box" v-for="item in 8">
			<view class="item">
				<view class="left">
					<image src="../../static/109951165817048673.jpg" mode="" class="img"></image>
				</view>
				<view class="right">
					<text class="u-line-2 title">
							hello hello hello hello hello hello hello hellohello hello hello hello hello hello hello hello
					</text>
					<view class="u-m-t-15 collect">
							5万+人收藏
					</view>
					<view class="u-m-t-10 price">
						¥ <text class="int"> 520</text>.<text class="decimal">1314</text>
					</view>
					<view class="btn">
						<u-button type="info" size="mini">找相似</u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						name: '宝贝'
					}, {
						name: '图文'
					}, {
						name: '视频',
						// count: 5
					},{
						name:'话题'
					},{
						name:'清单'
					}
				],
				current:0,
				value1:'',
				value2:'',
				value3:'',
				stateList:[{
					text:'有优惠'
					},{
						text:'低库存'
					},
					{
						text:'失效'
					},{
						text:'已买过'
					},
				],
				time:[{
					text:'7天内'
					},{
						text:'30天内'
					},
					{
						text:'90天内'
					},{
						text:'半年前'
					},
					{
						text:'一年前'
					}
				]
			}
		},
		onLoad() {
			this.$u.api.getCollectList().then(res=>{
				console.log(res)
			})
		},
		methods: {
			change(index){
				this.current=index
			},
			closeDropdown() {
				this.$refs.uDropdown.close();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		.color{
			// background-color: red;
			.boxs{
				padding-left: 56rpx;
				// padding-right: 50rpx;
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				
				.box{
					width: 200rpx;
					height: 80rpx;
					background-color: #2979ff;
					color: white;
					text-align: center;
					line-height: 75rpx;
					// margin: 10rpx;
					// margin-left: 50rpx;
					margin-right: 20rpx;
					border-radius: 20rpx;
					font-size: 25rpx;
					margin-bottom: 25rpx;
				}
				.box:last-child{
					margin-right: 0;
				}
			}
		}
		.goods-box{
			width: 100%;
			margin-top: 10rpx;
			.item{
				width: 100%;
				height: 285rpx;
				padding: 10rpx;
				display: flex;
				justify-content: space-around;
				.left{
					width: 38%;
					height: 100%;
					.img{
						border-radius: 20rpx;
						width: 100%;
						height: 100%;
					}
				}
				.right{
					width: 60%;
					margin-left: 20rpx;
					.title{
						font-size: 28rpx;
						font-weight: 600;
						line-height: 45rpx;
					}
					.collect{
						color: #888888;
					}
					.price{
						font-size: 25rpx;
						color: #F40;
					}
					.int{
						font-size: 35rpx;
					}
					.btn{
						float: right;
					}
				}
			}
		}
	}
</style>
