/**对话框的汉化*/
var MB = Ext.MessageBox;
Ext.apply(MB, {
  YES: {
    text: '确定',
    itemId: 'yes',
    ui: 'action'
  }
});
Ext.apply(MB, {
  NO: {
    text: '取消',
    itemId: 'no'
  }
});
Ext.apply(MB, {
  YESNO: [Ext.MessageBox.NO, Ext.MessageBox.YES]
});
Ext.apply(MB, {
  OK: {
    text: '确定',
    itemId: 'ok'
  }
});
Ext.define('VisLeader.view.Main', {
    extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'VisLeader.view.operatestatistics.Statistics',
    'VisLeader.view.operatestatistics.DetailInfo',
    'VisLeader.view.rankingcount.RankingItem',
    'VisLeader.view.storagecount.CurrentStoreView',
    'VisLeader.view.recipesales.RecipeSalesOrder',
    'VisLeader.view.more.MoreApp'

  ],
  config: {
    tabBarPosition: 'bottom',
    ui: 'light',
    items: [{
      iconCls: 'home',
      title: '主页',
      xtype: 'statisics'
      
    }, {
      iconCls: 'compose',
      title: '排行统计',
      xtype: 'rankingitem'
    }, {
      iconCls:'favorites',
      title: '配方销量',
      xtype: 'recipesaleorder'
    }, {
      iconCls: 'bookmarks',
      title: '仓库',
      xtype: 'currentstoreview'
    }, {
      iconCls: 'more',
      title: '更多',
      xtype: 'moreApp',
    }]
  }
});