Ext.define('VisLeader.profile.Main', {
    extend: 'Ext.app.Profile',
  extend: 'Ext.app.Profile',
  config:{
    controllers: [
      'VisLeader.controller.Router',
      'VisLeader.controller.operatestatistics.StatisticsController',
      'VisLeader.controller.SignUpController',
      'VisLeader.controller.ranking.RankingController',
      'VisLeader.controller.storagecount.StorageController',
      'VisLeader.controller.recipesales.RecipeSalesController',
      'VisLeader.controller.more.MoreAppController',
      'VisLeader.controller.UpdateController',
      'VisLeader.controller.free.FreeController',
      'VisLeader.controller.showwork.ShowWorkController',
      'VisLeader.controller.native.Main'
    ]
  },
  isActive: function() {
      return true;
  },
  // launch: function () {
  //     console.log('fire launch');
  //       Ext.fly('appLoadingIndicator').destroy();
  //       if (Ext.browser.is.Cordova) {
  //           navigator.splashscreen.hide();
  //       }
  //       if (Ext.os.is('Android')) {
  //         document.addEventListener("backbutton", Ext.bind(onBackKeyDown, this), false);

  //         function onBackKeyDown(eve) {
  //           // eve.preventDefault();
  //           var exit_flag = localStorage.exit_flag || 0;
  //           if(Ext.Viewport.getActiveItem().id=="ext-main-1"){
  //             if (exit_flag == 0) {
  //               Toast.toast("再按一次 退出程序");
  //               localStorage.exit_flag = 1;
  //               Ext.Function.defer(function() {
  //                 localStorage.exit_flag = 0;
  //               }, 2000);
  //             } else {
  //               localStorage.exit_flag = 0;
  //               navigator.app.exitApp();
  //             }
  //           }else{
  //             if(Ext.Viewport.query('freePanel')[0] != undefined){
  //               Ext.Viewport.query('freePanel')[0].destroy();
  //             }else if(Ext.Viewport.query('executePanel')[0] != undefined){
  //               Ext.Viewport.query('executePanel')[0].destroy();
  //             }else{
  //               history.back();
  //             }
  //           }
  //         }
  //       }
  //   }
});