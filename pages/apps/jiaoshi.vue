<template>
	<view>
		<view class="topbox">
			<view class="title">空教室查询<i class="bi bi-caret-right-fill"></i></view>
		</view>
		<view class="appbox">
			<view :style="{color:item.cj<60?'red':''}" class="item" v-for="item in kaoshi">
				<view class="kcmc">{{item.kcmc}}</view>
				<view class="cj">{{item.cdmc}} {{item.kssj.slice(5)}}</view>
			</view>
		</view>
		<view class="tip" v-if="kaoshi == undefined">点击获取数据<i class="bi bi-arrow-right"></i></view>
		<i @click="openpop" :style="{animationName:isload?'rotate':''}" class="bi bi-arrow-clockwise refresh"></i>
		
		<!-- 弹出框 -->
		<view @click="ispop = false" v-if="ispop" class="mask"></view>
		<view :style="{bottom:ispop?'0':'-310px'}" class="popup">
			<picker-view class="picker" @change="changevalue" :value="default">
				<picker-view-column>
					<view :key="index" v-for="(item,index) in lhlist">{{item.text}}</view>
				</picker-view-column>
				<picker-view-column>
					<view :key="index" v-for="(item,index) in zcdlist">{{item.text}}</view>
				</picker-view-column>
				<picker-view-column>
					<view :key="index" v-for="(item,index) in xqjlist">{{item.text}}</view>
				</picker-view-column>
				<picker-view-column>
					<view :key="index" v-for="(item,index) in jcdlist">{{item.text}}</view>
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
				kaoshi:uni.getStorageSync('kaoshi')!=''?JSON.parse(uni.getStorageSync('kaoshi')):'',
				isload:false,
				ispop:false,
				default:[8,base.getWeekInYear() - base.startWeek - 1,base.getWeek() - 1,5
				],
				lh:'04',
				zcd:base.getWeekInYear() - base.startWeek,
				xqj:base.getWeek(),
				jcd:'06',
				lhlist:[
					{text:'北区教学楼',id:'01'},
					{text:'北区实验楼',id:'14'},
					{text:'北区图书馆',id:'16'},
					{text:'电脑楼',id:'25'},
					{text:'光琼科学楼',id:'23'},
					{text:'和义楼',id:'21'},
					{text:'金荣楼',id:'02'},
					{text:'南区教学楼',id:'15'},
					{text:'文正楼',id:'04'},
					{text:'无楼号',id:'26'},
					{text:'雄馨楼',id:'17'},
					{text:'中区实验楼',id:'22'},
					{text:'中区艺术楼',id:'24'},
					{text:'无楼号',id:'wlh'},],
				zcdlist:[
					{text:'第一周',id:'1'},
					{text:'第二周',id:'2'},
					{text:'第三周',id:'3'},
					{text:'第四周',id:'4'},
					{text:'第五周',id:'5'},
					{text:'第六周',id:'6'},
					{text:'第七周',id:'7'},
					{text:'第八周',id:'8'},
					{text:'第九周',id:'9'},
					{text:'第十周',id:'10'},
					{text:'第十一周',id:'11'},
					{text:'第十二周',id:'12'},
					{text:'第十三周',id:'13'},
					{text:'第十四周',id:'14'},
					{text:'第十五周',id:'15'},
					{text:'第十六周',id:'16'},
					{text:'第十七周',id:'17'},
					{text:'第十八周',id:'18'},
					{text:'第十九周',id:'19'},],
				xqjlist:[
					{text:'周一',id:'1'},
					{text:'周二',id:'2'},
					{text:'周三',id:'3'},
					{text:'周四',id:'4'},
					{text:'周五',id:'5'},
					{text:'周六',id:'6'},
					{text:'周日',id:'7'},],
				jcdlist:[
					{text:'上午一节',id:'1'},
					{text:'上午二节',id:'2'},
					{text:'上午三节',id:'3'},
					{text:'上午四节',id:'4'},
					{text:'上午五节',id:'5'},
					{text:'下午六节',id:'6'},
					{text:'下午七节',id:'7'},
					{text:'下午八节',id:'8'},
					{text:'下午九节',id:'9'},
					{text:'晚第十节',id:'10'},
					{text:'晚十一节',id:'11'},
					{text:'晚十二节',id:'12'},],
			}
		},
		methods: {
			changevalue(event){
				console.log(event.detail.value)
				this.lh = this.lhlist[event.detail.value[0]].id
				this.zcd = this.zcdlist[event.detail.value[1]].id
				this.xqj = this.xqjlist[event.detail.value[2]].id
				this.jcd = this.jcdlist[event.detail.value[3]].id
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
					url:base.baseUrl +'kwgl/kscx_cxXsksxxIndex.html?doType=query&xnm='+this.year+'&xqm='+this.tern+'&queryModel.showCount=100',
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
						  console.log(res.data.items)
						  var list = []
						  res.data.items.forEach(element => {
							list.push({kcmc:element.kcmc,kssj:element.kssj,cdmc:element.cdmc})
						  });
						  console.log(list,this.year,this.tern)
						  this.kaoshi = list
						  uni.setStorageSync('kaoshi',JSON.stringify(list))
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
			}
		},
		mounted() {
			console.log(this.chengji)
		}
	}
</script>

<style>
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
	.cj
	{
		height: 40px;
		line-height: 40px;
		font-size: 20px;
		padding-left: 26px;
	}
	.kcmc
	{
		height: 40px;
		line-height: 40px;
		height: 40px;
		padding-left: 24px;
	}
	.item
	{
		width: 100%;
		border-top: solid lightgray 1px;
		border-bottom: solid lightgray 1px;
		box-sizing: border-box;
		margin-top: -1px;
		height: 90px;
	}
	.picker{
		height: 200px;
		width: 100%;
		text-align: center;
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
		border-radius: 8px;
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
	@keyframes rotate{
		from{rotate: 0deg;}
		to{rotate: 360deg;}
	}
	body
	{
		overflow: hidden;
		overflow-y: hidden;
	}
</style>
