<template>
	<view>
		<u-input class="u-m-b-20" :border="true" placeholder="请输入名字" v-model="name"></u-input>
		<u-upload :action="action" :form-data="fileList" max-count="1" :before-upload="beforeUpload" 
		ref="uUpload"></u-upload>
		<view class="u-m-t-80 btn">
			<u-button type="primary" shape="square" :plain="true" :ripple="true" @click="save">保存个人信息</u-button>
		</view>
	</view>
</template>

<script>
	let _this
	export default {
		data() {
			return {
				fileList:{},
				action:'',
				name:'',
				key:''
			}
		},
		created() {
			_this=this
		},
		methods: {
			async save(){
				// await this.$refs.uUpload.upload();//上传图片
				let _this=this
				if(this.action||this.name){
					if(this.action){
						const temp=await this.$u.api.updateTitleImg({avatar:this.key})
						console.log(temp)
						jump(temp,'头像')
					}
					if(this.name){
						const result=await this.$u.api.updateName(this.name)
						jump(result,'昵称')
					}
					function jump(temp,title){
						if(temp){
							if(temp.statusCode==204){
								uni.showToast({
									title:title+'更新成功',
									icon:'success'
								})
							}
						}else{
							uni.showToast({
								title:'昵称和头像更新成功',
								icon:'success'
							})
						}
						_this.fileList={}
						_this.action=''
						_this.name=''
						_this.key=''
						const user=_this.$u.api.getUserData()
						uni.setStorageSync('userData',user)
						setTimeout(()=>{
							_this.$u.route({
								url:'/pages/home/home',
								type:'switchTab'
							})
						},500)
					}
				}
				else{
					uni.showToast({
						title:'名字或头像为空',
						icon:'error'
					})
				}
			},
			async beforeUpload(index,list){
				// #ifdef H5
					const fileName=list[index].name
				// #endif
				//#ifndef H5
				let fileName=list[index].file.path
				//#endif
				
				console.log(list,index)
				const result=await _this.$u.api.getOssToken()
				// debugger
				// console.log(fileName)
				let suffix=fileName.slice(fileName.lastIndexOf('.'))
				// console.log(suffix)
				let upfileName=_this.$u.guid(20)+suffix
				_this.key=upfileName
				console.log(upfileName)
				_this.fileList={
					key:upfileName,
					policy: result.policy,
					OSSAccessKeyId:result.accessid, 
					success_action_status: '200', //让服务端返回200,不然，默认会返回204
					signature: result.signature,
				}
				_this.action=result.host
				console.log('hello')
				return true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn{
		width: 50%;
		margin: 0 auto;
	}
</style>
