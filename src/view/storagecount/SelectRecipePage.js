{{#class 'Ext.dataview.List'}}
	requires: [
	  '{{model "storagecount.StorageModel"}}',
	  'Ext.field.Search', 
	  'Ext.data.proxy.LocalStorage'
	],
	xtype: 'selectrecipe',
	config: {
	cls: 'store-list',
	itemCls: 'items',
	disableSelection: true,
  	itemTpl: '<div>{recipe}</div>',
  	variableHeights: true,
  	emptyText: '搜索历史',
  	store: {
      storeId: 'recipestore',
      model: '{{model "storagecount.StorageModel"}}',
  		autoLoad: true,
  		autoSync: true,
      proxy: {
        type: 'localstorage',
        id: 'recipe_id'
      }
  	},
  	listeners: {
  		itemtap: function(view, inde, target, record) {
  			var value = record.getData().recipe;
  			StoreRecipe.recipe = value;
  			Ext.Viewport.fireEvent('recipeQuery', value, 0, false);
  			history.back();
  		}
  	},
		items: [{
			xtype: 'titlebar',
			title: '配方',
			ui: 'light',
			docked: 'top',
			items:[{
				align: 'left',
				xtype: 'button',
				ui: 'plain',
				iconCls: 'bcp-backbutton',
				handler: function() {
					history.back();
				}
			}]
		}, {
			layout: 'hbox',
			xtype: 'fieldset',
			docked: 'top', 
			margin: '0.2em 0.3em',
			items: [{
				xtype: 'searchfield',
				width: '100%',
				name: 'recipe',
				clearIcon: 'true',
				margin: '0em 1em 0em 0em',
				placeHolder: '请输入配方'
				
			}, {
				xtype: 'button',
				ui: 'confirm',
				// align: 'right',
				top: '0.3em',
				right: '0.3em',
				margin: '0em 0em 0em 0.3em',
				text: '查询',
				handler: function() {
					var view = Ext.Viewport.query('searchfield[name=recipe]')[0];
					var value = view.getValue();
					if(value == "") {
						value = null;	
					}
					StoreRecipe.recipe = value;
					view.reset();
					history.back();
          Ext.Viewport.fireEvent('recipeQuery', value, 0, false);
          if(value != null) {
          	var store = Ext.StoreMgr.lookup('recipestore');
	          var data = store.findRecord('recipe', value);
	          if(data == null) {
	          	store.add({
		          	'recipe': value
		          });
	          }
          }
        }
			}]
		}]
	}

{{/class}}