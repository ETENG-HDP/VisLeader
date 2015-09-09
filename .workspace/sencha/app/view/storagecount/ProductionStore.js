Ext.define('VisLeader.view.storagecount.ProductionStore', {
    extend: 'Ext.dataview.List',
  xtype: 'productionstore',
  config: {
  	cls: 'product store-list',
    // infinite: true,
    variableHeights: true,
    disableSelection: true,
    itemCls: 'items',
  	itemTpl: [
  	  '<div class="wrapper">',
        '<div class="inner">',
          '<img class="avatar" src="{temp}">',
        '</div>',
  	  	'<span class="store">', 
  	  		'<span class="recipe"></span><span class="recipe">{region_name}</span><br>',
	  	  	'<span>发布量：</span><span id = {region_id}>{previous_sales}</span><br>',
	  	  	'<span>可用量：</span><span>{sales_num}</span><br>',
	  	  	'<span>在库量：</span><span>{tasknum}</span><br>',
  	  	'</span>',
  	  '</div>'
  	].join(""),
  	store: {
      model: 'VisLeader.model.SellNumber',
      storeId: 'recipeproductionstore',
  		autoLoad: true,
      autoSync: true
  	},
  	items: [{
  		docked: 'top',
  		xtype: 'titlebar',
  		ui: 'light',
  		title: '分产品存量',
  		items: [{
  			xtype: 'button',
  			iconCls: 'bcp-backbutton',
  			ui: 'plain',
  			align: 'left',
  			handler: function() {
            history.back();
        }
  		}]
  	}]
  }
});