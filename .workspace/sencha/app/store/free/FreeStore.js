Ext.define('VisLeader.store.free.FreeStore', {
    extend: 'Ext.data.Store',
	singleton: true,
	alernateClassName:'freeStore',
	requires: [
	    'VisLeader.model.free.FreeVO'
	],
	config: {
		model :'VisLeader.model.free.FreeVO',
		storeId:'freeStore',
		pageSize: 10
		// ,data:[{'customer_id':'0001',
		// 	'customer_name':'张新航',
		// 	'budget_id':'0001',
		// 	'application_item':'广告费',
		// 	'application_expense':500000,
		// 	'start_date':'2014年3月1日',
		// 	'end_date':'2014年7月1日',
		// 	'application_date':'11-20',
		// 	'state':'未审核'
		// 	}
		// ]
	}
});