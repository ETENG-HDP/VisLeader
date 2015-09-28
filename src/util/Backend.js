Ext.define('{{app "util.Backend"}}', {
	override: 'ETFramework.Backend',
	requries: [
		'{{app "util.Config"}}'
	],
	REQUEST_PATH: '/servlet/MobileSubmitAction',
	BASE_URL: localStorage.mybase_url || bcpConfig.queryURL,
	requestCallback: function (req, success, res, callback) {
		var re =this;
		try {
			if(success == false) {
				if(res.timeout){
					Toast.toast('连接超时...', 1000);
				}else{
					if (!success && res.status == 500&& (res.responseText.indexOf("not login")>=0)) {
						Ext.Viewport.fireEvent('changeUser');
					}else{
//						Toast.toast('请检查网络', 1000);
					}
				}
			} else if(success === '') {
//				Toast.toast('请检查网络', 1000);
				throw new Error('connection refuse');
			} else if(!success) {
//				Toast.toast('请检查网络', 1000);
				throw new Error('connection timeout');
			}

			var reply = Ext.decode(res.responseText);
			if (!(reply.DD_Server_RetTF === 'true')) throw new Error('etframework exception');

			var args = reply.selfCollections;
			args.unshift(null);
			callback.apply(this, args);
		} catch (err) {
			callback.call(this, err);
		}
	}
	// signIn: function (options) {
	// 	options.params = options.params || {};

	// 	this.loginCallback.apply(options.scope || window, [{
	// 		request: {
	// 			username: 'aaa'
	// 			password: 'bbb'
	// 		}
	// 	}, true, {
	// 		responseText: '{"success": true}'
	// 	}, option.callback]);
	// },

});