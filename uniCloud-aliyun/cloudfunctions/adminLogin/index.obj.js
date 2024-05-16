// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	async adminLogin(userinfo){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('adminTable')
			.where({password:userinfo.password,username:userinfo.username})
			.get()
			.then(async (res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					{
						if(res.data.length == 0)
							ret = 'nouser'
						else
						{
							if(res.data[0].password != userinfo.password)
								ret = 'worngpassword'
							else{
								let token = Math.random().toString(36).slice(-6);
								await db.collection('adminTable')
									.where({password:userinfo.password,username:userinfo.username})
									.update({token:token})
								ret = token
							}
						}
					}
			})
			.catch((err)=>{
				ret = 'error'
			})
		return ret	
	},
	async isLogin(token){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('adminTable')
			.where({token:token})
			.get()
			.then(async (res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					{
						if(res.data.length!=0)
						{
							ret = res.data[0].username
						}
						else
						{
							ret = 'nologin'
						}
					}
			})
			.catch((err)=>{
				ret = 'error'
			})
		return ret	
	},
}
