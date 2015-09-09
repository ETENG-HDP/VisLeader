Ext.define('VisLeader.view.operatestatistics.KanDanLiang', {
    extend: 'Ext.Component',
  xtype: 'kandanliang',
  config: {
    cls: 'kandanliang',
  	tpl: [
  	  '<tpl for=".">',
  	    '<a class="wrapper {type}" href="#{url}">',
          '<div class="{innertype}">',
            '<div class="description">{id}</div>',
            '<div class="value">{num}<span class="size">t</span>',
            '<div class="sale-size {visible}">',
              //'<span>自销：{self_sale}</span>',
              //'<span style="margin-left: 1em">贸易：{trade_sale}</span>',
            '</div>',
            '</div>',
          '</div>',
        '</a>',
  	  '</tpl>'
  	].join(""),
    
  }
});