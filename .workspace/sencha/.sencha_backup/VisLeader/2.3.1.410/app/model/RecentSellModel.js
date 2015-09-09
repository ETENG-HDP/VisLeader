Ext.define('VisLeader.model.RecentSellModel', {
    extend: 'Ext.data.Model',
  config: {
  	idProperty: 'pro_id',
  	fields: ['id', 'current_sell', 'plan_sell', 'sell_date']
  }
});