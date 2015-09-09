//Ext.define('FertilizerSellMobile.controller.more.MoreAppController', {
//	extend: 'Ext.app.Controller',
//	requires: [],
Ext.define('VisLeader.controller.more.MoreAppController', {
    extend: 'ETFramework.app.Controller',
	requires: ['VisLeader.util.Backend'],
	config: {
		view: [
			'VisLeader.view.more.MoreApp',
			'VisLeader.view.showwork.WorkDetailsView'
		],
		refs: {
			moreApp: 'moreApp',
			selectCenter: 'img[action=selectCenter]'
		},
		control: {
			moreApp: {
				itemtap: 'toTrueView'
			}
		}
	},
	toTrueView: function(item, index, target, record, e, eOpts) {
		//console.log('单击触发');
		if(record.get('moreapp_id') == '124-update-678') {//版本更新
			var updateController = this.getApplication().getController('VisLeader.controller.UpdateController'); 
			//console.log('版本更新controller----');
			updateController.updateApk();
		}else if(record.get('moreapp_id') == '124-exit-678') {//注销账户
			console.log('---注销账户---');
			localStorage.clear();
			var centerStore = Ext.StoreMgr.lookup("showCenterStoreId");
			var visitStore = Ext.StoreMgr.lookup("workDetailsStoreId");
			centerStore.removeAll();
			visitStore.removeAll();
			this.enter(false);
			this.redirectTo('');
		}else if(record.get('moreapp_id') == '124-update-url-678') {
			var mainController = this.getApplication().getController('VisLeader.controller.SignUpController'); 
			mainController.toUpdate();
		}else if(record.get('moreapp_id') == '124-freecheck-678'){
			var page = 'freeCheck';
			var store = 'freeStore';
			var path = 'VisLeader.view.free.FreeCheck';
			this.pageInit(page,store,path);
			this.redirectTo('bcp/workdetailsview');
			Ext.Viewport.query('titlebar[name = freeList]')[0].setTitle('客户费用审核');
			Ext.Viewport.query('titlebar[name = freeList]')[0].setData({type: 'customer'});
			this.redirectTo('bcp/freecheck');
		}else if(record.get('moreapp_id') == '124-myfree-678'){
			var page = 'freeCheck';
			var store = 'freeStore';
			var path = 'VisLeader.view.free.FreeCheck';
			this.pageInit(page,store,path);
			Ext.Viewport.query('titlebar[name = freeList]')[0].setTitle('我的费用');
			Ext.Viewport.query('titlebar[name = freeList]')[0].setData({type: 'my'});
			this.redirectTo('bcp/freecheck');
		}else if(record.get('moreapp_id') == '124-leaderfree-678'){
			var page = 'freeCheck';
			var store = 'freeStore';
			var path = 'VisLeader.view.free.FreeCheck';
			this.pageInit(page,store,path);
			Ext.Viewport.query('titlebar[name = freeList]')[0].setTitle('领导费用审核');
			Ext.Viewport.query('titlebar[name = freeList]')[0].setData({type: 'leader'});
			this.redirectTo('bcp/freecheck');
		}else if(record.get('moreapp_id') == '124-freeapplication-678'){
			var page = 'freeShot';
			var store = 'sharepicstore';
			var path = 'VisLeader.view.free.FreeShot';
			this.pageInit(page,store,path);
			this.redirectTo('bcp/freeshot');
		}else if(record.get('moreapp_id') == '124-visitView-678'){
//			var page = 'workDetailsView';
//			var store = null;
//			var path = 'VisLeader.view.showwork.WorkDetailsView';
//			this.pageInit(page,store,path);
//		    var	localStorage.default_center_id ="";
			this.redirectTo('bcp/workdetailsview');
			Ext.Viewport.fireEvent('workDetails', 0, true);
		}
	},
	pageInit: function(page,store,path){
		var commit = Ext.Viewport.query(page)[0];
		if(commit != undefined){
			commit.destroy();
		}
		if(store != null){
			var store = Ext.StoreMgr.lookup(store);
			if(store != undefined){
				store.removeAll();
			}
		}
		Ext.Viewport.add(Ext.create(path));
	}
});//})