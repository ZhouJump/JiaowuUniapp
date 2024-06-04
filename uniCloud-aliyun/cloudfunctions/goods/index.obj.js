// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	async setstar(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('star')
			.where({goodsid:data.goodsid,userid:data.userid})
			.get()
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = res
			})
			.catch((err)=>{
				ret = 'error'
			})
			
		if(ret.data.length==0){
			await db.collection('star')
				.add(data)
				.then((res)=>{
					if(res.code!=0)
						ret = 'error'
					else
						ret = 'success'
				})
				.catch((err)=>{
					ret = 'error'
				})
		}
		else{
			await db.collection('star')
				.where({goodsid:data.goodsid,userid:data.userid})
				.update(data)
				.then((res)=>{
					if(res.code!=0)
						ret = 'error'
					else
						ret = 'success'
				})
				.catch((err)=>{
					ret = 'error'
				})
		}
		return ret
	},
	async getstar(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('star')
			.where({goodsid:data.goodsid,userid:data.userid})
			.get()
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = res
			})
			.catch((err)=>{
				ret = 'error'
			})
			
		if(ret.data.length == 0)
			return false
		else
			return ret.data[0].star
	},
	async getmystar(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('star')
			.where({userid:data.userid})
			.get()
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = res
			})
			.catch((err)=>{
				ret = 'error'
			})
		return ret.data
	},
	async delgoods(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('goodsTable')
			.doc(data._id)
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
	async sentgoods(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('goodsTable')
			.doc(data._id)
			.update({"state":"waitget"})
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
	async hidegoods(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('goodsTable')
			.doc(data._id)
			.update({"state":"hide"})
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
	async unhidegoods(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('goodsTable')
			.doc(data._id)
			.update({"state":"selling"})
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
	async getgoods(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		let userid = ''
		let price = 0
		await db.collection('goodsTable')
			.doc(data._id)
			.update({"state":"selled"})
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = 'sucess'
			})
			.catch((err)=>{
				ret = 'error'
			})
		await db.collection('goodsTable')
			.doc(data._id)
			.get()
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					{
						ret = 'sucess'
						userid = res.data[0].seller
						price = price + (res.data[0].price - 0)
					}
			})
			.catch((err)=>{
				ret = 'error'
			})
		let add = 0
		await db.collection('uni-id-users')
			.where({"username":userid})
			.get()
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					{
						ret = 'sucess'
						add = res.data[0].balance
					}
			})
			.catch((err)=>{
				ret = 'error'
			})
		add = add + price
		await db.collection('uni-id-users')
			.where({"username":userid})
			.update({"balance":add})
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = 'sucess'
				}
			)
			.catch((err)=>{
				ret = 'error'
			})
		return ret
	},
	async getorder(data){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('uni-pay-orders')
			.where({order_no:data.order_no})
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
		return ret
	},
	async byGoods(data){
		let ret = 0
		let sellid = ''
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('goodsTable')
			.doc(data._id)
			.update({
				state:'waitsent',
				buyer:data.id,
				address:data.address
			})
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					{
						ret = 'sucess'
					}
			})
			.catch((err)=>{
				ret = 'error'
			})
			
			let user = await db.collection('uni-id-users')
			.where({"username":data.id})
			.get()
			
			const uniPush = uniCloud.getPushManager({appId:"__UNI__B3BC600"})
			await uniPush.sendMessage({
				push_clientid:user.cid,
				payload:{type:'goods',text:'你的寄售被购买了，点此发货',goodsid:data._id,time:Date.now(),sent:true,id:data.id},
				})
			
		return ret
	},
	async addGoods(goodsInfo){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('goodsTable')
			.add({...goodsInfo,date:Date.now()})
			.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = res
			})
			.catch((err)=>{
				ret = err
			})	
		return ret
	},
	async getGoods(id){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		if(id == null){
			await db.collection('goodsTable')
				.where({state:"selling"})
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
		}
		else{
			await db.collection('goodsTable')
				.doc(id)
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
		}
			return ret
	},
	async getAllGoods(id){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		if(id == null){
			await db.collection('goodsTable')
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
		}
		else{
			await db.collection('goodsTable')
				.doc(id)
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
		}
			return ret
	}
}
