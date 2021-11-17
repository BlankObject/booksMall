<template>
	<view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="切换账号" @click="switchAccount()"></u-cell-item>
			</u-cell-group>
			<u-modal v-model="show" :content="content" :mask-close-able="true" :show-cancel-button="true"
			confirm-text="Yes" cancel-text='No' @confirm='confirm'></u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: '你确定要重新登录吗'
			}
		},
		methods: {
			switchAccount(){
				this.show = true;
			},
			confirm(){
				//清空用户信息及token
				uni.removeStorageSync('userData')
				uni.removeStorageSync('token')
				this.$u.route({
					url:'/pages/login/login',
					type:'reLaunch'
				})
			}
		}
	}
</script>

<style>

</style>
