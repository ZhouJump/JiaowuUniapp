const fs = require('fs');
const path = require('path')
module.exports = {
	// 统一 - 支付回调地址,格式为 "服务空间ID":"URL化地址"
	"notifyUrl": {
		// 测试环境服务空间-支付回调地址
		"mp-959701fe-151c-4c72-bb61-d21f69764990": "https://fc-mp-959701fe-151c-4c72-bb61-d21f69764990.next.bspapp.com/uni-pay-co",
	},
	// 支付宝相关（加签方式选证书模式，加密算法选RSA2）
	"alipay": {
		"enable": true, // 是否启用支付宝支付
		// 支付宝 - APP支付配置
		"app": {
			"appId": "9021000137620309", // 支付宝开放平台下应用的appid
			"privateKey": "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCHQZkRA465qokdVRy1J22gggGku/Q/XxxbAcqkWssOV9UrFhk9uVNcf1R3b604EIoo9orbXjK/bC6WBW/7FIlqWG2K1x7knj2NBbKZJ9UHOfe5gxe3ixZFYB68D417FAqU+tcafKsxxQw7TbjcmY1B7DynFBuxVTCwi0aTudAmlBuEgdRrHtX5je0MbpypIC3e80RBkTJUm8ZmTy+t9nD4QmkjvgGmEF9FouVl5Z+xUMWu4ca6p2ZkZQSpJbOza8b4HlA3/E1dXb296C1ZpWu/XEOS0MbAgahKZRbgdAOu5+vRilJVHfxwBBTrxLBTx1j0ijuuWTAxn/6okEUdUxqVAgMBAAECggEAenZwarE35u97Wi2X4oWigrNzXX44NbCd8eB7Y7g5JfFstqg5jmNgEN3Q0psw0RRYo6ImM1zkweDnhTnDHCiKCtmpxQ3lkMWdoTPJc1ZXUUWxACyrqqmqLoJLEadbSFbrBdzgKcE7F8L7wi4q9MGq3kdQ204fjL4/aXmRG2wgBOy64hHOsvlxMxsH7fxYjSzN/2UoTXQ5lccGHPKSr7jM8idAmJvzZNymKTS7zYgdfcTw3jlwex2QB3B3ihhszVAl7hyKACDNDWj2oz60JF7mbICYKGysl+OTzUqu+ZV0lz62bRqb5ZJnFY+d96h+rLWoaltO+KSTKS5ESdjV4PKTgQKBgQDcu+LihKsy3XUPBPrEPs5IkZWpBd84Ns0K3+bhWBlHwVGQPfO51jqPnQSg3z3pesurae16ESUrmqjvjEmYdUF6dkF4T89Fr5XJauAcLhpXecN6JWxWFlWLzdZucZAKpMPW/k81lnWNF+W1HuDhn6UGJs4bIrbYz+PSyyRgxiqlpQKBgQCc3aMTHd9HAaQcMX1TaJRodH/sYcVKtPoS+bC6FCJKOShRHp2GN/JpDHslKzOeefM3nCcnKzQ7O328sZcKLT2WPuCYqCp89PvR/8cSKpby2PWMoogqnakCugQmzAH/1fwFPia3/0jNU40Wx7pfLLUximPt3JSUZSvymwC1oGLuMQKBgArxYZkbPKWD5xa8h3YNKwrb9NBxUxSlWtrsKLUJOg+dnN6Kw7d10GdoQF99UcNubARudvBzQyV7QF7H1KozPfDFRg+h3UO2JbXbj4q2GmY1yiQXENzftJP+u1+0T5DHhFH3P5QHhoJdKe0lv75PvM2mRNeBjBEJlWDQ41fM2zZlAoGAIqumAHKox9PoBsc1cPr7Wj7tizxs078+SnVfhzEuBwOtEojWvjSdYnR8v1FWHl/Lzu23haO57qGOf+csf/ZR12RcVcFNasLm6ZpD0JMTO+eSFhxSRkEEevLMOhr7EiWkhzAedKp6187wrylD2wdRoPp6bbdEK6xU01FJDdu+IfECgYAb6iyjZmGyJitwKDHeWjfiWHUpJLjHFLhy0A0lEGlLuvETLsjY2D8rKR+S60uRRZlTTQdwIvWHM5RhHG+V+kFR9mJcuoAdKZy80Libqe6C/sEWsqb3AJVbanXfk28GF48gs738lqjC2XLmkfzER6ZMnVuCi4mqjZ/BC2pNxPMeFg==", // 支付宝商户私钥
			"appCertPath": path.join(__dirname, 'alipay/appPublicCert.crt'), // 支付宝商户公钥路径
			"alipayPublicCertPath": path.join(__dirname, 'alipay/alipayPublicCert.crt'), // 支付宝公钥路径
			"alipayRootCertPath": path.join(__dirname, 'alipay/alipayRootCert.crt'), // 支付宝根证书路径
		}
	}
}