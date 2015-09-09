Ext.define('VisLeader.store.showwork.WorkDetailsStore', {
    extend: 'Ext.data.Store',
	singleton: true,
	requires: [
	    'VisLeader.model.showwork.ShowWorkVO'
	],
	config: {
		model :'VisLeader.model.showwork.ShowWorkVO',
		storeId: 'workDetailsStoreId',
		autoSync: true,
		autoLoad: true
	}
});