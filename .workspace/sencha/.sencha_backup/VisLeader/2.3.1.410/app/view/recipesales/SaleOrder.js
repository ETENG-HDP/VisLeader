Ext.define('VisLeader.view.recipesales.SaleOrder', {
    extend: 'Ext.dataview.List',
  xtype: 'saleorder',
  config: {
  	cls: 'product',
		itemTpl: [
      '<div class="prosale">',
        '<div class="title">',
          '<div class="pro_block"></div>',
          '<div class="pro_name">{region_name}</div>',
          '<div class="pro_sale">{sales_num}</div>',
        '</div>',
        '<div class="block">',
          '<span class = "percent" style="width: {bilv};background-color: {temp};"></span>',
        '</div>',
      '</div>'
    ].join(""),
  }
});