Ext.define('VisLeader.view.free.FreeExecute', {
    extend: 'Ext.Container',
	xtype: 'freeExecute',
	requires: [
	],
	config: {
		layout: 'fit',
		style: 'background-color:#f7f7f7',
		scrollable: false,
		items: [{
					xtype: 'titlebar',
					title: '费用执行',
					ui: 'light',
					docked: 'top',
					items: [
					{
		                xtype: 'button',
		                ui: 'plain',
						iconCls: 'bcp-backbutton',
		                align:'left',
		                action: 'freeExecuteBack',
		                listeners:{
		                	tap: function(){
		                		history.back();
		                	}
		                }
		            }, {
		                xtype: 'spacer'
		            }, {
		                xtype: 'button',
		                iconCls: 'bcp-commitbutton',
		                ui: 'plain',
		                align:'right',
		                action: 'freeExecuteCommit'
		            }
				]
			},
			{
			    xtype:'container',
			 	scrollable:false,
			 	layout:'vbox',
			    items: [
			    	{
			    		xtype: 'fieldset',
			    		items:[
			    			{
								xtype: 'datepickerfield',
								value: new Date(),
								destoryPickerOnHide: true,
								dateFormat: 'Y-m-d',
								name: 'execute_time',
								label: '执行时间：',
								picker : {
									useTitles: true,
									slotOrder : ['year', 'month', 'day'],
									yearText: '年',
									monthText: '月',
									dayText: '日',
									doneButton : {
										text : '确定'
									},
									cancelButton : {
										text : '取消'
									}
								}
							},
					    	{
								xtype: 'numberfield',
								name: 'execute_amount',
								label: '执行金额：'
							},
							{
							    xtype: 'textareafield',
							    placeHolder:'<请填写备注信息>',
							    name: 'free_execute_note'
							},
					 		{
								width: '100%',
								xtype: 'dataview',
								name: 'executePhotoWall',
								margin: '0.5em 0 0 0',
								minHeight: '6em',
								variableHeights: true,
								selectAll: true,
								infinite: true,
								scrollable: false,
								cls: 'abc',
								inline: true,
								itemTpl: ['<img style = "display: {hidden}; border:{border};" class="applicationPhotoWall" src="{img_path}">'].join(""),
								store: {
									model: 'VisLeader.model.free.ImagePublishVO',
									storeId: 'sharepicstoreb',
									autoSync: true,
									autoLoad: true,
									data: [
									{
										id: '000000000000001',
										img_path: 'resources/icons/24.png',
										border: '0px',
										hidden: ''
									}],
									listeners:{
										removerecords:function( store, records, indices, eOpts){
											if(store.getCount() == 9){
												var record = store.findRecord('id','000000000000001');
												record.getData().hidden = '';
											}
										}
									}
								},
								listeners: {
									itemtap: function(view, index, target, record, e, eOpts) {
										if (GloableVariable.isTap) {
											console.log('itemtap');
											if (record.get('id') == '000000000000001') {
												var view = Ext.Viewport.query('freePanel')[0];
												if(!view) {
													view = Ext.create('view "free.ExecutePanel"');
												}
												Ext.Viewport.add(view);
											}
										} else {
											var dataview = view.up('freeExecute').down('dataview[name=executePhotoWall]');
											GloableVariable.isTap = true;
											dataview.deselectAll();
											dataview.getStore().fireEvent('refresh');
											record.getData().border = '0px';
										}
									},
									itemtaphold: function(view, index, target, record, e, eOpts) {
										GloableVariable.isTap = false;
										if (record.get('id') != '000000000000001') {
											var dataview = view.up('freeExecute').down('dataview[name=executePhotoWall]');
											if (record.get('id') != '000000000000001') {
												var fileURI=record.get('img_path');
												record.getData().border = '2px solid red';
												dataview.getStore().fireEvent('refresh');
												Ext.Msg.confirm("注意！", "您即将删除该图片！！！", function(state) {
													if (state == 'yes' || state == 'ok') {
														var store = Ext.StoreMgr.lookup('sharepicstoreb');
														var component = Ext.Viewport.query('button[action = freeExecuteCommit]')[0];
														UploadFile.uploadDelete(component,fileURI,store);
														store.remove(record);
														dataview.getStore().fireEvent('refresh');
														UploadFile.setWallHeight(store,dataview);
													} else {
														dataview.deselectAll();
														record.getData().border = '0px';
														dataview.getStore().fireEvent('refresh');
													}
												});
											}
										}
									}
								}
							}
						]
					}
			    ]
			}
		]
	}
});