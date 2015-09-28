{{#class 'Ext.data.Store'}}
	singleton: true,
	alernateClassName:'selectDisStore',
	requires:['{{model "SelectDisVO"}}'],
	config:{
		autoLoad: true,
		autoSync: true,
		storeId: 'selectDisStore',
		model: '{{model "SelectDisVO"}}',
//		data:[{
//			region_name: '高碑店新路',
//			region_id: '123ewr2efsfwwadawe'
//		},{
//			region_name: '王府井路线',
//			region_id: '123ewr2efwadsdfawe'
//		}]
	}
{{/class}}