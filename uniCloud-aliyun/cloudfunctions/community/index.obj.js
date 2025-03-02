// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	
	async getNoteByUserId(id){
		const db= uniCloud.database()
		const $ = db.command.aggregate
		const now = Date.now() * -1
		return await db.collection('noteTable').aggregate()
		.match({
			title: db.command.exists(true),
			studentid: id
		})
		.addFields({
		    sortWeight: $.add([$.multiply(['$view',1]),$.multiply([$.size('$comment'),4]),$.multiply(['$like',4]),$.multiply([$.add([now,'$date']),0.0000001])]) 
		})
		.sort({
		    sortWeight: -1,
		})
		.project({
		    'title': 1,
		    'view': 1,
		    'cover': 1,
		    'comment': 1,
			'like': 1,
			'sortWeight': 1,
			'date': 1
		})
		.end()
	},
	
	async buyWeight(_id,weight){
		const db= uniCloud.database()
		let res = await db.collection('noteTable')
		.doc(_id)
		.update({
			like:db.command.inc(weight)
		})
		return 'sucess'
	},
	
	async changeWeight(_id,weight){
		const db= uniCloud.database()
		let res = await db.collection('noteTable')
		.doc(_id)
		.update({
			like:weight
		})
		return 'sucess'
	},
	
	async delNote(id){
		const db= uniCloud.database()
		let res = await db.collection('noteTable')
		.doc(id)
		.get()
		
		await db.collection('noteTable')
		.where({
			_id: db.command.in(res.data[0].comment)
		})
		.remove()
		
		await db.collection('noteTable')
		.doc(id)
		.remove()
	},
	
	async getUserData(id){
		const db= uniCloud.database()
		let view = 0
		let comments = 0
		let notes = 0
		
		let res = await db.collection('noteTable')
		.where({
			title: db.command.exists(true),
			studentid: id
		})
		.field({
			'comment': true,
			'view': true
		})
		.get()
		res.data.forEach(item=>{
			view += item.view
			comments += item.comment.length
		})
		notes = res.data.length
		return {
			view:view,
			comments:comments,
			notes:notes
		}
		
		
	},
		
	async getNote(id,current_page){
		let ret = ''
		const db= uniCloud.database()
		const $ = db.command.aggregate
		const now = Date.now() * -1
		if(id == null){
			return await db.collection('noteTable').aggregate()
			.match({
				title: db.command.exists(true)
			})
			.addFields({
			    sortWeight: $.add([$.multiply(['$view',1]),$.multiply([$.size('$comment'),4]),$.multiply(['$like',4]),$.multiply([$.add([now,'$date']),0.0000001])]) 
			})
			.sort({
			    sortWeight: -1,
			})
			.skip(7*(current_page-1))
			.limit(7)
			.project({
			    'title': 1,
			    'view': 1,
			    'cover': 1,
			    'comment': 1
		    })
			.end()
			
			 // return await db.collection('noteTable')
			 // .where({
				//  title: db.command.exists(true)
			 // })
			 // .orderBy("view", "desc")
			 // .orderBy("date", "desc")
			 // .skip(7*(current_page-1))
			 // .limit(7)
			 // .field({
				//  'title': true,
				//  'view': true,
				//  'cover': true,
				//  'comment': true
			 // })
			 // .get()
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
		.add({
			...note,
			like:0,
			view:0,
			comment:[],
			date:Date.now()
		})
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
	},
	async addComment(note,id){
		const db= uniCloud.database()
		let ret = await db.collection('noteTable')
		.add({
			...note,
			like:0,
			view:0,
			comment:[],
			date:Date.now()
		})
		db.collection('noteTable')
		.doc(id)
		.update({
			comment:db.command.push(ret.id)
		})
		return ret
	},
	async getComment(ids){
		const db= uniCloud.database()
		let ret = await db.collection('noteTable')
		.where({
			_id:db.command.in(ids)
		})
		.get()
		return ret
	}
}
