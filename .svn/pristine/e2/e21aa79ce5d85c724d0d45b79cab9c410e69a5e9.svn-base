{{#class 'Ext.Container'}}
	requires: [
		'Ext.TitleBar',
		'Ext.form.FieldSet',
		'Ext.field.Select',
		'Ext.field.Number',
		'Ext.field.TextArea',
		'{{view "free.FreePanel"}}',
		'{{model "free.ImagePublishVO"}}',
		'{{app "util.GloableVariable"}}',
		'{{app "util.UploadFile"}}',
		'{{app "util.UploadeUtils"}}'
	],
	xtype:'freeShot',
	alias: 'widget.freeShot',
	alternateClassName: 'freeShot',
	name:'freeShot',
	initialize: function() {
		this.callParent(arguments);
	},
	config: {
        scrollable: false,
		layout: 'fit',
		items: [{
			xtype: 'toolbar',
			ui: 'light',
			title: '选择照片',
			docked: 'top',
			items: [{
                xtype: 'button',
                ui: 'plain',
				iconCls: 'bcp-backbutton',
                action: 'freeShotBack',
                listeners: {
					tap: function() {
						Ext.Viewport.fireEvent('freeShotBack');
					}
				}
            }
            ]
		 },
		 {
            xtype: 'toolbar',
            ui: 'round',
            name: 'toolbar',
            docked: 'bottom',
            style: 'border-top: 0em; padding: 0em;',
            defaults: {
                style: '/*background:#197FC6;*/border-radius: 0em; webkit-border-radius: 0em; min-height: 3em; border: 0px; margin: 0em; padding:0em;'
            },
            items: [
            {
                xtype: 'button',
                flex:1,
                ui: 'confirm',
                text: '下一步',
                action: 'applicationPictureConfirm',
                listeners: {
                    tap: function(){
                        Ext.Viewport.fireEvent('freeShotCommit');
                    }
                }
            }]
        },
		 {
		 	xtype:'container',
		 	scrollable:false,
		 	layout:'vbox',
		 	items:[
		 	{
		 		xtype:'fieldset',
		 		name:'takephoto_from',
		 		items:[
		 		{
					width: '100%',
					xtype: 'dataview',
					name: 'freeApplicationDisplay',
					margin: '0em 0em',
					minHeight: '6em',
					variableHeights: true,
					selectAll: true,
					infinite: true,
					scrollable: false,
					cls: 'abc',
					inline: true,
					itemTpl: ['<img style = "display: {hidden}; border:{border};" class="applicationPhotoWall" src="{img_path}">'].join(""),
					store: {
						model: '{{model "free.ImagePublishVO"}}',
						storeId: 'sharepicstore',
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
								if(store.getCount()==9){
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
										view = Ext.create('{{view "free.FreePanel"}}');
									}
									Ext.Viewport.add(view);
								}
							} else {
								var dataview = view.up('freeShot').down('dataview[name=freeApplicationDisplay]');
								GloableVariable.isTap = true;
								dataview.deselectAll();
								dataview.getStore().fireEvent('refresh');
								record.getData().border = '0px';
							}
						},
						itemtaphold: function(view, index, target, record, e, eOpts) {
							GloableVariable.isTap = false;
							if (record.get('id') != '000000000000001') {
								var dataview = view.up('freeShot').down('dataview[name=freeApplicationDisplay]');
								if (record.get('id') != '000000000000001') {
									var fileURI=record.get('img_path');
									record.getData().border = '2px solid red';
									dataview.getStore().fireEvent('refresh');
									Ext.Msg.confirm("注意！", "您即将删除该图片！！！", function(state) {
										if (state == 'yes' || state == 'ok') {
											var store = Ext.StoreMgr.lookup('sharepicstore');
											var component = Ext.Viewport.query('button[action = applicationPictureConfirm]')[0];
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
				}]
		 	}
			]
		}]
	}
{{/class}}