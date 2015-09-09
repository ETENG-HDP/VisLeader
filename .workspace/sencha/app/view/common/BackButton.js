Ext.define('VisLeader.view.common.BackButton', {
    extend: 'Ext.Button',
  	xtype:'backbutton',
	config:{
	    iconCls: 'arrow_left',
	    handler:function(){
	      history.back();
	    }
	}
});