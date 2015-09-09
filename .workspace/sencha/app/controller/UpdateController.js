/**
 * 版本控制
 * 
 * 发版时需要修改当前版本号updateApk: function() {}
 * 
 * 	
 */


//Ext.define('FertilizerSellMobile.controller.UpdateController', {
//	extend: 'Ext.app.Controller',
Ext.define('VisLeader.controller.UpdateController', {
    extend: 'ETFramework.app.Controller',
	requires: [
		'Ext.device.filesystem.FileEntry',
		'Ext.device.filesystem.Cordova',
		'VisLeader.util.Backend',
		'VisLeader.util.Util',
		'Ext.ProgressIndicator',
		'Ext.MessageBox'
	],
	config: {
		//views[],
		refs: {
			versionUpdate: 'button[action=version]'
		},
		control: {
			'viewport': {
				updateApk: 'updateApk'
			},
			versionUpdate: {
				tap: 'updateApk'
			}
		}
	},

	/*
		自己封装的插件，需从svn上下载
	*/
	downloadAndInstall: function(app_url) {
		Update.update(
			function () {
				console.log('下载成功');
			}, function () {
				console.log('下载失败');
			}, 
			app_url);
	},
	
	/*点击版本更新按钮触发事件*/
	updateApk: function(enter_flag) {
		console.log('点击版本更新按钮触发事件方法被调用');
		ETFramework.Backend.request({
			//url: bcpConfig.loginURL+'/servlet/MobileSubmitAction',
			//url : 'http://42.96.249.56:80'+'/servlet/MobileSubmitAction',
			bo: 'et.bcp.leader.vtn.VersionBO',
			params: {
				platform: bcpConfig.appplatform,//应用平台111:android
				isAdd: bcpConfig.appisAdd,//是否增量更新
				appcode: bcpConfig.appcode,//应用的id
				ver_num: bcpConfig.appversion,//应用的版本,对应打包时的版本.
				action: 'newversion'
			},
			scope: this,
			callback: function(err, flag, args) {
				console.log(arguments);
				if (err) {
					//Ext.Msg.alert('网络不给力');
					console.log(err);
				} else {
					if (flag == 'true' || flag == "true" || flag == true) {
						if (args.ret_code == "0" || args.ret_code == '0') {
							//Ext.Msg.alert('版本一致，无需升级');
							if(enter_flag == null){
								ViewSwitch.toast('已经是最新版本'+bcpConfig.appversion, 2000);
							}
							//Ext.Viewport.query('settingView')[0].destroy();
						} else if (args.ret_code == "1" || args.ret_code == '1') {
							Ext.Msg.confirm("更新提示", "有新版本是否升级到最新版本?", function(state) {
								if (state == 'yes') {
									this.downloadAndInstall(args.app_url)
								}
							}, this);
							//Ext.Viewport.query('settingView')[0].destroy();

						} else if (args.ret_code == "2" || args.ret_code == '2') {
							console.log(args.ret_code);
							Ext.Msg.alert("重要更新提示", "为了不影响使用，请安装新的应用");
							// Toast.toast('重要更新，为不影响使用，请安装新的应用');
							//Ext.Viewport.query('settingView')[0].destroy();
							this.downloadAndInstall(args.app_url);
						}
					}

				}
			}
		})
	},
});//})