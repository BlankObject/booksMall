<template>
	<view>
		<u-row gutter="16">
			<u-col span="6" v-for="(item,index) in goodsList.length!==0?goodsList:30">
			<navigator class="goods-item" :url="'/pages/detail/detail?goodsId='+item.id">
					<view class="u-p-l-10">
						<u-image width="100%" height="300rpx" :src="item.cover_url"></u-image>
						<view class="title u-line-1">{{item.title}}</view>
					</view>
					<view class="u-flex u-row-between u-p-l-20 u-p-r-20 u-p-b-5">
						<view class="price">¥ {{item.price}}</view>
						<view class="sales u-line-1">销量：{{item.sales}}+</view>
					</view>
			</navigator>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		name:"goods-demo",
		props:{
			goodsList:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item{
		width: 100%;
		border-radius: 13rpx;
		// padding: 10rpx;
		margin-bottom:20rpx;
		box-shadow: 0 12rpx 20rpx 0 rgba(0,0,0,0.1);
		.title{
			padding-left: 20rpx;
			color: black;
			margin-top: 10rpx;
			font-size: 30rpx;
			font-weight: 600;
		}
		.price{
			color: red;
			width: 40%;
			font-size: 20rpx;
		}
		.sales{
			width: 40%;
			font-size: 10rpx;
		}
	}
</style>
