<template>
	<view>
		<view class="goods-detail">
			<view class="" v-html="details">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goods-detail",
		props:{
			// current:{
			// 	default:0,
			// 	type:Number
			// },
			details:{
				default:'empty',
				type:String
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
