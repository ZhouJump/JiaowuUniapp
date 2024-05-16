// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	async getcastinfo(){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('castInfo')
			.where({infoType:"cast"})
			.get()
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = res.data
			})
			.catch((err)=>{
				ret = 'error'
			})
		return ret	
	},
	async getbanner(){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('castInfo')
			.where({infoType:"banner"})
			.get()
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = res.data
			})
			.catch((err)=>{
				ret = 'error'
			})
		return ret	
	},
	async setcastinfo(cast){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('castInfo')
			.doc(cast._id)
			.update({info:cast.info,isShow:cast.isShow,url:cast.url,urlType:cast.urlType})
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = 'sucess'
			})
			.catch((err)=>{
				ret = 'error'
			})	
		return ret
	},
	async addcastinfo(cast){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('castInfo')
			.add(cast)
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = 'sucess'
			})
			.catch((err)=>{
				ret = 'error'
			})	
		return ret
	},
	async delcast(cast){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('castInfo')
			.doc(cast._id)
			.remove()
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = 'sucess'
			})
			.catch((err)=>{
				ret = 'error'
			})	
		return ret
	},
	async updatebanner(cast){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('castInfo')
			.doc(cast._id)
			.update({url:cast.url,urlType:cast.urlType,imgUrl:cast.imgUrl})
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = 'sucess'
			})
			.catch((err)=>{
				ret = 'error'
			})	
		return ret
	},
}
