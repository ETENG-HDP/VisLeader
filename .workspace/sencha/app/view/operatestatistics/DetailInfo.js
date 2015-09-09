Ext.define('VisLeader.view.operatestatistics.DetailInfo', {
    extend: 'Ext.dataview.List',
  requires: ['VisLeader.model.SellNumber'],
  xtype: 'detailinfo',
  config: {
  	cls: 'detailinfo',
  	disableSelection: true,
  	pressedCls: 'ddddd',
    itemTpl: [
  	    '<div class="wrapper">',
            '<div class="description {text}">{region_name}</div>',
            '<div class="bar">',
                '<div class="position ">',
                  '<span class="bar_desc">{current}</span>',
                  '<span class="num">{sales_num}</span>',
                '</div>',
                '<div class="bar_background"><div class="bar_color" style="width: {bilv}; background-color: {top_color}"></div></div>',
            '</div>',
    		'<div class="bar_t {valid}">',
                '<div class=" position">',
                  '<span class="bar_desc">{previous}</span>',
                  '<span class="num">{previous_sales}</span>',
                '</div>',
                '<div class="bar_background"><div class=" bar_color_t" style="width: {previous_bilv}; background-color: {bottom_color}"></div></div>',
            '</div>',
        '</div>'
    ].join(""),
    items: [{
      xtype: 'titlebar',
      docked: 'top',
      ui: 'light',
      items: [{
        xtype: 'button',
        ui: 'plain',
        iconCls: 'bcp-backbutton',
        align: 'left',
        handler: function() {
            history.back();
        }
      }]
    }],
    store: {
      storeId: 'detailinfostore',
    	model: 'VisLeader.model.SellNumber',
    	autoLoad: true,
      autoSync: true
    }
  }
});