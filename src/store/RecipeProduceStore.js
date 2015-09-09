{{#class 'Ext.data.Store'}}
	requires: ['{{model "SellNumber"}}'],
	singleton: true,
	config: {
		storeId: 'recipproductsalestore',
		model: '{{model "SellNumber"}}',
		autoSync: true,
		autoLoad: true
	}
	
{{/class}}