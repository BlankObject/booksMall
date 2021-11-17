<template>
	<view class="content">
		<u-search placeholder="日照香炉生紫烟" v-model="keyword" height="73" :animation="true"></u-search>
		<u-swiper class="myswiper" name="img_url" :list="swiperList" mode="rect" border-radius="35"></u-swiper>
		<u-sticky offset-top="-12" :enable="enable">
				<u-tabs :list="list" class='u-m-t-10 top' :is-scroll="false" :current="current" @change="changeSort"></u-tabs>
		</u-sticky>
		<view class="goods u-skeleton">
			<u-row gutter="16">
				<u-col span="6" v-for="(item,index) in goodsList.length!==0?goodsList:30">
				<navigator class="goods-item" :url="'/pages/detail/detail?goodsId='+item.id">
						<view class="u-p-l-10">
							<u-image width="100%" class="u-skeleton-fillet" height="300rpx" :src="item.cover_url"></u-image>
							<view class="title u-line-1 u-skeleton-rect">{{item.title}}</view>
						</view>
						<view class="u-flex u-row-between u-p-l-20 u-p-r-20 u-p-b-5">
							<view class="price u-skeleton-rect">¥ {{item.price}}</view>
							<view class="sales u-line-1 u-skeleton-rect">销量：{{item.sales}}+</view>
						</view>
				</navigator>
				</u-col>
			</u-row>
		</view>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		<u-back-top :scroll-top="scrollTop" top="800"></u-back-top>
	</view>
</template>

<script>
	import user from '../../utils/user.js'
	export default {
		data() {
			return {
				scrollTop: 0,
				keyword:'',
				swiperList:[], //轮播图数据
				goodsList:[],//商品数据
				list:[
					{
						name:'默认'
					},
					{
						name:'销量'
					},
					{
						name:"推荐"
					},
					{
						name:'最新'
					}
				],
				current:0,
				loading: false, // 是否显示骨架屏组件
				index:1,
				oldIndex:0,
			}
		},
		//一键回到顶部
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
		 // console.log(this.$u.config.v)
		 this.loading=true
			this.$u.api.getSlides().then(res=>{
				this.swiperList=res.slides
				this.loading=false
				this.goodsList=res.goods.data
				console.log(res)
				// console.log(res)
			})
			// console.log(user.hiddenPhone('19120764646'))
		},
		onShow() {
			this.enable= true
			// console.log(this.enable)
		},
		onHide() {
			this.enable= false
			// console.log(this.enable)
		},
		methods: {
			async changeSort(index){
				this.current=index
				this.index=1
				this.loading=true
				if(index==0){
					const result=await this.$u.api.getSlides()
					this.goodsList=result.goods.data
					this.loading=false
					return
				}
				let key=index==1?'sales':index==2?'recommend':'new'
				const result=await this.$u.api.getSortGoods(key,1)
				this.goodsList=result.goods.data
				this.loading=false
				// console.log(result)
			}
		},
		//下拉到底刷新
		async onReachBottom() {
			const result=await this.$u.api.getSortGoods('page',this.index++)
			this.goodsList=[...this.goodsList,...result.goods.data]
		}
		
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		// margin-top: 10rpx;
		padding: 30rpx;
		.myswiper{
			margin-top: 40rpx;
		}
		.goods{
			margin-top: 25rpx;
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
					font-size: 20rpx;
				}
			}
		}
	}
</style>
