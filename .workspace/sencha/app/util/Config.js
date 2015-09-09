/**
 * 应用所有配置项


 Util UploadeUtils.js 
 这个类如果使用需要修改..
 */
Ext.define('VisLeader.util.Config', {	singleton: true,
	alternateClassName: 'bcpConfig',
	/*领导端查询URL&登录url&产品发布量URL
	  queryURL:  util backen.js 默认查询url
	  loginURL:  controller singupcontroller.js 45 213  登录注册 
	  storeURL:  controller storageController.js 133 发布量查询   '/groupsumvalue'
	  */
	
	  queryURL: 'http://192.168.0.53',
	  loginURL: 'http://192.168.0.53',
	  storeURL: 'http://192.168.0.53',

	
//	queryURL: 'http://202.85.214.195:8080',
//	storeURL: 'http://202.85.214.195:18080',
//	loginURL: 'http://202.85.214.195:8080',
	 
/*	 queryURL: 'http://bcp.wuzhoufeng.com:88',
	 storeURL: 'http://bcp.wuzhoufeng.com:88',
	 loginURL: 'http://bcp.wuzhoufeng.com:88',*/

	//测试公司,0002
	appcorpid: 'wuzoufen-f76b-4437-a3bd-9f1ab1343dfc',
	//应用版本
	appversion: '1.0.0',
	//应用编码id
	appcode: '002',
	//应用平台111:android
	appplatform: 111,
	//是否增量更新
	appisAdd: 0,
});