Ext.define('VisLeader.controller.Router', {
    extend: 'ETFramework.app.Controller',
  
  requires: [
  	'VisLeader.util.Config',
  	'VisLeader.util.CssTransition',
    'VisLeader.view.PhotoView',
    'VisLeader.view.showwork.WorkDetailsView',
    'BcpBoss.view.showwork.Center',
  ],
  config:{
    views: [
      'showwork.WorkDetailsView',
      'free.FreeApplication',
      'free.FreeShot',
      'free.FreeExecute',
      'account.SignIn',
      'account.SignUp',
      'UpdateUrl',
      'Main',
    ],
    routes:{
      '': 'entry',
      'signin': 'signin',
      'signup': 'signup',
      'main': 'main',
      'year': 'year',
      'month/rate': 'monthrate',
      'month/number': 'monthnum',
      'week': 'week',
      'today': 'today',
      'usersell': 'usersell',
      'userrate': 'userrate',
      'regionsell': 'regionsell',
      'regionrate': 'regionrate',
      'agencysell': 'agencysell',
      'agencyrate': 'agencyrate',
      'recipe': 'recipe',
      'productstore': 'productstore',
      'saledetail': 'saledetail',
      'bcp/freecheck': 'freeCheck',
      'bcp/freedetail': 'freeDetail',
      'bcp/bigpicture': 'bigPicture',
      'bcp/freeapplication': 'freeApplication',
      'bcp/freeshot': 'freeShot',
      'bcp/freeexecute': 'freeExecute',
      'bcp/workdetailsview': 'workDetailsView',
      'bcp/updateurl':'updateUrl',
      'bcp/center':'center'
    }
  },

  //分配方产品销售明细
  showWorkView: function(){
    this.jumpTo('showWorkView');
  },
  saledetail: function(){
    this.jumpTo('saledetailorder');
    // //this.jumpTo 'testview'
  },
  //分产品展示
  productstore: function(){
    this.jumpTo('productionstore');
  },
  //配方选择界面
  recipe: function(){
    this.jumpTo('selectrecipe');
  },
  //业代销量
  usersell: function(){
    Ext.Viewport.fireEvent('usersell');
    this.jumpTo('detailinfo');
  },
  //业代任务完成率
  userrate: function(){
    Ext.Viewport.fireEvent('userrate');
    this.jumpTo('detailinfo');
  },
  //中心销量
  regionsell: function(){
    Ext.Viewport.fireEvent('regionsell');
    this.jumpTo('detailinfo');
  },
  //中心任务完成率
  regionrate: function(){
    Ext.Viewport.fireEvent('regionrate');
    this.jumpTo('detailinfo');
  },
  //经销商销量
  agencysell: function(){
    Ext.Viewport.fireEvent('agencysell');
    this.jumpTo('detailinfo');
  },
  //经销商任务完成率
  agencyrate: function(){
    Ext.Viewport.fireEvent('agencyrate');
    this.jumpTo('detailinfo');
  },
  //年累计完成率
  year: function(){ 
    Ext.Viewport.fireEvent('year');
    this.jumpTo('detailinfo');
  },
  //月累计完成率
  monthrate: function(){ 
    Ext.Viewport.fireEvent('monthrate');
    this.jumpTo('detailinfo');
  },
  //月销量
  monthnum: function(){ 
    Ext.Viewport.fireEvent('monthnum');
    this.jumpTo('detailinfo');
  },
  //周销量
  week: function(){
    Ext.Viewport.fireEvent('week');
    this.jumpTo('detailinfo');
  },
  //日销量
  today: function(){
    Ext.Viewport.fireEvent('today');
    this.jumpTo('detailinfo');
  },
  entry: function(){ //退出应用
    if(this.enter()){
      if(Ext.browser.is.Cordova){
        navigator.app.exitApp()
      }else{
        alert('这一步会在手机中导致应用退出');
        return;
      }
    }
    if (this.signIn()){
      this.redirectTo('main');
      Ext.Viewport.fireEvent('appinit');
    }else{
      this.redirectTo('signin');
    }
    this.enter(true);
  },
  main: function(){
    this.jumpTo('main');
  },
  signin: function(){
    this.jumpTo('signin');
  },
  signup: function(){
    this.jumpTo('signup');
  },
  freeCheck: function(){
    this.jumpTo('freeCheck');
  },
  freeDetail: function(){
    this.jumpTo('freeDetail');
  },
  bigPicture: function(){
    this.jumpTo('photoview');
  },
  freeApplication: function(){
    this.jumpTo('freeApplication');
  },
  freeShot: function(){
    this.jumpTo('freeShot');
  },
  freeExecute: function(){
    this.jumpTo('freeExecute');
  },
  workDetailsView: function(){
    this.jumpTo('workDetailsView');
  },
  updateUrl: function(){
    this.jumpTo('updateUrl');
  },
  center: function(){
	this.jumpTo("center");  
  },
  jumpTo: function(xtype) {
    var error;
    try {
      console.log(xtype);
      this.showView(xtype);
    } catch (_error) {
        error = _error;
        console.log(error);
        console.error(error.message);
        return this.back();
    }
  }
});