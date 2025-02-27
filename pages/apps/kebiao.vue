<template>
	<view class="page">
		<view class="topbox">
			<view class="title">第{{xqj}}周课程表<i class="bi bi-caret-right-fill"></i></view>
		</view>
		<view class="appbox">
			<view class="top">
				<view>周一</view>
				<view>周二</view>
				<view>周三</view>
				<view>周四</view>
				<view>周五</view>
			</view>
			<view class="table">
				<view v-show="item.zs.includes(xqj)" v-for="item in kebiao" :style="{top:8.33*(item.ks-1)+'%',left:20*(item.xqj-1)+'%',height:8.33*item.cd+'%'}" class="item">
					<view :style="{filter:'hue-rotate('+item.color+'deg)'}" class="itembox">{{item.kcmc}}<br/>{{item.cdmc}}<br/>{{item.xm}}</view>
				</view>
				<view class="tablebg1"></view>
				<view class="tablebg2"></view>
				<view class="tablebg3"></view>
			</view>
		</view>
		<i @click="openpop" :style="{animationName:isload?'rotate':''}" class="bi bi-arrow-clockwise refresh"></i>
		<i @click="xqj--" v-show="xqj!=1" class="bi left bi-chevron-left"></i>
		<i @click="xqj++" v-show="xqj!=20" class="bi right bi-chevron-right"></i>
		<view @click="ispop = false" v-if="ispop" class="mask"></view>
		<!-- 弹出框 -->
		<view :style="{bottom:ispop?'0':'-310px'}" class="popup">
			<picker-view class="picker" @change="changevalue" :value="[0,0]">
				<picker-view-column>
					<view :key="index" v-for="(item,index) in yearlist">{{item.text}}</view>
				</picker-view-column>
				<picker-view-column>
					<view :key="index" v-for="(item,index) in ternlist">{{item.text}}</view>
				</picker-view-column>
			</picker-view>
			<div class="buttonbox">
				<div @click="get" style="background-color: #8d89ff;color: white;" class="button">查询</div>
				<div @click="ispop=false" class="button">取消</div>
			</div>
		</view>
		<!-- 弹出框结束 -->
	</view>
</template>

<script>
	import base from '../../common/base'
	export default {
		data() {
			return {
				kebiao:uni.getStorageSync('kebiao')!=''?JSON.parse(uni.getStorageSync('kebiao')):'',
				isload:false,
				ispop:false,
				tern:'3',
				xqj:base.getWeekInYear() - base.startWeek,
				year:'2023',
				yearlist:[
					{text:'2024-2025',id:'2024'},
					{text:'2023-2024',id:'2023'},
					{text:'2022-2023',id:'2022'},
					{text:'2021-2022',id:'2021'},
					{text:'2020-2021',id:'2020'},],
				ternlist:[
					{text:'学期一',id:'3'},
					{text:'学期二',id:'12'},
					{text:'学期三',id:'16'},],
			}
		},
		methods: {
		changevalue(event){
			console.log(event.detail.value)
			this.year = this.yearlist[event.detail.value[0]].id
			this.tern = this.ternlist[event.detail.value[1]].id
		},
			openpop()
			{
				if(this.isload==true)
					return
				this.ispop=true
			},
			get()
			{
				if(this.isload)return
				this.isload = true
				this.ispop = false
				console.log(this.tern,this.year)
				uni.request({
					url:base.baseUrl +'kbcx/xskbcx_cxXsgrkb.html?xnm='+this.year+'&xqm='+this.tern+'&kzlx=ck',
					success: (res) => {
						 if(res.data.length != undefined)
							  {
								  uni.showToast({
									title:'登录失效，请重新登陆',
									duration:2000,
									position:'center'
								  })
								  this.isload = false
								  uni.navigateTo({
									url:"/pages/login/login"
								  })
								return
							  }
							var list = []
							var color = []
							res.data.kbList.forEach(element => {
							var jcs = element.jcs.split("-")
							var zss = element.zcd.split(/[周,]/)
							
							var zs = []
							if(zss.length == 4)
							{
							  if(zss[0].split('-').length==1)
							  {
								zs.push(zss[0] - 0)
							  }
							  else
							  {
								for(let i=zss[0].split('-')[0]-0;i<=zss[0].split('-')[1]-0;)
								{
								  zs.push(i-0)
								  i++
								}
							  }
							  if(zss[2].split('-').length==1)
							  {
								zs.push(zss[2]- 0)
							  }
							  else
							  {
								for(let i=zss[2].split('-')[0]-0;i<=zss[2].split('-')[1]-0;)
								{
								  zs.push(i-0)
								  i++
								}
							  }
							}
							else
							{
							  if(zss[1] === "(单)")
							  {
								if(zss[0].split('-').length==1)
								{
								  zs.push(zss[0] - 0)
								}
							  else
								{
								  for(let i=zss[0].split('-')[0]-0;i<=zss[0].split('-')[1]-0;)
								  {
									if(i%2==1)
									  {zs.push(i-0)}
									i++
								  }
								}
							  }
							  else if(zss[1] === "(双)")
							  {
								if(zss[0].split('-').length==1)
								{
								  zs.push(zss[0] - 0)
								}
							  else
								{
								  for(let i=zss[0].split('-')[0]-0;i<=zss[0].split('-')[1]-0;)
								  {
									if(i%2==0)
									  {zs.push(i-0)}
									i++
								  }
								}
							  }
							  else
							  {
								if(zss[0].split('-').length==1)
								{
								  zs.push(zss[0] - 0)
								}
							  else
								{
								  for(let i=zss[0].split('-')[0]-0;i<=zss[0].split('-')[1]-0;)
								  {
									zs.push(i-0)
									i++
								  }
								}
							  }
							}
							element.kccolor = ''
							let obj = {kcmc:element.kcmc,color:Math.floor(Math.random() * 360)}
							let index = color.findIndex((item) => item.kcmc === obj.kcmc);
							if (index !== -1) {
								element.kccolor = color[index].color
							} else {
								color.push(obj);
								element.kccolor = obj.color
							}
							
							list.push({color:element.kccolor,kcmc:element.kcmc,cdmc:element.cdmc,xm:element.xm,xqj:element.xqj,ks:jcs[0],cd:jcs[1]-jcs[0]+1,zs:zs})
						  });
							this.kebiao = list
							uni.setStorageSync('kebiao',JSON.stringify(list))
							console.log(list)
							this.isload = false
					},
					fail() {
						this.isload = false
						uni.showToast({
							title:'加载失败了',
							duration:2000,
							position:'center'
						})
					}
				})
		},
			},
		
	}
</script>

<style scoped>
	.item{
		position: absolute;
		width: 20%;
		height: 60px;
		padding: 2px;
		box-sizing: border-box;
	}
	.itembox{
		box-sizing: border-box;
		font-size: 12px;
		padding: 4px;
		border-radius: 8px;
		background-color: #d8daff;
		color: blue;
		width: 100%;
		height: 100%;
		overflow: hidden;
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
		height: 200px;
		width: 100%;
		text-align: center;
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
		width: calc(100% - 40px);
		height: calc(100% - 180px);
		left: 20px;
		border-radius: 16px;
		top:100px;
		position: absolute;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
	}
	.top{
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: space-around;
		line-height: 30px;
		font-size: 15px;
		box-sizing: border-box;
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
	.table{
		width: 100%;
		height: calc(100% - 30px);
		position: relative;
	}
	.tablebg1{
		width: 100%;
		height:41.6666%;
		background-color: #f9f9f9;
	}
	.tablebg2{
		width: 100%;
		height: 33.3333%;
	}
	.tablebg3{
		width: 100%;
		height: 25%;
		background-color: #f9f9f9;
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
		bottom: 50px;
		box-shadow: 0 0 6px gray;
		opacity: 0.6;
		animation-duration: 500ms;
		animation-iteration-count: infinite;
	}
	.left{
		font-size: 36px;
		background: blue;
		width: 60px;
		height: 60px;
		display: block;
		color: white;
		text-align: center;
		line-height: 60px;
		border-radius: 30px 0 0 30px;
		position: absolute;
		left: 40px;
		bottom: 50px;
		box-shadow: 0 0 6px gray;
		opacity: 0.4;
	}
	.right{
		font-size: 36px;
		background: blue;
		width: 60px;
		height: 60px;
		display: block;
		color: white;
		text-align: center;
		line-height: 60px;
		border-radius: 0 30px 30px 0;
		position: absolute;
		left: 105px;
		bottom: 50px;
		box-shadow: 0 0 6px gray;
		opacity: 0.4;
	}
	@keyframes rotate{
		from{rotate: 0deg;}
		to{rotate: 360deg;}
	}
</style>
