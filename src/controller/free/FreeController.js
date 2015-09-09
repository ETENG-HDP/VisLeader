{{#class 'Ext.app.Controller'}}
	requires:[
		'{{view "free.FreeCheck"}}',
		'{{view "free.FreeDetail"}}',
		'{{view "free.FreeExecute"}}',
		'{{app "util.MyUtil"}}'
	],
	config: {
		view:['free.FreeApplication'],
		refs: {
			freeDetailBack: 'button[action = freeDetailBack]',
			freeAuditClose: 'button[action = freeAuditClose]',
			freeAudit: 'button[action = freeAudit]',
			freeImageView: 'image[name = freedetail_image_view]',
			budget_id:'selectfield[name=free_type]',
			application_expense: 'numberfield[name=free_total_amount]',
			application_item:'selectfield[name=free_item]',
			start_date:'selectfield[name=free_start_date]',
			end_date:'selectfield[name=free_end_date]',
			remark: 'textareafield[name=free_note]',
			freeApplicationCommit: 'button[action = freeApplicationCommit]',
			freeExecute: 'button[action = freeExecute]',
			freeExecuteCommit: 'button[action = freeExecuteCommit]',
			freePass: 'button[action = freePass]'
		},
		control: {
			'viewport': {
				allFreeScrollEndEvent: 'allFreeScrollEndEvent',
				refreshFreeStore:'refreshFreeStore',
				freeviewToDetail: 'freeviewToDetail',
				freeShotBack: 'freeShotBack',
				freeApplicationBack: 'freeApplicationBack',
				freeShotCommit: 'freeShotCommit',
				queryBudget: 'queryBudget'
			},
			freeDetailBack:{
				tap: 'freeDetailBack'
			},
			freeImageView:{
				tap: 'freeImageView'
			},
			freePass:{
				tap: 'freePass'
			},
			freeAudit:{
				tap: 'freeAudit'
			},
			freeAuditClose:{
				tap: 'freeAuditClose'
			},
			freeApplicationCommit:{
				tap: 'freeApplicationCommit'
			},
			freeExecute:{
				tap: 'freeExecute'
			},
			freeExecuteCommit:{
				tap: 'freeExecuteCommit'
			}
		}
	},
	/*****************************费用审核页面******************************/
	//费用过滤
	toFreeFilter:function(item, index, target, record, e, eOpts){
		this.redirectTo('bcp/freefilter');
	},
	//打款分页查询
	allFreeScrollEndEvent:function(listView){
		listView.getScrollable().getScroller().on({
			scrollend: this.scrollEnd,
			scope: this
		});
	},

	scrollEnd: function(scroller, x, y) {
		var freeView = Ext.Viewport.query('list[name=freeShowList]')[0];
		if (!freeView.getStore().isLoading() && y >= scroller.maxPosition.y) {
			console.log("============this====================");
			freeView.setScrollToTopOnRefresh(false);
			var length = freeView.getStore().getAllCount();
			if(length != 0) {
				this.getFree(null, length, true);
			}
		}
	},

	//刷新未审核的费用
	refreshFreeStore: function(item) {
		this.getFree(item, 0, false);
	},

	getFree:function(item, startRow, isAdd){
		if(Ext.Viewport.query('titlebar[name = freeList]')[0].getData().type == 'customer'){
			ETFramework.Backend.request ({
				bo: 'et.bcp.expenses.ExpensesBO',
				params: {
					action: 'queryByPageAudit',
					type: 1,
					pageBegin: startRow,
					pageSize: 10,
					mobile_where_part: 'AND ex_application.STATE = 1',
					user_id: localStorage.user_id
				},
				callback: function(err,flag,args) {
					console.log(arguments);
					if(err){
					}else{
						var freeStore=Ext.StoreMgr.lookup('freeStore');
						if((flag=='true'|| flag=="true"||flag== true)&&args!=undefined){
							if(isAdd && freeStore.getAllCount()>=10){
								console.log('增量刷新');
								args.forEach(function(data){
									console.log(data);
									var findFlag = freeStore.findRecord('application_id',data.application_id);
									if(findFlag==null){
										if(data.application_item==1){
											data.application_item='现场有奖促销';
										}else if(data.application_item==2){
											data.application_item='订货会';
										}else if(data.application_item==3){
											data.application_item='广告费';
										}else if(data.application_item==4){
											data.application_item='收款会';
										}else if(data.application_item==5){
											data.application_item='新产品发布会';
										}else if(data.application_item==6){
											data.application_item='年终答谢会';
										}else if(data.application_item==7){
											data.application_item='现场观摩会';
										}else if(data.application_item==8){
											data.application_item='其他';
										}
										data.ref_state = data.state;
										if(data.state==1){
											data.state='待审核';
										}else if(data.state==2){
											data.state='已通过';
										}else if(data.state==3){
											data.state='已执行';
										}else if(data.state==4){
											data.state='已关闭';
										}else if(data.state == 5){
											data.state='已报销';
										}
										data.application_expense=Number(data.application_expense).toFixed(2);
										data.customer_name = data.ref_customer_name;
										freeStore.add(data);
									}
								})			
							} else if(!isAdd){
								console.log('普通刷新');
								freeStore.removeAll();
								args.forEach(function(data){
									console.log(data);
									var findFlag = freeStore.findRecord('application_id',data.application_id);
									if(findFlag==null){
										if(data.application_item==1){
											data.application_item='现场有奖促销';
										}else if(data.application_item==2){
											data.application_item='订货会';
										}else if(data.application_item==3){
											data.application_item='广告费';
										}else if(data.application_item==4){
											data.application_item='收款会';
										}else if(data.application_item==5){
											data.application_item='新产品发布会';
										}else if(data.application_item==6){
											data.application_item='年终答谢会';
										}else if(data.application_item==7){
											data.application_item='现场观摩会';
										}else if(data.application_item==8){
											data.application_item='其他';
										}
										data.ref_state = data.state;
										if(data.state==1){
											data.state='待审核';
										}else if(data.state==2){
											data.state='已通过';
										}else if(data.state==3){
											data.state='已执行';
										}else if(data.state==4){
											data.state='已关闭';
										}else if(data.state == 5){
											data.state='已报销';
										}
										data.application_expense=Number(data.application_expense).toFixed(2);
										data.customer_name = data.ref_customer_name;
										freeStore.add(data);
									}
								})
								isAdd = true;
							}
						}else{
							if(!isAdd && args == "无最新数据"){
								freeStore.removeAll();
							}
							// Toast.toast(args, 1000);
						}
					}

					if( !flag || args.length==0 && !err ){
						Toast.toast('无更多费用', 1000);
						return;
					}
					
					if(item != null) {
						item.setState("loaded");
						item.fireEvent('latestfetched', 'fobj', 'refreshFn, you have to handle toInsert youself');
						item.snapBack();					
					}
				}
		    });
		}else if(Ext.Viewport.query('titlebar[name = freeList]')[0].getData().type == 'my'){
			ETFramework.Backend.request ({
				bo: 'et.bcp.expenses.ExpensesBO',
				params: {
					action: 'queryByPageSelf',
					type: 2,
					pageBegin: startRow,
					pageSize: 10,
					mobile_where_part: 'AND application_user = "'+localStorage.user_id+'"'
				},
				callback: function(err,flag,args) {
					console.log(arguments);
					if(err){
					}else{
						var freeStore=Ext.StoreMgr.lookup('freeStore');
						if((flag=='true'|| flag=="true"||flag== true)&&args!=undefined){
							if(isAdd && freeStore.getAllCount()>=10){
								console.log('增量刷新');
								args.forEach(function(data){
									console.log(data);
									var findFlag = freeStore.findRecord('application_id',data.application_id);
									if(findFlag==null){
										if(data.application_item==1){
											data.application_item='现场有奖促销';
										}else if(data.application_item==2){
											data.application_item='订货会';
										}else if(data.application_item==3){
											data.application_item='广告费';
										}else if(data.application_item==4){
											data.application_item='收款会';
										}else if(data.application_item==5){
											data.application_item='新产品发布会';
										}else if(data.application_item==6){
											data.application_item='年终答谢会';
										}else if(data.application_item==7){
											data.application_item='现场观摩会';
										}else if(data.application_item==8){
											data.application_item='其他';
										}
										data.ref_state = data.state;
										if(data.state==1){
											data.state='待审核';
										}else if(data.state==2){
											data.state='已通过';
										}else if(data.state==3){
											data.state='已执行';
										}else if(data.state==4){
											data.state='已关闭';
										}else if(data.state == 5){
											data.state='已报销';
										}
										data.application_expense=Number(data.application_expense).toFixed(2);
										data.customer_name = data.ref_customer_name;
										freeStore.add(data);
									}
								})			
							} else if(!isAdd){
								console.log('普通刷新');
								freeStore.removeAll();
								args.forEach(function(data){
									console.log(data);
									var findFlag = freeStore.findRecord('application_id',data.application_id);
									if(findFlag==null){
										if(data.application_item==1){
											data.application_item='现场有奖促销';
										}else if(data.application_item==2){
											data.application_item='订货会';
										}else if(data.application_item==3){
											data.application_item='广告费';
										}else if(data.application_item==4){
											data.application_item='收款会';
										}else if(data.application_item==5){
											data.application_item='新产品发布会';
										}else if(data.application_item==6){
											data.application_item='年终答谢会';
										}else if(data.application_item==7){
											data.application_item='现场观摩会';
										}else if(data.application_item==8){
											data.application_item='其他';
										}
										data.ref_state = data.state;
										if(data.state==1){
											data.state='待审核';
										}else if(data.state==2){
											data.state='已通过';
										}else if(data.state==3){
											data.state='已执行';
										}else if(data.state==4){
											data.state='已关闭';
										}else if(data.state == 5){
											data.state='已报销';
										}
										data.application_expense=Number(data.application_expense).toFixed(2);
										data.customer_name = data.ref_customer_name;
										freeStore.add(data);
									}
								})
								isAdd = true;
							}
						}else{
							if(!isAdd && args == "无最新数据"){
								freeStore.removeAll();
							}
							// Toast.toast(args, 1000);
						}
					}

					if( !flag || args.length==0 && !err ){
						Toast.toast('无更多费用', 1000);
						return;
					}
					
					if(item != null) {
						item.setState("loaded");
						item.fireEvent('latestfetched', 'fobj', 'refreshFn, you have to handle toInsert youself');
						item.snapBack();					
					}
				}
		    });
		}
		else if(Ext.Viewport.query('titlebar[name = freeList]')[0].getData().type == 'leader'){
			ETFramework.Backend.request ({
				bo: 'et.bcp.expenses.ExpensesBO',
				params: {
					action: 'queryByPageAudit',
					type: 2,
					user_id: localStorage.user_id,
					pageBegin: startRow,
					pageSize: 10,
					mobile_where_part: 'AND ex_application.STATE = 1 AND application_user != "'+localStorage.user_id+'"',
				},
				callback: function(err,flag,args) {
					console.log(arguments);
					if(err){
					}else{
						var freeStore=Ext.StoreMgr.lookup('freeStore');
						if((flag=='true'|| flag=="true"||flag== true)&&args!=undefined){
							if(isAdd && freeStore.getAllCount()>=10){
								console.log('增量刷新');
								args.forEach(function(data){
									console.log(data);
									var findFlag = freeStore.findRecord('application_id',data.application_id);
									if(findFlag==null){
										if(data.application_item==1){
											data.application_item='现场有奖促销';
										}else if(data.application_item==2){
											data.application_item='订货会';
										}else if(data.application_item==3){
											data.application_item='广告费';
										}else if(data.application_item==4){
											data.application_item='收款会';
										}else if(data.application_item==5){
											data.application_item='新产品发布会';
										}else if(data.application_item==6){
											data.application_item='年终答谢会';
										}else if(data.application_item==7){
											data.application_item='现场观摩会';
										}else if(data.application_item==8){
											data.application_item='其他';
										}
										data.ref_state = data.state;
										if(data.state==1){
											data.state='待审核';
										}else if(data.state==2){
											data.state='已通过';
										}else if(data.state==3){
											data.state='已执行';
										}else if(data.state==4){
											data.state='已关闭';
										}else if(data.state == 5){
											data.state='已报销';
										}
										data.application_expense=Number(data.application_expense).toFixed(2);
										data.customer_name = data.ref_customer_name;
										freeStore.add(data);
									}
								})			
							} else if(!isAdd){
								console.log('普通刷新');
								freeStore.removeAll();
								args.forEach(function(data){
									console.log(data);
									var findFlag = freeStore.findRecord('application_id',data.application_id);
									if(findFlag==null){
										if(data.application_item==1){
											data.application_item='现场有奖促销';
										}else if(data.application_item==2){
											data.application_item='订货会';
										}else if(data.application_item==3){
											data.application_item='广告费';
										}else if(data.application_item==4){
											data.application_item='收款会';
										}else if(data.application_item==5){
											data.application_item='新产品发布会';
										}else if(data.application_item==6){
											data.application_item='年终答谢会';
										}else if(data.application_item==7){
											data.application_item='现场观摩会';
										}else if(data.application_item==8){
											data.application_item='其他';
										}
										data.ref_state = data.state;
										if(data.state==1){
											data.state='待审核';
										}else if(data.state==2){
											data.state='已通过';
										}else if(data.state==3){
											data.state='已执行';
										}else if(data.state==4){
											data.state='已关闭';
										}else if(data.state == 5){
											data.state='已报销';
										}
										data.application_expense=Number(data.application_expense).toFixed(2);
										data.customer_name = data.ref_customer_name;
										freeStore.add(data);
									}
								})
								isAdd = true;
							}
						}else{
							if(!isAdd && args == "无最新数据"){
								freeStore.removeAll();
							}
							// Toast.toast(args, 1000);
						}
					}

					if( !flag || args.length==0 && !err ){
						Toast.toast('无更多费用', 1000);
						return;
					}
					
					if(item != null) {
						item.setState("loaded");
						item.fireEvent('latestfetched', 'fobj', 'refreshFn, you have to handle toInsert youself');
						item.snapBack();					
					}
				}
		    });
		}
	},
	freeviewToDetail: function(record){
		console.log(record);
		pageInit('freeDetail',null,'{{view "free.FreeDetail"}}');
		//相关金额初始化
		var free_budget = 0;
		var free_available = 0;
		var not_audit = 0;
		var already_audit = 0;
		var already_execute = 0;
		//获取record中的数据
		var state = record.get('ref_state');
		var customer_name = record.get('customer_name');
		var application_expense = record.get('application_expense');
		var application_item = record.get('application_item');
		var application_remark = record.get('remark');
		var start_date = record.get('start_date');
		var end_date = record.get('end_date');
		var ref_season = record.get('ref_season');
		var bill_code = record.get('bill_code');
		//基本信息
		Ext.Viewport.query('label[name = budget_name]')[0].setHtml(ref_season);
		Ext.Viewport.query('label[name = freedetail_customer]')[0].setHtml(customer_name);
		Ext.Viewport.query('label[name = freedetail_total_amount]')[0].setHtml(Number(application_expense).toFixed(2));
		Ext.Viewport.query('label[name = freedetail_item]')[0].setHtml(application_item);
		Ext.Viewport.query('label[name = freedetail_date]')[0].setHtml(start_date+'~'+end_date);
		Ext.Viewport.query('label[name = free_document_code]')[0].setHtml(bill_code);
		if(application_remark==''){
 			Ext.Viewport.query('label[name = freedetail_application_remark]')[0].setHtml('无');
 		}else{
 			Ext.Viewport.query('label[name = freedetail_application_remark]')[0].setHtml(application_remark);
 		}
		if(Ext.Viewport.query('titlebar[name = freeList]')[0].getData().type == 'customer'){
			ETFramework.Backend.request({
				bo: 'et.bcp.expenses.ExpensesBO',
				params: {
						action: 'queryByBudget',
						budget_id: record.get('budget_id')
				},
				callback: function(err,flag,args) {
					console.log(arguments);
					if(flag=="true"|| flag=='true'||flag==true){
						/*****************获取数据*****************/
						//总预算
						free_budget = args.totalAmount;
						//可用预算
				 		free_available = args.availableBudget;
				 		//已审核
				 		already_audit = args.alreadyAudit;
				 		//已执行
				 		already_execute = args.alreadyExec;
						//未审核+已审核+已执行
				 		var total_amount = Number(application_expense)+Number(already_audit)+Number(already_execute);
				 		/*****************页面初始化*****************/
				 		Ext.Viewport.query('button[action = freeExecute]')[0].hide();
						Ext.Viewport.query('img[name = freedetail_state]')[0].hide();
				 		//计算显示条的宽度
				 		var free_available_width = calculateWidth(free_available,free_budget);
				 		var this_application_width = calculateWidth(application_expense,free_budget);
				 		var already_audit_width = calculateWidth(already_audit,free_budget);
				 		var already_execute_width = calculateWidth(already_execute,free_budget);
						//执行信息
						Ext.Viewport.query('container[name = dataview_execute_bar]')[0].hide();
						//总预算
						Ext.Viewport.query('label[name = freedetail_budget_amount]')[0].setHtml(Number(free_budget).toFixed(2));
						//可用预算
						Ext.Viewport.query('label[name = freedetail_available_amount]')[0].setHtml(Number(free_available).toFixed(2));
						Ext.Viewport.query('label[name = freedetail_available_width]')[0].setWidth(free_available_width);
						//具体预算信息
						Ext.Viewport.query('label[name = freedetail_not_audit_text]')[0].hide();
						Ext.Viewport.query('label[name = freedetail_not_audit]')[0].hide();
						Ext.Viewport.query('label[name = freedetail_total_count]')[0].setHtml(Number(total_amount).toFixed(2));
						Ext.Viewport.query('label[name = freedetail_this_application]')[0].setWidth(this_application_width);
						Ext.Viewport.query('label[name = freedetail_not_execute]')[0].setWidth(already_audit_width);
						Ext.Viewport.query('label[name = freedetail_already_execute]')[0].setWidth(already_execute_width);
						this.redirectTo('bcp/freedetail');
						//设置申请id到button
						var application_id = record.get('application_id');
						Ext.Viewport.query('button[action = freeViewBack]')[0].setData({application_id: application_id});
					}else{
						Toast.toast('网络不给力!');
					}
				},
				scope: this
			});
		}else if(Ext.Viewport.query('titlebar[name = freeList]')[0].getData().type == 'my'){
			if(state == 1 || state == 2){
				ETFramework.Backend.request({
					bo: 'et.bcp.expenses.ExpensesBO',
					params: {
							action: 'queryByBudget',
							budget_id: record.get('budget_id')
					},
					callback: function(err,flag,args) {
						console.log(arguments);
						if(flag=="true"|| flag=='true'||flag==true){
							this.redirectTo('bcp/freedetail');
							free_budget = args.totalAmount;
					 		free_available = args.availableBudget;
					 		not_audit = args.notAudit;
					 		already_audit = args.alreadyAudit;
					 		already_execute = args.alreadyExec;
					 		var free_available_width = calculateWidth(free_available,free_budget);
					 		var not_audit_width = calculateWidth(not_audit,free_budget);
					 		var already_audit_width = calculateWidth(already_audit,free_budget);
					 		var already_execute_width = calculateWidth(already_execute,free_budget);
					 		//申请中
					 		if(state == 1){
					 			var total_amount = Number(not_audit)+Number(already_audit)+Number(already_execute);
					 			//相关的组件的动态调整
					 			Ext.Viewport.query('container[name = dataview_execute_bar]')[0].hide();
					 			Ext.Viewport.query('button[action = freeExecute]')[0].hide();
					 			Ext.Viewport.query('label[name = freedetail_this_application_text]')[0].hide();
					 			Ext.Viewport.query('label[name = freedetail_this_application]')[0].hide();
					 			Ext.Viewport.query('container[name = freeAuditContainer]')[0].hide();
					 			Ext.Viewport.query('img[name = freedetail_state]')[0].setHtml('<img style="width:1.2em;height:1.2em;vertical-align: middle;" src="resources/icons/yellow_10.png"><span>&nbsp;待审核</span>');
					 			//bar展示的调整
					 			Ext.Viewport.query('label[name = freedetail_budget_amount]')[0].setHtml(Number(free_budget).toFixed(2));
								Ext.Viewport.query('label[name = freedetail_available_amount]')[0].setHtml(Number(free_available).toFixed(2));
								Ext.Viewport.query('label[name = freedetail_available_width]')[0].setWidth(free_available_width);
								Ext.Viewport.query('label[name = freedetail_total_count]')[0].setHtml(Number(total_amount).toFixed(2));
								Ext.Viewport.query('label[name = freedetail_not_audit]')[0].setWidth(not_audit_width);
								Ext.Viewport.query('label[name = freedetail_not_execute]')[0].setWidth(already_audit_width);
								Ext.Viewport.query('label[name = freedetail_already_execute]')[0].setWidth(already_execute_width);
					 		//已通过
					 		}else if(state == 2){
					 			//相关的组件的动态调整
					 			var total_amount = Number(already_audit)+Number(already_execute);
					 			Ext.Viewport.query('container[name = dataview_execute_bar]')[0].hide();
					 			Ext.Viewport.query('label[name = freedetail_this_application_text]')[0].hide();
					 			Ext.Viewport.query('label[name = freedetail_this_application]')[0].hide();
					 			Ext.Viewport.query('label[name = freedetail_not_audit_text]')[0].hide();
								Ext.Viewport.query('label[name = freedetail_not_audit]')[0].hide();
								Ext.Viewport.query('container[name = freeAuditContainer]')[0].hide();
								Ext.Viewport.query('label[name = freedetail_total_count]')[0].setWidth('56%');
					 			Ext.Viewport.query('img[name = freedetail_state]')[0].hide();
					 			//bar展示的调整
					 			Ext.Viewport.query('label[name = freedetail_budget_amount]')[0].setHtml(Number(free_budget).toFixed(2));
								Ext.Viewport.query('label[name = freedetail_available_amount]')[0].setHtml(Number(free_available).toFixed(2));
								Ext.Viewport.query('label[name = freedetail_available_width]')[0].setWidth(free_available_width);
								Ext.Viewport.query('label[name = freedetail_total_count]')[0].setHtml(Number(total_amount).toFixed(2));
								Ext.Viewport.query('label[name = freedetail_not_execute]')[0].setWidth(already_audit_width);
								Ext.Viewport.query('label[name = freedetail_already_execute]')[0].setWidth(already_execute_width);
					 		}
							//设置申请id到button
							var application_id = record.get('application_id');
							Ext.Viewport.query('button[action = freeViewBack]')[0].setData({application_id: application_id});
						}else{
							Toast.toast('网络不给力!');
						}
					},
					scope: this
				});
			}else if(state == 3||state == 5){
				ETFramework.Backend.request({
					bo: 'et.bcp.expenses.ExpensesBO',
					params: {
							action: 'queryExecutionInfo',
							application_id: record.get('application_id')
					},
					callback: function(err,flag,args) {
						console.log(arguments);
						if(flag=="true"|| flag=='true'||flag==true){
							this.redirectTo('bcp/freedetail');
							Ext.Viewport.query('container[name = freedetail_bar_view]')[0].hide();
							Ext.Viewport.query('button[action = freeExecute]')[0].hide();
							Ext.Viewport.query('container[name = freeAuditContainer]')[0].hide();
							Ext.Viewport.query('img[name = freedetail_state]')[0].setHtml('<img style="width:1.2em;height:1.2em;vertical-align: middle;" src="resources/icons/green_07.png"><span>&nbsp;'+record.get('state')+'</span>');
							var execution_expenses = args.execution_expenses;
							var execution_date = args.execution_date;
							var remark = args.remark;
							Ext.Viewport.query('label[name = freedetail_execute_expense]')[0].setHtml(Number(execution_expenses).toFixed(2));
							Ext.Viewport.query('label[name = freedetail_execute_date]')[0].setHtml(execution_date);
							Ext.Viewport.query('label[name = freedetail_execute_remark]')[0].setHtml(remark);
							//设置申请id到button
							var application_id = record.get('application_id');
							Ext.Viewport.query('button[action = freeViewBack]')[0].setData({application_id: application_id});
						}else{
							Toast.toast('网络不给力!');
						}
					},
					scope: this
				});
			}else if(state == 4){
				this.redirectTo('bcp/freedetail');
				Ext.Viewport.query('container[name = freedetail_bar_view]')[0].hide();
				Ext.Viewport.query('container[name = dataview_execute_bar]')[0].hide();
				Ext.Viewport.query('button[action = freeExecute]')[0].hide();
				Ext.Viewport.query('container[name = freeAuditContainer]')[0].hide();
				Ext.Viewport.query('img[name = freedetail_state]')[0].setHtml('<img style="width:1.2em;height:1.2em;vertical-align: middle;" src="resources/icons/red_03.png"><span>&nbsp;已关闭</span>');
		 		var application_id = record.get('application_id');
				Ext.Viewport.query('button[action = freeViewBack]')[0].setData({application_id: application_id});
			}
		}else if(Ext.Viewport.query('titlebar[name = freeList]')[0].getData().type == 'leader'){
			ETFramework.Backend.request({
				bo: 'et.bcp.expenses.ExpensesBO',
				params: {
						action: 'queryByBudget',
						budget_id: record.get('budget_id')
				},
				callback: function(err,flag,args) {
					console.log(arguments);
					if(flag=="true"|| flag=='true'||flag==true){
						/*****************获取数据*****************/
						//总预算
						free_budget = args.totalAmount;
						//可用预算
				 		free_available = args.availableBudget;
				 		//已审核
				 		already_audit = args.alreadyAudit;
				 		//已执行
				 		already_execute = args.alreadyExec;
						//未审核+已审核+已执行
				 		var total_amount = Number(application_expense)+Number(already_audit)+Number(already_execute);
				 		/*****************页面初始化*****************/
				 		Ext.Viewport.query('button[action = freeExecute]')[0].hide();
						Ext.Viewport.query('img[name = freedetail_state]')[0].hide();
				 		//计算显示条的宽度
				 		var free_available_width = calculateWidth(free_available,free_budget);
				 		var this_application_width = calculateWidth(application_expense,free_budget);
				 		var already_audit_width = calculateWidth(already_audit,free_budget);
				 		var already_execute_width = calculateWidth(already_execute,free_budget);
						//执行信息
						Ext.Viewport.query('container[name = dataview_execute_bar]')[0].hide();
						//总预算
						Ext.Viewport.query('label[name = freedetail_budget_amount]')[0].setHtml(Number(free_budget).toFixed(2));
						//可用预算
						Ext.Viewport.query('label[name = freedetail_available_amount]')[0].setHtml(Number(free_available).toFixed(2));
						Ext.Viewport.query('label[name = freedetail_available_width]')[0].setWidth(free_available_width);
						//具体预算信息
						Ext.Viewport.query('label[name = freedetail_not_audit_text]')[0].hide();
						Ext.Viewport.query('label[name = freedetail_not_audit]')[0].hide();
						Ext.Viewport.query('label[name = freedetail_total_count]')[0].setHtml(Number(total_amount).toFixed(2));
						Ext.Viewport.query('label[name = freedetail_this_application]')[0].setWidth(this_application_width);
						Ext.Viewport.query('label[name = freedetail_not_execute]')[0].setWidth(already_audit_width);
						Ext.Viewport.query('label[name = freedetail_already_execute]')[0].setWidth(already_execute_width);
						this.redirectTo('bcp/freedetail');
						//设置申请id到button
						var application_id = record.get('application_id');
						Ext.Viewport.query('button[action = freeViewBack]')[0].setData({application_id: application_id});
					}else{
						Toast.toast('网络不给力!');
					}
				},
				scope: this
			});
		}
	},
	freeDetailBack: function(){
		history.back();
	},
	freeImageView: function(){
		var application_id = Ext.Viewport.query('button[action = freeViewBack]')[0].getData().application_id;
		var freeStore = Ext.StoreMgr.lookup('freeStore');
		var findFlag = freeStore.findRecord('application_id',application_id);
		if(findFlag != null){
			var state = findFlag.get('ref_state');
			ETFramework.Backend.request({
				bo: 'et.bcp.expenses.ExpensesBO',
				params: {
						action: 'queryInfo',
						state: state,
						application_id: application_id
				},
				callback: function(err,flag,args,arg0) {
					console.log(arguments);
					if(flag=="true"|| flag=='true'||flag==true){
						var imgArray = new Array();
						if(args==null||args.length == 0){
							Toast.toast('没有相关图片');
							return;
						}
						this.redirectTo('bcp/bigpicture');
						args.forEach(function(data) {
							imgArray.push(data.ref_true_path);
						})
						if(arg0 != null){
							arg0.forEach(function(data) {
								imgArray.push(data.ref_true_path);
							})
						}
						var view = Ext.Viewport.query('photoview')[0];
						var imgUrl = '';
						imgArray.forEach(function(data) {
							imgUrl = data;
							console.log(imgUrl);
							view.add({
								items: [{
									xtype: 'titlebar',
									title: 'title',
									docked: 'top'
								}],
								xtype: 'image',
								listeners:{
									tap:function(){
										history.back();
									},
									error:function(img){
										img.setSrc('resources/icons/23.jpg');
									}
								},
								src: imgUrl,
								style: 'background-color: #000000'
							})
						});
					}else{
						Toast.toast(args);
					}
				},
				scope: this
			});
		}else{
			Toast.toast('网络异常');
		}
	},
	freePass: function(){
		var application_id = Ext.Viewport.query('button[action = freeViewBack]')[0].getData().application_id;
		var freeStore = Ext.StoreMgr.lookup('freeStore');
		var findFlag = freeStore.findRecord('application_id',application_id);
		var other_remark = '<br/>'+ localStorage.user_name + '审批';
		if(findFlag != null){
			ETFramework.Backend.request({
				bo: 'et.bcp.expenses.ExpensesBO',
				params: {
						action: 'approval',
						other_remark: other_remark,
						application_id: application_id
				},
				callback: function(err,flag,args) {
					console.log(arguments);
					if(flag=="true"|| flag=='true'||flag==true){
						Toast.toast('审批成功');
						history.back();
						Ext.Viewport.fireEvent('refreshFreeStore',null);
					}else{
						Toast.toast(args);
					}
				},
				scope: this
			});
		}
	},
	freeAudit: function(){
		var application_id = Ext.Viewport.query('button[action = freeViewBack]')[0].getData().application_id;
		var freeStore = Ext.StoreMgr.lookup('freeStore');
		var findFlag = freeStore.findRecord('application_id',application_id);
		var other_remark = '<br/>'+ localStorage.user_name + '审核';
		if(findFlag != null){
			ETFramework.Backend.request({
				bo: 'et.bcp.expenses.ExpensesBO',
				params: {
						action: 'audit',
						user_id: localStorage.user_id,
						application_id: application_id,
						other_remark: other_remark
				},
				callback: function(err,flag,args) {
					console.log(arguments);
					if(flag=="true"|| flag=='true'||flag==true){
						Toast.toast('审核成功');
						history.back();
						Ext.Viewport.fireEvent('refreshFreeStore',null);
					}else{
						Toast.toast(args);
					}
				},
				scope: this
			});
		}else{
			Toast.toast('网络异常');
		}
	},
	freeAuditClose: function(){
		Ext.Msg.confirm('费用关闭', '是否关闭此费用单？', function(state) {
				if (state == 'ok' || state == 'yes') {
					var application_id = Ext.Viewport.query('button[action = freeViewBack]')[0].getData().application_id;
					var freeStore = Ext.StoreMgr.lookup('freeStore');
					var findFlag = freeStore.findRecord('application_id',application_id);
					var other_remark = '<br/>'+ localStorage.user_name + '关闭';
					if(findFlag != null){
						var user_id = findFlag.get('user_id');
						ETFramework.Backend.request({
							bo: 'et.bcp.expenses.ExpensesBO',
							params: {
									action: 'close',
									user_id: user_id,
									application_id: application_id,
									other_remark: other_remark
							},
							callback: function(err,flag,args) {
								console.log(arguments);
								if(flag=="true"|| flag=='true'||flag==true){
									Toast.toast('关闭成功');
									history.back();
									Ext.Viewport.fireEvent('refreshFreeStore',null);
								}else{
									Toast.toast(args);
								}
							},
							scope: this
						});
					}else{
						Toast.toast('网络异常');
					}
				}
			},
			this
		);
	},

	/***********************费用申请************************/
	freeShotBack: function(){
		history.back();
	},

	freeApplicationBack: function(){
		history.back();
	},

	freeShotCommit: function(){
		var storeCount = Ext.StoreMgr.lookup('sharepicstore').getCount()-1;
		if(storeCount!=0){
			ETFramework.Backend.request({
				bo: 'et.bcp.expenses.ExpensesBO',
				params: {
						action: 'queryBudget',
						customer_id: localStorage.user_id
				},
				callback: function(err,flag,args) {
					console.log(JSON.stringify(arguments));
					if(err == null){
						if(flag=="true"|| flag=='true'||flag==true){
							var commit = Ext.Viewport.query('freeApplication')[0];
							if(commit != undefined){
								commit.destroy();
							}
							Ext.Viewport.add(Ext.create('{{view "free.FreeApplication"}}'));
							Ext.Viewport.query('button[action = freeApplicationCommit]')[0].setData({primary_uuid: uuid.v1()});
							var option=new Array();
							args.forEach(function(data){
								optionItem={text:data.ref_season_name,
										value:data.budget_id};
								option.push(optionItem);
							});
							this.getBudget_id().setOptions(option);
							// this.getBudget_id().setData({type: args[0].type});
							this.redirectTo('bcp/freeapplication');
						}else{
							Toast.toast('没有相关预算信息',1000);
						}
					}else{
						Toast.toast('请检查网络',1000);
					}
				},
				scope: this
			});
		}else{
			Toast.toast('请选择图片或拍照');
		}
	},
	queryBudget: function(select,newValue){
		ETFramework.Backend.request({
			bo: 'et.bcp.expenses.ExpensesBO',
			params: {
					action: 'queryByBudget',
					budget_id: newValue
			},
			callback: function(err,flag,args) {
				console.log(JSON.stringify(arguments));
				if(flag=="true"|| flag=='true'||flag==true){
					free_budget = args.totalAmount;
			 		free_available = args.availableBudget;
			 		not_audit = args.notAudit;
			 		already_audit = args.alreadyAudit;
			 		already_execute = args.alreadyExec;
			 		var total_amount = Number(not_audit)+Number(already_audit)+Number(already_execute);
			 		var free_available_width = calculateWidth(free_available,free_budget);
			 		var not_audit_width = calculateWidth(not_audit,free_budget);
			 		var already_audit_width = calculateWidth(already_audit,free_budget);
			 		var already_execute_width = calculateWidth(already_execute,free_budget);
			 		Ext.Viewport.query('label[name = freeapplication_budget_width]')[0].setWidth('100%');
					Ext.Viewport.query('label[name = freeapplication_budget_amount]')[0].setHtml(Number(free_budget).toFixed(2));
					Ext.Viewport.query('label[name = freeapplication_available_amount]')[0].setHtml(Number(free_available).toFixed(2));
					Ext.Viewport.query('label[name = freeapplication_available_width]')[0].setWidth(free_available_width);
					Ext.Viewport.query('label[name = freeapplication_total_count]')[0].setHtml(Number(total_amount).toFixed(2));
					Ext.Viewport.query('label[name = freeapplication_not_audit]')[0].setWidth(not_audit_width);
					Ext.Viewport.query('label[name = freeapplication_already_audit]')[0].setWidth(already_audit_width);
					Ext.Viewport.query('label[name = freeapplication_already_execute]')[0].setWidth(already_execute_width);
				}else{
					Toast.toast(args);
				}
			},
			scope: this
		});
	},
	freeApplicationCommit:function(){
		var flag = this.checkApplication();
		if(flag==false){
			return;
		}
		var component = Ext.Viewport.query('button[action = freeApplicationCommit]')[0];
		MyUtil.componentDisable(component);
		this.freeDataCommit();
	},
	checkApplication:function(){
		if(this.getBudget_id().getValue()==null){
			Toast.toast('请选择预算',1000);
	    	return false;
		}
		if(this.getApplication_expense().getValue()==null){
	    	Toast.toast('请输入申请金额',1000);
	    	return false;
	    }
	    var aplicationFee= /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
	    if(!aplicationFee.test(this.getApplication_expense().getValue())){
	    	Toast.toast('请检查申请金额',1000);
	    	return false;
	    }
	    return true;
	},
	freeDataCommit:function(){
		//图片处理
		var component = Ext.Viewport.query('button[action = applicationPictureConfirm]')[0];
		var btn_component = Ext.Viewport.query('button[action = freeApplicationCommit]')[0];
		var store = Ext.StoreMgr.lookup('sharepicstore');
		if(component.getData() != null){
			var failPath = component.getData().failPath;
			var successPath = component.getData().successPath;
			if(failPath.length!=0){
				console.log('失败的数量：'+failPath.length);
				var imageFlag = UploadFile.recommitFailFile(store,component);
				if(imageFlag == true){
					var flag = this.freeApplicationTextCommit(store);
				}else{
					MyUtil.componentEnable(btn_component);
				}
			}else if((store.getCount()-1) == 0){
				MyUtil.componentEnable(btn_component);
				Toast.toast('请添加图片');
			}else if(successPath.length == (store.getCount()-1)){
				console.log('成功的数量：'+successPath.length);
				var flag = this.freeApplicationTextCommit(store);
			}else{
				MyUtil.componentEnable(btn_component);
				Toast.toast('图片正在上传，请稍后');
			}
		}else{
			MyUtil.componentEnable(btn_component);
			Toast.toast('请添加图片');
		}	
	},
	freeApplicationTextCommit: function(store){
		var applicationDetails = UploadFile.getOnlinePath(store);
		var application={
			application_id: Ext.Viewport.query('button[action = freeApplicationCommit]')[0].getData().primary_uuid,
			customer_id:localStorage.user_id,
			budget_id:this.getBudget_id().getValue(),
			application_item:this.getApplication_item().getValue(),
			start_date:this.getStart_date().getValue(),
			end_date:this.getEnd_date().getValue(),
			application_expense:this.getApplication_expense().getValue().toString(),
			remark:this.getRemark().getValue(),
			application_user:localStorage.user_id,
			state:'1',
			type:'2',
			application_date:new Date(),
			corp_id:localStorage.corp_id,
		};
		ETFramework.Backend.request({
			bo: 'et.bcp.expenses.ExpensesBO',
			params: {
					action: 'new',
					application: application,
					applicationDetails:applicationDetails
			},
			callback: function(err,flag,args) {
				console.log(arguments);
				var component = Ext.Viewport.query('button[action = freeApplicationCommit]')[0];
				MyUtil.componentEnable(component);
				// alert(JSON.stringify(arguments));
				if(flag=="true"|| flag=='true'||flag==true){
					Toast.toast('提交成功!',1000);
					this.redirectTo('main');
				}else{
					Toast.toast(args);
				}
			},
			scope: this
		});
	},
	freeExecute: function(){
		pageInit('freeExecute','sharepicstoreb','{{view "free.FreeExecute"}}');
		this.redirectTo('bcp/freeexecute');
	},
	//费用执行检查图片是否全部上传,如失败则再次上传
	freeExecuteCommit: function(){
		var checkFlag = this.checkFreeExecute();
		if(checkFlag){
			var component = Ext.Viewport.query('button[action = freeExecuteCommit]')[0];
			var btn_component = Ext.Viewport.query('button[action = freeExecuteCommit]')[0];
			var store = Ext.StoreMgr.lookup('sharepicstoreb');
			MyUtil.componentDisable(btn_component);
			if(component.getData() != null){
				var failPath = component.getData().failPath;
				var successPath = component.getData().successPath;
				if(failPath.length!=0){
					console.log('失败的数量：'+failPath.length);
					var imageFlag = UploadFile.recommitFailFile(store,component);
					if(imageFlag == true){
						this.freeExecuteTextCommit(store);
					}else{
						MyUtil.componentEnable(btn_component);
					}
				}else if((store.getCount()-1) == 0){
					Toast.toast('请添加图片');
					MyUtil.componentEnable(btn_component);
				}else if(successPath.length == (store.getCount()-1)){
					console.log('成功的数量：'+successPath.length);
					this.freeExecuteTextCommit(store);
				}else{
					Toast.toast('图片正在上传，请稍后');
					MyUtil.componentEnable(btn_component);
				}
			}else{
				Toast.toast('请添加图片');
				MyUtil.componentEnable(btn_component);
			}
		}
	},
	//费用执行提交
	freeExecuteTextCommit: function(store){
		//console.log(Ext.Viewport.query('textareafield[name = free_note]')[0].getValue());
		var executionDetails = UploadFile.getOnlinePath(store);
		var application_id = Ext.Viewport.query('button[action = freeViewBack]')[0].getData().application_id;
		console.log(application_id);
		var applicationStore = Ext.StoreMgr.lookup('freeStore');
		var record = applicationStore.findRecord('application_id',application_id);
		console.log(record);
		var execution = {
			customer_id: record.get('customer_id'),
			execution_expenses: Ext.Viewport.query('numberfield[name = execute_amount]')[0].getValue().toString(),
			execution_user: localStorage.user_id,
			execution_date: Ext.Viewport.query('datepickerfield[name = execute_time]')[0].getValue(),
			resource_application: application_id,
		    remark: Ext.Viewport.query('textareafield[name = free_execute_note]')[0].getValue(),
			corp_id: localStorage.corp_id
		};
		ETFramework.Backend.request({
			bo: 'et.bcp.expenses.ExpensesBO',
			params: {
				action: 'execute',
				executionDetails: executionDetails,
				execution: execution
			},
			callback: function(err,flag,args) {
				console.log(arguments);
				var btn_component = Ext.Viewport.query('button[action = freeExecuteCommit]')[0];
				MyUtil.componentEnable(btn_component);
				if(flag=="true"|| flag=='true'||flag==true){
					Toast.toast('提交成功!');
					var component = Ext.Viewport.query('button[action = freeExecuteCommit]')[0];
	                this.redirectTo('main');
				}else{
					Toast.toast('网络不给力!');
				}
			},
			scope: this
		});
	},
	//检查费用执行数据
	checkFreeExecute:function(){
		var component = Ext.Viewport.query('numberfield[name = execute_amount]')[0];
		if(component.getValue()==null){
	    	Toast.toast('请输入执行金额',1000);
	    	return false;
	    }
	    var aplicationFee= /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
	    if(!aplicationFee.test(component.getValue())){
	    	Toast.toast('请检查执行金额',1000);
	    	return false;
	    }
	    var application_id = Ext.Viewport.query('button[action = freeViewBack]')[0].getData().application_id;
	    var applicationStore = Ext.StoreMgr.lookup('freeStore');
	    var record = applicationStore.findRecord('application_id',application_id);
	    var application_expense = record.get('application_expense');
	    if(Number(component.getValue())>application_expense){
	    	Toast.toast('执行金额不能大于申请金额',1000);
	    	return false;
	    }
	    return true;
	}
{{/class}}
//计算宽度百分比
function calculateWidth(arg1,arg2){
	var temp=accDiv(Number(arg1),Number(arg2))
	if(temp>1){
		temp=1;
		return toPercent(temp);
	}else{
		return toPercent(temp);
	}
}
//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1,arg2){
	var t1=0,t2=0,r1,r2;
	try{t1=arg1.toString().split(".")[1].length}catch(e){}
	try{t2=arg2.toString().split(".")[1].length}catch(e){}
	with(Math){
	r1=Number(arg1.toString().replace(".",""))
	r2=Number(arg2.toString().replace(".",""))
	return (r1/r2)*pow(10,t2-t1);
	}
}
//小数转百分数
function toPercent (arg){
	return (Math.round(arg * 10000)/100).toFixed(2) + '%';
}
//页面初始化
function pageInit(page,store,path){
	var commit = Ext.Viewport.query(page)[0];
	if(commit != undefined){
		commit.destroy();
	}
	if(store != null){
		var store = Ext.StoreMgr.lookup(store);
		if(store != undefined){
			store.removeAll();
		}
	}
	Ext.Viewport.add(Ext.create(path));
}