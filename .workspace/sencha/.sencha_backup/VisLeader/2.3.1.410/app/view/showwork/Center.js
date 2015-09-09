Ext.define('VisLeader.view.showwork.Center', {
    extend: 'Ext.Container',
	xtype: 'center',
	requires: [
	    //'Ext.dataview.List',
	    'Ext.TitleBar',
	    'BcpBoss.util.PullRefreshFn',
	    'VisLeader.store.showwork.ShowCenterStore'
	],
//	initialize: function(){
//        this.callParent(arguments);
//
//        var pullflag = null;
//        ETFramework.Backend.request({
//			bo: 'et.bcp.stockOrganization.StockOrganizationBO',
//			//url: (localStorage.store_url || bcpConfig.loginURL)+'/servlet/MobileSubmitAction',
//			params: {
//				action: 'refresh'
//			},
//			callback: function(err,flag,args) {
//				//console.log(arguments);
//				if(err!=null){
//				}else{
//					if(flag=="true"){
//						var inventoryStore=Ext.StoreMgr.lookup('inventoryStore');
//						inventoryStore.removeAll();
//						args.forEach(function(data){
//							inventoryStore.add({inventory_id:data.organization_id,inventory_name:data.organization_name,inventory_select_flag:'0'});
//						})
//					}else{
//
//					}
//				}
//				if (pullflag != null) {
//					pullflag.setState("loaded");
//            		pullflag.fireEvent('latestfetched', pullflag, 'refreshFn, you have to handle toInsert youself');
//            		pullflag.snapBack();
//				};
//			},
//			scope: this
//		});
//    },
	config:{
		layout:'fit',
		items: [{
			xtype:'titlebar',
			name:'center_tb',
			ui: 'light',
			docked: 'top',
			title:'所有中心',
			items:[
				{
					xtype: 'button',
					action: 'centerBack',
					align: 'left',
					ui: 'plain',
					iconCls: 'bcp-backbutton',
					listeners:{
						tap:function(){
							history.back();
						}
					}
				}
			]
		},
		{
			xtype:'list',
			layout:'fit',
			name:'eachCenter',
			store:'showCenterStoreId',
			scrollable: {
				direction: 'vertical',
				indicators: false
			},
			plugins: [{
			 xclass: 'BcpBoss.util.PullRefreshFn',
	            lastUpdatedText: '最后更新',
	            pullText: '刷新中……',
	            refreshFn: function(a,b) {
	                Ext.Viewport.fireEvent('reflushCenterData',a);
	            }
			}],
			itemTpl:['<div>',
		      			'<dl style="height:1.5em">',
		    				'<dt><img src="resources/icons/cangku_15.png" style="float:left;width:2.2em;height:2.5em;margin-top:-0.5em;"></dt>',
		    				'<dd style="float:left;margin-left:0.5em">',
		    					'<p class="text-size-small"  style="margin-top:0.2em">{region_name}</p>',
		    				'</dd>',
		    			'</dl>',
	    			'</div>'
            ].join(""),
            listeners: {
            	itemtap:function(dataview, ix, target, record, event, options){
            		//console.log(record);
            		Ext.Viewport.fireEvent('centerCommit',record.getData());
//            		if(Ext.Viewport.query('img[action=selectInventory]')[0].name=='unselected'){
//         			}   			
            	}
			}
//			items:[
//				{
//	            xtype: 'toolbar',
//	            hidden: true,
//	            ui: 'round',
//	            name: 'toolbar',
//	            docked: 'bottom',
//	            style: 'border-top: 0em; padding: 0em;',
//	            defaults: {
//	                style: 'border-radius: 0em; webkit-border-radius: 0em; min-height: 3em; border: 0px; margin: 0em; padding:0em;'
//	            },
//	            showAinmation: 'fadeIn',
//	            hiddenAinmation: 'fadeOut',
//	            items: [
//	            {
//	                xtype: 'button',
//	                flex:1,
//	                ui: 'confirm',
//	                text: '选择库存组织',
//	                listeners: {
//	                	tap: function(button) {
//	                		var listInventory = button.up('list');
//							var records = listInventory.getSelection();
//	                		Ext.Viewport.fireEvent('inventoryCommit', records);
//	                	}
//	                }
//	            }]
//	        }]
		}]
	}
});