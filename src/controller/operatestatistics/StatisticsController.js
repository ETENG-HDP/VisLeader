{{#class "ETFramework.app.Controller"}}
  requires: [
    '{{view "operatestatistics.KanDanLiang"}}',
    '{{app "util.Backend"}}',
    '{{app "util.Toast"}}',
    '{{app "util.GetExceptNumber"}}',
    '{{app "util.FallsRefresh"}}',
    '{{app "util.ColorProduct"}}'
  ],
  config: {
  	control: {
  	  'viewport': {
  	  	kaidanliang: 'kaidanliang',
  	  	recentsell: 'recentsell',
        sellCompair: 'sellCompair',
        today: 'currentOrderNum',
        week: 'regionWeekSales',
        monthnum: 'regionMonthSales',
        monthrate: 'regionTaskMonthRate',
        year: 'regionTaskYearRate'
  	  }
  	}
  },
    
  //年任务累计完成率
  regionTaskYearRate: function() {
    this.request({
      bo: 'et.bcp.leader.stk.bo.SalesTaskBo',
      params: {
        action: 'regionYearBilv',
        user_id: localStorage.user_id,
        corp_id: bcpConfig.appcorpid || 'wuzoufen-f76b-4437-a3bd-9f1ab1343dfc'
      },

      callback: function(err, flag, message) {
        if(err != null) {

        } else if(flag == 'true' || flag && message != 'undefined' && message != null) {
          var store = Ext.StoreMgr.lookup('detailinfostore');
          if(store.getAllCount() != 0) {
            store.removeAll();
          }
          message.forEach(function(data, index) {
            data.previous = '去年';
            data.current = '今年';
            data.top_color = ColorProduct.getColor(index % 11);
            data.bottom_color = ColorProduct.getColor((index + 6) % 11);
            data.previous_sales = data.previous_bilv + '%';// + '('+data.previous_sales+'t/'+data.previous_task+'t)'
            data.sales_num = data.bilv + '%';//+'('+data.sales_num+'t/'+data.tasknum+'t)';
            data.bilv = data.bilv > 100 ? '100%' : data.bilv + '%'; 
            data.previous_bilv = data.previous_bilv > 100 ? '100%' : data.previous_bilv + '%';
            store.add(data);
          })
        } else {

        }
        var view = Ext.Viewport.query('detailinfo')[0];
        view.down('titlebar').setTitle('年累计完成率');
      }
      
    })
  },

  //月任务累计完成率
  regionTaskMonthRate: function() {
    this.request({
      bo: 'et.bcp.leader.stk.bo.SalesTaskBo',
      params: {
        action: 'regionMonthBilv',
        user_id: localStorage.user_id,
        corp_id: bcpConfig.appcorpid || 'wuzoufen-f76b-4437-a3bd-9f1ab1343dfc'
      },

      callback: function(err, flag, message) {
        if(err != null) {

        } else if(flag == 'true' || flag && message != 'undefined' && message != null) {
          //获取Store
          var store = Ext.StoreMgr.lookup('detailinfostore');
          if(store.getAllCount() != 0) {
            store.removeAll();
          }
          message.forEach(function(data, index) {
            data.previous = '上月';
            data.current = '本月';
            data.top_color = ColorProduct.getColor(index % 11);
            data.bottom_color = ColorProduct.getColor((index + 6) % 11);
            data.previous_sales = data.previous_bilv + '%' ;// + '('+data.previous_sales+'t/'+data.previous_task+'t)'
            data.sales_num = data.bilv + '%';//+'('+data.sales_num+'t/'+data.tasknum+'t)';
            data.bilv = data.bilv > 100 ? '100%' : data.bilv + '%'; 
            data.previous_bilv = data.previous_bilv > 100 ? '100%' : data.previous_bilv + '%';
            store.add(data);
          })
        } else {

        }
        var view = Ext.Viewport.query('detailinfo')[0];
        view.down('titlebar').setTitle('月累计完成率');
      }
    })
  },

  //月销量对比
  regionMonthSales: function() {
    this.request({
      bo: 'et.bcp.leader.stk.bo.SalesTaskBo',
      params: {
        action: 'regionMonthOpenQuantity',
        user_id: localStorage.user_id,
        corp_id: bcpConfig.appcorpid || 'wuzoufen-f76b-4437-a3bd-9f1ab1343dfc'
      },

      callback: function(err, flag, message) {
        if(err != null) {

        } else if(flag == 'true' || flag && message != 'undefined' && message != null) {
          var temp = [], length;
          //提取所有的销量（当前和历史）
          message.forEach(function(data) {
            temp.push(data.sales_num, data.previous_sales);
          })
          length = temp.length - 1;
          var max = GetExceptNumber.maxNum(temp);

          //获取Store
          var store = Ext.StoreMgr.lookup('detailinfostore');
          if(store.getAllCount() != 0) {
            store.removeAll();
          }
          message.forEach(function(data, index) {
            var re = 2*(index+1) - 1;
            data.top_color = ColorProduct.getColor(index % 11);
            data.bottom_color = ColorProduct.getColor((index + 6) % 11);
            data.bilv = (temp[re-1] / max * 100).toFixed(2)+'%';
            data.previous_bilv = (temp[re] / max * 100).toFixed(2)+'%';
            data.sales_num = data.sales_num + 't';
            data.previous_sales = data.previous_sales + 't';
            data.previous = '上月';
            data.current = '本月';
            store.add(data);
          })
        } else {

        }
        var view = Ext.Viewport.query('detailinfo')[0];
        view.down('titlebar').setTitle('月开单量');
      }
      
    })
  },

  //周销量对比
  regionWeekSales: function() {
    this.request({
      bo: 'et.bcp.leader.stk.bo.SalesTaskBo',
      params: {
        action: 'regionweekOpenQuantity',
        user_id: localStorage.user_id,
        corp_id: bcpConfig.appcorpid || 'wuzoufen-f76b-4437-a3bd-9f1ab1343dfc'
      },

      callback: function(err, flag, message) {
        if(err != null) {

        } else if(flag == 'true' || flag && message != 'undefined' && message != null) {
          var temp = [], length;
          //提取所有的销量（当前和历史）
          message.forEach(function(data) {
            temp.push(data.sales_num, data.previous_sales);
          })
          length = temp.length - 1;
          var max = GetExceptNumber.maxNum(temp);
          //获取Store
          var store = Ext.StoreMgr.lookup('detailinfostore');
          if(store.getAllCount() != 0) {
            store.removeAll();
          }
          message.forEach(function(data, index) {
            data.top_color = ColorProduct.getColor(index % 11);
            data.bottom_color = ColorProduct.getColor((index + 6) % 11);
            var re = 2*(index+1) - 1;
            data.bilv = (temp[re-1] / max * 100).toFixed(2)+'%';
            data.previous_bilv = (temp[re] / max * 100).toFixed(2)+'%';
            data.sales_num = data.sales_num + 't';
            data.previous_sales = data.previous_sales + 't';
            data.current = "本周";
            data.previous = "上周";
            store.add(data);
          })

        } else {

        }

        var view = Ext.Viewport.query('detailinfo')[0];
        view.down('titlebar').setTitle('周开单量');
      }
    })
  },

  //近期日销量,30天
  currentOrderNum: function() {

    this.request({
      bo: 'et.bcp.leader.stk.bo.SalesTaskBo',
      params: {
        action: 'moredayopenquantity',
        user_id: localStorage.user_id,
        corp_id: bcpConfig.appcorpid || 'wuzoufen-f76b-4437-a3bd-9f1ab1343dfc'
      },
      callback: function(err, flag, message) {
        if(err != null) {

        } else if (flag == 'true' || flag && message != 'undefined' && message != null) {
          var view = Ext.Viewport.query('detailinfo')[0];
          var data = [], temp = [], length = message.length - 1, k = 0, j = 0,i = 0, value;
          //提取数据字段
          for(i; i <= length ; i++) {
            var item = message[i];
            temp.push(item[1]);
          }
          var store = Ext.StoreMgr.lookup('detailinfostore');
          if(store.getAllCount() != 0) {
            store.removeAll();
          }
          var max = GetExceptNumber.maxNum(temp);
          //求取最大数据的百分比，并给数据赋值
          for(j; j <= length ; j++) {
            temp[j] = (temp[j] / max * 100).toFixed(2)+"%";
            store.add({
              'region_name': message[j][0],
              'bilv': temp[j],
              'valid': 'hidden',
              'current': message[j][1] + "t",
              'top_color': ColorProduct.getColor(j % 11)
            });
          }
          

        } else {

        };
        //动态设置标题
        var view = Ext.Viewport.query('detailinfo')[0];
        view.down('titlebar').setTitle('近期日开单量');
      }
    })
  },

  //近三个月的销售完成与任务对比
  sellCompair: function() {
    this.request({
      bo: 'et.bcp.leader.stk.bo.SalesTaskBo',
      params: {
        action: 'monthTaskAndSales',
        user_id: localStorage.user_id,
        corp_id: bcpConfig.appcorpid || 'wuzoufen-f76b-4437-a3bd-9f1ab1343dfc'
      },

      callback: function(err, flag, message) {
        if(err != null) {
          Toast.toast('请检查网络');
        }else if(flag == 'true' || flag && message != 'undefined' && message != null) {

          var store, i=0, length = message.length-1; 
          store = Ext.StoreMgr.lookup('sellcompairtore');
          if(store.getAllCount() != 0) {
            store.removeAll();
          }
          for(i; i<=length; i++) {
            var data = message[i];
            var date = Ext.Date.format(new Date(data[0]), 'm')+'月';
            store.addData({
              'id': '000' + (i+1),
              'current_sell': data[2],//销量
              'plan_sell': data[1],//任务量
              'sell_date': date,
            })
          }
        }else {
          console.log(message);
        }
        
      }
    })
  },

  //近七天的开单量
  recentsell: function() {
  	this.request({
  		bo: 'et.bcp.leader.stk.bo.SalesTaskBo',
  		params: {
  		  action: 'dayResult',
        user_id: localStorage.user_id,
  		  corp_id:  bcpConfig.appcorpid || 'wuzoufen-f76b-4437-a3bd-9f1ab1343dfc'
  		},
  		callback: function(err, flag, message) {
        if(err != null) {//网络异常
          console.log(err);
        } else if(flag == 'true' || flag && message != 'undefined' && message != null) {
          var content = arguments;
          var length, i =0;

          var store = Ext.StoreMgr.lookup('sellnumstore');
          if(store.getAllCount() != 0) {
            store.removeAll();
          }
          length = message.length -1;
          for(; i <= length; i++) {
            var data = message[i];
            var date = Ext.Date.format(new Date(data[0]), 'm/d');
            store.addData ({
              'id': '000' + (i+1),
              'current_sell': data[1],
              'plan_sell': '3000',
              'sell_date': date,
            })
          }

          var view = Ext.Viewport.query('recentsell[name=sellnum]')[0];
          var view1 = Ext.Viewport.query('recentsell[name=sellrate]')[0];
        } else {//待添加返回值
          console.log(message);
        }

  		}
  	})
  },


  //开单量及完成率的查询方法
  kaidanliang: function() {
  	this.request({
      //url: 'http://192.168.3.121:8080/servlet/MobileSubmitAction',
  	  bo: 'et.bcp.leader.stk.bo.SalesTaskBo',
  	  params: {
  	  	action: 'leaderMianResult',
        user_id: localStorage.user_id,
		    corp_id: bcpConfig.appcorpid || 'wuzoufen-f76b-4437-a3bd-9f1ab1343dfc'
  	  },
  	  callback: function(err, flag) {
        console.log(arguments);
  	  	var content = arguments;
        if (err != null) {//网络异常
          Toast.toast('请检查网络');
        } else if(flag=='true' || flag){
          console.log(content);
  	  	  var data1 = [], data2 = [], length, i = 2;
  	  	  length = content.length - 1;
  	  	  for(i; length >= i; i++) {
  	  	  	switch(i) {
  	  	  		case 2:
  	  	  		  data1.push({
  	  	  		    'id': '今日开单量',
	        	      'num': content[i],
	                'url': 'today',
                 // 'self_sale': content[7] + 't',
                 // 'trade_sale': content[8] + 't',
	                'type': 'twocolumn',
	                'innertype': 'middle'});
  	  	  		  break;
  	  	  		case 3:
  	  	  		  data1.push({
  	  	  		    'id': '本周开单量',
    	        		'num': content[i],
    	        		'url': 'week',
    	        		'type': 'onecolumn',
                  'visible': 'visible',
    	        		'innertype': 'left'});
  	  	  		  break;
  	  	  		case 4: 
  	  	  		  data1.push({
  	  	  		    'id': '本月开单量',
    	        		'num': content[i],
    	        		'url': 'month/number',
    	        		'type': 'onecolumn',
                  'visible': 'visible',
    	        		'innertype': 'right'});
  	  	  		  break;
			  	    case 5:
  	  	  		  data2.push({
      			  		id: '1000',
      			  		title: '本月任务完成率',
      			  		rate: content[i]+'%',
      			  		url: 'month/rate',
                  visible: 'visible',
      			  		innerclass: 'bottom_left',
      			  		type: 'onecolumn'});
  	  	  		break;
  	  	  		case 6:
  	  	  		  data2.push({
      			  		id: '2000',
      			  		innerclass: 'bottom_right',
      			  		title: '全年任务完成率',
      			  		rate: content[i]+'%',
      			  		url: 'year',
                  visible: 'visible',
      			  		type: 'onecolumn'})
  	  	  		break;
  	  	  	}
  	  	  }
	        var view1 = Ext.Viewport.query('kandanliang')[0];
	        var view2 = Ext.Viewport.query('completerate')[0];
  	  	  view1.setData(data1);
  	  	  view2.setData(data2);
  	  	} else {

  	  		//console.log(content);
  	  	}

  	  }
  	});
  }
{{/class}}