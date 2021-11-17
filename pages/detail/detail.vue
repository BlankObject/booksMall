<template>
	<view class="container u-skeleton">
		<view class="img">
			<image :src="detailData.goods?detailData.goods.cover_url:''" class="imgitem u-skeleton-fillet"></image>
		</view>
		<view class="title u-skeleton-fillet">
			<text>{{detailData.goods?detailData.goods.title:''}}</text>
		</view>
		<view class="info u-flex u-row-between">
			<view class="price u-skeleton-fillet">
				¥{{detailData.goods?detailData.goods.price:''}}
			</view>
			<view class="sales u-skeleton-fillet">
				销量：{{detailData.goods?detailData.goods.sales:''}}
			</view>
		</view>
		<u-tabs class="u-m-t-15 u-skeleton-fillet" :list="list" :offset="offset" :is-scroll="false" :current="current" font-size="33" @change="change"></u-tabs>
		
		<!-- 骨架屏静态内容 只为占位 -->
		<!-- <view class="test" v-show="loading">
			<view class="test1 u-skeleton-fillet">
				
			</view>
			<view class="test2 u-skeleton-fillet">
				
			</view>
			<view class="test3 u-skeleton-fillet">
				
			</view>
		</view> -->
		<!-- 商品详情 -->
		<goods-detail v-show="current==0" :details="detailData.goods?detailData.goods.details:''"></goods-detail>
		<!-- <view class="goods-detail" v-show='current==0'>
			<view class="" v-html="detailData.goods?detailData.goods.details:''">
				
			</view>
		</view> -->
		<!-- 评论 -->
		<goods-comments v-show="current==1"></goods-comments>
		<!-- <view class="comment" v-for="(res, index) in commentList" :key="res.id">
			<view class="left"><image :src="res.url" mode="aspectFill"></image></view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.name }}</view>
					<view class="like" :class="{ highlight: res.isLike }">
						<view class="num">{{ res.likeNum }}</view>
						<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
						<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
					</view>
				</view>
				<view class="content">{{ res.contentText }}</view>
				<view class="reply-box">
					<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
						<view class="username">{{ item.name }}</view>
						<view class="text">{{ item.contentStr }}</view>
					</view>
					<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
						共{{ res.allReply }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view>
				<view class="bottom">
					{{ res.date }}
					<view class="reply">回复</view>
				</view>
			</view>
		</view> -->
		
		<!-- 商品推荐 -->
		<view class="u-m-t-25 recommend" v-show="current==2">
			<goods-demo :goodsList="detailData?detailData.like_goods:[]"></goods-demo>
			<view class="info">
				<text>我是有底线的~~~</text>
			</view>
		</view>
		
		<view class="empty">
			
		</view>
		<!-- 提交订单栏 -->
		<view class="navigation">
			<view class="left">
				<view class="item">
					<u-icon name="star" @click="collection" :size="40" :color="collectionColor"></u-icon>
					<view class="text u-line-1">收藏</view>
				</view>
				<!-- <view class="item">
					<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">店铺</view>
				</view> -->
				<view class="item car">
					<u-badge class="car-num" :count="cartNum" type="error" :offset="[-5, -8]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
		
		<!-- 收藏提醒 -->
		<view>
			<u-toast ref="uToast" />
		</view>
		<u-skeleton :loading="false" :animation="true"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData:'',
				goodsId:'',//商品id
				list:[{
					name:'商品详情'
				},{
					name:'商品评论',
					count:100,
				},{
					name:'推荐商品'
				}],
				current:0,
				offset:[1,35],
				isCollection:'',//收藏状态
				// collection:['../../static/icon/收藏.png','../../static/icon/收藏light.png']
				commentList:[],
				loading: '',
				cartNum:'',//购物车商品个数
			}
		},
		onLoad(option) {
			this.loading = true;
			//获取商品详情数据
			// this.loading=false
			this.goodsId=option.goodsId*1
			this.$u.api.getGoodsDetail(option.goodsId*1).then(res=>{
				this.loading=false
				this.detailData=res
				console.log(this.detailData)
				this.list[1].count=res.goods.comments.length
				//获取收藏的状态
				this.isCollection=this.detailData.goods.is_collect
			})
			//获取购物车列表
			this.getCartList()
		},
		methods: {
			change(index){
				this.current=index
			},
			//收藏
			async collection(index){
				// console.log(index)
				const result=await this.$u.api.collectGoods(this.goodsId)
				if(result.statusCode===201){
					this.$refs.uToast.show({
						title: '收藏成功',
						type: 'success'
					})
					this.isCollection=1
				}else{
					this.$refs.uToast.show({
						title: '取消收藏',
						type: 'success'
					})
					this.isCollection=0
				}
			},
			//获取购物车列表商品个数
			async getCartList(){
				const result=await this.$u.api.getCartList()
				this.cartNum=result.data.reduce((pre,curr)=>{
					return pre+curr.num*1
				},0)
				console.log(this.cartNum)
				console.log(result)
			}
		},
		computed:{
			collectionColor(){
				return this.isCollection?'#fa3534':this.$u.color['contentColor']
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		.img{
			width: 100%;
			height: 400rpx;
			.imgitem{
				width: 50%;
				height: 400rpx;
				display: block;
				margin: auto;
			}
		}
		.title{
			margin-left: 20rpx;
			margin-right: 30rpx;
			margin-top: 10rpx;
			font-size: 35rpx;
			font-weight: 600;
		}
		.info{
			margin: 0 32rpx;
			margin-top: 20rpx;
			.price{
				width: 100rpx;
				color: red;
			}
		}
		
		//商品推荐
		.recommend .info{
			width: 100%;
			height: 100rpx;
			margin: 0 auto;
			text-align: center;
		}
		
		.empty{
			width: 100%;
			height: 50rpx;
		}
		//提交订单栏
		.navigation {
			width: 100%;
			position: fixed;
			bottom: 0;
			display: flex;
			margin-top: 100rpx;
			border: solid 2rpx #f2f2f2;
			background-color: #ffffff;
			padding: 16rpx 0;
			.left {
				display: flex;
				font-size: 20rpx;
				.item {
					margin: 0 30rpx;
					&.car {
						text-align: center;
						position: relative;
						.car-num {
							position: absolute;
							top: -10rpx;
							right: -10rpx;
						}
					}
				}
			}
			.right {
				display: flex;
				font-size: 28rpx;
				align-items: center;
				.btn {
					line-height: 66rpx;
					padding: 0 30rpx;
					border-radius: 36rpx;
					color: #ffffff;
				}
				.cart {
					background-color: #ed3f14;
					margin-right: 30rpx;
					margin-left: 95rpx;
				}
				.buy {
					background-color: #ff7900;
				}
			}
		}
		
		//骨架屏占位
		.test{
			width: 100%;
			.test1{
				width: 80%;
				height: 200rpx;
				margin-top: 20rpx;
			}
			.test2{
				width: 70%;
				height: 100rpx;
				margin-top: 30rpx;
			}
			.test3{
				width: 90%;
				height: 300rpx;
				margin-top: 10rpx;
			}
		}
	}
</style>
