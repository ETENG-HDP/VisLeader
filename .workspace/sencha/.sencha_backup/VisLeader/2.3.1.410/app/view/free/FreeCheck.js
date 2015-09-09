Ext.define('VisLeader.view.free.FreeCheck', {
    extend: 'Ext.Container',
	xtype: 'freeCheck',
	requires: [
		'VisLeader.store.free.FreeStore'
	],
	config: {
		layout: 'fit',
		style: 'background-color:#f7f7f7',
		items: [{
				xtype: 'titlebar',
				title: '待审核费用',
				name: 'freeList',
				ui: 'light',
				docked: 'top',
				items: [{
					align: 'left',
					xtype: 'button',
					ui: 'plain',
					iconCls: 'bcp-backbutton',
					action: 'freeViewBack',
					listeners:{
					    tap: function(){
					        history.back();
					    }
					}
				},
				{
					xtype:'image',
					hidden: true,
					action:'freeFilter',
					style:'color:white;',
					html:'筛选&nbsp;',
					align:'right'
				}
				]
			},
			{
				xtype:'list',
				layout:'fit',
				name:'freeShowList',
				store:'freeStore',
				scrollable: {
					direction: 'vertical',
					indicators: false
				},
				disableSelection: true,
				plugins: [{
	                xclass: 'BcpBoss.util.PullRefreshFn',
	                lastUpdatedText: '最后更新',
	                pullText: '刷新中……',
	                refreshFn: function(a) {
	                        console.log('refreshFn……');
	                        Ext.Viewport.fireEvent('refreshFreeStore',a);
	                }
	            }],
				itemTpl:[
						'<div>',
							'<div class="pith pith-width">',
								'<div>',
									'<font style="font-size:0.84em;">{customer_name}-{application_item}</font>',
									'<font class="font-color" style="position: absolute;right: 1em;top:0.7em;">{state}</font></div>',
				                '<div style="margin-top: 0.3em;">',
				                	'<font class="text-size-eight" style="color: #525252;">￥{application_expense}</font>',
				                	'<font class="text-size-eight" style="color: #525252;margin-top: 0.3em;position: absolute;right: 1.3em;">{application_date}</font></div>',
			                '</div>',
			    		'</div>'
	            ].join(""),
	            listeners: {
	            	initialize: function(listView) {
	                    Ext.Viewport.fireEvent('allFreeScrollEndEvent', listView);
	                },
	            	itemtap:function(dataview, ix, target, record, event, options){
	            		Ext.Viewport.fireEvent('freeviewToDetail',record);
	            	},
					erased: function(item, eOpts ){
						item.deselectAll();
					}
				}
			}
		]
	}
});