Ext.define('VisLeader.util.Toast', {  requires: ['VisLeader.util.UtilToast'],
  singleton: true,
  alternateClassName: 'Toast',
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
});