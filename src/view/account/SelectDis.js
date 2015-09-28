/**
 * 选择区域
 * */
{{#class 'Ext.Container'}}
xtype: 'selectdis',
requires:[
    '{{store "SelectDisStore"}}'          
],
config: {
	items:[{
		xtype: 'titlebar',
		title: '选择区域',
		docked: 'top',
		items:[{
			text: '返回',
			ui: 'back',
			align: 'left',
			listeners: {
				tap: function(){
					history.back();
				}
			}
		}]
	},{
		xtype: 'list',
		height: '100%',
		disableSelection:true,
		store: 'selectDisStore',
		itemTpl: ['<div>',
		          '<span style="font-size: 14px;">　{region_name}</span>',
		          '</div>'].join(''),
		listeners:{
			itemsingletap: function( item, index, target, record, e, eOpts){
				Ext.Viewport.fireEvent('chooseDis',record);
			}
		}
	}]
}
{{/class}}