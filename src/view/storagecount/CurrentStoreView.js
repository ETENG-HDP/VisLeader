{{#class 'Ext.dataview.List'}}
  xtype: 'currentstoreview',
  config: {
    // margin: '0.3em',
    cls: 'product store-list',
    infinite: true,
    variableHeights: true,
    disableSelection: true,
    listeners: {
      initialize: function(listView) {
        Ext.Viewport.fireEvent('loadmorerecipe', listView);
      },

      itemtap: function(item, index, target, record) {
        var recipe = record.getData().region_id;
        Ext.Viewport.fireEvent('productionStore', recipe);
      }
    },
  	itemTpl: [
      '<div class="wrapper">',
        '<div class="inner">',
          '<img class="avatar" src="resources/icons/23.jpg">',
        '</div>',
        '<div class="store">', 
          '<span class="recipe">配　方：</span><span class="recipe">{region_name}</span><br>',
          '<span>可用量：</span><span>{sales_num}</span><br>',
          '<span>在库量：</span><span>{tasknum}</span><br>',
        '</div>',
      '</div>'
    ].join(""),
  	store: {
      model: '{{model "SellNumber"}}',
      storeId: 'recipeallstore',
  		autoLoad: true,
  	},
    items: [{
      docked: 'top',
      xtype: 'titlebar',
      ui: 'light',
      title: '所有正品仓库',

      items: [{
        ui: 'plain',
        iconCls: 'search',
        align: 'right',
        handler: function(){
          Ext.Viewport.fireEvent('addrecipe');
        }
      }]
    }]
  	// items: [{//多仓库查询
  	// 	docked: 'top',
  	// 	xtype: 'toolbar',
  	// 	ui: 'light',
  	// 	items: [{
   //      xtype: 'spacer'
   //    }, {
   //      xtype: 'spacer'
   //    }, {
   //      ui: 'plain',
   //      align: 'center',
   //      displayField: 'recipe',
   //      valueField: 'id',
  	// 		xtype: 'selectfield',
   //      centered: 'true',
   //      store: {
   //        autoLoad: true,
   //        data: [{
   //          'recipe': '所有仓库'
   //        }, {
   //          'recipe': '一号仓'
   //        }, {
   //          'recipe': '二号仓'
   //        }]
   //      }
  	// 	}, {
   //      xtype: 'spacer'
   //    }, {
   //      ui: 'plain',
   //      iconCls: 'add',
   //      handler: {

   //      }
   //    }]
  	// }]
  }
{{/class}}