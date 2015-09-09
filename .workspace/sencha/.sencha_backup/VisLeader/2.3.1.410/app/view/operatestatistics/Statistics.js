Ext.define('VisLeader.view.operatestatistics.Statistics', {
    extend: 'Ext.Container',
  requires: [
    'VisLeader.view.operatestatistics.KanDanLiang',
    'VisLeader.view.operatestatistics.RecentSell',
    'VisLeader.view.operatestatistics.CompleteRate',
    'VisLeader.view.operatestatistics.SellCompair'
  ],
  xtype: 'statisics',
  config: {
  	scrollable: true,
  	items: [{
  		xtype: 'titlebar',
  		title: '运营统计',
  		docked: 'top',
  		ui: 'light'  		
  	}, {
      margin: '0em 0.3em 0em 0.3em',
  		xtype: 'kandanliang',
      listeners: {
        painted: function() {
          Ext.Viewport.fireEvent('kaidanliang');
        }
      },
  	}, {
      cls: 'title',
      margin: '0.5em 0.3em 0em 0.3em',
      html: '近七天开单量'
    }, {
      margin: '0.5em 0.3em 0em 0.3em',
      xtype: 'recentsell',
      name: 'sellnum',
      store: {
        storeId: 'sellnumstore', 
        model: 'VisLeader.model.RecentSellModel',
        autoSync: true,
        autoLoad: true
      },
      listeners: {
        painted: function() {
          //console.log(Ext.Date.format(new Date('2014-05-06'), 'm/d'));//日期格式化
          Ext.Viewport.fireEvent('recentsell');
        }
      }
  	}, {
      margin: '0.3em 0.3em 0em 0.3em',
  		xtype: 'completerate'
  	}, {
      cls: 'title',
      margin: '0.5em 0.3em 0em 0.3em',
      html: '近三个月销量与任务量对比'
    }, {
      margin: '0.5em 0.3em 0em 0.3em',
  		xtype: 'sellcompair',
      name: 'sellrate',
      store: {
        storeId: 'sellcompairtore', 
        model: 'VisLeader.model.RecentSellModel',
        autoSync: true,
        autoLoad: true
      },
      listeners: {
        painted: function() {
          //console.log(Ext.Date.format(new Date('2014-05-06'), 'm/d'));//日期格式化
          Ext.Viewport.fireEvent('sellCompair');
        }
      }
  	}]
  }
});