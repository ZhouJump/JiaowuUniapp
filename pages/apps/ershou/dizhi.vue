<template>
	<view class="page">
		<view class="topbox">
			<view class="title">收货地址管理<i class="bi bi-caret-right-fill"></i></view>
		</view>
		<view class="appbox">
			<view class="dizhiitem" v-for="item in dizhilist">
				{{item.address}}
				<i @click="deldizhi(item)" class="bi bi-trash-fill del"></i>
			</view>
		</view>
		<view class="tip" v-if="dizhilist.length == 0">点击新增地址<i class="bi bi-arrow-right"></i></view>
		<i @click="openpop" class="bi bi-plus-lg refresh"></i>
		
		<!-- 弹出框 -->
		<view @click="ispop = false" v-if="ispop" class="mask"></view>
		<view :style="{bottom:ispop?'0':'-310px'}" class="popup">
			<picker-view class="picker" @change="changevalue" :value="location">
				<picker-view-column>
					<view v-for="sheng in sheng">{{sheng.name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="shi in shi">{{shi.name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="xian in xian">{{xian.name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="cun in cun">{{cun.name}}</view>
				</picker-view-column>
			</picker-view>
			<input class="input" v-model="xiangxi"/>
			<div class="buttonbox">
				<div @click="addaddress" style="background-color: #8d89ff;color: white;" class="button">新增</div>
				<div @click="ispop=false" class="button">取消</div>
			</div>
		</view>
		<!-- 弹出框结束 -->
	</view>
</template>

<script>
	import rigen from 'province-city-china/data.js'
	import base from '../../../common/base.js'
	const user = uniCloud.importObject('userInfo',{customUI:true})
	export default {
		data() {
			return {
				id:uni.getStorageSync('userid'),
				ispop:false,
				dizhi:uni.getStorageSync('dizhi')!=''?JSON.parse(uni.getStorageSync('dizhi')):'',
				sheng:[],
				shi:[],
				xian:[],
				cun:[],
				xiangxi:'',
				location:[0,0,0,0],
				dizhilist:[]
			}
		},
		methods: {
			deldizhi(item){
				uni.showModal({
					title:'确实要删除这条地址？',
					content:item.address,
					success: async (res)=>{
						if(res.confirm){
							await user.deladdress({_id:item._id})
							this.getaddress()
						}
					}
				})
			},
			changevalue(event){
				this.location = event.detail.value
				this.getshi(this.sheng[event.detail.value[0]])
				this.getxian(this.shi[event.detail.value[1]])
				this.getcun(this.xian[event.detail.value[2]])
			},
			openpop()
			{
				uni.getLocation({
					type:'gcj02',
					geocode:true,
					complete: (res) => {
						this.setlocation(res.address)
					}
				})
				if(this.isload==true)
					return
				this.ispop=true
			},
			async addaddress(){
				let res = await user.addaddress({userid:this.id,address:this.sheng[this.location[0]].name+' '+this.shi[this.location[1]].name+' '+this.xian[this.location[2]].name+' '+this.cun[this.location[3]].name+' '+this.xiangxi})
				console.log(res)
				this.ispop = false
				this.getaddress()
			},
			setlocation(location){
				rigen.data.forEach(element => {
					if(element.name == location.district){
						console.log(element)
						this.getshi(element)
						this.getxian(element)
						this.getcun(element)
						this.sheng.forEach((e,i)=>{
							if(e.province == element.province){
								this.location[0] = i
							}
						})
						this.shi.forEach((e,i)=>{
							if(e.city == element.city){
								this.location[1] = i
							}
						})
						this.xian.forEach((e,i)=>{
							if(e.area == element.area){
								this.location[2] = i
							}
						})
						this.xiangxi = location.street +' '+ location.streetNum +' '+ location.poiName
					}
				})
			},
			getsheng(){
				rigen.data.forEach(element => {
					if(element.city == 0)
						this.sheng.push(element)
				})
			},
			getshi(province){
				this.shi = []
				rigen.data.forEach(element => {
					if(element.province == province.province && element.city != 0 && element.area == 0 && element.town == 0)
						this.shi.push(element)
				})
			},
			getxian(city){
				this.xian = []
				rigen.data.forEach(element => {
					if(element.province == city.province && element.city == city.city && element.area != 0 && element.town == 0)
						this.xian.push(element)
				})
			},
			getcun(area){
				this.cun = []
				rigen.data.forEach(element => {
					if(element.province == area.province && element.city == area.city && element.area == area.area && element.town != 0)
						this.cun.push(element)
				})
			},
			async getaddress(){
				let res = await user.getaddress({userid:this.id})
				this.dizhilist = res
			}
		},
		mounted() {
			this.getsheng()
			this.getaddress()
		}
	}
</script>

<style scoped>
	.del{
		position: absolute;
		right: 36px;
		top:24px;
		font-size: 26px;
		color: gray;
	}
	.dizhiitem{
		height: 80px;
		box-sizing: border-box;
		padding: 20px;
		font-size: 15.6px;
		padding-right: 80px;
		position: relative;
	}
	.input{
		height: 40px;
		padding-left: 20px;
		box-sizing: border-box;
		border-radius: 8px;
		border: 1px solid #B5B5FF;
		width: 90%;
		margin-left:5%;
	}
	.mask
	{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: black;
		opacity: 0.2;
	}
	.picker{
		height: 180px;
		width: 100%;
		text-align: center;
		font-size: 15px;
	}
	.buttonbox
	{
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		bottom: 20px;
		width: 100%;
		height: 46px;
		left: 0;
	}
	.button
	{
		width: 48%;
		background-color: lightgray;
		text-align: center;
		height: 50px;
		line-height: 50px;
		border-radius: 8px;
	}
	.popup
	{
		position: absolute;
		width: 100%;
		height: 300px;
		background-color: white;
		bottom: 0;
		box-shadow: 0 0 8px gray;
		border-radius: 8px;
		transition-duration: 100ms;
	}
	.topbox
	{
		width: 100%;
		height: 200px;
		background:linear-gradient(#B5B5FF,white) ;
		position: relative;
	}
	.topbox
	{
		width: 100%;
		height: 200px;
		background:linear-gradient(#B5B5FF,white) ;
		position: relative;
	}
	.title
	{
		position: absolute;
		bottom: 60%;
		left: 40px;
		font-size: 20px;
		font-weight: 600;
		color: #232323;
	}
	.appbox{
		background-color: white;
		box-shadow: 0 0 6px lightgray;
		width: calc(100% - 40px);
		height: calc(100% - 140px);
		left: 20px;
		border-radius: 32px;
		top:100px;
		position: absolute;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
	}
	.refresh
	{
		font-size: 36px;
		background: blue;
		width: 60px;
		height: 60px;
		display: block;
		color: white;
		text-align: center;
		line-height: 60px;
		border-radius: 30px;
		position: absolute;
		right: 40px;
		bottom: 100px;
		box-shadow: 0 0 6px gray;
		opacity: 0.6;
		animation-duration: 500ms;
		animation-iteration-count: infinite;
		
	}
	.tip{
		position: absolute;
		color: gray;
		bottom: 120px;
		right: 120px;
		font-weight: 600;
	}
	page
	{
		height: 100%;
		overflow: hidden;
		overflow-y: hidden;
	}
</style>
