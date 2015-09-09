Ext.define('VisLeader.model.storagecount.StorageModel', {
    extend: 'Ext.data.Model',
  config: {
  	identifier: 'uuid',
  	idProperty: 'recipe',
  	fields: ['recipe_id', 'recipe']
  }
});