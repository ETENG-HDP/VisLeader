Ext.define('VisLeader.view.free.FreeDetail', {
    extend: 'Ext.Container',
	xtype: 'freeDetail',
	requires: [
	],
	config: {
		layout: 'fit',
		style: 'background-color:#f7f7f7',
		items: [{
					xtype: 'titlebar',
					title: '费用详情',
					ui: 'light',
					docked: 'top',
					items: [
					{
		                xtype: 'button',
		                ui: 'plain',
        				iconCls: 'bcp-backbutton',
		                align:'left',
		                action: 'freeDetailBack'
		            }, {
		                xtype: 'spacer'
		            }, {
		                xtype: 'button',
		                iconCls: 'bcp-commitbutton',
		                hidden:true,
		                ui: 'plain',
		                align:'right',
		                action: 'freeDetailCommit'
		            }
				]
			},
			{
				xtype: 'container',
				name: 'freeAuditContainer',
				style: 'background: rgb(237, 237, 237);',
	            docked: 'bottom',
	            layout: 'hbox',
	            items:[
	            	{
	            		xtype: 'button',
		                style: 'border-radius: 0.2em;webkit-border-radius: 0.2em;min-height: 2.5em;border: 0px;margin: 0.5em 2%;padding: 0em;background: tomato;',
		                ui: 'confirm',
		                iconCls: 'bcp-closebutton',
		                width: '16%',
		                action: 'freeAuditClose'
	            	},
		            {
		                xtype: 'button',
		                style: 'border-radius: 0.2em;webkit-border-radius: 0.2em;min-height: 2.5em;border: 0px;margin: 0.5em 2%;padding: 0em;background: cornflowerblue;',
		                ui: 'confirm',
		                text: '费用审批',
		                width: '36%',
		                action: 'freePass'
		        	},
					{
		                xtype: 'button',
		                style: 'border-radius: 0.2em;webkit-border-radius: 0.2em;min-height: 2.5em;border: 0px;margin: 0.5em 2%;padding: 0em;background: olivedrab;',
		                ui: 'confirm',
		                text: '费用审核',
		                width: '36%',
		                action: 'freeAudit'
		        	}
	        	]
	        },
	        {
                xtype: 'button',
                docked: 'bottom',
                style: 'border-radius: 0em;webkit-border-radius: 0em;min-height: 2.8em;border: 0px;margin: 0em;padding: 0em;',
                ui: 'confirm',
                html: '费用执行',
                action: 'freeExecute'
        	},
	        {
   				xtype: 'img',
   				name: 'freedetail_state',
   				style: 'height: 2.8em;padding: 0.7em;font-weight: bold;background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, rgb(222, 222, 222)), color-stop(1, rgb(178, 178, 178)));',
   				docked: 'bottom',
   				html: '<img style="width:1.2em;height:1.2em;vertical-align: middle;" src="resources/icons/yellow_10.png"><span>待审核</span>'
   				// html: [
   				//     '<img style="width:1.2em;vertical-align: middle;" src="resources/icons/yellow_10.png">',
   				//     '<span>待审核</span>'
   				// ].join('')
   			},
			{
			    xtype: 'container',
			    style:'background: white;',
			    layout: 'vbox',
			    scrollable: {
			        direction: 'vertical',
			        indicators: false
			    },
			    items:[
			    	{
					    xtype: 'container',
					    layout: 'vbox',
					    items: [
					    	{
							    xtype: 'label',
							    html: '荏平县田源丰种植管理中心',
							    name: 'freedetail_customer',
							    style: 'padding-top: 0.7em;padding-bottom: 0.5em;padding-left: 1em;border-bottom: dotted 0.11em rgb(207, 207, 207);',
							    width: '100%'
							},
							{
							    xtype: 'label',
							    html: '申请金额',
							    style: 'padding-top: 0.8em;padding-left: 1em;color: gray;',
							    width: '100%'
							},
							{
                                xtype: 'label',
                                html: '100000.00',
                                style: 'text-align: right;margin-left: 0.5em;padding-bottom: 0.1em;padding-right: 0.7em;font-size: 2.5em;border-bottom: solid 0.06em rgb(208, 208, 208);',
                                name: 'freedetail_total_amount',
                                width: '100%'
                            },
                            {
							    xtype: 'container',
							    layout: 'hbox',
							    style: 'padding-top: 0.8em;',
							    items:[{
	                            	xtype: 'label',
	                                html: '申请项目',
	                                style: 'padding-left: 1em;color: gray;',
	                                width: '70%'
	                            },
							    {
							        xtype: 'image',
							        name: 'freedetail_image_view',
	                                html: '图片查看',
	                                style: 'color: blue;text-align: right;padding-right: 0.5em;',
	                                width: '30%'
							    }]
							},
                            {
                            	xtype: 'label',
                                html: '广告费',
                                name: 'freedetail_item',
                                style: 'margin-left: 1em;color: rgb(31, 31, 31);padding-top: 0.6em;padding-bottom: 0.6em;',
                                width: '100%'
                            },
						    {
						        xtype: 'label',
						        style: 'margin-left: 1em;color: rgb(31, 31, 31);padding-bottom: 0.6em;',
						        html: '',
						        name: 'freedetail_date',
						        width: '100%'
						    },
						    {
							    xtype: 'container',
							    style: 'padding-bottom: 0.5em;',
							    layout: 'hbox',
							    items:[{
							        xtype: 'label', 
							        style: 'padding-left: 1em;color: gray;',
							        html: '单据编号',
							        width: '30%'
							    },
							    {
							        xtype: 'label',
							        style: 'color: rgb(31, 31, 31);text-align: right;padding-right: 0.5em;',
							        html: '',
							        name: 'free_document_code',
							        width: '70%'
							    }]
							},
						    {
							    xtype: 'container',
							    style: 'padding-bottom: 0.5em;',
							    layout: 'hbox',
							    items:[{
							        xtype: 'label', 
							        style: 'padding-left: 1em;color: gray;',
							        html: '备　　注',
							        width: '30%'
							    },
							    {
							        xtype: 'label',
							        style: 'color: rgb(31, 31, 31);text-align: right;padding-right: 0.5em;',
							        html: '无',
							        name: 'freedetail_application_remark',
							        width: '70%'
							    }]
							},
							{
							    xtype: 'container',
							    name: 'dataview_execute_bar',
							    layout: 'vbox',
							    items:[
							    {
	                            	xtype: 'label',
	                                html: '执行信息',
	                                style: 'margin-left: 1em;color: gray;padding-top: 0.8em;border-top: solid 0.15em rgb(208, 208, 208);',
	                                width: '100%'
	                            },
							    {
								    xtype: 'container',
								    layout: 'hbox',
								    style: 'padding-top: 0.5em;padding-bottom: 0.5em;',
								    items:[{
								        xtype: 'label', 
								        style: 'padding-left: 1em;color: gray;',
								        html: '执行金额',
								        width: '30%'
								    },
								    {
								        xtype: 'label',
								        style: 'color: rgb(31, 31, 31);text-align: right;padding-right: 0.5em;',
								        html: '1000.00',
								        name: 'freedetail_execute_expense',
								        width: '70%'
								    }]
								},
								{
								    xtype: 'container',
								    layout: 'hbox',
								    style: 'padding-bottom: 0.5em;',
								    items:[{
								        xtype: 'label', 
								        style: 'padding-left: 1em;color: gray;',
								        html: '执行日期',
								        width: '30%'
								    },
								    {
								        xtype: 'label',
								        style: 'color: rgb(31, 31, 31);text-align: right;padding-right: 0.5em;',
								        html: '2014-12-3',
								        name: 'freedetail_execute_date',
								        width: '70%'
								    }]
								},
								{
								    xtype: 'container',
								    layout: 'hbox',
								    style: 'padding-bottom: 0.5em;',
								    items:[{
								        xtype: 'label', 
								        style: 'padding-left: 1em;color: gray;',
								        html: '执行备注',
								        width: '30%'
								    },
								    {
								        xtype: 'label',
								        style: 'color: rgb(31, 31, 31);text-align: right;padding-right: 0.5em;',
								        html: '无',
								        name: 'freedetail_execute_remark',
								        width: '70%'
								    }]
								}]
							},
							{
								xtype: 'container',
							    layout: 'vbox',
							    name: 'freedetail_bar_view',
							    items: [
	                            {
	                            	xtype: 'label',
	                                html: '预算信息',
	                                style: 'margin-left: 1em;color: gray;padding-top: 0.8em;border-top: solid 0.15em rgb(208, 208, 208);',
	                                width: '100%'
	                            },
	                            {
								    xtype: 'container',
								    layout: 'hbox',
								    style: 'padding-top: 0.6em;padding-top: 0.5em;',
								    items:[{
								        xtype: 'label', 
								        style: 'padding-left: 1em;color: gray;',
								        html: '预算名称',
								        width: '30%'
								    },
								    {
								        xtype: 'label',
								        style: 'color: rgb(31, 31, 31);text-align: right;padding-right: 0.5em;',
								        html: '2014年秋季预算',
								        name: 'budget_name',
								        width: '70%'
								    }]
								},
								{
									xtype: 'container',
								    layout: 'vbox',
								    //style: 'border-top: solid 0.2em rgb(208, 208, 208);border-bottom: solid 0.16em rgb(208, 208, 208);',
								    items: [
								    {
									    xtype: 'container',
									    layout: 'hbox',
									    style: 'padding-top: 0.5em;',
									    items: [
									    {
									        xtype: 'label',
									        html:'预算总额',
									        style: 'padding-left: 1em;color:gray',
									        width: '40%'
									    },
									    {
									        xtype: 'label',
									        name: 'freedetail_budget_amount',
									        html:'0.00',
									        style: 'text-align: right;padding-right: 0.5em;color: rgb(31, 31, 31);',
									        width: '60%'
									    }
									    ]
									},
									{
									    xtype: 'container',
									    layout: 'hbox',
									    style: 'padding-top: 0.6em;padding-right: 0.5em;padding-left: 1em;',
									    items: [
									    {
									        xtype: 'label', 
									        style: 'height:1em;margin-bottom: 0.5em;background: #115fa6;margin-right: 1.5em;',
									        width: '100%'
									    }]
									}
									]
								},
								{
									xtype: 'container',
								    layout: 'vbox',
								    //style: 'border-bottom: solid 0.2em rgb(208, 208, 208);',
								    items: [
								    {
									    xtype: 'container',
									    layout: 'hbox',
									    style: 'padding-top: 0.5em;',
									    items: [
									    {
									        xtype: 'label',
									        html:'实际可用费用',
									        style: 'padding-left: 1em;color:gray',
									        width: '40%'
									    },
									    {
									        xtype: 'label',
									        html:'0.00',
									        name:'freedetail_available_amount',
									        style: 'text-align: right;padding-right: 0.5em;color: rgb(31, 31, 31);',
									        width: '60%'
									    }
									    ]
									},
									{
									    xtype: 'container',
									    layout: 'hbox',
									    style: 'padding-top: 0.6em;padding-right: 0.5em;padding-left: 1em;',
									    items: [
									    {
									        xtype: 'label', 
									        name: 'freedetail_available_width',
									        style: 'height:1em;margin-bottom: 0.5em;background: #94ae0a;margin-right: 1.5em;',
									        width: '0%'
									    }]
									}
									]
								},
								{
									xtype: 'container',
								    layout: 'vbox',
								    //style: 'border-bottom: solid 0.2em rgb(208, 208, 208);',
								    items: [
								    {
									    xtype: 'container',
									    layout: 'hbox',
									    style: 'padding-top: 0.5em;padding-left: 1em;',
									    items: [
									    {
									        xtype: 'label',
									        name: 'freedetail_this_application_text',
									        html:'<font style = "color : #a61120">●</font>本申请',
									        style: 'color:gray',
									        width: '22%'
									    },
									    {
									        xtype: 'label',
									        name: 'freedetail_not_audit_text',
									        html:'<font style = "color : #ff8809;">●</font>未审核',
									        style: 'color:gray',
									        width: '22%'
									    },
									    {
									        xtype: 'label', 
									        name: 'freedetail_not_execute_text',
									        html:'<font style = "color : #66FFCC">●</font>未执行 ',
									        style: 'color:gray',
									        width: '22%'
									    },
									    {
									    	xtype: 'label', 
									    	name: 'freedetail_already_execute_text',
									        html:'<font style = "color : #ffd13e">●</font>已执行 ',
									        style: 'color:gray',
									        width: '22%'
									    },
									    {
									        xtype: 'label',
									        name: 'freedetail_total_count',
									        html:'100000',
									        style: 'text-align: right;padding-right: 0.5em;color: rgb(31, 31, 31);',
									        width: '34%'
									    }
									    ]
									},
									{
									    xtype: 'container',
									    layout: 'hbox',
									    style: 'padding-top: 0.6em;padding-right: 0.5em;padding-left: 1em;',
									    items: [
									    {
									        xtype: 'label', 
									        name: 'freedetail_this_application',
									        style: 'height:1em;margin-bottom: 0.5em;background: #a61120',
									        width: '0%'
									    },
									    {
									        xtype: 'label', 
									        name: 'freedetail_not_audit',
									        style: 'height:1em;margin-bottom: 0.5em;background: #ff8809;',
									        width: '0%'
									    },
									    {
									        xtype: 'label', 
									        name: 'freedetail_not_execute',
									        style: 'height:1em;margin-bottom: 0.5em;background: #66FFCC;',
									        width: '0%'
									    },
									    {
									        xtype: 'label', 
									        name: 'freedetail_already_execute',
									        style: 'height:1em;margin-bottom: 0.5em;background: #ffd13e;margin-right: 1.5em;',
									        width: '0%'
									    }
									    ]
									}
									]
								}
							]}
					    ]
					}
			    ]
			}
		]
	}
});