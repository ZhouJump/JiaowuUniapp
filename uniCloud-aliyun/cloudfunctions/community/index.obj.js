// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	async getNote(id){
		let ret = ''
		const db= uniCloud.database()
		if(id == null){
			 return await db.collection('noteTable').get()
		}else{
			db.collection('noteTable')
			.doc(id)
			.update({
				view:db.command.inc(1)
			})
			 return await db.collection('noteTable')
				.doc(id)
				.get()
				
		}
	},
	async sentNote(note){
		let ret = 0
		const db= uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
					clientInfo: this.getClientInfo()
				})
		db.setUser({role:['admin']})
		await db.collection('noteTable')
		.add({...note})
		.then((res)=>{
				if(res.code!=0)
					ret = 'error'
				else
					ret = 'suceess'
			})
			.catch((err)=>{
				ret = err
			})	
		return ret
	}
}
