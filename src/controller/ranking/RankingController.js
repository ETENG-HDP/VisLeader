{{#class "ETFramework.app.Controller"}}
  requires: ['{{view "rankingcount.RankingItem"}}'],
  config: {
		control: {
		  'viewport': {
			rankingitemtap: 'rankingitemtap',
			usersell: 'usersell',
			userrate: 'userrate',
			regionsell: 'regionsell',
			regionrate: 'regionrate',
			agencysell: 'agencysell',
			agencyrate: 'agencyrate'
		  }
		}
  },

  //业代销量排行
  usersell: function() { //'personSaleRanking';
  	this.request({
  		bo: 'et.bcp.leader.ranking.bo.RankingBo',
  		params: {
  			action: 'personSaleRanking',
				user_id: localStorage.user_id,
				corp_id: localStorage.corp_id
  		},
  		callback: function(err, flag, message1, message2) {
  			var store = this.getStore();
  			if(err != null) {
  				Toast.toast('请检查网络！')
  			} else if(flag == 'true' || flag) {

  				if(this.messageToast(message1, message2)) {
						return;
					}

  				var maxnum;
  				if (message1.length != 0) {
  					maxnum = message1[0].sales_num;
  					message1.forEach(function (data1, index) {
  						data1.top_color = ColorProduct.getColor(index % 11);
  						data1.bilv = data1.sales_num / maxnum * 100 + '%';
  						data1.valid = 'hidden';
  						data1.sales_num = data1.sales_num + 't';
  						store.add(data1);
  					}) 
  				}

  				if (message2.length != 0) {
  					message2.forEach(function (data2, index) {
  						data2.top_color = ColorProduct.getColor(index % 11);
  						data2.bilv = data2.sales_num / maxnum * 100 + '%';
  						data2.sales_num = data2.sales_num + 't';
  						data2.valid = 'hidden';
  						data2.text = 'text_color';
  						store.add(data2);
  					})
  				}
  			} else {
  				// Toast.toast('没有要查询的数据');
  			}
  			this.setTitle('业代绩效');
  		},
  		scope: this
  	})
  },	

  //业代任务完成率排行
  userrate: function() {
		this.request({
			bo: 'et.bcp.leader.ranking.bo.RankingBo',
			params: {
				action: 'personBilvRanking',
				user_id: localStorage.user_id,
				corp_id: localStorage.corp_id
			},
			callback: function(err, flag, message1, message2) {
				var store = this.getStore();
				if(err != null) {
					Toast.toast('请检查网络');
				} else if(flag == 'true' || flag) {

					if(this.messageToast(message1, message2)) {
						return;
					}

					if(message1.length != 0) { //前十
						message1.forEach(function(data1, index) {
							data1.top_color = ColorProduct.getColor(index % 11);
							data1.sales_num = data1.bilv + '%';
							data1.bilv = data1.bilv > 100 ? '100%' : data1.bilv + '%';
							data1.current = '完成率';
							data1.valid = 'hidden';
							store.add(data1);
						})
					}

					if(message2.length != 0) { //后十
						message2.forEach(function(data2, index) {
							data2.top_color = ColorProduct.getColor(index % 11);
							data2.sales_num = data2.bilv + '%';
							data2.bilv = data2.bilv > 100 ? '100%' : data2.bilv + '%';
							data2.current = '完成率';
							data2.text = 'text_color';
							data2.valid = 'hidden';
							store.add(data2);
						})
					}
				} else {
					// Toast.toast('没有要查询的数据!');
				}
				this.setTitle('业代任务完成率');
			},
			scope: this
		})
  },

  //中心销量排行
  regionsell: function() {
		this.request({
		  bo: 'et.bcp.leader.ranking.bo.RankingBo',
		  params: {
				action: 'regionSaleRanking',
				user_id: localStorage.user_id,
				corp_id: localStorage.corp_id
		  },
		  callback: function(err, flag, message) {
		  	var store = this.getStore();
				if(err != null) {
				  Toast.toast('请检查网络');
				} else if(flag == 'true' || flag && message != 'undefined' && message != null) {
				  if(message.length != 0) {
				  	var maxnum = message[0].sales_num;
					  message.forEach(function(data, index) {
					  	data.top_color = ColorProduct.getColor(index % 11);
						data.bilv = (data.sales_num/maxnum * 100) + '%';
						data.sales_num = data.sales_num + 't';
						data.current = '销量';
						data.valid = 'hidden';
						store.add(data);
					  })	
				  } else {
				  	Toast.toast('本月暂无要查询的数据');
				  }

				} else {//提示待添加
				  Toast.toast('本月暂无要查询的数据');
				}
				this.setTitle('营销组织销量');
		  },
		  scope: this
		})
  },

  //中心任务完成率
  regionrate: function() {
		this.request({
			bo: 'et.bcp.leader.ranking.bo.RankingBo',
		  params: {
				action: 'regionSaleBilvRanking',
				corp_id: localStorage.corp_id,
		  		user_id: localStorage.user_id
		  },
			callback: function(err, flag, message) {
				var store = this.getStore();
				if(err != null) {

				} else if(flag == 'true' || flage && message == 'undefined' && message != null) {
					
					message.forEach(function(data, index) {
						data.top_color = ColorProduct.getColor(index % 11);
						data.valid = 'hidden';
						data.current = '完成';
						data.sales_num = data.bilv + '%';
						data.bilv = data.bilv > 100 ? '100%' : data.bilv + '%';
						store.add(data);
					})
				} else{
					Toast.toast('没有要查询的数据');
				}
				this.setTitle('营销组织任务完成率');
			},
			scope: this
		})
		
  },

  //经销商销量排行
  agencysell: function() {
		this.request({
			bo: 'et.bcp.leader.ranking.bo.RankingBo',
			params: {
				action: 'customerSaleRanking',
				user_id: localStorage.user_id,
				corp_id: localStorage.corp_id
			},

			callback: function(err, flag, message1, message2) {
				var store = this.getStore();
				if(err != null) {
					Toast.toast('请检查网络');
				} else if(flag == 'true' || flag) {

					if(this.messageToast(message1, message2)) {
						return;
					}

					var maxnum ;
					if(message1.length != 0) {
						maxnum = message1[0].sales_num;
						message1.forEach(function(data1, index) {
							data1.top_color = ColorProduct.getColor(index % 11);
							data1.bilv = data1.sales_num / maxnum * 100 + '%';
							data1.current= '销量';
							data1.sales_num = data1.sales_num + 't';
							data1.valid = 'hidden';
							store.add(data1);
						})
					}

					if(message2.length != 0) {
						message2.forEach(function(data2, index) {
							data2.top_color = ColorProduct.getColor(index % 11);
							data2.bilv = data2.sales_num / maxnum * 100 + '%';
							data2.current= '销量';
							data2.sales_num = data2.sales_num + 't';
							data2.text = 'text_color';
							data2.valid = 'hidden';
							store.add(data2);
						})
					}
					
				} else {
					// Toast.toast('')
				}
				this.setTitle('经销商销量');
			},
			scope: this
		})
  },

  //经销商任务完成率
  agencyrate: function() {
  	this.request({
  		bo: 'et.bcp.leader.ranking.bo.RankingBo',
			params: {
				action: 'customerBilvRanking',
				user_id: localStorage.user_id,
				corp_id: localStorage.corp_id
			},
			callback: function(err, flag, message1, message2) {
				var store = this.getStore();
				if(err != null) {

				} else if (flag == 'true' || flag ) {

					if(this.messageToast(message1, message2)) {
						return;
					}
					if (message1.length != 0) {
						message1.forEach(function(data1, index) {
							data1.top_color = ColorProduct.getColor(index % 11);
							data1.sales_num = data1.bilv +'%';
							data1.bilv = data1.bilv > 100 ? '100%' : data1.bilv + '%';
							data1.current = '完成';
							data1.valid = 'hidden';
							store.add(data1);
						})
					}

					if (message2.length != 0) {
						message2.forEach(function(data2, index) {
							data2.top_color = ColorProduct.getColor(index % 11);
							data2.sales_num = data2.bilv + '%';
							data2.bilv = data2.bilv > 100 ? '100%' : data2.bilv + '%';
							data2.current = '完成';
							data2.text = 'text_color';
							data2.valid = 'hidden';
							store.add(data2);
						})
					}
				} else {

				}
				this.setTitle('经销商任务完成率');
			},
			scope: this
  	})
		
  },

  /*路由跳转*/
  rankingitemtap: function(record) {
		var turnto = record.getData().item_type;
		this.redirectTo(turnto);
  },

  //获取可用的store
  getStore: function() {
  	var store = Ext.StoreMgr.lookup('detailinfostore');
	  if(store.getAllCount() != 0 ) {
	  	store.removeAll();
	  }
	  return store;
  },

  //设置标题
  setTitle: function(title) {
  	var view = Ext.Viewport.query('detailinfo')[0];
		view.down('titlebar').setTitle(title);
  },

  //消息提示
  messageToast: function(message1, message2) {
  	if(message2.length == 0 && message1 == 0) {
			Toast.toast('没有要查询的数据！');
			return true;
		} 
		return false;
  }

{{/class}}