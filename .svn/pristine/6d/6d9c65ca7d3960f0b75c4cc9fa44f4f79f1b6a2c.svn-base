{{#class 'ETFramework.app.Controller'}}
  requires: [
    '{{store "RecipeProduceStore"}}',
	'{{view "recipesales.ProductSaleOrder"}}'
  ],
  config: {
  	control: {
  		'viewport': {
        recipesaleorder: 'recipesaleorder',
  			recipesalenum: 'recipesalenum',
        querychara: 'querychara'
  		}
  	}
  },

  //产品特征查询
  querychara: function() {
    this.request({
      bo: 'et.bcp.leader.sales.bo.SalesQueryBo',
      params: {
        action: 'querytengzheng',
        user_id: localStorage.user_id,
        corp_id: localStorage.corp_id,
      },
      callback: function(err, flag, message) {
        var featurestore = Ext.StoreMgr.lookup('featurestore');
        if (featurestore.getAllCount() == 0) {
          featurestore.add({
            'feature_id': 'all-feature', 
            'feature_name': '所有产品'
          });
        };
        message.forEach(function(data) {
          featurestore.add(data);
        })
      }
    })
  },


  toDetail: function() {
    this.redirectTo('saledetail');
  },
  //单品的销量排行
  recipesalenum: function(feature, recipe) {
    this.toDetail();
  	this.request({
  		bo: 'et.bcp.leader.sales.bo.SalesQueryBo',
  		params: {
  			action: 'querysalesrecipeproduce',
  			tezheng_id: feature == 'all-feature' ? null : feature,//临时
  			formul_id: recipe,
  			user_id: localStorage.user_id,
  			corp_id: localStorage.corp_id,
  		},
  		callback: function(err, flag, message) {
        var proStore = Ext.StoreMgr.lookup('productsalestore');
        if (proStore.getAllCount() != 0) {
          proStore.removeAll();
        };
        var max = message[0].sales_num;

        message.forEach(function(record, index) {
          record.temp = ColorProduct.getColor(index % 11);
          record.bilv = record.sales_num / max * 100 + '%';
          record.sales_num = record.sales_num + 't';
          proStore.add(record);
        })

  		}

  	})
  },


  //配方销量
  recipesaleorder: function(featureid) {
  	this.request({
  		bo: 'et.bcp.leader.sales.bo.SalesQueryBo',
  		params: {
  			action: 'querysalesrecipe',
  			// tezheng_id: featureid == 'all-feature' ? null : featureid,//临时
  			tezheng_id: null,
        user_id: localStorage.user_id,
  			corp_id: localStorage.corp_id,
  		},
  		callback: function(err, flag, message) {
        var store = this.getStore();
        if(err != null) {

        } else if( flag == 'true' || flag && message != null) {
          if(message.length != 0) {
            var max = message[0].sales_num;
            message.forEach(function(data, index) {
              data.temp = ColorProduct.getColor(index % 11);
              data.bilv = data.sales_num / max * 100 + '%';
              data.previous_sales = data.sales_num;
              data.sales_num = data.sales_num + 't';
              store.add(data);
            })
            var length = store.getAllCount();
            this.setListHeight(length);
          }
        }
  		},
      scope: this
  	})
  },

  //动态设置高度
  setListHeight: function(length) {
    var view = Ext.Viewport.query('saleorder[name=recipelist]')[0];
    var height = length*72+10;
    view.setHeight(height);
  },

  getStore: function() {
    var store = Ext.StoreMgr.lookup('recipproductsalestore');
    if(store.getAllCount() != 0) {
      store.removeAll();
    }
    return store;
  }

{{/class}}