Ext.define('{{app "util.Backend"}}', {
	override: 'ETFramework.Backend',
	requries: [
		'{{app "util.Config"}}'
	],
	REQUEST_PATH: '/servlet/MobileSubmitAction',
	BASE_URL: localStorage.mybase_url || bcpConfig.queryURL,

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