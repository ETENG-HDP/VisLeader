//饼图
Ext.define('VisLeader.view.recipesales.RecipeSalePie', {
    extend: 'Ext.Panel',
	requires: [
		'Ext.chart.series.Pie',
		'Ext.chart.interactions.Rotate',
		'Ext.chart.interactions.ItemHighlight',
		'Ext.chart.PolarChart'
	],
	xtype: 'recipepiechart',
	config: {
		cls: 'card1',
		layout: 'fit',
		items: [{
			xtype: 'polar',
			listeners: {
				show: function() {
					console.log('cdddddd');
					console.log(this.getStore());
				}
			},
	  	//interactions: ['rotate', 'itemhighlight'],
	  	// legend: {//图例
	  	// 	// bottom: 0,
	  	// 	docked: 'right',
	  	// },
	  	colors: ['#B15BFF', '#ff7575', '#6A6AFF', '#00FFFF', '#79FF79', '#FF95CA', '#FF9D6F', '#C2FF68', '#FFE66F', '#C07AB8', '#81C0C0'],
	  	store: 'recipproductsalestore',
	  	innerPadding: 45,
	  	series: [{
	  		type: 'pie',
	  		// title: ['dddd'],
	  		// subStyle: {
     //        //fill: ['blue', 'green', 'red']
     //    },
	  		xField: 'previous_sales',//比例数据
	  		label: {
	  			field: ['region_name'],//显示的数据
	  			//display: 'rotate'
	  		},
	  		donut: 0,//设置环形内圆半径

	  		// style: {
	  			//stroke: 'white',
	  			//miterLimit: 10,
	  			//lineCap: 'miter',
	  			//linewidth: 0,
	  		// }
	  	}],

	  	axes: []
		}]
	}

});