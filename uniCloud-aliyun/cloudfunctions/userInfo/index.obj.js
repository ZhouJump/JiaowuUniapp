// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	async userlogin(user){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		let res = 0
		await db.collection('userTable').where({"id":user.id}).get()
			.then((e)=>{
				res = e
			})
		if(res.data.length == 0)
			{
				await db.collection('userTable').add(user)
				ret = '新用户'
			}
		else
			ret = '已有用户'
		return ret
	},
	async getuser(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('userTable')
		.where({"id":data.id})
		.get()
		.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = res.data[0]
			})
			.catch((err)=>{
				ret = 'error'
			})
				
		await db.collection('goodsTable')
		.where({"seller":data.id,"state":db.command.neq("selled")})
		.get()
		.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret={...ret,mysell:res.data.length}
			})
			.catch((err)=>{
				ret = 'error'
			})
			
		await db.collection('goodsTable')
		.where({"buyer":data.id})
		.get()
		.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret={...ret,mybuy:res.data.length}
			})
			.catch((err)=>{
				ret = 'error'
			})
			
		await db.collection('goodsTable')
		.where({"seller":data.id,state:"selled"})
		.get()
		.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret={...ret,myselled:res.data.length}
			})
			.catch((err)=>{
				ret = 'error'
			})
		return ret
	},
	async getmysell(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('goodsTable')
		.where({"seller":data.id,"state":db.command.neq("selled")})
		.get()
		.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret=res.data
			})
			.catch((err)=>{
				ret = 'error'
			})
		return ret
	},
	async getmybuy(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('goodsTable')
		.where({"buyer":data.id})
		.get()
		.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret=res.data
			})
			.catch((err)=>{
				ret = 'error'
			})
		return ret
	},
	async getmyselled(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('goodsTable')
		.where({"seller":data.id,state:"selled"})
		.get()
		.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret=res.data
			})
			.catch((err)=>{
				ret = 'error'
			})
		return ret
	},
	async setcid(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('userTable')
		.where({"id":data.id})
		.update({"cid":data.cid})
		.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret='sucess'
			})
			.catch((err)=>{
				ret = 'error'
			})
		return ret
	},
}
