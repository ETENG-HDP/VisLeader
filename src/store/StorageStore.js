{{#class "Ext.data.Store"}}
	singleton: true,
  config: {
	  storeId: 'recipestore',
    model: '{{model "storagecount.StorageModel"}}',
		autoLoad: true,
		autoSync: true,
    proxy: {
      type: 'localstorage',
      id: 'recipe_id'
    }
  }
{{/class}}