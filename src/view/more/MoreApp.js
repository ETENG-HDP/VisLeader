{{#class 'Ext.dataview.DataView'}}
	xtype: 'moreApp',
	requires: ['{{store "MoreAppStore"}}','Ext.Loader'],
	config: {
		store: 'MoreAppStore',
		disableSelection: true,
		scrollable: {
		    direction: 'vertical',
		    directionLock: true
		},
		height: '100%',
		items: [{
			xtype: 'titlebar',
			title: '更多',
			ui: 'light',
			docked: 'top',
			items: [{
				xtype: 'button',
				action: 'set',
				align: 'left',
				ui: 'plain',
				hidden: true,
				iconCls: 'more'
			}]
		}, {	
			xtype:'container',
			height:'9em',
			style: 'margin-top:1em',
			html:'<p id="QRZXWcode" align="center" ></p>'
		},{
			xtype: 'container',
			name: 'more_container',
			items:[
			       {
			    	    xtype: 'img',
					    name: 'more_user',
						height:'3em',
						html:[
								'<div style="width: 18em;vertical-align:middle;text-align:center; margin: 0.5em 0em 0em 0em; ">',
										'<span style="margin:0em 0em 0em 0.5em" >'+localStorage.user_name+'</span>',
								'</div>'	
						].join("")
			       	}]
		}],
		itemCls: 'more_app_item',
		inline: true,
		itemTpl: [
		// '<div style="padding: 0.5em 0em 0em 1.1em"><div><img style ="width:3.5em; height:3.5em " src={app_src}></div>',
		// 	'<div style="font-size: 16px;text-align: center;">{app_name}</div></div>'
			'<div style = "text-align: center;"><span style = "width: 100%;"><img style ="height: 4em;width: 80%;margin-left: 10%;margin-right: 10%;padding-top: 5%;" src={app_src}></span><span style="font-size: 0.8em;">{app_name}<span></div>'
		].join("")
	}
{{/class}}
//})