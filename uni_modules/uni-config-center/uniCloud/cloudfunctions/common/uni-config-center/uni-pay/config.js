const fs = require('fs');
const path = require('path')
module.exports = {
	// 统一 - 支付回调地址,格式为 "服务空间ID":"URL化地址"
	"notifyUrl": {
		// 测试环境服务空间-支付回调地址
		"mp-959701fe-151c-4c72-bb61-d21f69764990": "https://fc-mp-959701fe-151c-4c72-bb61-d21f69764990.next.bspapp.com/uni-pay-co",
		// 线上环境服务空间-支付回调地址（如果只有一个服务空间，则只需要配置线上环境服务空间即可）
		"mp-959701fe-151c-4c72-bb61-d21f69764990": "https://fc-mp-959701fe-151c-4c72-bb61-d21f69764990.next.bspapp.com/uni-pay-co",
	},
	// 支付宝相关（加签方式选证书模式，加密算法选RSA2）
	"alipay": {
		"enable": true, // 是否启用支付宝支付
		// 支付宝 - APP支付配置
		"app": {
			"appId": "9021000137620309", // 支付宝开放平台下应用的appid
			"privateKey": "MIIEogIBAAKCAQEAh0GZEQOOuaqJHVUctSdtoIIBpLv0P18cWwHKpFrLDlfVKxYZPblTXH9Ud2+tOBCKKPaK214yv2wulgVv+xSJalhtitce5J49jQWymSfVBzn3uYMXt4sWRWAevA+NexQKlPrXGnyrMcUMO0243JmNQew8pxQbsVUwsItGk7nQJpQbhIHUax7V+Y3tDG6cqSAt3vNEQZEyVJvGZk8vrfZw+EJpI74BphBfRaLlZeWfsVDFruHGuqdmZGUEqSWzs2vG+B5QN/xNXV29vegtWaVrv1xDktDGwIGoSmUW4HQDrufr0YpSVR38cAQU68SwU8dY9Io7rlkwMZ/+qJBFHVMalQIDAQABAoIBAHp2cGqxN+bve1otl+KFooKzc11+ODWwnfHge2O4OSXxbLaoOY5jYBDd0NKbMNEUWKOiJjNc5MHg54U5wxwoigrZqcUN5ZDFnaEzyXNWV1FFsQAsq6qpqi6CSxGnW0hW6wXc4CnBOxfC+8IuKvTBqt5HUNtOH4y+P2l5kRtsIATsuuIRzrL5cTMbB+38WI0szf9lKE10OZXHBhzykq+4zPInQJib82Tcpik0u82IHX3E8N45cHsdkAdwd4oYbM1QJe4cigAgzQ1o9qM+tCRe5myAmChsrJfjk81KrvmVdJc+tm0am+WSZxWPnfeofqy1qGpbTvikkykuREnY1eDyk4ECgYEA3Lvi4oSrMt11DwT6xD7OSJGVqQXfODbNCt/m4VgZR8FRkD3zudY6j50EoN896XrLq2ntehElK5qo74xJmHVBenZBeE/PRa+VyWrgHC4aV3nDeiVsVhZVi83WbnGQCqTD1v5PNZZ1jRfltR7g4Z+lBibOGyK22M/j0sskYMYqpaUCgYEAnN2jEx3fRwGkHDF9U2iUaHR/7GHFSrT6EvmwuhQiSjkoUR6dhjfyaQx7JSsznnnzN5wnJys0Ozt9vLGXCi09lj7gmKgqfPT70f/HEiqW8tj1jKKIKp2pAroEJswB/9X8BT4mt/9IzVONFse6Xyy1MYpj7dyUlGUr8psAtaBi7jECgYAK8WGZGzylg+cWvId2DSsK2/TQcVMUpVra7Ci1CToPnZzeisO3ddBnaEBffVHDbmwEbnbwc0Mle0Bex9SqMz3wxUYPod1DtiW124+KthpmNcokFxDc37ST/rtftE+Qx4RR9z+UB4aCXSntJb++T7zNpkTXgYwRCZVg0ONXzNs2ZQKBgCKrpgByqMfT6AbHNXD6+1o+7Ys8bNO/Pkp1X4cxLgcDrRKI1r40nWJ0fL9RVh5fy87tt4Wjue6hjn/nLH/2UddkXFXBTWrC5umaQ9CTEzvnkhYcUkZBBHryzDoa+xIlpIcwHnSqetfO8K8pQ9sHUaD6em23RCusVNNRSQ3bviHxAoGAG+oso2ZhsiYrcCgx3lo34lh1KSS4xxS4ctANJRBpS7rxEy7I2Ng/KykfkutLkUWZU00HcCL1hzOUYRxvlfpBUfZiXLqAHSmcvNC4m6nugv7BFrKm9wCVW2p135NvBhePILO9/Jaowtly5pH8xEemTJ1bgouJqo2fwQtqTcTzHhY=", // 支付宝商户私钥
			"appCertPath": path.join(__dirname, 'alipay/appCertPublicKey.crt'), // 支付宝商户公钥路径
			"alipayPublicCertPath": path.join(__dirname, 'alipay/alipayCertPublicKey_RSA2.crt'), // 支付宝公钥路径
			"alipayRootCertPath": path.join(__dirname, 'alipay/alipayRootCert.crt'), // 支付宝根证书路径
		},
	"wxpay": {
			"enable": false, // 是否启用微信支付
			// 微信 - APP支付
			"app": {
				"appId": "", // app开放平台下的应用的appid
				"secret": "", // app开放平台下的应用的secret
				"mchId": "", // 商户id
				"key": "", // v2的api key
				"pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // v2需要用到的证书
				"v3Key": "", // v3的api key
				"appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
				"appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
				"version": 2, // 启用支付的版本 2代表v2版本 3 代表v3版本
			},
		},
	}
}