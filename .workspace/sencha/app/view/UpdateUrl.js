Ext.define('VisLeader.view.UpdateUrl', {
    extend: 'Ext.form.Panel',
	alias: 'widget.updateUrl',
	xtype: 'updateUrl',
	requires: [
		'Ext.form.FieldSet',
	],
	config: {
		layout: {
			type: 'vbox',
			pack: 'center'
		},
		items: [{
			xtype: 'titlebar',
			title: '修改界面',
			ui: 'dark',
			docked: 'top',
			items: [{
				xtype: 'button',
				name: 'back',
				text: '返回',
				ui: 'back',
				align: 'left',
				listeners: {//监听返回按钮
					tap: function() {
						var urlView = Ext.Viewport.query('updateUrl')[0];
						if(urlView) {
							var toView = urlView.getData().toView;
							Ext.Viewport.setActiveItem(toView);
							urlView.destroy();
						}
					}
				}
			}]
		},{
			xtype: 'textfield',
			margin: 5,
			style: ' font-size:13px ',
			name: 'myurll',
			label: '应用URL',
			autoComplete: true,
		    autoCorrect: true,
			listeners: {
				initialize: function(item, eOpts,arg){
					item.setValue(localStorage.mybase_url);
				}
			}
		},{
			xtype: 'textfield',
			margin: 5,
			style: ' font-size:13px ',
			name: 'store_url',
			label: '库存URL',
			autoComplete: true,
		    autoCorrect: true,
			listeners: {
				initialize: function(item, eOpts,arg){
					var url = localStorage.store_url || bcpConfig.storeURL;
					item.setValue(url);
				}
			}
		},{
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			items: [{
				flex: 1,
				margin: '5',
				ui: 'action',
				xtype: 'button',
				action: 'newurl',
				text: '修改'
			}]
		}]
	}
});