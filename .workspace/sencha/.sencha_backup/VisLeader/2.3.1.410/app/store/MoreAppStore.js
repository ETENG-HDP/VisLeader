Ext.define('VisLeader.store.MoreAppStore', {
    extend: 'Ext.data.Store',
	singleton: true,
	requires: ['VisLeader.model.more.MoreAppVO'],
	config: {
		storeId: 'MoreAppStore',
		model: 'VisLeader.model.more.MoreAppVO',
		autoLoad: true,
		autoSync: true,
		proxy: {
			type: 'localstorage',
			id: 'MoreAppStore'
		},
		data: [ 
		{
			'user_name':'用户名',
			'moreapp_id': '124-freeapplication-678',
			'app_name': '费用申请',
			'app_src': 'resources/icons/application.png',
			'app_view': null
		},
		{
			'moreapp_id': '124-myfree-678',
			'app_name': '我的费用',
			'app_src': 'resources/icons/freeshow.png',
			'app_view': null
		},
		{
			'moreapp_id': '124-leaderfree-678',
			'app_name': '员工费用',
			'app_src': 'resources/icons/myFree.png',
			'app_view': null
		},
		{
			'moreapp_id': '124-freecheck-678',
			'app_name': '客户费用',
			'app_src': 'resources/icons/leaderFree.png',
			'app_view': null
		},{
			'moreapp_id': '124-visitView-678',
			'app_name': '拜访查看',
			'app_src': 'resources/icons/visitView.png',
			'app_view': null
		},
		{
			'moreapp_id': '124-update-678',
			'app_name': '检查更新',
			'app_src': 'resources/icons/appUpdate.png',
			'app_view': null
		}, {
			'moreapp_id': '124-exit-678',
			'app_name': '注销用户',
			'app_src': 'resources/icons/exist.png',
			'app_view': null
		}
		// , {
		// 	'moreapp_id': '124-update-url-678',
		// 	'app_name': '修改链接',
		// 	'app_src': 'resources/icons/modifyLine.png',
		// 	'app_view': null
		// }
		]
	}
});