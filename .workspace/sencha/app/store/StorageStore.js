Ext.define('VisLeader.store.StorageStore', {
    extend: 'Ext.data.Store',
	singleton: true,
  config: {
	  storeId: 'recipestore',
    model: 'VisLeader.model.storagecount.StorageModel',
		autoLoad: true,
		autoSync: true,
    proxy: {
      type: 'localstorage',
      id: 'recipe_id'
    }
  }
});