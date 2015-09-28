{{#class "Ext.dataview.List"}}
  xtype: 'rankingitem',
  config: {
  	items: [{
  		xtype: 'titlebar',
  		title: '业绩排行',
  		docked: 'top',
  		ui: 'light'
  	}],
  	cls: 'store-list',
  	itemCls: 'items',
  	disableSelection: true,
  	itemTpl: [
  		'<div class="icon">',
  			'<img class="avatar" src="{img_url}" />',
	  		'<div class="sub">{item_name}</div>',
		'</div>'
  	].join(""),
  	listeners: {
  		itemtap: function(item, index, target, record){
  			var data = record.getData().item_type;
  			Ext.Viewport.fireEvent('rankingitemtap', record);
  		}
  	},
		data: [{
			item_id: '000010001',
			item_name: '营销组织月销量排行',
			img_url: 'resources/images/region_sale.png',
			item_type: 'regionsell'
		}, {
			item_id: '000010002',
			item_name: '营销组织月任务完成率排行',
			img_url: 'resources/images/region_per.png',
			item_type: 'regionrate'
		}, {
			item_id: '000020001',
			item_name: '业务代表月销量排行',
			img_url: 'resources/images/user_sale.png',
			item_type: 'usersell'
		}, {
			item_id: '000020002',
			item_name: '业务代表月任务完成率排行',
			img_url: 'resources/images/user_pre.png',
			item_type: 'userrate'
		}, {
			item_id: '000030001',
			item_name: '经销商月销量排行',
			img_url: 'resources/images/agency_sale.png',
			item_type: 'agencysell'
		}
		// , {
		// 	item_id: '000030002',
		// 	item_name: '经销商年任务完成率排行',
		// 	img_url: 'resources/images/agency_pre.png',
		// 	item_type: 'agencyrate'
		// }
		]
  }
{{/class}}