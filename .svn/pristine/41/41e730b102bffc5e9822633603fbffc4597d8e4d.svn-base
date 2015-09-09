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
{{#class 'Ext.tab.Panel'}}
  xtype: 'main',
  requires: [
    '{{view "operatestatistics.Statistics"}}',
    '{{view "operatestatistics.DetailInfo"}}',
    '{{view "rankingcount.RankingItem"}}',
    '{{view "storagecount.CurrentStoreView"}}',
    '{{view "recipesales.RecipeSalesOrder"}}',
    '{{view "more.MoreApp"}}'

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
{{/class}}