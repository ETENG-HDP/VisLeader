Ext.define('VisLeader.view.recipesales.ProductSaleOrder', {
    extend: 'Ext.Panel',
  xtype: 'saledetailorder',
  config: {
  	layout: 'vbox',
  	items: [{
  		xtype: 'titlebar',
  		title: '销量明细',
  		ui: 'light',
  		items: [{
  			xtype: 'button',
  			align: 'left',
  			ui: 'plain',
  			iconCls: 'bcp-backbutton',
  			handler: function() {
  				history.back();
  			}
  		}]
  	}, {
  		layout: 'fit',
  		flex: 1,
      margin: '0.3em 0.3em 0em 0.3em',
  		xtype: 'saleorder',
        disableSelection: true,
  		store: {
  			storeId: 'productsalestore',
  			model: 'VisLeader.model.SellNumber',
  			autoSync: true,
  			autoLoad: true
  		}
  	}]
  }
});