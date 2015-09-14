{{#class 'ETFramework.app.Controller'}}
	requires:[
	    'Ext.MessageBox'
    ],
    config:{
		control: {
			'viewport': {
				workDetails:'workDetails',
				commitDayWork: 'commitDayWork',
				showViewinit:'showViewinit',
				deleteView:'deleteView',
                publishContent:'publishContent',
                pictureView: 'pictureView',
                reflushSHWDetailData:'reflushSHWDetailData',
                mainToCenter:'mainToCenter',
                reflushCenterData:'reflushCenterData',
                centerCommit:'centerCommit',
                showCenterinit:'showCenterinit',
                maintolengthCenter:'maintolengthCenter',
                searchCenter:'searchCenter'
			}
		}
    },
    /**
     * 工作详情
     * 分页查询
     */
	showViewinit: function(view) {
		//this.workShowing(null,0, true);
		view.getScrollable().getScroller().on({
			scrollend: this.scrollEnd,
			scope: this
		});
	},
	showCenterinit:function(view){
		view.getScrollable().getScroller().on({
			scrollend:this.scrollCenterEnd,
			scope:this
		});
	},
	scrollCenterEnd:function(scroller, x, y){
		var showCenter = Ext.Viewport.query('list[name=eachCenter]')[0];
		if (!showCenter.getStore().isLoading() && y >= scroller.maxPosition.y) {
			showCenter.setScrollToTopOnRefresh(false);
			var length = this.getShowStore().getAllCount();
			if(length != 0) {
				var view = Ext.Viewport.query('titlebar[name=center_tb]')[0];
				var data = view.getData();
//				this.workShowing(data.customer_id,length,false);	
				this.maintolengthCenter(length-1,false);	
			}
		}
	},
	scrollEnd: function(scroller, x, y) {
		var showWork = Ext.Viewport.query('list[name=showwork]')[0];
		if (!showWork.getStore().isLoading() && y >= scroller.maxPosition.y) {
			showWork.setScrollToTopOnRefresh(false);
			var length = this.getShowStore().getAllCount();
			if(length != 0) {
				var view = Ext.Viewport.query('titlebar[name=workDetailTitle]')[0];
				var data = view.getData();
//				this.workShowing(data.customer_id,length,false);	
				this.workShowing(length,false);	
			}
		}
	},
		
	getShowStore:function(){
		var showStore = Ext.StoreMgr.lookup('workDetailsStoreId');
		return showStore;	
	},
    /**
     * 工作详情查询
     * 要加分页的查询
     */
    workDetails:function(length,mark){
//    	this.workShowing(length,mark);
    	this.workReShowing(length,mark);
    },
    workReShowing:function(length,mark){
    	var name = Ext.Viewport.query('img[action=selectCenter]')[0].getHtml();
    	var centerStore=Ext.StoreMgr.lookup('showCenterStoreId');
		var record_by_name=centerStore.findRecord('region_name',name);
		var region_id;
		if(record_by_name!=null){
			region_id = record_by_name.getData().region_id;
			if(region_id=="01"){
				ETFramework.Backend.request({
		    		bo: 'et.bcp.leader.showwork.ShowWorkBO',
		    		params: {
		    			action: 'boss_visit_query',
		    			user_id: localStorage.user_id,
		    			corp_id: localStorage.corp_id,
		    		    start_num:0,
				        row_num:5  
		    		},
		    		callback: function(err, flag, message, visitBVO) {
		    			visitStore = Ext.StoreMgr.lookup("workDetailsStoreId");
		    			if(visitStore.getAllCount() != 0) {
						        visitStore.removeAll();
		    			   }
		    			console.log(arguments);
		    			if(err != null) {
//		    				Toast.toast("请检查网络");
		    			} else if(flag == "true") {
		    				
		    				var visitId = "";
		    				if(visitBVO != null && visitBVO.length > 0) {
		    					
		    					message.forEach(function(data) {
		    						visitId = data.visitsign_id;
		    						var images = [];
		    							
		    						visitBVO.forEach(function(visitB) {
		    							if(visitId == visitB.visitsign_id) {
		    								images.push({
		    									visit_img: visitB.visitsign_img
		    								})
		    							}
		    						})
		    						if(images.length != 0) {
		    							data.images = images;    								
		    						}
		    					})
		    					visitStore.add(message);
		    					} else {
		    						visitStore.add(message);
		    					}
		    				} else {
		    					Toast.toast(message);
		    				}
		    			
		    		},
		    		scope: this
		    	});
			}else{
				ETFramework.Backend.request({
	        		bo: 'et.bcp.leader.showwork.ShowWorkBO',
	        		params: {
	        			action: 'region_visit_query',
	        			region_id: region_id,
	        			corp_id: localStorage.corp_id,
	        		    start_num:0,
	    		        row_num:5  
	        		},
	        		callback: function(err, flag, message, visitBVO) {
	        			visitStore = Ext.StoreMgr.lookup("workDetailsStoreId");
	        			if(visitStore.getAllCount() != 0) {
	    				        visitStore.removeAll();
	        			   }
	        			console.log(arguments);
	        			if(err != null) {
//	        				Toast.toast("请检查网络");
	        			} else if(flag == "true") {
	        				
	        				var visitId = "";
	        				if(visitBVO != null && visitBVO.length > 0) {
	        					
	        					message.forEach(function(data) {
	        						visitId = data.visitsign_id;
	        						var images = [];
	        							
	        						visitBVO.forEach(function(visitB) {
	        							if(visitId == visitB.visitsign_id) {
	        								images.push({
	        									visit_img: visitB.visitsign_img
	        								})
	        							}
	        						})
	        						if(images.length != 0) {
	        							data.images = images;    								
	        						}
	        					})
	        					visitStore.add(message);
	        					} else {
	        						visitStore.add(message);
	        					}
	        				} else {
	        					Toast.toast(message);
	        				}
	        			
	        		},
	        		scope: this
	        	});
			}
		}else{
			ETFramework.Backend.request({
	    		bo: 'et.bcp.leader.showwork.ShowWorkBO',
	    		params: {
	    			action: 'boss_visit_query',
	    			user_id: localStorage.user_id,
	    			corp_id: localStorage.corp_id,
	    		    start_num:0,
			        row_num:5  
	    		},
	    		callback: function(err, flag, message, visitBVO) {
	    			visitStore = Ext.StoreMgr.lookup("workDetailsStoreId");
	    			if(visitStore.getAllCount() != 0) {
					        visitStore.removeAll();
	    			   }
	    			console.log(arguments);
	    			if(err != null) {
//	    				Toast.toast("请检查网络");
	    			} else if(flag == "true") {
	    				
	    				var visitId = "";
	    				if(visitBVO != null && visitBVO.length > 0) {
	    					
	    					message.forEach(function(data) {
	    						visitId = data.visitsign_id;
	    						var images = [];
	    							
	    						visitBVO.forEach(function(visitB) {
	    							if(visitId == visitB.visitsign_id) {
	    								images.push({
	    									visit_img: visitB.visitsign_img
	    								})
	    							}
	    						})
	    						if(images.length != 0) {
	    							data.images = images;    								
	    						}
	    					})
	    					visitStore.add(message);
	    					} else {
	    						visitStore.add(message);
	    					}
	    				} else {
	    					Toast.toast(message);
	    				}
	    			
	    		},
	    		scope: this
	    	});
		}
		 ETFramework.Backend.request({
         	bo: 'et.bcp.leader.showwork.ShowWorkBO',
         	params: {
         		action: 'boss_center_query',
         		user_id: localStorage.user_id,
         		corp_id: localStorage.corp_id,
         	},
         	callback: function(err, flag, message) {
         		var selectCenter = Ext.Viewport.query('img[action=selectCenter]')[0];
     			if(selectCenter!=undefined){
     			}else{
     				Ext.Viewport.add(Ext.create('{{view "showwork.WorkDetailsView"}}'));
     				selectCenter = Ext.Viewport.query('img[action=selectCenter]')[0];
     			}
         		var type = message[0].region_type; 
         		if(type==2||type=="2"){
         			var name = message[0].region_name;	
         			Ext.Viewport.query('img[action=selectCenter]')[0].setHtml(name);
         		}else if(type==3||type=="3"){
         			var name = localStorage.user_name;	
         			Ext.Viewport.query('img[action=selectCenter]')[0].setHtml(name);
         		}else{
         			Ext.Viewport.query('img[action=selectCenter]')[0].setHtml("所有中心");
         		}
         			
         		console.log(arguments);
         	},
         	scope: this
        });
    },
    workShowing:function(length,mark){
    	console.log(length);
    	var name = Ext.Viewport.query('img[action=selectCenter]')[0].getHtml();
    	var centerStore=Ext.StoreMgr.lookup('showCenterStoreId');
		var record_by_name=centerStore.findRecord('region_name',name);
		var region_id;
		if(record_by_name!=null){
			region_id = record_by_name.getData().region_id;
			if(region_id=="01"){
				ETFramework.Backend.request({
		    		bo: 'et.bcp.leader.showwork.ShowWorkBO',
		    		params: {
		    			action: 'boss_visit_query',
		    			user_id: localStorage.user_id,
		    			corp_id: localStorage.corp_id,
		    		    start_num:length,
				        row_num:5  
		    		},
		    		callback: function(err, flag, message, visitBVO) {
		    			var visitStore = Ext.StoreMgr.lookup("workDetailsStoreId");
		    			if(visitStore.getAllCount() != 0 && mark) {
						        visitStore.removeAll();
		    			   }
		    			console.log(arguments);
		    			if(err != null) {
//		    				Toast.toast("请检查网络");
		    			} else if(flag == "true") {
		    				
		    				var visitId = "";
		    				if(visitBVO != null && visitBVO.length > 0) {
		    					
		    					message.forEach(function(data) {
		    						visitId = data.visitsign_id;
		    						var images = [];
		    							
		    						visitBVO.forEach(function(visitB) {
		    							if(visitId == visitB.visitsign_id) {
		    								images.push({
		    									visit_img: visitB.visitsign_img
		    								})
		    							}
		    						})
		    						if(images.length != 0) {
		    							data.images = images;    								
		    						}
		    					})
		    					visitStore.add(message);
		    					} else {
		    						visitStore.add(message);
		    					}
		    				} else {
		    					Toast.toast(message);
		    				}
		    			
		    		},
		    		scope: this
		    	});
			}else{
				ETFramework.Backend.request({
		    		bo: 'et.bcp.leader.showwork.ShowWorkBO',
		    		params: {
		    			action: 'region_visit_query',
	        			region_id: region_id,
	        			corp_id: localStorage.corp_id,
		    		    start_num:length,
				        row_num:5  
		    		},
		    		callback: function(err, flag, message, visitBVO) {
		    			var visitStore = Ext.StoreMgr.lookup("workDetailsStoreId");
		    			if(visitStore.getAllCount() != 0 && mark) {
						        visitStore.removeAll();
		    			   }
		    			console.log(arguments);
		    			if(err != null) {
//		    				Toast.toast("请检查网络");
		    			} else if(flag == "true") {
		    				
		    				var visitId = "";
		    				if(visitBVO != null && visitBVO.length > 0) {
		    					
		    					message.forEach(function(data) {
		    						visitId = data.visitsign_id;
		    						var images = [];
		    							
		    						visitBVO.forEach(function(visitB) {
		    							if(visitId == visitB.visitsign_id) {
		    								images.push({
		    									visit_img: visitB.visitsign_img
		    								})
		    							}
		    						})
		    						if(images.length != 0) {
		    							data.images = images;    								
		    						}
		    					})
		    					visitStore.add(message);
		    					} else {
		    						visitStore.add(message);
		    					}
		    				} else {
		    					Toast.toast(message);
		    				}
		    			
		    		},
		    		scope: this
		    	});
			}
		}else{
			ETFramework.Backend.request({
	    		bo: 'et.bcp.leader.showwork.ShowWorkBO',
	    		params: {
	    			action: 'boss_visit_query',
	    			user_id: localStorage.user_id,
	    			corp_id: localStorage.corp_id,
	    		    start_num:length,
			        row_num:5  
	    		},
	    		callback: function(err, flag, message, visitBVO) {
	    			var visitStore = Ext.StoreMgr.lookup("workDetailsStoreId");
	    			if(visitStore.getAllCount() != 0 && mark) {
					        visitStore.removeAll();
	    			   }
	    			console.log(arguments);
	    			if(err != null) {
//	    				Toast.toast("请检查网络");
	    			} else if(flag == "true") {
	    				
	    				var visitId = "";
	    				if(visitBVO != null && visitBVO.length > 0) {
	    					
	    					message.forEach(function(data) {
	    						visitId = data.visitsign_id;
	    						var images = [];
	    							
	    						visitBVO.forEach(function(visitB) {
	    							if(visitId == visitB.visitsign_id) {
	    								images.push({
	    									visit_img: visitB.visitsign_img
	    								})
	    							}
	    						})
	    						if(images.length != 0) {
	    							data.images = images;    								
	    						}
	    					})
	    					visitStore.add(message);
	    					} else {
	    						visitStore.add(message);
	    					}
	    				} else {
	    					Toast.toast(message);
	    				}
	    			
	    		},
	    		scope: this
	    	});
		}
          
    },
    searchCenter:function(){
    	 ETFramework.Backend.request({
         	bo: 'et.bcp.leader.showwork.ShowWorkBO',
         	params: {
         		action: 'boss_center_query',
         		user_id: localStorage.user_id,
         		corp_id: localStorage.corp_id,
         	},
         	callback: function(err, flag, message) {
         		var selectCenter = Ext.Viewport.query('img[action=selectCenter]')[0];
     			if(selectCenter!=undefined){
     			}else{
     				Ext.Viewport.add(Ext.create('{{view "showwork.WorkDetailsView"}}'));
     				selectCenter = Ext.Viewport.query('img[action=selectCenter]')[0];
     			}
         		var type = message[0].region_type; 
         		if(type==2||type=="2"){
         			var name = message[0].region_name;	
         			Ext.Viewport.query('img[action=selectCenter]')[0].setHtml(name);
         		}else if(type==3||type=="3"){
         			var name = localStorage.user_name;	
         			Ext.Viewport.query('img[action=selectCenter]')[0].setHtml(name);
         		}else{
         			Ext.Viewport.query('img[action=selectCenter]')[0].setHtml("所有中心");
         		}
         			
         			
         		console.log(arguments);
         	},
         	scope: this
        });
    },
    reflushSHWDetailData:function(){
    	var name = Ext.Viewport.query('img[action=selectCenter]')[0].getHtml();
    	var centerStore=Ext.StoreMgr.lookup('showCenterStoreId');
		var record_by_name=centerStore.findRecord('region_name',name);
		var region_id;
		if(record_by_name!=null){
			region_id = record_by_name.getData().region_id;
			if(region_id=="01"){
				ETFramework.Backend.request({
		    		bo: 'et.bcp.leader.showwork.ShowWorkBO',
		    		params: {
		    			action: 'boss_visit_query',
		    			user_id: localStorage.user_id,
		    			corp_id: localStorage.corp_id,
		    		    start_num:0,
				        row_num:5  
		    		},
		    		callback: function(err, flag, message, visitBVO) {
		    			visitStore = Ext.StoreMgr.lookup("workDetailsStoreId");
		    			if(visitStore.getAllCount() != 0) {
						        visitStore.removeAll();
		    			   }
		    			console.log(arguments);
		    			if(err != null) {
//		    				Toast.toast("请检查网络");
		    			} else if(flag == "true") {
		    				
		    				var visitId = "";
		    				if(visitBVO != null && visitBVO.length > 0) {
		    					
		    					message.forEach(function(data) {
		    						visitId = data.visitsign_id;
		    						var images = [];
		    							
		    						visitBVO.forEach(function(visitB) {
		    							if(visitId == visitB.visitsign_id) {
		    								images.push({
		    									visit_img: visitB.visitsign_img
		    								})
		    							}
		    						})
		    						if(images.length != 0) {
		    							data.images = images;    								
		    						}
		    					})
		    					visitStore.add(message);
		    					} else {
		    						visitStore.add(message);
		    					}
		    				} else {
		    					Toast.toast(message);
		    				}
		    			
		    		},
		    		scope: this
		    	});
			}else{
				ETFramework.Backend.request({
	        		bo: 'et.bcp.leader.showwork.ShowWorkBO',
	        		params: {
	        			action: 'region_visit_query',
	        			region_id: region_id,
	        			corp_id: localStorage.corp_id,
	        		    start_num:0,
	    		        row_num:5  
	        		},
	        		callback: function(err, flag, message, visitBVO) {
	        			visitStore = Ext.StoreMgr.lookup("workDetailsStoreId");
	        			if(visitStore.getAllCount() != 0) {
	    				        visitStore.removeAll();
	        			   }
	        			console.log(arguments);
	        			if(err != null) {
//	        				Toast.toast("请检查网络");
	        			} else if(flag == "true") {
	        				
	        				var visitId = "";
	        				if(visitBVO != null && visitBVO.length > 0) {
	        					
	        					message.forEach(function(data) {
	        						visitId = data.visitsign_id;
	        						var images = [];
	        							
	        						visitBVO.forEach(function(visitB) {
	        							if(visitId == visitB.visitsign_id) {
	        								images.push({
	        									visit_img: visitB.visitsign_img
	        								})
	        							}
	        						})
	        						if(images.length != 0) {
	        							data.images = images;    								
	        						}
	        					})
	        					visitStore.add(message);
	        					} else {
	        						visitStore.add(message);
	        					}
	        				} else {
	        					Toast.toast(message);
	        				}
	        			
	        		},
	        		scope: this
	        	});
			}
		}else{
			ETFramework.Backend.request({
	    		bo: 'et.bcp.leader.showwork.ShowWorkBO',
	    		params: {
	    			action: 'boss_visit_query',
	    			user_id: localStorage.user_id,
	    			corp_id: localStorage.corp_id,
	    		    start_num:0,
			        row_num:5  
	    		},
	    		callback: function(err, flag, message, visitBVO) {
	    			visitStore = Ext.StoreMgr.lookup("workDetailsStoreId");
	    			if(visitStore.getAllCount() != 0) {
					        visitStore.removeAll();
	    			   }
	    			console.log(arguments);
	    			if(err != null) {
//	    				Toast.toast("请检查网络");
	    			} else if(flag == "true") {
	    				
	    				var visitId = "";
	    				if(visitBVO != null && visitBVO.length > 0) {
	    					
	    					message.forEach(function(data) {
	    						visitId = data.visitsign_id;
	    						var images = [];
	    							
	    						visitBVO.forEach(function(visitB) {
	    							if(visitId == visitB.visitsign_id) {
	    								images.push({
	    									visit_img: visitB.visitsign_img
	    								})
	    							}
	    						})
	    						if(images.length != 0) {
	    							data.images = images;    								
	    						}
	    					})
	    					visitStore.add(message);
	    					} else {
	    						visitStore.add(message);
	    					}
	    				} else {
	    					Toast.toast(message);
	    				}
	    			
	    		},
	    		scope: this
	    	});
		}
	
    
    },
    /**
     * 跳转大图片显示界面。
     * */
    pictureView: function(record){
        var imgArray = new Array();
        this.redirectTo('bcp/bigpicture');
        imgArray = record.getData().images;
        var view = Ext.Viewport.query('photoview')[0];
        var imgUrl = '';
        imgArray.forEach(function(data) {
            imgUrl = data.visit_img;
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
    },
    
    /**
     * 获取Store
     */
    maintolengthCenter:function(length,mark){
    	ETFramework.Backend.request({
          	bo: 'et.bcp.leader.showwork.ShowWorkBO',
          	params: {
          		action: 'boss_region_query',
          		user_id: localStorage.user_id,
          		corp_id: localStorage.corp_id,
          		start_num:length,
          		row_num:5
          	},
          	callback: function(err, flag, message) {
          		console.log(arguments);
          		if(err!=null){
          			return;
          		}else if(flag=="true"){
          			centerStore.add(message);
        			
          		}
          		
          	},
          	scope: this
         });
    },
    mainToCenter:function(){
    	var centerStore = Ext.StoreMgr.lookup("showCenterStoreId");
    	if(centerStore.getAllCount() != 0){
    		ViewSwitch.showView('center');
//    		this.redirectTo('bcp/center');
    	}else{
    		ETFramework.Backend.request({
              	bo: 'et.bcp.leader.showwork.ShowWorkBO',
              	params: {
              		action: 'boss_region_query',
              		user_id: localStorage.user_id,
              		corp_id: localStorage.corp_id
              	},
              	callback: function(err, flag, message) {
              		console.log(arguments);
              		if(err!=null){
              			return;
              		}else if(flag=="true"){
              			var all={
              				region_id:'01',
              				region_name:'所有中心'
              			};
              			centerStore.add(all);
              			centerStore.add(message);
              			ViewSwitch.showView('center');
//              			this.redirectTo('bcp/center');
            			
              		}
              		
              	},
              	scope: this
             });
    	}
    
    },
    reflushCenterData:function(){
    	var centerStore = Ext.StoreMgr.lookup("showCenterStoreId");
    	centerStore.removeAll();
    	ETFramework.Backend.request({
          	bo: 'et.bcp.leader.showwork.ShowWorkBO',
          	params: {
          		action: 'boss_region_query',
          		user_id: localStorage.user_id,
          		corp_id: localStorage.corp_id,
          		start_num:0,
          		row_num:5
          	},
          	callback: function(err, flag, message) {
          		console.log(arguments);
          		if(err!=null){
          			return;
          		}else if(flag=="true"){
          			var all={
              				region_id:'01',
              				region_name:'所有中心'
              			};
              			centerStore.add(all);
          			centerStore.add(message);
          		}
          		
          	},
          	scope: this
         });
    },
    centerCommit:function(record){
    	this.redirectTo('bcp/workdetailsview');
    	var name = record.region_name;
    	Ext.Viewport.query('img[action=selectCenter]')[0].setHtml(name);
    	if(record.region_id=="01"){
    		ETFramework.Backend.request({
        		bo: 'et.bcp.leader.showwork.ShowWorkBO',
        		params: {
        			action: 'boss_visit_query',
        			user_id: localStorage.user_id,
        			corp_id: localStorage.corp_id,
        		    start_num:0,
    		        row_num:5  
        		},
        		callback: function(err, flag, message, visitBVO) {
        			visitStore = Ext.StoreMgr.lookup("workDetailsStoreId");
        			if(visitStore.getAllCount() != 0) {
    				        visitStore.removeAll();
        			   }
        			console.log(arguments);
        			if(err != null) {
//        				Toast.toast("请检查网络");
        			} else if(flag == "true") {
        				
        				var visitId = "";
        				if(visitBVO != null && visitBVO.length > 0) {
        					
        					message.forEach(function(data) {
        						visitId = data.visitsign_id;
        						var images = [];
        							
        						visitBVO.forEach(function(visitB) {
        							if(visitId == visitB.visitsign_id) {
        								images.push({
        									visit_img: visitB.visitsign_img
        								})
        							}
        						})
        						if(images.length != 0) {
        							data.images = images;    								
        						}
        					})
        					visitStore.add(message);
        					} else {
        						visitStore.add(message);
        					}
        				} else {
        					Toast.toast(message);
        				}
        			
        		},
        		scope: this
        	});
    	}else{
    		ETFramework.Backend.request({
        		bo: 'et.bcp.leader.showwork.ShowWorkBO',
        		params: {
        			action: 'region_visit_query',
        			region_id: record.region_id,
        			corp_id: localStorage.corp_id,
        		    start_num:0,
    		        row_num:5  
        		},
        		callback: function(err, flag, message, visitBVO) {
        			visitStore = Ext.StoreMgr.lookup("workDetailsStoreId");
        			if(visitStore.getAllCount() != 0) {
    				        visitStore.removeAll();
        			   }
        			console.log(arguments);
        			if(err != null) {
//        				Toast.toast("请检查网络");
        			} else if(flag == "true") {
        				
        				var visitId = "";
        				if(visitBVO != null && visitBVO.length > 0) {
        					
        					message.forEach(function(data) {
        						visitId = data.visitsign_id;
        						var images = [];
        							
        						visitBVO.forEach(function(visitB) {
        							if(visitId == visitB.visitsign_id) {
        								images.push({
        									visit_img: visitB.visitsign_img
        								})
        							}
        						})
        						if(images.length != 0) {
        							data.images = images;    								
        						}
        					})
        					visitStore.add(message);
        					} else {
        						visitStore.add(message);
        					}
        				} else {
        					Toast.toast(message);
        				}
        			
        		},
        		scope: this
        	});
    	}
    	
    },
    getVisitStore: function(storeId) {
    	return Ext.StoreMgr.lookup(storeId);
    }

{{/class}}