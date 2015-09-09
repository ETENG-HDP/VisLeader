Ext.Date.monthNames = [ //将英文的月份修改成数字
       '1', '2', '3', '4', '5', '6',     
       '7', '8', '9', '10', '11', '12'    
    ];
{{#class 'Ext.Container'}}
	requires: [
		'Ext.TitleBar',
		'Ext.form.FieldSet',
		'Ext.field.Select',
		'Ext.field.Number',
		'Ext.field.TextArea'
	],
	xtype:'freeApplication',
	alias: 'widget.freeApplication',
	alternateClassName: 'freeApplication',
	name:'freeApplication',
	initialize: function() {
		this.callParent(arguments);
	},
	config: {
        scrollable: {
			direction: 'vertical',
			indicators: false
		},

        cls:'card card1',
		layout: 'fit',
		items: [{
			xtype: 'toolbar',
			ui: 'light',
			title: '费用申请',
			docked: 'top',
			items: [{
                xtype: 'button',
                ui: 'plain',
				iconCls: 'bcp-backbutton',
                action: 'freeApplicationBack',
                listeners:{
                	tap: function(){
                		Ext.Viewport.fireEvent('freeApplicationBack');
                	}
                }
            }
            ,{
            	xtype:'spacer'
            }, {
                xtype: 'button',
                ui: 'plain',
                iconCls: 'bcp-commitbutton',
                action: 'freeApplicationCommit'
            }
            ]
		 },
		 {
		 	xtype:'formpanel',
		 	scrollable: {
				direction: 'vertical',
				indicators: false
			},
		 	layout:'vbox',
		 	items:[
		 	{
		 		xtype:'fieldset',
		 		name:'free_application_from_1',
		 		items:[
		 			// {
		 			// 	xtype: 'textfield',
						// name: 'free_user_id',
						// label: '经&nbsp;&nbsp;销&nbsp;&nbsp;商：',
						// readOnly:true
		 			// },
		 			{
		 				xtype: 'selectfield',
						name:'free_type',
						usePicker: false,
						autoSelect: false,
						placeHolder: '请选择相关预算',
						label: '费用预算：',
						options: [],
						listeners:{
							change:function( select, newValue, oldValue, eOpts ){
								console.log(select);
								console.log(newValue);
								console.log(oldValue);
								Ext.Viewport.fireEvent('queryBudget', select, newValue);
							}
						}
		 			}
		 		]
		 	},
		 	{
		 		xtype:'fieldset',
		 		style:'margin-top: -1em;',
		 		items:[
		 			{
		 				xtype:'container',
		 				layout:'vbox',
		 				// hidden: true,
		 				items:[
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
								        cls: 'text-size-eight',
								        style: 'padding-left: 1em;color:gray;',
								        width: '40%'
								    },
								    {
								        xtype: 'label',
								        name: 'freeapplication_budget_amount',
								         cls: 'text-size-eight',
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
								        name: 'freeapplication_budget_width',
								        style: 'height:1em;margin-bottom: 0.5em;background: #115fa6;margin-right: 1.5em;',
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
								    style: 'padding-top: 0.5em;',
								    items: [
								    {
								        xtype: 'label',
								        html:'实际可用费用',
								        cls: 'text-size-eight',
								        style: 'padding-left: 1em;color:gray',
								        width: '40%'
								    },
								    {
								        xtype: 'label',
								        html:'0.00',
								        cls: 'text-size-eight',
								        name:'freeapplication_available_amount',
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
								        name: 'freeapplication_available_width',
								        style: 'height:1em;margin-bottom: 0.5em;background: #94ae0a;margin-right: 1.5em;',
								        width: '0%'
								    }]
								}
								]
							},
							{
								xtype: 'container',
							    layout: 'vbox',
							    items: [
							    {
								    xtype: 'container',
								    layout: 'hbox',
								    style: 'padding-top: 0.5em;',
								    items: [
								    {
								        xtype: 'label',
								        html:'<font style = "color : #a61120;">●</font>待审核',
								        cls: 'text-size-eight',
								        style: 'padding-left: 1em;color:gray',
								        width: '24%'
								    },
								    {
								        xtype: 'label',
								        html:'<font style = "color : #ff8809;">●</font>未执行',
								        cls: 'text-size-eight',
								        style: 'color:gray',
								        width: '20%'
								    },
								    {
								        xtype: 'label', 
								        html:'<font style = "color : #ffd13e">●</font>已执行',
								        cls: 'text-size-eight',
								        style: 'color:gray',
								        width: '20%'
								    },
								    {
								        xtype: 'label',
								        name: 'freeapplication_total_count',
								        html:'0.00',
								        cls: 'text-size-eight',
								        style: 'text-align: right;padding-right: 0.5em;color: rgb(31, 31, 31);',
								        width: '36%'
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
								        name: 'freeapplication_not_audit',
								        style: 'height:1em;margin-bottom: 0.5em;background: #a61120',
								        width: '0%'
								    },
								    {
								        xtype: 'label', 
								        name: 'freeapplication_already_audit',
								        style: 'height:1em;margin-bottom: 0.5em;background: #ff8809;',
								        width: '0%'
								    },
								    {
								        xtype: 'label', 
								        name: 'freeapplication_already_execute',
								        style: 'height:1em;margin-bottom: 0.5em;background: #ffd13e;margin-right: 1.5em;',
								        width: '0%'
								    }
								    ]
								}
								]
							}
		 				]
		 			}
			 	]
		 	},
		 	{
		 		xtype:'fieldset',
		 		name:'free_application_from_2',
		 		style:'margin-top: -1em;',
		 		items:[
		 			{
		 				xtype: 'selectfield',
						name: 'free_item',
						label: '申&nbsp;&nbsp;请&nbsp;&nbsp;项：',
						usePicker: false,
						options: [
						{
							text: '现场有奖促销',
							value: '1'
						},{
							text:'订货会',
							value:'2'
						},{
							text:'广告费',
							value:'3'
						},{
							text:'收款会',
							value:'4'
						},{
							text:'新产品发布会',
							value:'5'
						},{
							text:'年终答谢会',
							value:'6'
						},{
							text:'现场观摩会',
							value:'7'
						},{
							text:'其他',
							value:'8'
						}]
		 			},
		 			{
						xtype: 'datepickerfield',
						value: new Date(),
						destoryPickerOnHide: true,
						dateFormat: 'Y-m-d',
						name:'free_start_date',
						label: '开始日期：',
						picker : {
							useTitles: true,
							slotOrder : ['year', 'month', 'day'],
							yearText: '年',
							monthText: '月',
							dayText: '日',
							yearTo  : new Date().getFullYear() + 1,
							doneButton : {
								text : '确定'
							},
							cancelButton : {
								text : '取消'
							}
						},
						listeners:{
							change:function(pick, newData,oldData, eOpts ){
								var component = Ext.Viewport.query('datepickerfield[name = free_end_date]')[0];
								if(component != undefined){
									var newvalue = parseInt(Ext.Date.format(this.getValue(),'Ymd'));//开始日期
									var value = parseInt(Ext.Date.format(component.getValue(),'Ymd'));//结束日期
									if(value < newvalue){
										this.setValue(component.getValue());
										ViewSwitch.toast('开始日期不允许大于结束日期', 1000);
										console.log(value+'  '+newvalue);
									}
								}
							}
						}
					},
					{
						xtype: 'datepickerfield',
						value: new Date(),
						destoryPickerOnHide: true,
						dateFormat: 'Y-m-d',
						name:'free_end_date',
						label: '结束日期：',
						picker : {
							useTitles: true,
							slotOrder : ['year', 'month', 'day'],
							yearText: '年',
							monthText: '月',
							dayText: '日',
							yearTo  : new Date().getFullYear() + 1,
							doneButton : {
								text : '确定'
							},
							cancelButton : {
								text : '取消'
							}
						},
						listeners:{
							change:function(pick, newData,oldData, eOpts ){
								var component = Ext.Viewport.query('datepickerfield[name = free_start_date]')[0];
								if(component != undefined){
									component.fireEvent('change');
								}
							}
						}
					}
				]
		 	},
		 	{
		 		xtype:'fieldset',
		 		name:'free_application_from_3',
		 		style:'margin-top: -1em;',
		 		items:[
		 			{
		 				xtype: 'numberfield',
						name: 'free_total_amount',
						label: '申请总额：',
		 			},
		 			{
	                    xtype: 'textareafield',
	                    placeHolder:'<请填写备注信息>',
	                    name: 'free_note'
	                }
				]
		 	}]
		}]
	}
{{/class}}