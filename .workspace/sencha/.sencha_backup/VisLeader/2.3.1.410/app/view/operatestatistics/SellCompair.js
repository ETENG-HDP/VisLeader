Ext.define('VisLeader.view.operatestatistics.SellCompair', {
    extend: 'Ext.chart.Chart',
  requires: [
    'Ext.chart.interactions.PanZoom',
    'Ext.chart.series.Bar', 
    'Ext.chart.axis.Numeric', 
    'Ext.chart.axis.Category',
    'Ext.chart.interactions.ItemHighlight',
    'BcpBoss.model.RecentSellModel'
  ],
  xtype: 'sellcompair',
  config: {
  	colors: ['#953364','#9A97FE'],
    //background: 'white',
    minHeight: 200,
  	series: [{
  		type: 'bar',
      stacked: false,//该属性每项显示多条用
      xField: 'sell_date',//x轴
      yField: ['current_sell', 'plan_sell'],//y轴字段
      label: {
        field: ['current_sell', 'plan_sell'],//item顶端数据字段
        display: 'insideEnd',//outside.insideEnd
        color: '#000'
      },
      
      style: {//item样式
        // stroke: 'rgb(0,200,40)',
        lineWidth: 0,
        inGroupGapWidth: 0,
        //shadowColor: 'black',//阴影
        //shadowOffsetX: 3,//偏移量
        //shadowOffsetY: 3,
        minGapWidth: 20,
        maxBarWidth: 50,

      }
  	}],
  	axes: [{//y轴比例尺
      type: 'numeric',
      position: 'left',
      //fields: ['current_sell', 'plan_sell'],
      grid: {
        odd: {
            fill: '#e8e8e8'
        }
      },
      label: {
        rotate: {
            degrees: -30
        }
      }
    }, {//x轴比例尺
      type: 'category',
      position: 'bottom',
      fields: 'sell_date',
      // title: {
      //   text: '近三个月任务量和开单量对比'
      // },
      visibleRange: [0, 1],//全部数据在一个页面展示
    }],

    // === store ===
  }
});