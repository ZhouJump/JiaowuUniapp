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
				ret = '已有用户'
			}
		else
			ret = '新用户'
		return ret
	}
}
