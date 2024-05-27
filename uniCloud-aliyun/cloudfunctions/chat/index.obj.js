// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	async setmessage(msg){
		const uniPush = uniCloud.getPushManager({appId:"__UNI__B3BC600"})
		await uniPush.sendMessage({
			push_clientid:msg.cid,
			payload:msg.msg,
			})
	}
}
