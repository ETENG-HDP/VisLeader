Ext.define('VisLeader.view.operatestatistics.CompleteRate', {
    extend: 'Ext.Component',
  xtype: 'completerate',
  config: {
  	cls: 'kandanliang',
    tpl: [
      '<tpl for=".">',
        '<a class="wrapper {type}" href="#{url}">',
          '<div class="{innerclass}">',
            '<div class="description" >{title}</div>',
            '<div class="value">{rate}</div>',
          '</div>',
        '</a>',
      '</tpl>'
  	].join(""),

  }
});