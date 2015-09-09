/*Ext.define('BcpBoss.view.free.ExecutePanel', {
	extend: 'Ext.Panel',*/
Ext.define('VisLeader.view.free.ExecutePanel', {
    extend: 'Ext.Panel',
	alias: 'widget.executePanel',
	config: {
	    modal: true,
	    hideOnMaskTap: true,
	    centered: true,
	    // docked:'bottom',
	    layout: 'vbox',
	    style: 'background:white; padding:0;/* margin-top:25em;*/position:absolute;bottom:0;',
	    width: '80%',
	    listeners: {
	    	erased: function(panel) {
	    		if(panel) {
	    			Ext.Viewport.remove(panel,true);
	    		}
	    	}
	    },
	    defaults: {
	    	style: 'background:white; border-radius:3em;color:#000;'
	    },
	    items: [{
	    	xtype: 'button',
	    	ui: 'plain',
	    	height: '3em',
	    	//text: '拍照',
	    	border:'0.1em',
	    	html: ['<div>',
						'<span style="border: solid 0.15em #81C057;padding: 0.7em 7em;border-radius: 0.3em;font-size: 0.8em;color: #81C057;">拍照上传</span>',
				   '</div>'
			].join(""),
	    	listeners: {
	    		tap: function() {
	    			var store = Ext.StoreMgr.lookup('sharepicstoreb');
	    			var component = Ext.Viewport.query('button[action = freeExecuteCommit]')[0];
	    			var dataview = Ext.Viewport.query('dataview[name = executePhotoWall]')[0];
	    			var view = Ext.Viewport.query('executePanel')[0];
	    			UploadFile.takePhoto(store,component,dataview,90,false);
	    			if(view){
	    				view.destroy();
	    			}
	    		}
	    	}
	    }
	    // ,{
	    // 	html:'<hr style="border:0;background-color:#6C6C6C;height:1px;">',
	    // }
	    ,{
	    	xtype: 'button',
	    	ui: 'plain',
	    	height: '3em',
	    	html: ['<div>',
						'<span style="border: solid 0.15em #81C057;padding: 0.7em 5em;border-radius: 0.3em;font-size: 0.8em;color: #81C057;">从相册中选择上传</span>',
				   '</div>'
			].join(""),
	    	border:'0.1em',
	    	listeners: {
	    		tap: function() {
	    			var store = Ext.StoreMgr.lookup('sharepicstoreb');
	    			console.log(store);
	    			var component = Ext.Viewport.query('button[action = freeExecuteCommit]')[0];
	    			var dataview = Ext.Viewport.query('dataview[name = executePhotoWall]')[0];
	    			var view = Ext.Viewport.query('executePanel')[0];
	    			UploadFile.selectPicture(store,component,dataview,90);
	    			if(view){
	    				view.destroy();
	    			}
	    		}
	    	}
	    },
	    {
	    	xtype: 'button',
	    	ui: 'plain',
	    	height: '3em',
	    	// text: '相册',
	    	html: ['<div>',
						'<span style="border: solid 0.15em #A8A8A8;padding: 0.7em 8em;border-radius: 0.3em;font-size: 0.8em;color: #A8A8A8;">取消</span>',
				   '</div>'
			].join(""),
	    	border:'0.1em',
	    	listeners: {
	    		tap: function() {
	    			var view = Ext.Viewport.query('executePanel')[0];
	    			if(view){
	    				view.destroy();
	    			}
	    		}
	    	}
	    }
	    ]
	}
});/*});*/