//注册界面
Ext.define('VisLeader.view.account.SignUp', {
    extend: 'Ext.form.Panel',
	requires: [
		'Ext.field.Select',
		'Ext.field.Number',
		'VisLeader.model.RegionModel',
	],
    xtype: 'signup',
	config:{
	  	layout: {
	  		type: 'vbox',
	  		pack: 'center'	
	  	},
	  	align: 'center',
	  	scrollable: 'none',
	  	items: [{
	  		xtype: 'titlebar',
	  		docked: 'top',
	  		title: '注册',
	  		ui: 'light',
	  		items: [{
	  			xtype: 'button',
	  			align: 'left',
	  			ui: 'plain',
	  			iconCls: 'bcp-backbutton',
	  			handler: function() {
	  				history.back();
	  			}
	  		}]
	  	}, {

	  		xtype: 'numberfield',
	  		label: '手机号码：',
	  		placeHolder: '请输入手机号',
	  		margin: '0.3em 0.3em 0em 0.3em',
	  		name: 'phone'
	  	}, {
	  		xtype: 'passwordfield',
	  		label: '密　　码：',
	  		placeHolder: '请输入密码',
	  		margin: '0.3em 0.3em 0em 0.3em',
	  		name: 'password'
	  	}, {
	  		xtype: 'passwordfield',
	  		label: '确认密码：',
	  		placeHolder: '请确认密码',
	  		margin: '0.3em 0.3em 0em 0.3em',
	  		name: 'repassword'
	  	}, 
	  // 	{
	  // 		xtype: 'selectfield',
	  // 		label: '所属组织：',
	  // 		margin: '0.3em 0.3em 0em 0.3em',
	  // 		displayField: 'region_name',
	  // 		valueField: 'region_id',
	  // 		name: 'region',
	  // 		usePicker: false,
	  // 		//store: 'registregionstore',
	  // 		store: {//注册区域store
			//   	storeId: 'registregionstore',
			//   	model: 'VisLeader.model.RegionModel',
			//   	autoSync: true,
		 //      	autoLoad: true
			// }
	  		
	  // 	},
	  	{
	  		xtype: 'button',
	  		ui: 'confirm',
	  		margin: '0.3em 0.3em 0em 0.3em',
	  		text: '注册',
	  		handler: function() {
	  			Ext.Viewport.fireEvent('registuser');
	  		}
	  	}]
	}
	
});