{{#class "Ext.data.Store"}}
	singleton: true,
	requires: [
	    '{{model "showwork.ShowWorkVO"}}'
	],
	config: {
		model :'{{model "showwork.ShowWorkVO"}}',
		storeId: 'workDetailsStoreId',
		autoSync: true,
		autoLoad: true
	}
{{/class}}