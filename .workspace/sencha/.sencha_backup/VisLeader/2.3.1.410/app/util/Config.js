/**
 * 应用所有配置项
 */
Ext.define('VisLeader.util.Config', {	singleton: true,
	alternateClassName: 'bcpConfig',
	//领导端查询URL&登录url&产品发布量URL

	  queryURL: 'http://192.168.0.50:28080',
	  loginURL: 'http://192.168.0.50:28080',
	  storeURL: 'http://192.168.0.50:28080',
	
//	  queryURL: 'http://192.168.0.166:8081',
//	  loginURL: 'http://192.168.0.166:8081',
//	  storeURL: 'http://192.168.0.50:8081',

	 // queryURL: 'http://192.168.0.127:8080',
	 // loginURL: 'http://192.168.0.127:8080',
	 // storeURL: 'http://192.168.0.50',
	
//	queryURL: 'http://202.85.214.195:8080',
//	storeURL: 'http://202.85.214.195:18080',
//	loginURL: 'http://202.85.214.195:8080',
	
//	queryURL: 'http://192.168.0.156:8081',
//	storeURL: 'http://192.168.0.50:28080',
//	loginURL: 'http://192.168.0.156:8081',
	 
//	 queryURL: 'http://bcp.wuzhoufeng.com:88',
//	 storeURL: 'http://bcp.wuzhoufeng.com:88',
//	 loginURL: 'http://bcp.wuzhoufeng.com:88',

	//测试公司,0002
	appcorpid: 'wuzoufen-f76b-4437-a3bd-9f1ab1343dfc',
	//应用版本
	appversion: '0.9.7',
	//应用编码id
	appcode: '002',
	//应用平台111:android
	appplatform: 111,
	//是否增量更新
	appisAdd: 0,
});