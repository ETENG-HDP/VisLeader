/*工具类*/
//Ext.define('BcpBoss.util.Util', {
{{#class }}
	singleton: true,
	alternateClassName: 'ViewSwitch',
	/*根据xtype查找相应页面，没有则创建，然后显示。*/
	isItemHold : false,//item是否长按事件
	StoreURL: 'http://192.168.0.151:8081',
	
	showView: function(xtype,animtype,direction) {
		var view = Ext.Viewport.query(xtype)[0] || {
			xtype: xtype
		};
		if(animtype){
			Ext.Viewport.setShowAnimation(animtype);
		}
		Ext.Viewport.setActiveItem(view);
	},
	toast: function(message, time) {
		var hideTime = time || 1000;
		Ext.Viewport.add({
			xtype: 'loadmask',
			cls: 'message',
			message: message,
			transparent: true,
			indicator: false,
			name: 'messageToast'
		});
		Ext.Function.defer(function() {
			Ext.Viewport.query('loadmask[name=messageToast]').forEach(function(toast) {
				toast.destroy();
			})
		}, hideTime);
	},
	timeCheck: function(s){
		var t = localStorage.last_update_ts||1396420812000;
		var ss = s||8000;
	    if((new Date().getTime()-t) < ss){
	        return false;        
	    }else{
	        localStorage.last_update_ts=new Date().getTime();
	        return true;
	    }
	}

{{/class}}
//});