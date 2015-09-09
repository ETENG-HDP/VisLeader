Ext.define('VisLeader.store.showwork.ShowCenterStore', {
    extend: 'Ext.data.Store',
	singleton: true,
	requires: [
	    'VisLeader.model.showwork.ShowCenterVO'
	],
	config: {
		model :'VisLeader.model.showwork.ShowCenterVO',
		storeId: 'showCenterStoreId',
		autoSync: true,
		autoLoad: true
	}
});