//Ext.define('FertilizerSellMobile.model.more.MoreAppVO', {
//	extend: 'Ext.data.Model',
Ext.define('VisLeader.model.more.MoreAppVO', {
    extend: 'Ext.data.Model',
	config: {
		identifier: 'uuid',
		idProperty: 'moreapp_id',
		fields: [
			'moreapp_id',
			'app_name',
			'app_src',
			'app_view',
			'user_name'
		]
	}

});//});