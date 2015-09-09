Ext.define('VisLeader.store.RecipeProduceStore', {
    extend: 'Ext.data.Store',
	requires: ['VisLeader.model.SellNumber'],
	singleton: true,
	config: {
		storeId: 'recipproductsalestore',
		model: 'VisLeader.model.SellNumber',
		autoSync: true,
		autoLoad: true
	}
	
});